# TODO: take out references to database in here and make the indexation automatic (after inserting Kreise data).
# -*- coding: utf-8 -


import pymysql

from server.data.data import Data
from server.data.dataprep import readin258AMR, readin257AMR, readinBund, mapping_to_db
from server.data.reader import create_table_and_load_data, add_columns, add_tuples_new

# links to all the required data files
link_to_mapping_file = './resources/KRS_ROR_AMR_clean_mapping.csv'
link_to_template_input = './resources/KRS15_template.csv'

link_to_AMR12_data = './resources/AMR12_testfile.csv'
link_to_AMR15_data = './resources/AMR15_testfile.csv'
link_to_Bund_data = './resources/Bund_testfile.csv'
link_to_Kreise_data = './resources/KRS15_testfile.csv'
link_to_reference_data = './resources/Referenzgroessen_input.csv'


# load in all the data as data objects
AMR12_data = readin258AMR(link_to_AMR12_data, link_to_mapping_file, link_to_template_input)  # create AMR12 data object
AMR15_data = readin257AMR(link_to_AMR15_data, link_to_mapping_file, link_to_template_input)   # create AMR15 data object
Bund_data = readinBund(link_to_Bund_data, link_to_template_input)                            # create Bund data object
reference_data = Data(link_to_reference_data)  #### WORKS!!!!
Kreise_data = Data(link_to_Kreise_data)  # WORKS!!!


# load in all the data to DB
mapping_to_db(link_to_mapping_file)                                     # load in Mapping file to DB

create_table_and_load_data(Kreise_data)                                 # load in Kreise data

data_base = pymysql.connect("bmfdb.chmqlqt1tih5.us-east-2.rds.amazonaws.com", "admin", "NPmpMe!696rY", "mydb")
cursor = data_base.cursor()
#
add_columns(AMR12_data, cursor, data_code=200)                          # load in AMR12 data
add_tuples_new(AMR12_data, data_base=data_base, data_code=200)

add_columns(AMR15_data, cursor, data_code=300)                           # load in AMR15 data
add_tuples_new(AMR15_data, data_base=data_base, data_code=300)

add_columns(Bund_data, cursor, data_code=400)                           # load in Bund data
add_tuples_new(Bund_data, data_base=data_base, data_code=400)

create_table_and_load_data(reference_data,table_name="reference")       # load in reference data
#
#