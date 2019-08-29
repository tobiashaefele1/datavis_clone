# -*- coding: utf-8 -
import pymysql
from django.conf import settings
from pymysqlpool.pool import Pool

from server.data import retrieve_db_data
from server.data.data import Data
from server.data.dataprep import readin258AMR, readin257AMR, readinBund, load_meta_data_to_db, mapping_to_db
from server.data.retrieve_db_data import retrieve_db_data
from server.data.dataprep import readin258AMR, readin257AMR, readinBund, mapping_to_db, load_meta_data_to_db


# links to all the required data files
from server.data.retrieve_db_data import retrieve_db_data


settings.configure()
from server.data.reader import create_table_and_load_data, add_columns, add_tuples_new
settings.configure()

# links to all the required data files
link_to_mapping_file = './resources/KRS_ROR_AMR_clean_mapping.csv'
link_to_template_input = './resources/KRS15_template.csv'
link_to_AMR12_data = './resources/including metadata/AMR12_testfile_updated.csv'
link_to_AMR15_data = './resources/including metadata/AMR15_testfile_updated.csv'
link_to_Bund_data = './resources/including metadata/Bund_testfile_updated.csv'
link_to_Kreise_data = './resources/including metadata/KRS15_testfile_updated_ersetzt_mit_primär_None.csv'
link_to_reference_data = './resources/Referenzgroessen_input_updated_ERSETZT.csv'


# load in all the data as data objects
AMR12_data = readin258AMR(link_to_AMR12_data, link_to_mapping_file, link_to_template_input)  # create AMR12 data object
AMR15_data = readin257AMR(link_to_AMR15_data, link_to_mapping_file, link_to_template_input)   # create AMR15 data object
Bund_data = readinBund(link_to_Bund_data, link_to_template_input)                            # create Bund data object
reference_data = Data(link_to_reference_data)
Kreise_data = Data(link_to_Kreise_data)
print("done making data objects")

#d define database connection
# data_base = pymysql.connect("localhost", "user", "password", "mydb")
data_base = pymysql.connect("bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com", "admin", "NPmpMe!696rY", "mydb")
print("connected to db")

# load in all the data to DB
mapping_to_db(link_to_mapping_file)
create_table_and_load_data(data_base, Kreise_data)
data_base.commit()
data_base.close()
print("1/5")
#
# data_base = pymysql.connect("localhost", "user", "password", "mydb")
data_base = pymysql.connect('bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com', 'admin', 'NPmpMe!696rY', "mydb")
cursor = data_base.cursor()
add_columns(AMR12_data, cursor, data_code=200)                          # load in AMR12 data
add_tuples_new(AMR12_data, data_base=data_base, data_code=200)
data_base.commit()
print("2/5")

add_columns(AMR15_data, cursor, data_code=300)                           # load in AMR15 data
add_tuples_new(AMR15_data, data_base=data_base, data_code=300)
data_base.commit()
print("3/5")

add_columns(Bund_data, cursor, data_code=400)                           # load in Bund data
add_tuples_new(Bund_data, data_base=data_base, data_code=400)
data_base.commit()
print("4/5")

create_table_and_load_data(data_base, reference_data, table_name="reference")  # load in reference data
data_base.commit()
data_base.close()
print("5/5")

# link to all the metadata and datacodes
link_to_KRS_metadata = './resources/including metadata/KRS15_testfile_updated_ersetzt_mit_primär_None.csv'
KRS_datacode = 100
link_to_AMR12_metadata = './resources/including metadata/AMR12_testfile_updated.csv'
AMR12_datacode = 200
link_to_AMR15_metadata = './resources/including metadata/AMR15_testfile_updated.csv'
AMR15_datacode = 300
link_to_bund_metadata = './resources/including metadata/bund_testfile_updated.csv'
bund_datacode = 400

# load all metadata into the database
load_meta_data_to_db(link_to_KRS_metadata, KRS_datacode,
                     link_to_AMR12_metadata, AMR12_datacode,
                     link_to_AMR15_metadata, AMR15_datacode,
                     link_to_bund_metadata, bund_datacode)


# load all the years data into a separate table in the database so  we can retrieve it for context
connections = {
    'default': pymysql.connect(host='bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com',
                                      db='mydb',
                                      user='admin',
                                      password='NPmpMe!696rY',
                                        autocommit=True)
}

retrieve_db_data(connections).insert_all_years_into_db()
print("done loading in all data")
