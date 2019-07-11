from data.data import Data

# amrData = Data('test_dummy.csv')
def main():
    kreise_data = Data('./resources/kreise.csv')
    print(kreise_data.labels)
    print(kreise_data.data[0])
    print(len(kreise_data.data))
    print(kreise_data.get(12, 'Bruttoverdfdienst 2005'))

main()
# functions for Bruttoverdienst

#
# def bruttoverdienst(year, amr15):
#     # returns the bruttoverdienst from the amr15 region and year.
#     # year: 2000 - 2015
#     # amr15: 1 - 258
#     spot = year - 1990
#     amr = amr15 - 1
#     result = amrData.data[amr][1] + ': ' + amrData.data[amr][spot]
#     return result
#
#
# # functions for arbeitslosenquote
#
# def arbeitslosenquote(year, amr15):
#     # returns the arbeitslosenquote from the amr15 region and year.
#     # year: 1998 - 2015
#     # amr15: 1 - 258
#     year = year - 1972
#     amr = amr15 - 1
#     return amrData.data[amr][year]
#
#
# # Erwerbspersonen
#
# def erwerbspersonen(year, amr15):
#     # returns the aggregated Erwerbspersonen of the amr15 region and year.
#     # year: XXX - XXX
#     # amr15: 1 - 258
#     amr = amr15 - 1
#     year30 = 5 - year
#     year45 = 5
#     year65 = 5
#     return amrData.data[amr][year30] + amrData.data[amr][year45] + amrData.data[amr][year65]



# print(len(amrData.data))
# for x in range(1, len(amrData.data) + 1):
#     print(arbeitslosenquote(2000, x))
#
# print('\n')
# for x in range(1, len(amrData.data) + 1):
#     print(x)
#     print(bruttoverdienst(2002, x))

