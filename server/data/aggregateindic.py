
from .retrieve_db_data import retrieve_sd_data


def aggregate_args (*args):
    """ this function groups a dynamic number of args into a list of args and returns this list """
    var = []
    for arg in args:
        var.append(arg)
    return var


def build_indicator (var):
    '''
     this function takes in a list of lists in which each list has len = 6 and contains all the required arguments to
     return one standardised indicator at a given layer, as well as the desired weight. The layer has to be the same
     for all indicators put in.
    :param var:
    :return: The function returns a list of the target layer ref code, as well as the aggregated indicator
    '''
    list = []
    for i in range(0, len(var)):
        list.append(retrieve_sd_data(var[i][0], var[i][1], var[i][2], var[i][3], var[i][4], var[i][5]))
    print (list)
    result = []
    var_name = []

    ## the following code copies the layer IDs as the first column into the results list
    for (j,k) in list[0]:
        var_name.append(j)
    result.append(var_name)
    # print (result)

    ### the following code creates the multiplications of each of the variables and stores them in a list of list
    interim = []
    for i in range (0, len(list)):
        multiplication = []
        for (k,l) in list[i]:
             multiplication.append(l*var[i][6])
        interim.append(multiplication)
    # print(interim)
    ### the following code then sums all the individual items and returns one list
    interim = [sum(i) for i in zip(*interim)]

    ### the following code then appends the calcualtions to the interim template
    result.append(interim)

    return result


#### test the code like this

var_name1 = "Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200"
var_year1 = "2009-12"
ref_name1 = "Erwerbspersonen gesamt_100"
ref_year1 = "2011"
layer1 = "AMR_12"
scale1 = "LIB"
weight1 = 0.45

var_name2 = "Infrastrukturindikator_ORIGINAL_200"
var_year2 = "2012   "
ref_name2 = "Erwerbstätige gesamt_100"
ref_year2 = "2012"
layer2 = "AMR_12"
scale2 = "HIB"
weight2 = 0.075

var_name3 = "Erwerbstätigenprognose _ORIGINAL_200"
var_year3 = "2011-18"
ref_name3 = "Erwerbstätige gesamt_100"
ref_year3 = "2012"
layer3 = "AMR_12"
scale3 = "HIB"
weight3 = 0.075

var_name4 = "Lohn pro Beschäftigtem 2010 _ORIGINAL_200"
var_year4 = "2010"
ref_name4 = "Erwerbstätige gesamt_100"
ref_year4 = "2011"
layer4 = "AMR_12"
scale4 = "HIB"
weight4 = 0.4

arg1 = [var_name1, var_year1, ref_name1, ref_year1, layer1, scale1, weight1]
arg2 = [var_name2, var_year2, ref_name2, ref_year2, layer2, scale2, weight2]
arg3 = [var_name3, var_year3, ref_name3, ref_year3, layer3, scale3, weight3]
arg4 = [var_name4, var_year4, ref_name4, ref_year4, layer4, scale4, weight4]



var = aggregate_args(arg1, arg2, arg3, arg4)

list = build_indicator(var)

