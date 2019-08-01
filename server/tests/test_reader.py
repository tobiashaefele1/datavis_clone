"""This is the module to test the reader class"""
import os
import warnings
from unittest import TestCase

import pymysql

from bmf.server.data import reader, data


class TestData(TestCase):
    """This is the class to test the reader class"""

    def setUp(self):
        """Set up for the data class that loads in the test_data.csv"""
        self.my_path = os.path.abspath(os.path.dirname(__file__))
        file = os.path.join(self.my_path, 'resources/test_data.csv')
        self.data = data.Data(file)
        self.data_base = pymysql.connect("localhost", "user", "password", "mydb")
        self.cursor = self.data_base.cursor()
        reader.create_table_and_load_data(self.data, 100, "mydb", "test")

    def tearDown(self):
        """Clears the created table in the database"""
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            self.cursor.execute("DROP TABLE IF EXISTS test")
            self.data_base.close()

    def test_create_table_and_load_data(self):
        """Test if all the columns are read in"""

        self.cursor.execute("""SHOW COLUMNS FROM test""")
        columns = self.cursor.fetchall()
        self.assertEqual(6, len(columns))

    def test_check_columns(self):
        """Test if the columns are read in correctly"""

        self.cursor.execute("""SHOW COLUMNS FROM test""")
        columns = self.cursor.fetchall()
        self.assertIn("KENNZIFFER", columns[0])
        self.assertIn("RAUMEINHEIT", columns[1])
        self.assertIn("AGGREGAT", columns[2])
        self.assertIn("YEAR", columns[3])
        self.assertIn(self.data.unique_labels()[0] + '_100', columns[4])
        self.assertIn(self.data.unique_labels()[1] + '_100', columns[5])

    def test_tuple(self):
        """Test if the tuple is read in correctly"""
        self.cursor.execute("""SELECT Bruttoverdienst_100
                        FROM test
                        WHERE YEAR= 2000 and KENNZIFFER=01001 """)
        result = self.cursor.fetchall()
        self.assertEqual(1971, result[0][0])

    def test_wrong_code(self):
        """This test that an error message is raised when a wrong data_code is put in"""
        with self.assertRaises(ValueError):
            reader.add_columns(self.data, self.cursor, 500)

    def test_add_columns(self):
        """
        This test checks how the new columns are read into existing table.
        :return:
        """
        file = os.path.join(self.my_path, 'resources/test_columns.csv')
        extra_data = data.Data(file)
        extra_data.convert_to_array_sql()
        reader.add_columns(extra_data, self.cursor, 100, 'test')
        reader.add_tuples_new(extra_data, self.data_base, 100, 'test')
        self.cursor.execute("""SELECT * FROM test WHERE Money_100=1790""")
        result = self.cursor.fetchall()
        self.assertEqual(1, len(result))

        self.cursor.execute("""SELECT * FROM test WHERE KENNZIFFER='01065'""")
        result = self.cursor.fetchall()

        self.assertEqual(2, len(result))
