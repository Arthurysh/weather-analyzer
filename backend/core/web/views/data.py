import requests
from django.http import HttpRequest, JsonResponse
from datetime import datetime
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor


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


def predict(daily_data):
    df = pd.DataFrame(daily_data)
    df['time'] = pd.to_datetime(df['time']).map(pd.Timestamp.toordinal)

    X = df[['time']]
    y = df[['temperature_2m_mean', 'precipitation_sum', 'wind_speed_10m_max']]

    model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100))
    model.fit(X, y)

    forecasts = [model.predict([[X.iloc[-1].item() + day]]) for day in range(1, 6)]
    return forecasts




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

