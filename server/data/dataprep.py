'''This is the module to convert AMR12 data into Kreise, to load into the database'''

import os
import pymysql

from sqlalchemy import create_engine
import pandas as pd

from server.data.data import Data

def loadmappingfile (link_to_mapping_file):
    '''
    :param link_to_mapping_file:  link to mapping_file with .csv information of mapping data
    :return: returns the mapping file as a data frame'''
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

    # read in AMR data & make outputfile populated with KRS from template, labels, years and only_labels from input
    dataset = Data(link_to_data)
    output = copy_labels_years_onlylabels(dataset, template)
    
    # map values from AMR to Kreise and return completed dataobject
    for i in range (0, len(output.data)):
        for j in range(0, len(dataset.data)):
            if mapping_file.iloc[i][5] == dataset.data[j][0]:
                extension = dataset.data[j][3:]
                output.data[i].extend(extension)
                break
    return output

def readin258AMR (link_to_data, link_to_mapping_file, link_to_template_input):
    ''' this formula takes in a link to a file with 258 AMRs, and converts it to a Data object, based on 402 KReise'''
    # load in mapping file & template
    mapping_file = loadmappingfile(link_to_mapping_file)
    template = prepare402template (link_to_template_input)

    # read in AMR data & make outputfile, populated with KRS from template, labels, years and only_labels from input
    dataset = Data(link_to_data)
    output = copy_labels_years_onlylabels(dataset, template)

    # map values from AMR to Kreise and return completed dataobject
    for i in range(0,len(output.data)):
         for j in range(0, len(mapping_file.index)):
              if output.data[i][0] == mapping_file.iloc[j][0]:
                   index = (int(mapping_file.iloc[j][1]))-1
                   extension = dataset.data[index][3:]
                   output.data[i].extend(extension)
    return output

def readinBund (link_to_data, link_to_template_input):
    ''' this formula takes in a link to a file with Bundes averages, and converts it to a Data object, based on 402 KReise'''
    # load in template, read in AMR data as datafile
    template = prepare402template (link_to_template_input)
    dataset = Data(link_to_data)

    # create output file, populated with Kreise from template and labels, years and only_labels from input dataset
    output = copy_labels_years_onlylabels(dataset, template)

    # map values from AMR to Kreise and return completed dataobject
    for i in range(0, len(output.data)):
        extension = dataset.data[0][3:]
        output.data[i].extend(extension)
    return output

def mapping_to_db (link_to_mapping_file):
    mapping_file = loadmappingfile(link_to_mapping_file)
    # user = "user"
    # passw = "password"
    # host = "localhost"
    # database = "mydb"

    user = "admin"
    passw = "NPmpMe!696rY"
    host = "bmfvis.c35zrhmszzzr.eu-central-1.rds.amazonaws.com"
    database = 'mydb'
    conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database, echo=False)
    mapping_file.to_sql(name="mapping", con=conn, if_exists = 'replace', index=False)

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

    # loop through the dataframe and create the names as they are used in the database
    counter = 0
    for i in data[7]:
        if len(i) >= 50:
            new_label = i[:50] + '_' + str(data_code)
        else:
            new_label = i + '_' + str(data_code)
        data[8][counter] = new_label
        counter += 1

    # now drop all duplicaes:
    data = data.drop_duplicates()
    # reorder the data
    data = data[[8, 7, 0, 1, 2, 3, 4, 5, 6]]

    # turn first column into headers / indices
    headers = data.iloc[0]
    data = pd.DataFrame(data.values[1:], columns=headers)

    ## rename to make more clean:
    data.rename(columns={'Aggregat_{}'.format(data_code): 'databasename', 'Aggregat': 'csvname'}, inplace=True)
    return data

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

    # the following threw lines of code replace all " characters with ' characters so they do not cause trouble
    combined_meta = combined_meta.replace(r'\\n', ' ', regex=True)
    combined_meta = combined_meta.replace(r'\"', ' ', regex=True)
    combined_meta = combined_meta.replace (r'\\', ' ', regex=True)

    user = "admin"
    passw = "NPmpMe!696rY"
    host = "bmfvis.c35zrhmszzzr.eu-central-1.rds.amazonaws.com"
    database = 'mydb'
    conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database, echo=False)
    combined_meta.to_sql(name="metadata", con=conn, if_exists='replace', index=False)

def load_meta_data_single(link_to_meta, code ):
    ''' this function takes in links one meta data file, extracts the metadata and
    stores them in the database in a table called "metadata"'''
    # load the for types of metadata into separate dataframes
    meta = extract_metadata(link_to_meta, code)

    # the following threw lines of code replace all " characters with ' characters so they do not cause trouble
    meta = meta.replace(r'\\n', ' ', regex=True)
    meta = meta.replace(r'\"', ' ', regex=True)
    meta = meta.replace(r'\\', ' ', regex=True)

    user = "user"
    passw = "password"
    host = "localhost"
    database = 'mydb'
    conn = create_engine('mysql+pymysql://' + user + ':' + passw + '@' + host + '/' + database, echo=False)
    meta.to_sql(name="metadata", con=conn, if_exists='append', index=False)