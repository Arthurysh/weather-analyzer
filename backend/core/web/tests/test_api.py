from django.test import TestCase

from core.web.views.data import collect_data


class TestCollectData(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.result = collect_data(52.52, 13.41, "2013-01-01", "2023-01-01", True)

    def test_result_is_dict(self):
        self.assertIsInstance(self.result, dict)

    def test_result_has_time_key(self):
        self.assertIn("time", self.result)

    def test_result_has_temperature_key(self):
        self.assertIn("temperature_2m_mean", self.result)

    def test_result_has_precipitation_key(self):
        self.assertIn("precipitation_sum", self.result)

    def test_result_has_wind_speed_key(self):
        self.assertIn("wind_speed_10m_max", self.result)

    def test_result_len_is_correct(self):
        self.assertEqual(len(self.result.get("time")), 3653)
