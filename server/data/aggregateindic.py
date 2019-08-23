import pandas as pd
import time

from server.data.retrieve_db_data import retrieve_db_data
from pymysqlpool.pool import Pool
import pymysql

class aggregateindic:
    def __init__(self, pool):
        self.pool = pool

    def aggregate_args(self, ajax_dictionary):
        """ this function groups a dynamic number of args into a list of args and returns this list """
        var = []
        for x in ajax_dictionary.values():
            check = 0
            for y in x:
                if y == "":
                    check += 1
            if check == 0:
                var.append(x)
                                # print("not all required values provided - omit")

        return var


    def retrieve_indicator(self, ajax_dictionary):
        '''
        THIS FUNCTION THAT THE AJAX DICTIONANARY AS AN INPUT
         this function takes in the dictionary that is returned from ajax (6 entries with 7 variables in order each.
         The function then checks all the dict entries for comprehensiveness. If they include all required values,
         the database is searched and the correct value returned
        :param var: dictionary with (var1: [var_name, var_year, ref_name, ref_year, layer, scale, weight], var_2: [...] etc)
        :return: The function returns a list of the target layer ref code, as well as the aggregated indicator
        '''

        start_time = time.clock()
        # this code scans the dictionary to ensure only complete entries are being searched for in the db
        var = []
        var = self.aggregate_args(ajax_dictionary)
        print(var)
        empty_return = [[]]

        result = []
        if var == []:
            return empty_return

        else:
            # this code returns the database array from all valid entries and stores them in a list
            list = []
            for i in range(0, len(var)):
                list.append(retrieve_db_data(self.pool).retrieve_sd_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4], var[i][5]))
            # print (list)
            var_name = []

            ## the following code copies the layer IDs as the first column into the results list
            for (j, k) in list[0]:
                var_name.append(j)
            result.append(var_name)
            # print (result)

            ### the following code creates the multiplications of each of the variables and stores them in a list of list
            interim = []
            for i in range(0, len(list)):
                multiplication = []
                for (k, l) in list[i]:
                    multiplication.append(float(l) * (float(var[i][6])/100))
                interim.append(multiplication)
            # print(interim)
            ### the following code then sums all the individual items and returns one list
            interim = [sum(i) for i in zip(*interim)]

            ### the following code then appends the calcualtions to the interim template
            result.append(interim)

            print(time.clock() - start_time, "seconds")
            return result


    def retrieve_table_data(self, ajax_dictionary):
        ''' THIS FUNCTION THAT AN AJAX DICTIONNARY AS AN INPUT
        it returns a list of lists of the format output = [[ID1,var1, var2.],[ID2, var1, var2...],[etc
        this can be used to poplate the table
        '''

        start_time = time.clock()
        empty_return = [[]]

        # this code scans the dictionary to ensure only complete entries are being searched for in the db
        var = []
        var = self.aggregate_args(ajax_dictionary)
        print (var)

        # this checks whether the aggreagted indicator comes back empty - if it does no valid
        # combination has been submitted, just return empty list
        if var == []:
            return empty_return
        else:
            ## this code returns the aggregated indicator from the database
            aggregated_indicator = self.retrieve_indicator(ajax_dictionary)
            aggregated_indicator = aggregated_indicator[1]
            # print(aggregated_indicator)


            # this code returns the database array from all valid entries and stores them in a list
            list = []
            dictionary_keys = []
            dictionary_keys.append("Kennziffer")
            for i in range(0, len(var)):
                list.append(retrieve_db_data(self.pool).retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))
                dictionary_keys.append(var[i][0] + " " + var[i][1])
            # print(list)
            result = []
            var_name = []
            # print (dictionary_keys)
            loop_time = time.clock()
            ## the following code copies the layer IDs as the first column into the results list
            for (j, k) in list[0]:
                var_name.append([j])
            result = var_name
            # print (result)

            ## the following converts all of this into a list of lists in the right format
            for x in list:
                count = 0
                for (j, k) in x:
                    result[count].append(k)
                    count += 1

            # the following converts this into a list of dicts
            target_dict = []
            aggreg_count = 0
            for x in result:
                count = 0
                temp_dict = {}
                for y in x:
                    if isinstance(y, str):
                        temp_dict[dictionary_keys[count]] = y
                    else:
                        temp_dict[dictionary_keys[count]] = round(float(y), 2)

                    count += 1
                ### the following lines of code add the value from the aggreagted indicator
                temp_dict["aggregierter Indikator"] = round(float(aggregated_indicator[aggreg_count]), 2)
                aggreg_count += 1
                ## and finally, the following lines of code append the dict to the summary list output
                target_dict.append(temp_dict)

            ## this retrieves the names for the chosen layer and adds them as a dictionary key/value pair into the output dictionary
            names = retrieve_db_data(self.pool).retrieve_names_from_db(var[0][4])
            for x in target_dict:
                for y in names:
                    if x['Kennziffer'] == y[1]:
                         x.update({'Name': y[0]})


            # print(time.clock()- loop_time, "seconds for the loop")
            # print(target_dict)
            print(time.clock() - start_time, "seconds for retrieving table data")
            # print(target_dict)
            return target_dict

    def retrieve_var_year (self, ajax_dictionary):
        chosen_indicators = []
        for k,v in ajax_dictionary.items():
            chosen_indicators.append(v[0])

        dict_keys = ["var_year_0", "var_year_1", "var_year_2", "var_year_3", "var_year_4", "var_year_5"]
        dictionary = {}

        output = {"var_year_0"}
        counter = 0
        for x in chosen_indicators:
            if x != '':
                # print (x)
                dictionary[dict_keys[counter]] = retrieve_db_data(self.pool).retrieve_distinct_years(x)
                counter += 1

            else:
                dictionary[dict_keys[counter]] = []
                counter += 1


        return dictionary


    def retrieve_single_indic(self, ajax_dictionary):
        start_time = time.clock()
        # this code scans the dictionary to ensure only complete entries are being searched for in the db
        var = []
        var = self.aggregate_args(ajax_dictionary)
        empty_return = [[]]

        result = []
        if var == []:
            return empty_return

        else:
            # this code returns the database array from all valid entries and stores them in a list
            list = []
            for i in range(0, 1):
                list.append(retrieve_db_data(self.pool).retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))
            # print (list)
            # print (len(list))
            ## the following code copies the layer IDs as the first column into the results list
            var_name = []
            for (j, k) in list[0]:
                var_name.append(j)
            result.append(var_name)

            indicator = []
            for (j, k) in list[0]:
                indicator.append(k)
            result.append(indicator)

            print(time.clock() - start_time, "seconds")
            return result

