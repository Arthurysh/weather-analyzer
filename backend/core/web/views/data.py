import requests
from django.http import HttpRequest, JsonResponse


def collect_data(latitude, longitude, start_date, end_date):
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "daily": "temperature_2m_mean,precipitation_sum,wind_speed_10m_max",
    }

    response = requests.get(url, params=params)
    data = response.json().get("daily")

    return data


def data_view(request: HttpRequest):
    latitude = request.GET.get("latitude", None)
    longitude = request.GET.get("longitude", None)
    start_date = request.GET.get("start_date", None)
    end_date = request.GET.get("end_date", None)

    response = {}

    if not latitude or not longitude or not start_date or not end_date:
        return JsonResponse(data=response)

    data = collect_data(latitude, longitude, start_date, end_date)

    return JsonResponse(response)
