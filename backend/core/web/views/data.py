from datetime import datetime

import pandas as pd
import requests
from dateutil.relativedelta import relativedelta
from django.http import JsonResponse
from prophet import Prophet


def collect_data(latitude, longitude, end_date):
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": (datetime.fromisoformat(end_date) - relativedelta(years=10)).date().isoformat(),
        "end_date": end_date,
        "daily": "temperature_2m_mean,precipitation_sum,wind_speed_10m_max",
    }

    response = requests.get(url, params=params)
    data = response.json().get("daily")

    return data


def predict(data, days):
    df = pd.DataFrame(data)
    df["ds"] = pd.to_datetime(df["time"])

    def train_and_predict(model_data, column, periods=days):
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

    date_range = pd.date_range(start_date, end_date)
    num_dates = len(date_range)

    if datetime.fromisoformat(start_date) > datetime.now():
        data = collect_data(latitude, longitude,  datetime.now().date().isoformat())
        predictions = predict(data, num_dates)
    elif datetime.fromisoformat(end_date) + relativedelta(days=2) < datetime.now():
        data = collect_data(latitude, longitude, end_date)
        train, test = {k: v[:-num_dates] for k, v in data.items()}, {k: v[-num_dates:] for k, v in data.items()}
        predictions = predict(train, num_dates)

        response["actual"] = {
            test["time"][i]: {
                "temp": test["temperature_2m_mean"][i],
                "precip": test["precipitation_sum"][i],
                "wind": test["wind_speed_10m_max"][i],
            }
            for i in range(len(test["time"]))
        }
    else:
        data = collect_data(latitude, longitude, start_date)
        predictions = predict(data, num_dates)

    response["predicted"] = {
        date_time.date().isoformat(): {
            "temp": prediction[0],
            "precip": prediction[1],
            "wind": prediction[2],
        }
        for date_time, prediction in zip(date_range, predictions)
    }

    return JsonResponse(response)
