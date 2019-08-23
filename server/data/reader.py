"""this module reads in a data object into the the Kreise table of the DB


declare local temporary table `missing_value` (
missing_value KREISE not null
);

"""

import warnings
import pymysql


def index_column(column, cursor, table_name):
    """
    Change specific column to
    :param column:
    :param cursor:
    :param table_name:
    :return:
    """
    sql = "ALTER TABLE `%s` ADD INDEX(`%s`)" %(table_name, column)
    cursor.execute(sql)


def create_table_and_load_data(data_base, data, data_code=100, data_base_name="mydb", table_name="kreise"):
    """
    Function to create a table and load data into the DB for a given data object
    :param data_base: the database where it should be loaded in.
    :param data: The data object that contains the labels and tuple data
    :param data_code: the data code of which level of data the data object contains, default: 100
    :param data_base_name: the name of the database that it is loaded into, default: mydb
    :param table_name: the table name where the dat is loaded into
    :return:
    """
    data.convert_to_array_sql()
    # print(data.data)
    # print(data.labels)
    cursor = data_base.cursor()
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        cursor.execute("DROP TABLE IF EXISTS `%s`" % table_name)
    sql = ("CREATE TABLE `%s` (\n"
           "           KENNZIFFER  VARCHAR(20) NOT NULL,\n"
           "           RAUMEINHEIT  VARCHAR(70),\n"
           "           AGGREGAT VARCHAR(40),\n"
           "           YEAR VARCHAR(20))" % table_name)

    cursor.execute(sql)
    add_columns(data, cursor, data_code, table_name)
    add_tuples(data, cursor, table_name)
    index_column('KENNZIFFER', cursor, table_name)
    index_column('YEAR', cursor, table_name)
    data_base.commit()



def add_columns(data, cursor, data_code=100, table_name='kreise'):
    """
    This function adds the data's unique labels as columns to a db table.
    :param data: the data object that contains the columns
    :param cursor: the cursor that is connected to the DB
    :param data_code: data code added to columns, default: 100
    :param table_name: Name of the table, default: KREISE
    :return:
    """
    if data_code not in [100, 200, 300, 400]:
        raise ValueError('unknown data_code')
    for i in data.unique_labels():
        if len(i) >= 50:
            print(i)
            new_label = i[:50] + '_' + str(data_code)
            cursor.execute("ALTER TABLE `%s` ADD COLUMN `%s` DOUBLE" % (table_name, new_label))
        else:
            new_label = i + '_' + str(data_code)
            cursor.execute("ALTER TABLE `%s` ADD COLUMN `%s` DOUBLE" % (table_name, new_label))


def add_tuples(data, cursor, table_name="kreise"):
    """
    This function adds the sql_data of the data object to a table in the DB.
    :param data: the data object that contains the sql_data
    :param cursor: the cursor that is connected to the DB
    :param table_name: Name of the table, default: KREISE
    :return:
    """
    count = len(data.sql_data[0])
    quests = prepare_statements(count)
    sql = f"""
            INSERT INTO
             `%s` 
             VALUES
                (%s)
        """ % (table_name, quests)
    # print(data.sql_data)
    cursor.executemany(sql, data.sql_data)


def add_tuples_new(data, data_base, data_code=100, table_name="kreise"):
    """
    This function adds the sql_data of the data object to a table in the DB.
    It also checks if the tuple already exists.
    :param data: the data object that contains the sql_data
    :param data_base: the DB that is needs to be loaded in
    :param data_code: the data code added to columns, default: 100
    :param table_name: Name of the table, default: KREISE
    :return:
    """
    data.convert_to_array_sql()
    cursor = data_base.cursor()
    for tuple_sql in data.sql_data:

        if check_if_tuple_exists(cursor, table_name, tuple_sql[0], tuple_sql[3]):
            sql = f"""UPDATE `%s` SET %s WHERE `KENNZIFFER` = %s AND `YEAR` = '%s' """\
                  % (table_name, prepare_update_sql(data.unique_labels(), tuple_sql[4:], data_code)
                     , tuple_sql[0], tuple_sql[3])
            # print (sql)
            cursor.execute(sql)
            data_base.commit()
        else:
            sql = f"""INSERT INTO `%s` (%s) VALUES (%s)""" \
                  % (table_name, prepare_columns_for_sql(data.unique_labels(), data_code),
                     prepare_value_list_for_sql(tuple_sql))

            cursor.execute(sql)
            data_base.commit()



def prepare_statements(count):
    """
    Creates a string count times %s
    :param count: the amount of %s
    :return: a string
    """
    question_marks = []
    base = 0
    while base < count:
        question_marks.append('%s')
        base += 1
    return ','.join(question_marks)


def prepare_value_list_for_sql(value_list):
    """
    Creates a string with all the values for a sql query. Replaces None with Null.
    :param value_list: list of the columns
    :return: string with the column names
    """
    string = ''
    for i in value_list:
        if isinstance(i, str):
            string = string + '\'' + i + '\'' + ', '
        else:
            string = string + str(i) + ', '
    string = string.replace("None", "Null")
    return string[:-2]


def prepare_columns_for_sql(column_list, data_code=100):
    """
    Creates a string with all the columns for a new tuple
    :param column_list: The column names that need to be added
    :param data_code: the data code to add at the column names
    :return: string with all the columns
    """
    string = 'KENNZIFFER, RAUMEINHEIT, AGGREGAT, YEAR, '
    for i in column_list:
        if len(i) >= 50:
            new_label = i[:50] + '_' + str(data_code)
            string = string + '`' + new_label + '`' + ', '
        else:
            string = string + '`' + i + '_' + str(data_code) + '`' + ', '
    string = string.replace("None", "Null")
    return string[:-2]


def check_if_tuple_exists(cursor, table_name, kennziffer, year):
    """
    Checks if the tuple is already in te DB.
    :param cursor: for the db to check
    :param table_name: name of the table to check in
    :param kennziffer: this value is checked
    :param year: this value is checked
    :return: True if the tuple exists in the table false if it does not
    """
    cursor.execute("""SELECT * FROM %s WHERE `KENNZIFFER`= %s AND `YEAR` = '%s'"""
                   % (table_name, kennziffer, year))
    tuples = cursor.fetchall()
    if tuples:
        return True
    return False


def prepare_update_sql(list_columns, list_values, data_code=100):
    """
    Creates a string for the update query
    :param list_columns: columns that are in need of an update
    :param list_values: values where the columns should be updated with
    :param data_code: data code to add to the columns
    :return: string with the columns and update values
    """
    string = ''
    for i in enumerate(list_columns):
        if list_values[i[0]] is not None:
            if len(i[1]) >= 50:
                new_label = i[1][:50] + '_' + str(data_code)
                string = string + '`' + new_label + '`' + '= ' + '\'' + str(list_values[i[0]]) + '\'' + ', '
            else:
                string = string + '`' + i[1] \
                         + '_' + str(data_code) + '`' + '= ' + '\'' + str(list_values[i[0]]) + '\'' + ', '
    string = string.replace(" None", " Null")
    return string[:-2]
