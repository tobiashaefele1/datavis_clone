'''This is the module to convert AMR12 data into Kreise, to load into the database'''

import os
import pymysql

from sqlalchemy import create_engine
import pandas as pd

from server.data.data import Data


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
     template = prepare402template(link_to_template_input)

     # read in AMR data as a Datafile
     dataset = Data(link_to_data)

     # create output file and populate it with Kreise from template and labels, years and only_labels from input dataset
     output = copy_labels_years_onlylabels(dataset, template)
    
     # map values from AMR to Kreise and return completed dataobject
     # for i in range(0,len(output.data)):
     #      for j in range(0, len(mapping_file.index)):
     #           print(output.data[i][0])
     #           print (mapping_file.iloc[j][0])
     #           if output.data[i][0] == mapping_file.iloc[j][0]:
     #

     for i in range (0, len(output.data)):
         for j in range(0, len(dataset.data)):
             # print(mapping_file.iloc[i][5])
             # print (dataset.data[j])
             if mapping_file.iloc[i][5] == dataset.data[j][0]:
                 extension = dataset.data[j][3:]
                 # print (extension)
                 output.data[i].extend(extension)
                 break;
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
     # user = "user"
     # passw = "password"
     # host = "localhost"
     # database = "mydb"



     #
     user = "admin"
     passw = "NPmpMe!696rY"
     host = "bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com"
     database = "mydb"
     conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database , echo=False)
     mapping_file.to_sql(name="mapping", con=conn, if_exists = 'replace', index=False)



def remove_metadata(link_to_data):
    '''this function takes a .csv file containing metadata and returns back the datafile in original format,
    without the metadata included as a dataframe object'''
    ### load in all the data as string
    data = pd.read_csv(link_to_data, dtype=str, encoding ='utf8', header=None)
    data = data.drop(data.index[[0,1,2,3,4,5,6]])
    data.reset_index(inplace=True)
    data.drop(data.columns[0], axis=1, inplace=True)
    print(data)
    return (data)


def extract_metadata(link_to_data, data_code="100"):
    ''' this function that an input file that includes the metadata and returns an dataframe object
    with columns for all the types of metadata incl. the "database name, i.e. the same labels as we use in db'''
    data = pd.read_csv(link_to_data, dtype=str, encoding ='utf8', nrows=8, header=None)

    # drop first two columns I dont need
    data.drop(data.columns[[0, 1]], axis=1, inplace=True)
    # transform dataset, reset index and delete stray row
    data = data.T
    data.reset_index(inplace=True)
    data.drop(data.columns[0], axis=1, inplace=True)

    strip_counter = 0
    for x in data[7]:
        data[7][strip_counter] = x.rstrip()
        strip_counter +=1


    data[8] = data[7]
    # print(data)

    # loop through the dataframe and create the names as they are used in the database
    counter = 0
    for i in data[7]:
        if len(i) >= 50:
            new_label = i[:50] + '_' + str(data_code)
        else:
            new_label = i + '_' + str(data_code)
        data[8][counter] = new_label
        counter +=1

    # now drop all duplicaes:
    data = data.drop_duplicates()
    # reorder the data
    data = data[[8,7,0,1,2,3,4,5,6]]

    # turn first column into headers / indices
    headers = data.iloc[0]
    data = pd.DataFrame(data.values[1:], columns=headers)

    ## and rename to make cleaner:
    data.rename(columns={'Aggregat_{}'.format(data_code): 'databasename', 'Aggregat': 'csvname'}, inplace=True)




    return (data)



