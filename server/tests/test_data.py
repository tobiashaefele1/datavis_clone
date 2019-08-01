"""This is the module to test the data class"""
import os

from unittest import TestCase
from bmf.server.data import data


class TestData(TestCase):
    """This is the class to test the data class"""

    def setUp(self):
        """Set up for the data class that loads in the test_data.csv"""
        my_path = os.path.abspath(os.path.dirname(__file__))
        file = os.path.join(my_path, 'resources/test_data.csv')
        self.data = data.Data(file)

    def test_get_label1(self):
        """Test that checks if the first label is read in properly"""
        self.assertEqual('2127', self.data.get(1, 'Bruttoverdienst 2000'))

    def test_get_label2(self):
        """Test that checks if the last label is read in properly"""
        self.assertEqual('10.69907587', self.data.get(4, 'Arbeitslosenquote 1998'))

    def test_unique_years(self):
        """Test if the years list are slimmed down and are unique"""
        self.assertEqual(len(self.data.unique_years()), len(set(self.data.unique_years())))
        self.assertNotIn('', self.data.unique_years())

    def test_unique_labels(self):
        """Test if the labels are slimmed down"""
        self.assertTrue(len(self.data.unique_labels()) < len(self.data.labels))

    def test_convert_to_array_sql(self):
        """Test if the convert_to_array_sql creates a list on the data.sql_data variable"""
        self.data.convert_to_array_sql()
        self.assertNotEqual(0, self.data.sql_data)
