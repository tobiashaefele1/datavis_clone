import math
import pandas as pd
import time

from server.data.retrieve_db_data import retrieve_sd_data, retrieve_data, retrieve_names_from_db, \
    retrieve_distinct_years, retrieve_fed_avg, retrieve_ref_share, scale_HIB, scale_NIB
import pymysql


def aggregate_args( ajax_dictionary):
    """ this function groups a dynamic number of args into a list of args and returns this list """
    var = []
    for x in ajax_dictionary.values():
        check = 0
        for y in x:
            if y == "":
                check += 1
        if check == 0:
            var.append(x)
    return var


def retrieve_indicator( ajax_dictionary):
    '''
    THIS FUNCTION THAT THE AJAX DICTIONANARY AS AN INPUT
     this function takes in the dictionary that is returned from ajax (6 entries with 7 variables in order each.
     The function then checks all the dict entries for comprehensiveness. If they include all required values,
     the database is searched and the correct value returned
    :param var: dictionary with (var1: [var_name, var_year, ref_name, ref_year, layer, scale, weight], var_2: [...] etc)
    :return: The function returns a list of the target layer ref code, as well as the aggregated indicator
    '''
    # this code scans the dictionary to ensure only complete entries are being searched for in the db
    var = []
    var = aggregate_args(ajax_dictionary)
    empty_return = [[]]

    result = []
    if var == []:
        return empty_return

    else:
        # this code returns the database array from all valid entries and stores them in a list
        list = []
        for i in range(0, len(var)):
            list.append(retrieve_sd_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4], var[i][5]))
        var_name = []

        ## the following code copies the layer IDs as the first column into the results list
        for (j, k) in list[0]:
            var_name.append(j)
        result.append(var_name)

        ### the following code creates the multiplications of each of the variables and stores them in a list of list
        interim = []
        for i in range(0, len(list)):
            multiplication = []
            for (k, l) in list[i]:
                multiplication.append(float(l) * (float(var[i][6])/100))
            interim.append(multiplication)
        ### the following code then sums all the individual items and returns one list
        interim = [sum(i) for i in zip(*interim)]

        ### the following code then appends the calcualtions to the interim template
        result.append(interim)
        return result


def retrieve_table_data(ajax_dictionary):
    ''' THIS FUNCTION THAT AN AJAX DICTIONNARY AS AN INPUT
    it returns a list of lists of the format output = [[ID1,var1, var2.],[ID2, var1, var2...],[etc
    this can be used to poplate the table
    '''
    start_time = time.clock()
    empty_return = [[]]

    # this code scans the dictionary to ensure only complete entries are being searched for in the db
    var = []
    var = aggregate_args(ajax_dictionary)

    # this checks whether the aggreagted indicator comes back empty - if it does no valid
    # combination has been submitted, just return empty list
    if var == []:
        return empty_return
    else:
        ## this code returns the aggregated indicator from the database
        aggregated_indicator = retrieve_indicator(ajax_dictionary)
        aggregated_indicator = aggregated_indicator[1]

        # this code returns the database array from all valid entries and stores them in a list
        list = []
        dictionary_keys = []
        dictionary_keys.append("Kennziffer")
        for i in range(0, len(var)):
            list.append(retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))
            dictionary_keys.append(var[i][0] + " " + var[i][1])
        result = []
        var_name = []
        ## the following code copies the layer IDs as the first column into the results list
        for (j, k) in list[0]:
            var_name.append([j])
        result = var_name

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
        names = retrieve_names_from_db(var[0][4])
        for x in target_dict:
            for y in names:
                if x['Kennziffer'] == y[1]:
                     x.update({'Name': y[0]})
        return target_dict

def retrieve_var_year (ajax_dictionary):
    chosen_indicators = []
    for k,v in ajax_dictionary.items():
        chosen_indicators.append(v[0])

    dict_keys = ["var_year_0", "var_year_1", "var_year_2", "var_year_3", "var_year_4", "var_year_5"]
    dictionary = {}
    counter = 0
    for x in chosen_indicators:
        if x != '':
            dictionary[dict_keys[counter]] = retrieve_distinct_years(x)
            counter += 1
        else:
            dictionary[dict_keys[counter]] = []
            counter += 1
    return dictionary


def retrieve_single_indic(ajax_dictionary):
    # this code scans the dictionary to ensure only complete entries are being searched for in the db
    var = []
    var = aggregate_args(ajax_dictionary)
    empty_return = [[]]

    result = []
    if var == []:
        return empty_return

    else:
        # this code returns the database array from all valid entries and stores them in a list
        list = []
        for i in range(0, 1):
            list.append(retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))
        ## the following code copies the layer IDs as the first column into the results list
        var_name = []
        for (j, k) in list[0]:
            var_name.append(j)
        result.append(var_name)

        indicator = []
        for (j, k) in list[0]:
            indicator.append(k)
        result.append(indicator)
        return result