def load_meta_data_to_db(link_to_KRS_metadata, KRS_datacode,
                         link_to_AMR12_metadata, AMR12_datacode,
                         link_to_AMR15_metadata, AMR15_datacode,
                         link_to_bund_metadata, bund_datacode):
    ''' this function takes in links to 4 metadata sets, extracts the metadata, merges them into one metadatafile and
    stores them in the database in a separate table called "metadata"'''
    # load the for types of metadata into separate dataframes
    KRS_meta = extract_metadata(link_to_KRS_metadata, KRS_datacode)
    AMR12_meta = extract_metadata(link_to_AMR12_metadata, AMR12_datacode)
    AMR15_meta = extract_metadata(link_to_AMR15_metadata, AMR15_datacode)
    bund_meta = extract_metadata(link_to_bund_metadata, bund_datacode)

    # now combine the dataframes
    combined_meta = KRS_meta.append(AMR12_meta)
    combined_meta = combined_meta.append(AMR15_meta)
    combined_meta = combined_meta.append(bund_meta)

    # print (combined_meta)

    ## the following threw lines of code replace all " characters with ' characters so they do not cause trouble
    ## in json.parse - looks like it is not necessary, so commented out for now
    # old = """ " """
    # new = """ """
    # combined_meta.replace(old, new)
    # #
    # old = """ \ """
    # new = """  """
    # combined_meta.replace(old, new)
    # combined_meta = combined_meta.replace('"', '')
    # combined_meta = eval(combined_meta)
    #
    combined_meta = combined_meta.replace(r'\\n', ' ', regex=True)
    combined_meta = combined_meta.replace(r'\"', ' ', regex=True)
    combined_meta = combined_meta.replace (r'\\', ' ', regex=True)
    print(combined_meta)

    user = "admin"
    passw = "NPmpMe!696rY"
    host = "bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com"
    database = "mydb"
    conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database, echo=False)
    combined_meta.to_sql(name="metadata", con=conn, if_exists='replace', index=False)

    # user = "user"
    # passw = "password"
    # host = "localhost"
    # database = "mydb"
    # conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database, echo=False)
    # combined_meta.to_sql(name="metadata", con=conn, if_exists='replace', index=False)





# code for testing!!!
# #TODO: move all these items to setup.py once we are clear that this is actually valuable and the data is validated

# link_to_KRS_metadata = './resources/including metadata/KRS15_testfile_updated.csv'
# KRS_datacode = 100
#
# link_to_AMR12_metadata = './resources/including metadata/AMR12_testfile_updated.csv'
# AMR12_datacode = 200
#
# link_to_AMR15_metadata = './resources/including metadata/AMR15_testfile_updated.csv'
# AMR15_datacode = 300
#
# link_to_bund_metadata = './resources/including metadata/bund_testfile_updated.csv'
# bund_datacode = 400
#
# load_meta_data_to_db(link_to_KRS_metadata, KRS_datacode,
#                      link_to_AMR12_metadata, AMR12_datacode,
#                      link_to_AMR15_metadata, AMR15_datacode,
#                      link_to_bund_metadata, bund_datacode)
# #













#
# #
# # # links to all the required data files
# link_to_mapping_file = './resources/KRS_ROR_AMR_clean_mapping.csv'
# link_to_template_input = './resources/KRS15_template.csv'
# #
# # link_to_AMR12_data = './resources/AMR12_testfile.csv'
# link_to_AMR15_data = './resources/AMR15_testfile.csv'
# # link_to_Bund_data = './resources/Bund_testfile.csv'
# # link_to_Kreise_data = './resources/KRS15_testfile.csv'
# # link_to_reference_data = './resources/Referenzgroessen_input.csv'
# #
#
# # load in all the data as data objects
# AMR12_data = readin258AMR (link_to_AMR12_data,link_to_mapping_file, link_to_template_input)  # create AMR12 data object
# AMR15_data = readin257AMR(link_to_AMR15_data, link_to_mapping_file, link_to_template_input)   # create AMR15 data object
# # Bund_data = readinBund(link_to_Bund_data, link_to_template_input)                            # create Bund data object
# # reference_data = Data(link_to_reference_data)  #### WORKS!!!!
# # Kreise_data = Data(link_to_Kreise_data)  # WORKS!!!
# #
# #
# print(AMR15_data.data)

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
# readinAMR257(link)
# #
