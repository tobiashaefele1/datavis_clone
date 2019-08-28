# -*- coding: utf-8 -
import pymysql
import numpy as np
import math
import pandas as pd
from pymysql import Error
import time
import pymysql

from django.db import connections

def retrieve_data(var_name, var_year, ref_name, ref_year, layer):
    print("retrieve_data")
    ''' this function returns the dataset for a chosen variable, at a chosen year at the chosen level, standardised by the 
    chosen ref variable and the chosen year, CURRENTLY AS A TUPLE LIST'''
    output = []
    # mySQLconnection = 'stop'

    #  Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
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

        # executed quiery and closes cursor
        cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()

    # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        return output


def retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer):
    ''' this function returns the federal average of a chosen variable and year, where available.
        if no federal average is available, the formula will return the arithmetic mean of the inputted variable,
        standardised over the chosen reference value and year - the formula returns a single float'''
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

        cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        output = dict(cursor.fetchall())
        try:
            output = output['01001']
        except:
            print("Federal avg. not available - using arithmetic mean instead. See error message: adsfasdfasdf ")
            output = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
            output = output[0][1]

        ## this checks for an none type
        if (output == None or output == []):
            print("Federal avg. not available - using arithmetic mean instead. See error message: ")
            output = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
            output = output[0][1]

    except:
        print("Federal avg. not available - using arithmetic mean instead. See error message: ")
        output = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
        output = output[0][1]

    finally:
        return output


def retrieve_ref_share(ref_name, ref_year, layer):
    ''' this function returns the share of a chosen reference value in a chosen year, for a chosen layer as a % of the total as a tuple list'''
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
        cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()
        ref_share = []
        for i in range(0, len(output)):
            ref_share.append(((output[i][1]) / (output[i][2])))


    # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        return ref_share


def retrieve_sd(var_name, var_year, ref_name, ref_year, layer):

    """ this function returns the standard deviation for a chosen variable and year, standardised by a chosen ref value
        and year as a single float value  """

    data = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
    fed_avg = retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer)
    ref_share = retrieve_ref_share(ref_name, ref_year, layer)


    Standard_deviation = 0
    for i in range(0, len(data)):

        Standard_deviation += (((float(data[i][1])) - (float(fed_avg))) ** 2) * float((ref_share[i]))

    Standard_deviation = math.sqrt(Standard_deviation / len(data))
    return Standard_deviation


def scale_HIB(data, fed_avg, SD):
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
    data = retrieve_data(var_name, var_year, ref_name, ref_year, layer)
    sd = retrieve_sd(var_name, var_year, ref_name, ref_year, layer)
    fed_avg = retrieve_fed_avg(var_name, var_year, ref_name, ref_year, layer)
    if scale == "HIB":
        output = scale_HIB(data, fed_avg, sd)
    else:
        output = scale_NIB(data, fed_avg, sd)
    return output


def retrieve_col_names(table_name):
    ''' this function returns a LIST of all unique column names in a selected TABLE from the database'''
    col_names = []
    temp = []
    output = []
    # Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
    sql_select_Query = (""" 
                                SELECT COLUMN_NAME 
                                    FROM information_schema.columns 
                                    WHERE table_schema = "mydb" 
                                    AND table_name = '%s'
                                    ORDER BY COLUMN_NAME ASC;""" % (table_name))
    try:

        data_base = pymysql.connect('bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com', 'admin', 'NPmpMe!696rY', "mydb")
        # data_base = pymysql.connect("localhost", "user", "password", "mydb")
        cursor = data_base.cursor()
        # cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        col_names = cursor.fetchall()
        cursor.close()
        # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        temp = list(col_names)
        for (x,) in temp:
            output.append(x)
        ## this removes the unwanted labels from our input list
        output = [e for e in output if e not in ('KENNZIFFER', 'RAUMEINHEIT', 'AGGREGAT', 'YEAR')]

        return output


def clean_col_names(data):
    '''
    this functions "cleans" a list of variables and removes all _400 years (this function is used by views.py to
    to make sure _400 years do not appear as an option in the selector)
    :param data: takes a list of all column names as an input
    :return: returns the same list after removing all items in the list that have a parameter of _400
    '''
    output =[]
    for x in data:
        if x[-4:] != "_400":
            output.append(x)
    return output



