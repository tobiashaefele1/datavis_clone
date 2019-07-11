from unittest import TestCase

from data.data import Data


class TestData(TestCase):

    def setUp(self):
        self.data = Data('resources/test_dummy.csv')

    def test_get_amr(self):
        self.assertEqual('1', self.data.get(1, 'AMR15_no'))

    def test_get_label(self):
        self.assertEqual('2289', self.data.get(1, 'Bruttoverdienst 2015'))

    def test_get_unknown_label(self):
        with self.assertRaises(KeyError) as raised_error:
            self.data.get(1, 'Unknown_label')
        self.assertEqual("'Unknown_label'", str(raised_error.exception))
