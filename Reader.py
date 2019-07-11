from data import Data

# amrData = Data('test3.csv')
kreiseData = Data('kreise.csv')
# functions for Bruttoverdienst


def bruttoverdienst(year, amr15):
    # returns the bruttoverdienst from the amr15 region and year.
    # year: 2000 - 2015
    # amr15: 1 - 258
    spot = year - 1990
    amr = amr15 - 1
    result = amrData.data[amr][1] + ': ' + amrData.data[amr][spot]
    return result


# functions for arbeitslosenquote

def arbeitslosenquote(year, amr15):
    # returns the arbeitslosenquote from the amr15 region and year.
    # year: 1998 - 2015
    # amr15: 1 - 258
    year = year - 1972
    amr = amr15 - 1
    return amrData.data[amr][year]


# Erwerbspersonen

def erwerbspersonen(year, amr15):
    # returns the aggregated Erwerbspersonen of the amr15 region and year.
    # year: XXX - XXX
    # amr15: 1 - 258
    amr = amr15 - 1
    year30 = 5
    year45 = 5
    year65 = 5
    return amrData.data[amr][year30] + amrData.data[amr][year45] + amrData.data[amr][year65]



# print(len(amrData.data))
# for x in range(1, len(amrData.data) + 1):
#     print(arbeitslosenquote(2000, x))
#
# print('\n')
# for x in range(1, len(amrData.data) + 1):
#     print(x)
#     print(bruttoverdienst(2002, x))
print(kreiseData.labels)
print(kreiseData.data[0])
print(len(kreiseData.data))
print(kreiseData.get(12,'Bruttoverdienst 2005'))
