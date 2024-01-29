import os
import pickle

from django.test import TestCase

from core.web.views.data import collect_data, predict


class TestCache(TestCase):

    @classmethod
    def setUpTestData(cls):
        _current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(_current_dir, "api_data.pkl")

        with open(file_path, "rb") as f:
            cls.api_result = pickle.load(f)

        cls.days_to_predict = 2

    def test_cached_collected_data(self):
        data = collect_data(52.52, 13.41, "2023-01-01", "2023-01-03", True)
        first_call_cache_info = collect_data.cache_info()

        cached_data = collect_data(52.52, 13.41, "2023-01-01", "2023-01-03", True)
        second_call_cache_info = collect_data.cache_info()

        self.assertEqual(cached_data, data)

        self.assertEqual(first_call_cache_info.misses, second_call_cache_info.misses)
        self.assertEqual(second_call_cache_info.hits, first_call_cache_info.hits + 1)

    def test_cached_predicted_data(self):
        data = predict(self.api_result, self.days_to_predict)
        first_call_cache_info = predict.cache_info()

        cached_data = predict(self.api_result, self.days_to_predict)
        second_call_cache_info = predict.cache_info()

        self.assertEqual(data, cached_data)

        self.assertEqual(first_call_cache_info.misses, second_call_cache_info.misses)
        self.assertEqual(second_call_cache_info.hits, first_call_cache_info.hits + 1)

    def test_predicted_data_cache_size(self):
        cache_size = 5
        for days_count in range(cache_size):
            predict(self.api_result, self.days_to_predict + days_count)

        self.assertEqual(predict.cache_info().misses, cache_size)
        self.assertEqual(predict.cache_info().currsize, cache_size)