#### test the code like that
#
# test_dict = {'var_1': ['Arbeitslosenquote_100', '2015', 'Erwerbstätige gesamt_100', '2011', 'KRS_15', '"HIB', 0.05],
#              'var_2': ['Bruttoinlandsprodukt je Erwerbstätigen_100', '2014', 'Erwerbstätige gesamt_100', '2011', 'KRS_15', 'HIB', 0.05],
#              'var_3': ['', '1990', '0', '2011', 'KRS_15', 'HIB', ''],
#              'var_4': ['', '', '', '', 'KRS_15', 'HIB', ''],
#              'var_5': ['', '', '', '', 'KRS_15', 'HIB', ''],
#              'var_6': ['', '', '', '', 'KRS_15', 'HIB', '']}
#
#
#
# pool = Pool(host='bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com',
#             db='mydb',
#             user='admin',
#             password='NPmpMe!696rY',
#             cursorclass=pymysql.cursors.Cursor, timeout=20.0)
#
#
#
#
# # #
# test = aggregateindic(pool).retrieve_table_data(test_dict)
# print(test)
#
# # # print(test)
#
# # print(len(test[3]))
#
# # test = retrieve_var_year(test_dict)
# # print (test)
#
#
# def retrieve_pca(ajax_dictionary):
#     '''
#     THIS FUNCTION THAT THE AJAX DICTIONANARY AS AN INPUT
#      this function takes in the dictionary that is returned from ajax (6 entries with 7 variables in order each.
#      The function then checks all the dict entries for comprehensiveness. If they include all required values,
#      the database is searched and the correct value returned
#     :param var: dictionary with (var1: [var_name, var_year, ref_name, ref_year, layer, scale, weight], var_2: [...] etc)
#     :return: The function returns a list of the target layer ref code, as well as the aggregated indicator
#     '''
#
#     # this code scans the dictionary to ensure only complete entries are being searched for in the db
#     var = []
#     var = aggregate_args(ajax_dictionary)
#     empty_return = [[]]
#
#     result = []
#     if var == []:
#         return empty_return
#
#     else:
#         # this code returns the database array from all valid entries and stores them in a list (of tuples)
#         list = []
#         for i in range(0, len(var)):
#             list.append(retrieve_sd_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4], var[i][5]))
#         # print (list)
#         var_name = []
#
#         ## the following code copies the layer IDs as the first column into the results list
#         for (j, k) in list[0]:
#             var_name.append(j)
#         result.append(var_name)
#         # print (result)
#
#         print (list)
#
#
#     return result
#
#
# test = retrieve_pca(test_dict)
# print(test)
#





















