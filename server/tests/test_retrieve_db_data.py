"""This is the module to test the AMR12_15_Bund_to_KRS file DUMMY NO TESTS WRITTEN YET""" 
import os
import warnings
from unittest import TestCase

import pymysql

from server.data import data, reader


class TestData(TestCase):
    """This is the class to test the reader class"""

    def setUp(self):
        """Set up for the data class that loads in the test_data.csv"""
        my_path = os.path.abspath(os.path.dirname(__file__))
        file = os.path.join(my_path, 'resources/test_data.csv')
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
