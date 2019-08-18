# -*- coding: utf-8 -
import pymysql
import numpy as np
import math
import pandas as pd
from pymysql import Error
import time


# TODO tun the outputs of these formulae into lists of lists, rather than tuple lists

def retrieve_data(var_name, var_year, ref_name, ref_year, layer):
    print("retrieve_data")
    ''' this function returns the dataset for a chosen variable, at a chosen year at the chosen level, standardised by the 
    chosen ref variable and the chosen year, CURRENTLY AS A TUPLE LIST'''
    output = []
    # connect to database
    start_time = time.clock()
    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')

    # this is the old quiery that does not work for AMR20 (But curiously, for all others)
    #  Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
    sql_select_Query = (""" 
                            SELECT a.`%s`, (absvalue/relvalue)
                            FROM (
                                  SELECT 
                                         mapping.`%s`, 
                                         SUM(Kreise.`%s` * reference.`%s`) as absvalue
                                  FROM 
                                          Kreise 
                                  LEFT JOIN mapping
                                        ON Kreise.Kennziffer=mapping.KRS_15
                                  LEFT JOIN reference
                                         ON Kreise.Kennziffer=reference.Kennziffer 
                                  WHERE Kreise.YEAR = '%s' AND reference.Year = '%s'
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

        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()


    # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        # closing database connection.

        mySQLconnection.close()
        print("MySQL connection is closed")
        print(time.clock() - start_time, "seconds to retrieve data")

        return output


def retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer):
    print("retrieve_fed_avg")
    ''' this function returns the federal average of a chosen variable and year, where available.
        if no federal average is available, the formula will return the arithmetic mean of the inputted variable,
        standardised over the chosen reference value and year - the formula returns a single float'''
    output = []
    fed_avg_name = var_name[:-3]
    fed_avg_name = fed_avg_name + "400"
    # connect to database

    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')

    try:
        # Returns quiery with tuple [(layer_ID, value)] for federal average at Kreise level, IF IT EXISTS.
        sql_select_Query = (""" SELECT 
                                       Kreise.KENNZIFFER, Kreise.`%s`
                                       FROM Kreise 
                                       WHERE Kreise.YEAR = '%s' AND Kreise.Kennziffer = "01001" """ % (
            fed_avg_name, var_year))

        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()
    except Error as e:
        print("Federal avg. not available - using arithmetic mean instead. See error message: ", e)
        output = retrieve_data(var_name, var_year, ref_name, ref_year, layer)

    finally:
        # closing database connection.
        # print (output)
        output = output[0][1]
        # print (output)
        mySQLconnection.close()
        print("MySQL connection is closed")

        return (output)


def retrieve_ref_share(ref_name, ref_year, layer):
    print("retrieve_ref_share")
    ''' this function returns the share of a chosen reference value in a chosen year, for a chosen layer as a % of the total as a tuple list'''
    output = []
    ref_share = []

    # connect to database

    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')

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
        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()
        # print (output)
        ref_share = []
        for i in range(0, len(output)):
            ref_share.append(((output[i][1]) / (output[i][2])))
        # print(ref_share)
        # check whether numbers add up to 1 -> they do
        # a = 0
        # for i in range (0, len(ref_share)):
        #     a += ref_share[i]
        # print (a)

    # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        # closing database connection.
        mySQLconnection.close()
        print("MySQL connection is closed")
        return ref_share


def retrieve_sd(var_name, var_year, ref_name, ref_year, layer):
    print("retrieve_sd")
    start_time = time.clock()

    """ this function returns the standard deviation for a chosen variable and year, standardised by a chosen ref value
        and year as a single float value  """
    data = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
    fed_avg = retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer)
    ref_share = retrieve_ref_share(ref_name, ref_year, layer)
    # print(type(data[0][1]))

    Standard_deviation = 0
    for i in range(0, len(data)):
        # print(ref_share)
        # print (((data[i][1])-(fed_avg))**2)
        Standard_deviation += (((data[i][1]) - (fed_avg)) ** 2) * (ref_share[i])
        # print ( (((data[i][1])-(fed_avg))**2)*(ref_share[i]))

    Standard_deviation = math.sqrt(Standard_deviation / len(data))

    print(time.clock() - start_time, "seconds to retrieve only the standard deviation")

    return (Standard_deviation)


def scale_HIB(data, fed_avg, SD):
    # print("scale_HIB")
    ''' this function standardises and scales a dataset according to GRW methodology, where higher values
        result in a higher score, this formula currently returns a tuple list'''
    Sfactor_positive = 100
    Sfactor_scaling = 15
    tuple = ()
    output = []
    for i in range(0, len(data)):
        tuple = ((data[i][0]), (((data[i][1] - fed_avg) * Sfactor_scaling / SD) + Sfactor_positive))
        output.append(tuple)
    return output


def scale_NIB(data, fed_avg, SD):
    # print("scale_NIB")
    ''' this function standardises and scales a dataset according to GRW methodology, where lower values
        result in a higher score, this formula currently returns a tuple list'''
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


def retrieve_sd_data(var_name, var_year, ref_name, ref_year, layer, scale="HIB"):
    start_time = time.clock()
    print("retrieve_sd_data")
    data = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
    sd = retrieve_sd(var_name, var_year, ref_name, ref_year, layer)
    fed_avg = retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer)

    if scale == "HIB":
        output = scale_HIB(data, fed_avg, sd)
    else:
        output = scale_NIB(data, fed_avg, sd)

    print(time.clock() - start_time, "seconds to retrieve the standardised data")
    return output


def retrieve_col_names(table_name):
    print("retrieve_col_names")
    ''' this function returns a LIST of all unique column names in a selected TABLE from the database'''
    col_names = []
    temp = []
    output = []
    # connect to database

    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')
    # Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
    sql_select_Query = (""" 
                                SELECT COLUMN_NAME 
                                    FROM information_schema.columns 
                                    WHERE table_schema = "mydb" 
                                    AND table_name = '%s';""" % (table_name))
    try:
        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        col_names = cursor.fetchall()
        cursor.close()
        # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        # closing database connection.
        mySQLconnection.close()
        print("MySQL connection is closed")

        # for x in range (0, len(col_names)):
        #     output.append(x)
        temp = list(col_names)
        for (x,) in temp:
            output.append(x)
        ## this removes the unwanted labels from our input list
        output = [e for e in output if e not in ('KENNZIFFER', 'RAUMEINHEIT', 'AGGREGAT', 'YEAR')]

        return output


def retrieve_col_years(table_name):
    ''' this function returns a list of all the years for in the datable'''
    print("retrieve_col_years")
    output = []
    col_years = []
    temp = []
    # connect to database

    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')

    # Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
    sql_select_Query = (""" 
                                  SELECT DISTINCT YEAR
                                      FROM `%s`;""" % (table_name))
    try:
        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        col_years = cursor.fetchall()
        cursor.close()
        # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        # closing database connection.
        mySQLconnection.close()
        print("MySQL connection is closed")
        temp = list(col_years)
        for (x,) in temp:
            output.append(x)

        return output


def retrieve_distinct_years(var_name):
    print("retrieve_distinct_years")
    distinct_years = []

    # connect to database
    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')

    # Returns quiery with all years for a given variable
    sql_select_Query = (""" SELECT
                                DISTINCT `YEAR`
                            FROM `Kreise`
                            WHERE `%s` IS NOT NULL; """ % (var_name))
    try:
        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        distinct_years = cursor.fetchall()
        cursor.close()
        # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        # closing database connection.
        mySQLconnection.close()
        print("MySQL connection is closed")
        output = []
        for (x,) in distinct_years:
            output.append(x)
        # print (output)
        return output




def retrieve_complete_col_years():
    ''' this function returns a list of list with all the unique variables in KREISE and the years which are not
    null in this list. HOWEVER, the function is incredibly slow. Perhaps it should go into setup.py and be run once
    at the beginning of creating the database'''
    #TODO: ask Ben about whether there is a way to do this in one quiery
    start_time = time.clock()
    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')
    cursor = mySQLconnection.cursor()
    ## this returns a list of all the column names we want
    result = []
    col_names = retrieve_col_names('Kreise')

    for x in col_names:
        distinct_years = []
        mysql_result = []
        distinct_years.append(x)
        sql_select_Query = (""" SELECT
                                DISTINCT `YEAR`
                            FROM `Kreise`
                            WHERE `%s` IS NOT NULL; """ % (x))

        cursor.execute(sql_select_Query)
        mysql_result = cursor.fetchall()
        for (x,) in mysql_result:
            distinct_years.append(x)
        result.append(distinct_years)
        # print(distinct_years)
    cursor.close()
    mySQLconnection.close()
    print(time.clock()-start_time)
    return result


def retrieve_metadata():
    ''' this function returns the entire set of metadata available as a ..... '''
    #TODO: specify datatype here - currenlty this is a dict of dictionarries
    start_time = time.clock()
    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')
    cursor = mySQLconnection.cursor(pymysql.cursors.DictCursor)
    # cursor = mySQLconnection.cursor()

    ## this returns the entire metadatatable
    result = []

    sql_select_Query = (""" SELECT * FROM `metadata`; """)
    cursor.execute(sql_select_Query)
    result = cursor.fetchall()

    # print(distinct_years)
    cursor.close()
    mySQLconnection.close()

    target_dict = {}
    for x in result:
        for y in x:
            if y == 'databasename':
                target_dict[x[y]] = x
    # print (target_dict)
                ### add this as a new dictionary
    # output = []
    # output.append(result)
    # output.replace(result, "result")

    print(time.clock() - start_time)
    return target_dict


def insert_all_years_into_db():
    # retrieve all the data that we have for th respective variables from Kreise
    data = retrieve_complete_col_years()


    # define name for new db table
    table_name = "all_years"

    ## create databaselogin etc.
    data_base_name = "mydb"
    data_base = pymysql.connect("localhost", "user", "password", data_base_name)
    cursor = data_base.cursor()

    #create the empty table
    cursor.execute("DROP TABLE IF EXISTS `%s`" % (table_name))
    sql = ("CREATE TABLE `%s` (DATABASENAME VARCHAR(70) NOT NULL);" % (table_name))
    cursor.execute(sql)
    data_base.commit()

    ## add all the columns
    ## retrieve list of all the required columns
    col_years = retrieve_col_years("Kreise")

    ## and drop them into the database as columns
    for x in col_years:
        sql = (""" ALTER TABLE `%s`
                   ADD COLUMN `%s` VARCHAR(20)  """ % (table_name, x))
        cursor.execute(sql)
        data_base.commit()


    ## create the col_name statement: (name, col_1, col_2): we already have that
    for x in data:
        col_value_statement = tuple(x)
        col_name_statement = x
        col_name_statement[0] = "DATABASENAME"
        counter = 0
        for x in col_name_statement:
            col_name_statement[counter] = (""" `%s` """ % (x))
            counter +=1

        # convert list into string
        col_name_statement = ', '.join(map(str, col_name_statement))

        print(col_name_statement)
        print(col_value_statement)

        ## now insert all of these into mysql table:
        sql = (""" INSERT INTO `%s`
                    (%s)
                    VALUES %s; """ % (table_name, col_name_statement, col_value_statement))
        print (sql)
        cursor.execute(sql)
        data_base.commit()


    data_base.close()

    return ("all values added to database")




def retrieve_year_dict_from_db():

    filtered_dict = {}

    mySQLconnection = pymysql.connect(host='localhost',

                                      database='mydb',
                                      user='user',
                                      password='password')

    # quiery
    sql_select_Query = (""" SELECT * FROM `all_years` """)

    try:

        # executed quiery and closes cursor
        cursor = mySQLconnection.cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()



    # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        # closing database connection.

        mySQLconnection.close()
        print("MySQL connection is closed")
        # print(output)

        list = []

        for x in output:
            # print (x)
            temp = []
            for y in x:
                if y is not None:
                    temp.append(y)
            list.append(temp)

        ## now convert into dictionary:

        for x in list:
            temp = []
            counter = 0
            for y in x:
                if counter != 0:
                    temp.append(y)
                counter += 1
            filtered_dict[x[0]] = temp





        #     print(record)
        #     filtered_dict.append(record)

        #     record = {k: v for k, v in x.items() if v is not None}

        return filtered_dict


# test = retrieve_year_dict_from_db()
# print(test)



    #### THIS IS ALL ONLY TESTS

# test = retrieve_metadata()
# print(test)
# print(test[0].keys)
#


# # TESTS FOR THIS SECTION
#
# col_years = retrieve_col_years("Kreise")
# print (col_years)
#

# col_names = retrieve_col_names("reference")
# print(col_names)

# var_name = "Lohn pro Beschäftigtem 2010 _ORIGINAL_200"
# var_year = "2010"
# ref_name = "Erwerbstätige gesamt_100"
# ref_year = "2011"
# layer = "AMR_12"
# scale = "HIB"
#
# # test = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
# print(retrieve_sd(var_name, var_year, ref_name, ref_year, layer))
# print(retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer))
#
#
# test = retrieve_sd_data(var_name, var_year, ref_name, ref_year, layer, scale)
# print (test)

################## PLAY AROUND FOR DICT FUNCTION:
#


# retrieve_data(var_name, var_year, ref_name, ref_year, layer)

#
# test = retrieve_complete_col_years()
# print(test)


'''
# throw away code:

    # this selects any variable for any year from Kreise and returns array with tuples [(Kennziffer, value),()...]
    sql_select_Query = (""" SELECT Kennziffer, `%s` from Kreise where YEAR = '%s' """ % (var_name, var_year))

   # this selects any variable for any year from Reference and returns array with tuples [(Kennziffer, value),()...]
    sql_select_Query = (""" SELECT Kennziffer, `%s` from REFERENCE where YEAR = '%s' """ % (ref_name, ref_year))

    # this quiery selects any variable at any layer and builds the SIMPLE average
    sql_select_Query = (""" SELECT mapping.AMR_15, Kreise.`Einwohner Gesamt_100`
                        FROM Kreise 
                        LEFT JOIN mapping 
                        ON Kreise.Kennziffer=mapping.KRS_15 
                        WHERE YEAR = 2015
                        GROUP BY mapping.AMR_15
                        """)
    sql_select_Query = (""" SELECT mapping.AMR_12, Kreise.`Arbeitslosenquote_100`, Reference.`Einwohner gesamt`
                        FROM Kreise 
                            LEFT JOIN mapping
                                ON Kreise.Kennziffer=mapping.KRS_15
                            LEFT JOIN REFERENCE
                                ON Kreise.Kennziffer=Reference.Kennziffer 
                        WHERE Kreise.YEAR = 2014 AND Reference.Year = 2015
                        GROUP BY mapping.AMR_12
                        """)

       sql_select_Query = (""" SELECT 
                                mapping.`%s`, (Reference.`%s` /SUM(reference.`%s`)), SUM(reference.`%s`),
                                    Reference.`%s`  
                                FROM reference 
                                LEFT JOIN mapping
                                    ON reference.Kennziffer=mapping.KRS_15
                                WHERE Reference.Year = '%s'
                                GROUP BY mapping.`%s` """ % (layer, ref_name, ref_name, ref_name, ref_name, ref_year, layer) )

### this quiery returns the value of the ref value aggregated at the layer chosen, for the ref type and year combination
        sql_select_Query = (""" SELECT                         
                                 mapping.`%s`,
                                 sum(Reference.`%s`)
                                            FROM
                                    REFERENCE
                                 LEFT JOIN mapping
                                    ON reference.Kennziffer=mapping.KRS_15
                                            WHERE reference.year = '%s'
                                            GROUP BY mapping.`%s`
                                            ORDER BY mapping.`%s` ASC """ % (layer, ref_name, ref_year, layer, layer) )

### this quiery returns the value of the ref value aggregated at the layer chosen, for the ref type and year combination
        sql_select_Query = (""" 
                                SELECT 
                                    mapping.`%s`, 
                                    SUM(Kreise.`%s` * Reference.`%s`)
                                FROM 
                                Kreise 
                                LEFT JOIN mapping
                                    ON Kreise.Kennziffer=mapping.KRS_15
                                LEFT JOIN REFERENCE
                                    ON Kreise.Kennziffer=Reference.Kennziffer 
                                WHERE Kreise.YEAR = '%s' AND Reference.Year = '%s'
                                GROUP BY mapping.`%s`
                                ORDER BY mapping.`%s` ASC""" % (layer, var_name, ref_name, var_year, ref_year, layer, layer) )


        # executed quiery and closes cursor
        cursor = mySQLconnection .cursor()
        cursor.execute(sql_select_Query)
        var_total = cursor.fetchall()    
        cursor.close()


        var_total = pd.DataFrame(var_total)
        ref_total = pd.DataFrame(ref_total)
        # print (var_total[0])
        # print(var_total[[1]])
        # print(ref_total[[1]])
        total = pd.DataFrame.divide(var_total[[1]], ref_total[[1]])
        total_2 = var_total[0]
        total_2[1] = pd.DataFrame.divide(var_total[[1]], ref_total[[1]])
        print (total_2)
        # total[0] = var_total[[0]]
        # print(total)
        # print(var_total)
        # print(ref_total)
        # np.divide(var_total[:][1], ref_total[:][1])


     '''