def retrieve_col_years(table_name):
    ''' this function returns a list of all the years for in the datable'''
    output = []
    col_years = []
    temp = []

    # Returns quiery with tuple [(layer_ID, value)] for selected variable at selected year, weighted by selected ref at selected year, grouped at selected layer.
    sql_select_Query = (""" 
                                  SELECT DISTINCT YEAR
                                      FROM `%s`;""" % (table_name))
    try:
        data_base = pymysql.connect('bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com', 'admin', 'NPmpMe!696rY', "mydb")
        # data_base = pymysql.connect("localhost", "user", "password", "mydb")
        cursor = data_base.cursor()

        # cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        col_years = cursor.fetchall()
        cursor.close()
        # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        temp = list(col_years)
        for (x,) in temp:
            output.append(x)
        return output


def retrieve_distinct_years(var_name):
    distinct_years = []

    # Returns quiery with all years for a given variable
    sql_select_Query = (""" SELECT
                                DISTINCT `YEAR`
                            FROM `kreise`
                            WHERE `%s` IS NOT NULL; """ % (var_name))
    try:
        cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        distinct_years = cursor.fetchall()
        cursor.close()

        # error handling
    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        output = []
        for (x,) in distinct_years:
            output.append(x)
        return output


def retrieve_complete_col_years():
    ''' this function returns a list of list with all the unique variables in kreise and the years which are not
    null in this list. HOWEVER, the function is incredibly slow. Perhaps it should go into setup.py and be run once
    at the beginning of creating the database'''
    data_base = pymysql.connect('bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com', 'admin', 'NPmpMe!696rY', "mydb")
    # data_base = pymysql.connect("localhost", "user", "password", "mydb")
    cursor = data_base.cursor()
    # cursor = connections['default'].cursor()
    ## this returns a list of all the column names we want
    result = []
    col_names = retrieve_col_names('kreise')

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

def dictfetchall(cursor):
    "Returns all rows from a cursor as a dict"
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]

def retrieve_metadata():
    ''' this function returns the entire set of metadata available as a ..... '''
    cursor = connections['default'].cursor()
    result = []

    sql_select_Query = (""" SELECT * FROM `metadata`; """)
    cursor.execute(sql_select_Query)
    result = dictfetchall(cursor)
    cursor.close()

    target_dict = {}
    for x in result:
        for y in x:
            if y == 'databasename':
                target_dict[x[y]] = x
    return target_dict


def insert_all_years_into_db():
    # retrieve all the data that we have for th respective variables from kreise
    data = retrieve_complete_col_years()
    print(data)
    table_name = "all_years"
    data_base = pymysql.connect('bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com', 'admin', 'NPmpMe!696rY', "mydb")
    # data_base = pymysql.connect("localhost", "user", "password", "mydb")
    cursor = data_base.cursor()
    # cursor = connections['default'].cursor()

    #create the empty table
    cursor.execute("DROP TABLE IF EXISTS `%s`" % (table_name))


    sql = ("CREATE TABLE `%s` (DATABASENAME VARCHAR(70) NOT NULL);" % (table_name))
    cursor.execute(sql)

    ## add all the columns
    ## retrieve list of all the required columns
    col_years = retrieve_col_years("kreise")

    ## and drop them into the database as columns
    for x in col_years:
        sql = (""" ALTER TABLE `%s`
                   ADD COLUMN `%s` VARCHAR(20)  """ % (table_name, x))
        cursor.execute(sql)

    ## create the col_name statement: (name, col_1, col_2): we already have that
    for x in data:
        col_value_statement = tuple(x)
        col_name_statement = x
        col_name_statement[0] = "DATABASENAME"
        counter = 0
        for y in col_name_statement:
            col_name_statement[counter] = (""" `%s` """ % (y))
            counter +=1

     # convert list into string
        col_name_statement = ', '.join(map(str, col_name_statement))

        ## now insert all of these into mysql table:
        sql = (""" INSERT INTO `%s`
                    (%s)
                    VALUES %s; """ % (table_name, col_name_statement, col_value_statement))
        print(sql)
        cursor.execute(sql)

    data_base.commit()
    cursor.close()
    return print("Alle Werte in Datenbank geschrieben. Prozess erfolgreich abgeschlossen.")

def retrieve_year_dict_from_db():

    filtered_dict = {}
    sql_select_Query = (""" SELECT * FROM `all_years` """)
    try:
        cursor = connections['default'].cursor()
        cursor.execute(sql_select_Query)
        output = cursor.fetchall()
        cursor.close()



    # error handling
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

        ## now convert into dictionary:
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




def retrieve_names_from_db(layer):
    cursor = connections['default'].cursor()

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