def retrieve_everything(ajax_dictionary):
    # this code scans the dictionary to ensure only complete entries are being searched for in the db
    var = []
    var = aggregate_args(ajax_dictionary)

    ## define empty return conditions and return them
    empty_return = {'indicator_data': [[]], 'table_data': [[]],
            'single_indic_data': [[]]}

    if var == []:
        return empty_return

    else:

        ### retrieve all unstandardised data:
        raw_data = []
        for i in range(0, len(var)):
            raw_data.append(retrieve_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))

        ### standardise all these data points and store them in new variables
        ### retrieve all ref shares:
        ref_share = []
        for i in range (0, len(var)):
            ref_share.append(retrieve_ref_share(var[i][2], var[i][3], var[i][4]))
        print(ref_share)

        ### retrieve all federal averages
        fed_avg = []
        for i in range (0, len(var)):
            fed_avg.append(retrieve_fed_avg(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4]))

        ### calculate the standard deviation:
        sd = []
        counter = 0
        for x in raw_data:
            print (x)
            print(raw_data)
            Standard_deviation = 0
            for g in range(0, len(x)):
                Standard_deviation += (((float(x[g][1])) - (float(fed_avg[counter]))) ** 2) * float((ref_share[counter][g]))
            counter += 1
            Standard_deviation = math.sqrt(Standard_deviation / len(x))
            sd.append(Standard_deviation)

        ## calulate the standardised data
        standardised_data = []
        for i in range (0, len(raw_data)):
            if var[i][5] == "HIB":
                single_sd = scale_HIB(raw_data[i], fed_avg[i], sd[i])
                standardised_data.append(single_sd)
            else:
                single_sd = scale_NIB(raw_data[i], fed_avg[i], sd[i])
                standardised_data.append(single_sd)

         ## calculate the aggregated indicator
        var_name = []
        aggregated_indicator = []

        ## the following code copies the layer IDs as the first column into the results list
        for (j, k) in standardised_data[0]:
            var_name.append(j)
        aggregated_indicator.append(var_name)

        ### the following code creates the multiplications of each of the variables and stores them in a list of list
        interim = []
        for i in range(0, len(standardised_data)):
            multiplication = []
            for (k, l) in standardised_data[i]:
                multiplication.append(float(l) * (float(var[i][6]) / 100))
            interim.append(multiplication)
        # print(interim)
        ### the following code then sums all the individual items and returns one list
        interim = [sum(i) for i in zip(*interim)]

        ### the following code then appends the calcualtions to the interim template
        aggregated_indicator.append(interim)

    ### build your outputs

        # this is what I return
        single_indic_data = list(zip(*raw_data[0]))
        single_indic_data = [list(item) for item in single_indic_data]
        indicator_data = aggregated_indicator

        #### create the table_data output:
        table_data = []
        ## create a list of all the dictionary keys
        dictionary_keys = []
        dictionary_keys.append("Kennziffer")
        for i in range(0, len(var)):
            dictionary_keys.append(var[i][0] + " " + var[i][1])

        ## the following code copies the layer IDs as the first column into the results list
        table_data_prep = []
        var_name = []
        for (j, k) in raw_data[0]:
            var_name.append([j])
        table_data_prep = var_name

        ## the following converts all of this into a list of lists in the right format
        for x in raw_data:
            count = 0
            for (j, k) in x:
                table_data_prep[count].append(k)
                count += 1

        # the following converts this into a list of dicts
        table_data = []
        aggreg_count = 0
        for x in table_data_prep:
            count = 0
            temp_dict = {}
            for y in x:
                if isinstance(y, str):
                    temp_dict[dictionary_keys[count]] = y
                else:
                    temp_dict[dictionary_keys[count]] = round(float(y), 2)

                count += 1
            ### the following lines of code add the value from the aggreagted indicator
            temp_dict["aggregierter Indikator"] = round(float(aggregated_indicator[1][aggreg_count]), 2)
            aggreg_count += 1
            ## and finally, the following lines of code append the dict to the summary list output
            table_data.append(temp_dict)

        ## this retrieves the names for the chosen layer and adds them as a dictionary key/value pair into the output dictionary
        names = retrieve_names_from_db(var[0][4])
        for x in table_data:
            for y in names:
                if x['Kennziffer'] == y[1]:
                    x.update({'Name': y[0]})
        function_return ={'indicator_data': indicator_data, 'table_data': table_data,
            'single_indic_data': single_indic_data}
        return function_return


