import csv
import re


class Data:

    def __init__(self, filename):
        self.filename = filename
        self.labels = []
        self.data = self.__reader(filename)
        assert (len(self.data) > 0), "data set is empty"
        assert (len(self.labels) == len(self.data[0])), "Labels do not match the data"

    def __reader(self, filename):
        # reads in a file and returns an array.
        try:
            file = open(filename, 'r')
        except FileNotFoundError:
            print('File not found')
            return []
        data = []

        for row in csv.reader(file):

            if self.__matchamr(row):
                # print(row)
                data.append(row)
            else:
                # print(row)
                self.labels.append(row)
        self.__cleanlabels()

        return data

    def __matchamr(self, array):
        # returns object if the array is starting with an AMR15_no.
        return re.search('^\d', array[0])

    def __cleanlabels(self):
        # cleans the labels
        cleanlabels = []
        for x in range(3, len(self.labels)):
            for y in range(0, len(self.labels[x])):
                if self.labels[x][y] != '' and re.search('^\D', self.labels[x][y]):
                    if x == 3:
                        cleanlabels.append((self.labels[x][y].rstrip() + ' ' + self.labels[x+1][y], y))
                    else:
                        cleanlabels.append((self.labels[x][y], y))
        self.labels = dict(cleanlabels)

    def __findposition(self, label):
        # returns the position in the data of the input label
        try:
            return self.labels[label]
        except KeyError:
            print('Label is not found')
            return

    def get(self, area, label):
        index = self.__findposition(label)
        return self.data[area][index]
