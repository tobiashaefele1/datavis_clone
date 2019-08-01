'''This is the module to convert AMR12 data into Kreise, to load into the database'''

import os
import pymysql

from sqlalchemy import create_engine
import pandas as pd

from .data import Data


def loadmappingfile (link_to_mapping_file):
    ''' loads in the mapping file as a pandas data frame''' 
    mapping_file = pd.read_csv(link_to_mapping_file, dtype=str)
    return mapping_file

def prepare402template (link_to_template_input):
    ''' this function returns a Data object that has 402 KReise stored in the first three rows and is otherwise empty - no labels or data '''

     # create "clean" template from Kreise data as Data object and delete all data from this sheet:

    clean_KRS_template = Data(link_to_template_input)
    for i in range(0, len(clean_KRS_template.data)):
        clean_KRS_template.data[i][0:] = clean_KRS_template.data[i][0:3]
   # delete all labels, only labels and years from our Kreise template sheet
    clean_KRS_template.labels.clear()
    clean_KRS_template.only_labels.clear()
    clean_KRS_template.years.clear()
    return clean_KRS_template

def copy_labels_years_onlylabels (dataset, template):
    template.labels = dataset.labels
    template.years = dataset.years
    template.only_labels = dataset.only_labels
    return template


def readin257AMR (link_to_data, link_to_mapping_file, link_to_template_input):
     ''' this formula takes in a link to a file with 257 AMRs, and converts it to a Data object, based on 402 KReise'''
     # load in mapping file & template
     mapping_file = loadmappingfile(link_to_mapping_file)
     template = prepare402template (link_to_template_input)

     # read in AMR data as a Datafile
     dataset = Data(link_to_data)

     # create output file and populate it with Kreise from template and labels, years and only_labels from input dataset
     output = copy_labels_years_onlylabels(dataset, template)
    
     # map values from AMR to Kreise and return completed dataobject
     for i in range(0,len(output.data)):
          for j in range(0, len(mapping_file.index)):
               # print(output.data[i][0])
               # print (mapping_file.iloc[j][0])
               if output.data[i][0] == mapping_file.iloc[j][0]:
                    index = (int(mapping_file.iloc[j][6]))-1
                    # print(index)
                    extension = dataset.data[index][3:]
                    # print (extension)
                    output.data[i].extend(extension)
                    # print (AMR12_data_converted.data[i][0:4])
     return output

def readin258AMR (link_to_data, link_to_mapping_file, link_to_template_input):
     ''' this formula takes in a link to a file with 258 AMRs, and converts it to a Data object, based on 402 KReise'''
     # load in mapping file & template
     mapping_file = loadmappingfile(link_to_mapping_file)
     template = prepare402template (link_to_template_input)

     # read in AMR data as a datafile
     dataset = Data(link_to_data)
     
     # create output file and populate it with Kreise from template and labels, years and only_labels from input dataset
     output = copy_labels_years_onlylabels(dataset, template)

     # map values from AMR to Kreise and return completed dataobject
     for i in range(0,len(output.data)):
          for j in range(0, len(mapping_file.index)):
               # print(output.data[i][0])
               # print (mapping_file.iloc[j][0])
               if output.data[i][0] == mapping_file.iloc[j][0]:
                    index = (int(mapping_file.iloc[j][1]))-1
                    # print(index)
                    extension = dataset.data[index][3:]
                    # print (extension)
                    output.data[i].extend(extension)
                    # print (AMR12_data_converted.data[i][0:4])
     return output

def readinBund (link_to_data, link_to_template_input):
     ''' this formula takes in a link to a file with Bundes averages, and converts it to a Data object, based on 402 KReise'''
     # load in template
     template = prepare402template (link_to_template_input)

     # read in AMR data as a datafile
     dataset = Data(link_to_data)
     
     # create output file and populate it with Kreise from template and labels, years and only_labels from input dataset
     output = copy_labels_years_onlylabels(dataset, template)

     # map values from AMR to Kreise and return completed dataobject
     for i in range(0, len(output.data)):
          extension = dataset.data[0][3:]
          # print (extension)
          output.data[i].extend(extension)
          # print (AMR12_data_converted.data[i][0:4])
     return output


def mapping_to_db (link_to_mapping_file):
     mapping_file = loadmappingfile(link_to_mapping_file)
     user = "user"
     passw = "password"
     host = "localhost"
     database = "mydb"
     conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database , echo=False)
     mapping_file.to_sql(name="mapping", con=conn, if_exists = 'replace', index=False)

#
#
# # links to all the required data files
# link_to_mapping_file = './resources/KRS_ROR_AMR_clean_mapping.csv'
# link_to_template_input = './resources/KRS15_template.csv'
#
# link_to_AMR12_data = './resources/AMR12_testfile.csv'
# link_to_AMR15_data = './resources/AMR15_testfile.csv'
# link_to_Bund_data = './resources/Bund_testfile.csv'
# link_to_Kreise_data = './resources/KRS15_testfile.csv'
# link_to_reference_data = './resources/Referenzgroessen_input.csv'
#
#
# # load in all the data as data objects
# AMR12_data = readin258AMR (link_to_AMR12_data,link_to_mapping_file, link_to_template_input)  # create AMR12 data object
# AMR15_data = readin257AMR(link_to_AMR15_data,link_to_mapping_file, link_to_template_input)   # create AMR15 data object
# Bund_data = readinBund(link_to_Bund_data, link_to_template_input)                            # create Bund data object
# reference_data = Data(link_to_reference_data)  #### WORKS!!!!
# Kreise_data = Data(link_to_Kreise_data)  # WORKS!!!
#
#
# # load in all the data to DB
# mapping_to_db(link_to_mapping_file)                                     # load in Mapping file to DB
#
# create_table_and_load_data(Kreise_data)                                 # load in Kreise data
#
# data_base = pymysql.connect("localhost", "user", "password", "mydb")
# cursor = data_base.cursor()
#
#
# add_columns(AMR12_data, cursor, data_code=200)                          # load in AMR12 data
# add_tuples_new(AMR12_data, data_base=data_base, data_code=200)
#
# add_columns(AMR15_data,cursor, data_code=300)                           # load in AMR15 data
# add_tuples_new(AMR15_data, data_base=data_base, data_code=300)
#
# add_columns(Bund_data, cursor, data_code=400)                           # load in Bund data
# add_tuples_new(Bund_data, data_base=data_base, data_code=400)
#
# create_table_and_load_data(reference_data,table_name="reference")       # load in reference data
# #
# #
# #
# #
# #