############## GARBAGE CODE - NO LONGER NEEDED


#### test the code like this
#
# var_name1 = "Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200"
# var_year1 = "2009-12"
# ref_name1 = "Erwerbspersonen gesamt_100"
# ref_year1 = "2011"
# layer1 = "AMR_12"
# scale1 = "LIB"
# weight1 = 0.45
#
# var_name2 = "Infrastrukturindikator_ORIGINAL_200"
# var_year2 = "2012   "
# ref_name2 = "Erwerbstätige gesamt_100"
# ref_year2 = "2012"
# layer2 = "AMR_12"
# scale2 = "HIB"
# weight2 = 0.075
#
# var_name3 = "Erwerbstätigenprognose _ORIGINAL_200"
# var_year3 = "2011-18"
# ref_name3 = "Erwerbstätige gesamt_100"
# ref_year3 = "2012"
# layer3 = "AMR_12"
# scale3 = "HIB"
# weight3 = 0.075
#
# var_name4 = "Lohn pro Beschäftigtem 2010 _ORIGINAL_200"
# var_year4 = "2010"
# ref_name4 = "Erwerbstätige gesamt_100"
# ref_year4 = "2011"
# layer4 = "AMR_12"
# scale4 = "HIB"
# weight4 = 0.4
#
# arg1 = [var_name1, var_year1, ref_name1, ref_year1, layer1, scale1, weight1]
# arg2 = [var_name2, var_year2, ref_name2, ref_year2, layer2, scale2, weight2]
# arg3 = [var_name3, var_year3, ref_name3, ref_year3, layer3, scale3, weight3]
# arg4 = [var_name4, var_year4, ref_name4, ref_year4, layer4, scale4, weight4]
#
#
#
# var = aggregate_args(arg1, arg2, arg3, arg4)
#
# list = build_indicator(var)


#### THIS IS THE OLD FUNCTION TO RETRUN TABLE DATA THAT RETURNS A LIST OF LISTS RATHER THAN A DICT LIST AS AN OUTPUT
#
# def retrieve_table_data (ajax_dictionary):
#     ''' THIS FUNCTION THAT AN AJAX DICTIONNARY AS AN INPUT
#     it returns a list of lists of the format output = [[ID1,var1, var2.],[ID2, var1, var2...],[etc
#     this can be used to poplate the table
#     '''
#     # this code scans the dictionary to ensure only complete entries are being searched for in the db
#     var = []
#     var = aggregate_args(ajax_dictionary)
#
#     # this code returns the database array from all valid entries and stores them in a list
#     list = []
#     for i in range(0, len(var)):
#         list.append(retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))
#     # print(list)
#     result = []
#     var_name = []
#
#     ## the following code copies the layer IDs as the first column into the results list
#     for (j, k) in list[0]:
#         var_name.append([j])
#     result = var_name
#     # print (result)
#
#     for x in list:
#         count = 0
#         for (j,k) in x:
#             result[count].append(k)
#             count +=1
#     # print(data)
#
#     return result


## THIS IS THE WORKING VERSION; NOW TRYING TO ADD THE AGGREGATED INDICATOR TO THIS


# def retrieve_table_data(ajax_dictionary):
#     ''' THIS FUNCTION THAT AN AJAX DICTIONNARY AS AN INPUT
#     it returns a list of lists of the format output = [[ID1,var1, var2.],[ID2, var1, var2...],[etc
#     this can be used to poplate the table
#     '''
#     # this code scans the dictionary to ensure only complete entries are being searched for in the db
#     var = []
#     var = aggregate_args(ajax_dictionary)
#
#     # this code returns the database array from all valid entries and stores them in a list
#     list = []
#     dictionary_keys = []
#     dictionary_keys.append("Kennziffer")
#     for i in range(0, len(var)):
#         list.append(retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))
#         dictionary_keys.append(var[i][0] + " " + var[i][1])
#     # print(list)
#     result = []
#     var_name = []
#     print (dictionary_keys)
#
#
#     ## the following code copies the layer IDs as the first column into the results list
#     for (j, k) in list[0]:
#         var_name.append([j])
#     result = var_name
#     # print (result)
#
#     ## the following converts all of this into a list of lists in the right format
#     for x in list:
#         count = 0
#         for (j,k) in x:
#             result[count].append(k)
#             count +=1
#
#     # the following converts this into a list of dicts
#     target_dict = []
#     for x in result:
#         count = 0
#         temp_dict = {}
#         for y in x:
#             temp_dict[dictionary_keys[count]] = y
#             count +=1
#         target_dict.append(temp_dict)
#
#     return target_dict
