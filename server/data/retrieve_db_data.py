import warnings

import pymysql
import math
from pymysql import Error



class retrieve_db_data:

    def __init__(self, connections):
        self.connections = connections

    def retrieve_data(self, var_name, var_year, ref_name, ref_year, layer):
        '''
        :param var_name: name of a variable (Stored in kreise table in database)
        :param var_year: year of variable (Stored in kreise table in database)
        :param ref_name: name of reference variable (stored in reference table in database)
        :param ref_year: year of reference variable (stored in reference table in database)
        :param layer: layer on which data should be retrieved (Kreise, AMR12, AMR15 etc.)
        :return:this function returns the dataset for a chosen variable, at a chosen year at the chosen level, standardised by the
        chosen ref variable and the chosen year as a tuple list with [(Kennziffer, value),...]'''

        output = []
        sql_select_Query = (""" 
                            SELECT a.`%s`, (absvalue/relvalue)
                            FROM (
                                  SELECT 
                                         mapping.`%s`, 
                                         SUM(kreise.`%s` * reference.`%s`) as absvalue
                                  FROM 
                                          kreise 
                                  LEFT JOIN mapping
                                        ON kreise.Kennziffer=mapping.KRS_15
                                  LEFT JOIN reference
                                         ON kreise.Kennziffer=reference.Kennziffer 
                                  WHERE kreise.YEAR = '%s' AND reference.Year = '%s'
                                  GROUP BY mapping.`%s`
                                  ORDER BY mapping.`%s` ASC
                                   ) a
                            LEFT JOIN (                
                                  SELECT                           
                                           mapping.`%s`,
                                            sum(reference.`%s`) as relvalue
                                  FROM
                                            reference
                                  LEFT JOIN mapping
                                             ON reference.Kennziffer=mapping.KRS_15
                                  WHERE reference.year = '%s'
                                  GROUP BY mapping.`%s`
                                  ORDER BY mapping.`%s` ASC
                                   ) r
                            on a.`%s`=r.`%s` """ % (
            layer, layer, var_name, ref_name, var_year, ref_year, layer, layer, layer, ref_name, ref_year, layer, layer,
            layer,
            layer))
        try:
            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            output = cursor.fetchall()
            cursor.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            return output


    def retrieve_fed_avg(self, var_name, var_year, ref_name, ref_year, layer):
        '''

        :param var_name: name of a variable (Stored in kreise table in database)
        :param var_year: year of variable (Stored in kreise table in database)
        :param ref_name: name of reference variable (stored in reference table in database)
        :param ref_year: year of reference variable (stored in reference table in database)
        :param layer: layer on which data should be retrieved (Kreise, AMR12, AMR15 etc.)
        :return: this function returns the federal average of a chosen variable and year, where available.
            if no federal average is available, the formula will return the arithmetic mean of the inputted variable,
            standardised over the chosen reference value and year - the formula returns a single float
        '''

        output = []
        fed_avg_name = var_name[:-3]
        fed_avg_name = fed_avg_name + "400"
        try:
            # Returns quiery with tuple [(layer_ID, value)] for federal average at kreise level, IF IT EXISTS.
            sql_select_Query = (""" SELECT 
                                           kreise.KENNZIFFER, kreise.`%s`
                                           FROM kreise 
                                           WHERE kreise.YEAR = '%s' AND kreise.Kennziffer = "01001" """ % (
                fed_avg_name, var_year))

            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            output = dict(cursor.fetchall())
            try:
                output = output['01001']
            except:
                print("Federal avg. not available - using arithmetic mean instead. See error message: adsfasdfasdf ")
                output = self.retrieve_data(var_name, var_year, ref_name, ref_year, layer)
                output = output[0][1]

            ## this checks for an none type
            if (output == None or output == []):
                print("Federal avg. not available - using arithmetic mean instead. See error message: ")
                output = self.retrieve_data(var_name, var_year, ref_name, ref_year, layer)
                output = output[0][1]

        except:
            print("Federal avg. not available - using arithmetic mean instead. See error message: ")
            output = self.retrieve_data(var_name, var_year, ref_name, ref_year, layer)
            output = output[0][1]
        finally:
            return output

    def retrieve_ref_share(self, ref_name, ref_year, layer):
        '''
        :param ref_name: this is the name of a variable (Stored in the reference table)
        :param ref_year:  this is the year of a variable (stored in the reference table)
        :param layer: this is the layer at which the layer (Kreise, AMR12 etc.)
        :return: this function returns the share of a chosen reference value in a chosen year,
        for a chosen layer as a % of the total as a tuple list. This can be used to calculate weighted averages of
        variables
        '''

        output = []
        ref_share = []

        # Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
        sql_select_Query = (""" SELECT 
                                    mapping.`%s`, (SUM(reference.`%s`)), SUM(SUM(reference.`%s`)) over () as grandtotal
                                    FROM reference 
                                    LEFT JOIN mapping
                                        ON reference.KENNZIFFER=mapping.KRS_15
                                    WHERE reference.Year = '%s'
                                    GROUP BY mapping.`%s` 
                                    ORDER BY mapping.`%s` ASC """ % (layer, ref_name, ref_name, ref_year, layer, layer))

        try:
            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            output = cursor.fetchall()
            cursor.close()
            ref_share = []
            for i in range(0, len(output)):
                ref_share.append(((output[i][1]) / (output[i][2])))
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            return ref_share

    def retrieve_sd(self, var_name, var_year, ref_name, ref_year, layer):
        '''

        :param var_name: this is the name of a variable stored in the kreise table
        :param var_year: this is the year of the variable stored in the kreise table
        :param ref_name: this is a reference variable stored in the reference table
        :param ref_year: this is the year of a reference variable stored in the reference able
        :param layer: this is the layer at which to retrieve data (Kreise, AMR etc.)
        :return: this function returns the standard deviation for a chosen variable and year,
        standardised by a chosen ref value and year as a single float value
        '''

        data = self.retrieve_data(var_name, var_year, ref_name, ref_year, layer)
        fed_avg = self.retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer)
        ref_share = self.retrieve_ref_share(ref_name, ref_year, layer)
        Standard_deviation = 0
        for i in range(0, len(data)):
            Standard_deviation += (((float(data[i][1])) - (float(fed_avg))) ** 2) * float((ref_share[i]))
        Standard_deviation = math.sqrt(Standard_deviation / len(data))
        return Standard_deviation


    def scale_HIB(self, data, fed_avg, SD):
        '''

        :param data: the dataset to be standardised and transformed
        :param fed_avg: the federal average or median value of the dataset to be transformed
        :param SD: the standard deviation of the dataset to be transformed
        :return: this function standardises and scales a dataset according to GRW methodology, where higher values
            result in a higher score, this formula currently returns a tuple list of the standardised dataset
        '''

        Sfactor_positive = 100
        Sfactor_scaling = 15
        tuple = ()
        output = []
        for i in range(0, len(data)):
            tuple = ((data[i][0]), (((data[i][1] - fed_avg) * Sfactor_scaling / SD) + Sfactor_positive))
            output.append(tuple)
        return output

    def scale_NIB(self, data, fed_avg, SD):
        '''

        :param data: the dataset to be standardised and transformed
        :param fed_avg: the federal average or median value of the dataset to be transformed
        :param SD: the standard deviation of the dataset to be transformed
        :return: this function standardises and scales a dataset according to GRW methodology, where higher values
            result in a lower score, this formula currently returns a tuple list of the standardised dataset
        '''
        Sfactor_positive = 100
        Sfactor_negative = 200
        Sfactor_scaling = 15
        tuple = ()
        output = []
        for i in range(0, len(data)):
            tuple = (
                (data[i][0]), (Sfactor_negative - (((data[i][1] - fed_avg) * Sfactor_scaling) / SD) + Sfactor_positive))
            output.append(tuple)
        return output


    def retrieve_sd_data(self, var_name, var_year, ref_name, ref_year, layer, scale="HIB"):
        '''

        :param var_name: specifies a variable name from the kreise table
        :param var_year: specifies the year of a variable from the kreise table
        :param ref_name: specifie the name of a reference variable form the reference table
        :param ref_year:  specifies the year of a reference variable from the reference table
        :param layer: specifies the layer at which to return data (Kreise, AMR12 etc.)
        :param scale: specifies which of the scaling and transformation methods should be used ("HIB" or "NIB")
        :return: this function returns a standardised dataset at a chosen layer, scaled and transformed according to
        inputs form the user
        '''
        data = self.retrieve_data(var_name, var_year, ref_name, ref_year, layer)
        sd = self.retrieve_sd(var_name, var_year, ref_name, ref_year, layer)
        fed_avg = self.retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer)
        if scale == "HIB":
            output = self.scale_HIB(data, fed_avg, sd)
        else:
            output = self.scale_NIB(data, fed_avg, sd)
        return output

    def retrieve_col_names(self, table_name):
        '''
        :param table_name: specifies the table name from which to retrieve column names from
        :return: this function returns a LIST of all unique column names in a selected TABLE from the database
        '''
        col_names = []
        temp = []
        output = []
        sql_select_Query = (""" 
                                    SELECT COLUMN_NAME 
                                        FROM information_schema.columns 
                                        WHERE table_schema = "mydb" 
                                        AND table_name = '%s'
                                        ORDER BY COLUMN_NAME ASC;""" % (table_name))
        try:
            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            col_names = cursor.fetchall()
            cursor.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            temp = list(col_names)
            for (x,) in temp:
                output.append(x)
            ## this removes  unwanted labels from  list if they are in it
            output = [e for e in output if e not in ('KENNZIFFER', 'RAUMEINHEIT', 'AGGREGAT', 'YEAR')]
            return output

    def clean_col_names(self, data):
        '''
        :param data: takes a list of column names as an input
        :return: returns the list after removing all items in the list that have a suffix of _400
        '''
        output =[]
        for x in data:
            if x[-4:] != "_400":
                output.append(x)
        return output

    def retrieve_col_years(self, table_name):
        '''

        :param table_name: specify table from which years should be retrieved
        :return: this function returns a list of all the unique years in the selected table
        '''
        output = []
        col_years = []
        temp = []
        sql_select_Query = (""" 
                                      SELECT DISTINCT YEAR
                                          FROM `%s`;""" % (table_name))
        try:
            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            col_years = cursor.fetchall()
            cursor.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            temp = list(col_years)
            for (x,) in temp:
                output.append(x)
            return output

    def retrieve_distinct_years(self, var_name):
        '''
        :param var_name: specifies a variable for whih to retrieve years
        :return: the function returns a unique list of all the years for which the values in the database are not
        null for the variable specified by the user
        '''
        distinct_years = []
        sql_select_Query = (""" SELECT
                                    DISTINCT `YEAR`
                                FROM `kreise`
                                WHERE `%s` IS NOT NULL; """ % (var_name))
        try:
            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            distinct_years = cursor.fetchall()
            cursor.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            output = []
            for (x,) in distinct_years:
                output.append(x)
            return output

    def retrieve_complete_col_years(self):
        '''

        :return: this function returns a list of list with all the unique variables in kreise and the years which are not
        null in this list. HOWEVER, the function is incredibly slow. It is only run when a new database instance is
        created
        '''
        result = []
        col_names = self.retrieve_col_names('kreise')
        cursor = self.connections['default'].cursor()
        for x in col_names:
            distinct_years = []
            mysql_result = []
            distinct_years.append(x)
            sql_select_Query = (""" SELECT
                                    DISTINCT `YEAR`
                                FROM `kreise`
                                WHERE `%s` IS NOT NULL; """ % (x))

            cursor.execute(sql_select_Query)
            mysql_result = cursor.fetchall()
            for (x,) in mysql_result:
                distinct_years.append(x)
            result.append(distinct_years)
        cursor.close()
        return result

    def dictfetchall(self, cursor):
        '''

        :param cursor: specifies a cursor  whose data is to be transformed
        :return: "Returns all rows from a cursor as a dict"
        '''
        desc = cursor.description
        return [
            dict(zip([col[0] for col in desc], row))
            for row in cursor.fetchall()
        ]

    def retrieve_metadata(self):
        '''

        :return: this function returns the entire set of metadata available as a list of dictionaries '''

        cursor = self.connections['default'].cursor()
        result = []

        sql_select_Query = (""" SELECT * FROM `metadata`; """)
        cursor.execute(sql_select_Query)
        result = self.dictfetchall(cursor)
        cursor.close()

        target_dict = {}
        for x in result:
            for y in x:
                if y == 'databasename':
                    target_dict[x[y]] = x
        return target_dict


    def insert_all_years_into_db(self):
        '''

        :return: this function does not return a value but retrieves all unique year from the database and then
        drops them into the database in a separate table called "all_years"
        '''
        data = self.retrieve_complete_col_years()
        table_name = "all_years"
        cursor = self.connections['default'].cursor()

        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            cursor.execute("DROP TABLE IF EXISTS all_years")

        sql = ("CREATE TABLE `%s` (DATABASENAME VARCHAR(70) NOT NULL);" % table_name)
        cursor.execute(sql)

        col_years = self.retrieve_col_years("kreise")
        for x in col_years:
            sql = (""" ALTER TABLE `%s`
                       ADD COLUMN `%s` VARCHAR(20)  """ % (table_name, x))
            cursor.execute(sql)
        for x in data:
            col_value_statement = tuple(x)
            col_name_statement = x
            col_name_statement[0] = "DATABASENAME"
            counter = 0
            for y in col_name_statement:
                col_name_statement[counter] = (""" `%s` """ % (y))
                counter +=1
            col_name_statement = ', '.join(map(str, col_name_statement))
            sql = (""" INSERT INTO `%s`
                        (%s)
                        VALUES %s; """ % (table_name, col_name_statement, col_value_statement))
            cursor.execute(sql)
        cursor.close()
        return print("Alle Werte in Datenbank geschrieben. Prozess erfolgreich abgeschlossen.")

    def retrieve_year_dict_from_db(self):
        '''

        :return: this function returns a dictionary of all the years available in the database sorted by variable
        '''

        filtered_dict = {}
        sql_select_Query = (""" SELECT * FROM `all_years` """)
        try:
            cursor = self.connections['default'].cursor()
            cursor.execute(sql_select_Query)
            output = cursor.fetchall()
            cursor.close()
        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            list = []
            for x in output:
                temp = []
                for y in x:
                    if y is not None:
                        temp.append(y)
                list.append(temp)
            for x in list:
                temp = []
                counter = 0
                for y in x:
                    if counter != 0:
                        temp.append(y)
                    counter += 1
                temp.reverse()
                filtered_dict[x[0]] = temp
            return filtered_dict

    def retrieve_names_from_db(self, layer):
        '''

        :param layer: this specifies the layer for which names should be retrieved in the mapping table
        :return: retrieves the names of all the layers from the database
        '''
        cursor = self.connections['default'].cursor()

        result = []
        layer_name = layer + '_Name'
        sql_select_Query = (""" SELECT DISTINCT `%s`, `%s` FROM `mapping`; """ % (layer_name, layer))
        cursor.execute(sql_select_Query)
        result = cursor.fetchall()
        cursor.close()

        output =[]
        temp = []
        for (x,y) in result:
            temp.append(x)
            temp.append(y)
            output.append(temp)
            temp = []
        return output

    def retrieve_Ost_West(self):


        cursor = self.connections['default'].cursor()

        result = []

        sql_select_Query = ("""select `KRS_15`, `AMR_12`, `AMR_15`, `AMR_20`, `ROR11`, `Bundesland_ID`, `Ost_West` FROM `mapping`;""")
        cursor.execute(sql_select_Query)
        result = cursor.fetchall()
        cursor.close()

        output = []
        temp = []
        for (a, b, c, d, e, f, g) in result:
            temp.append(a)
            temp.append(b)
            temp.append(c)
            temp.append(d)
            temp.append(e)
            temp.append(f)
            temp.append(g)
            output.append(temp)
            temp = []

        return output



