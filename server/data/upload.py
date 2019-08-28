import pymysql

from server.data.data import Data
from server.data.dataprep import readin258AMR, readin257AMR, readinBund, load_meta_data_single

from server.data.reader import  add_columns, add_tuples_new
from server.data.retrieve_db_data import insert_all_years_into_db


def insert_new_data(link_file, level):
    link_to_mapping_file = './resources/KRS_ROR_AMR_clean_mapping.csv'
    link_to_template_input = './resources/KRS15_template.csv'
    data_base = pymysql.connect("bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com", "admin", "NPmpMe!696rY", "mydb")
    cursor = data_base.cursor()

    if level == 0:
        data = Data(link_file)
        add_columns(data, cursor)
        add_tuples_new(data, data_base=data_base)
        data_base.commit()
        load_meta_data_single(link_file, 100)

    elif level == 1:
        data = readin258AMR(link_file, link_to_mapping_file, link_to_template_input)
        add_columns(data, cursor, data_code=200)
        add_tuples_new(data, data_base=data_base, data_code=200)
        data_base.commit()
        load_meta_data_single(link_file, 200)

    elif level == 2:
        data = readin257AMR(link_file, link_to_mapping_file, link_to_template_input)
        add_columns(data, cursor, data_code=300)
        add_tuples_new(data, data_base=data_base, data_code=300)
        data_base.commit()
        load_meta_data_single(link_file, 300)

    elif level == 3:
        data = readinBund(link_file, link_to_template_input)
        add_columns(data, cursor, data_code=400)
        add_tuples_new(data, data_base=data_base, data_code=400)
        data_base.commit()
        load_meta_data_single(link_file, 400)
    insert_all_years_into_db()


file = input('Where is the file located?')
level_input = input('What level is the data? 0 = Kreise, 1 = AMR12, 2 = AMR15, 3 = Bund')
insert_new_data(file, level_input)

