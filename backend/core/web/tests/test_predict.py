import os
import pickle

from django.test import TestCase

from core.web.views.data import predict


class TestPredict(TestCase):

    @classmethod
    def setUpTestData(cls):
        _current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(_current_dir, "api_data.pkl")

        with open(file_path, "rb") as f:
            cls.api_result = pickle.load(f)

        cls.dummy_result = {
            "daily": {
                "time": ["2023-01-01", "2023-01-02"],
                "temperature_2m_mean": [3.09, 2.98],
                "precipitation_sum": [1.39, 1.53],
                "wind_speed_10m_max": [22.5, 22.53]
            }
        }
        cls.days_to_predict = len(cls.dummy_result["daily"].get("time"))

    def setUp(self):
        self.result = predict(self.api_result, self.days_to_predict)

    def test_predict_output_format(self):
        self.assertIsInstance(self.result, list)

    def test_predict_output_length(self):
        self.assertEqual(len(self.result), self.days_to_predict)

    def test_predict_output_elements_format(self):
        for forecast in self.result:
            self.assertEqual(len(forecast), 3)
            self.assertIsInstance(forecast[0], float)
            self.assertIsInstance(forecast[1], float)
            self.assertIsInstance(forecast[2], float)

    def test_predict_elements_is_correct(self):
        self.assertEqual(self.result[0][0], self.dummy_result["daily"].get("temperature_2m_mean")[0])
        self.assertEqual(self.result[1][0], self.dummy_result["daily"].get("temperature_2m_mean")[1])

        self.assertEqual(self.result[0][1], self.dummy_result["daily"].get("precipitation_sum")[0])
        self.assertEqual(self.result[1][1], self.dummy_result["daily"].get("precipitation_sum")[1])

        self.assertEqual(self.result[0][2], self.dummy_result["daily"].get("wind_speed_10m_max")[0])
        self.assertEqual(self.result[1][2], self.dummy_result["daily"].get("wind_speed_10m_max")[1])
