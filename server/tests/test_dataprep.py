"""This is the module to test the AMR12_15_Bund_to_KRS file DUMMY NO TESTS WRITTEN YET""" 
import os
from unittest import TestCase




class TestData(TestCase):
    """This is the class to test the reading data in functions"""

    def setUp(self):
        """Set up for the data class that loads in the test_data.csv"""
        my_path = os.path.abspath(os.path.dirname(__file__))
        file_ref = os.path.join(my_path, 'resources/referenzgroessen_input.csv')

        # file_map = ('./server/data/resources/krs_ror_amr_clean_mapping.csv')
        # file_amr15 = ('./server/data/resources/amr15_testfile.csv')
        # file_amr12 = ('./server/data/resources/amr12_testfile.csv')
        # file_bund = ('./server/data/resources/Bund_testfile.csv')
        #
        # file_map = os.path.join(my_path, 'server/data/resources/krs_ror_amr_clean_mapping.csv')
        # file_amr15 = os.path.join(my_path, 'server/data/resources/amr15_testfile.csv')
        # file_amr12 = os.path.join(my_path, 'server/data/resources/amr12_testfile.csv')
        # file_bund = os.path.join(my_path, 'server/data/resources/bund_testfile.csv')
        # self.ref_data = loadmappingfile(file_ref)
        # self.map_data = loadmappingfile(file_map)
        # self.amr15_data = readin257AMR(file_amr15)
        # self.amr12_data = readin258AMR(file_amr12)
        # self.bund_data = readinBund(file_bund)

        # self.data_base = pymysql.connect("localhost", "user", "password", "mydb")
        # self.cursor = self.data_base.cursor()
        # reader.create_table_and_load_data(self.data, 100, "mydb", "test")

    # def test_readinbund(self):
    #     """Test if all the columns are read in"""
    #
    #     self.assertEqual("1", len(self.bund_data))
    #
    # def test_check_columns(self):
    #     """Test if the columns are read in correctly"""
    #
    #     self.cursor.execute("""SHOW COLUMNS FROM test""")
    #     columns = self.cursor.fetchall()
    #     self.assertIn("KENNZIFFER", columns[0])
    #     self.assertIn("RAUMEINHEIT", columns[1])
    #     self.assertIn("AGGREGAT", columns[2])
    #     self.assertIn("YEAR", columns[3])
    #     self.assertIn(self.data.unique_labels()[0] + '_100', columns[4])
    #     self.assertIn(self.data.unique_labels()[1] + '_100', columns[5])
    #
    # def test_tuple(self):
    #     """Test if the tuple is read in correctly"""
    #     self.cursor.execute("""SELECT Bruttoverdienst_100
    #                     FROM test
    #                     WHERE YEAR= 2000 and KENNZIFFER=01001 """)
    #     result = self.cursor.fetchall()
    #     self.assertEqual(1971, result[0][0])
    #
    # def test_wrong_code(self):
    #     """This test that an error message is raised when a wrong data_code is put in"""
    #     with self.assertRaises(ValueError):
    #         reader.add_columns(self.data, self.cursor, 500)
