import pandas as pd
import requests
from django.http import JsonResponse
from prophet import Prophet


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


def predict(data):
    df = pd.DataFrame(data)
    df["ds"] = pd.to_datetime(df["time"])

    def train_and_predict(model_data, column, periods=5):
        model = Prophet()

        model.fit(model_data.rename(columns={"ds": "ds", column: "y"}))
        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)

        return [round(forecast.iloc[-periods + i]["yhat"], 2) for i in range(periods)]

    forecast_temp = train_and_predict(df, "temperature_2m_mean")
    forecast_precip = train_and_predict(df, "precipitation_sum")
    forecast_wind = train_and_predict(df, "wind_speed_10m_max")

    forecasts = list(zip(forecast_temp, forecast_precip, forecast_wind))

    return forecasts


def data_view(request):
    latitude = request.GET.get("latitude", None)
    longitude = request.GET.get("longitude", None)
    start_date = request.GET.get("start_date", None)
    end_date = request.GET.get("end_date", None)

    response = {}

    if not latitude or not longitude or not start_date or not end_date:
        return JsonResponse(data=response)

    data = collect_data(latitude, longitude, start_date, end_date)
    predictions = predict(data)
    date_range = pd.date_range(start_date, end_date)

    for datetime, prediction in zip(date_range, predictions):
        response[datetime.date().isoformat()] = {
            "temp": prediction[0],
            "precip": prediction[1],
            "wind": prediction[2],
        }

    return JsonResponse(response)
