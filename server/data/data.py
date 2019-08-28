'''This module contains all the functionality to read in and process the data.
'''
import csv
import os
import re


class Data:
    '''This class reads in a data file and converts it to a 2d array
     and contains an dictionary with the labels '''
    def __init__(self, filename):
        self.filename = filename
        self.labels = []
        self.only_labels = []
        self.years = []
        self.data = self.__reader(filename)
        self.sql_data = []
        assert self.data, "data set is empty"
        print(self.labels)
        print(len(self.labels))
        print(len(self.data[0]))
        assert (len(self.labels) == len(self.data[0])), "Labels do not match the data"

    def __reader(self, filename):
        '''reads in a file and returns an array'''
        assert os.path.isfile(filename), "file not found" + filename
        try:
            file = open(filename, 'r', encoding='utf-8')
        except FileNotFoundError:
            print('File not found')
            return []
        data = []

        counter = 0
        for row in csv.reader(file):
            if counter < 7:
                counter = counter + 1
                continue
            if self.__matchamr(row):
                data.append(row)
            else:
                self.labels.append(row)
        self.__cleanlabels()
        file.close()
        return data

    @staticmethod
    def __matchamr(array):
        '''returns object if the array is starting with an number.'''
        return re.search(r'^\d', array[0])

    def __cleanlabels(self):
        '''cleans the labels'''
        cleanlabels = []
        for index_1 in range(0, len(self.labels)):
            for index_2 in range(0, len(self.labels[index_1])):
                if self.labels[index_1][index_2] != '' \
                        and re.search(r'^\D', self.labels[index_1][index_2]):
                    if index_1 == 0:
                        cleanlabels.append((self.labels[index_1][index_2].rstrip()
                                            + ' ' + self.labels[index_1+1][index_2], index_2))
                        self.years.append(self.labels[index_1+1][index_2])

                        if index_2 > 2:
                            self.only_labels.append(self.labels[index_1][index_2].rstrip())
                    else:
                        cleanlabels.append((self.labels[index_1][index_2], index_2))
                        self.only_labels.append(self.labels[index_1][index_2])
        self.labels = dict(cleanlabels)

    def __findposition(self, label):
        """
        returns the position in the data of the input label
        :param label:
        :return:
        """
        try:
            return self.labels[label]
        except KeyError:
            print('Label not found')
            raise

    def get(self, area, label):
        '''This method returns the value asked for the are and label'''
        if label in self.labels:
            index = self.__findposition(label)
            area = area
            return self.data[area][index]
        return 'Label not found'

    def unique_years(self):
        '''this method returns only the unique years of the data'''
        year_set = set(self.years)
        year_set.discard('')
        return sorted(list(year_set))

    def unique_labels(self):
        '''this method returns only the unique lables of the data'''
        label_set = set(self.only_labels)

        return list(label_set)

    def convert_to_array_sql(self):
        '''this method converts the whole data set to be ready for the DB'''
        for year in self.unique_years():

            for row in self.data:
                sql_row = []
                for index in range(0, 3):
                    sql_row.append(row[index])
                sql_row.append(year)
                for label in self.unique_labels():
                    label_year = label + " " + year
                    if label_year in self.labels:
                        position = self.__findposition(label_year)
                        sql_row.append(row[position])

                    else:
                        sql_row.append(None)
                self.sql_data.append(sql_row)
