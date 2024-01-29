import re
from datetime import datetime

import pandas as pd
import requests
from dateutil.relativedelta import relativedelta
from django.http import HttpResponseBadRequest, JsonResponse
from prophet import Prophet

from core.web.cache import cache_data, cache_predict


@cache_data
def collect_data(latitude, longitude, start_date, end_date, historical):
    if historical:
        url = "https://archive-api.open-meteo.com/v1/archive"
        daily = "temperature_2m_mean,precipitation_sum,wind_speed_10m_max"
    else:
        url = "https://api.open-meteo.com/v1/forecast"
        daily = "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "daily": daily,
        "timezone": "auto",
    }

    response = requests.get(url, params=params)
    data = response.json().get("daily")

    if not historical:
        mean = [round((mx + mn) / 2, 1) for mx, mn in zip(data["temperature_2m_max"], data["temperature_2m_min"])]

        data["temperature_2m_mean"] = mean

        del data["temperature_2m_max"]
        del data["temperature_2m_min"]

    return data


@cache_predict
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
    latitude = request.GET.get("latitude")
    longitude = request.GET.get("longitude")
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")

    if not latitude or not longitude or not start_date or not end_date:
        return HttpResponseBadRequest(content="Missing parameters")

    if not re.match(r"^-?\d+(\.\d+)?$", latitude) or not re.match(r"^-?\d+(\.\d+)?$", longitude):
        return HttpResponseBadRequest(content="Latitude and longitude should be numbers")

    if datetime.fromisoformat(start_date) > datetime.fromisoformat(end_date):
        return HttpResponseBadRequest(content="Invalid dates")

    date_range = pd.date_range(start_date, end_date)
    num_dates = len(date_range)

    train_data = collect_data(
        latitude=latitude,
        longitude=longitude,
        start_date=(datetime.fromisoformat(end_date) - relativedelta(years=10)).date().isoformat(),
        end_date=min(datetime.fromisoformat(start_date), datetime.now() - relativedelta(days=2)).date().isoformat(),
        historical=True,
    )
    predictions = predict(train_data, num_dates)

    if datetime.fromisoformat(end_date) + relativedelta(days=2) < datetime.now():
        actual_data = collect_data(
            latitude=latitude,
            longitude=longitude,
            start_date=start_date,
            end_date=end_date,
            historical=True,
        )
    elif datetime.fromisoformat(start_date) - relativedelta(days=7) > datetime.now():
        actual_data = {
            "time": [],
            "temperature_2m_mean": [],
            "precipitation_sum": [],
            "wind_speed_10m_max": [],
        }
    elif datetime.fromisoformat(start_date) + relativedelta(days=2) >= datetime.now():
        actual_data = collect_data(
            latitude=latitude,
            longitude=longitude,
            start_date=start_date,
            end_date=min(datetime.fromisoformat(end_date), datetime.now() + relativedelta(days=7)).date().isoformat(),
            historical=False,
        )
    else:
        historical = collect_data(
            latitude=latitude,
            longitude=longitude,
            start_date=start_date,
            end_date=(datetime.now() - relativedelta(days=2)).date().isoformat(),
            historical=True,
        )
        current = collect_data(
            latitude=latitude,
            longitude=longitude,
            start_date=(datetime.now() - relativedelta(days=1)).date().isoformat(),
            end_date=min(datetime.fromisoformat(end_date), datetime.now() + relativedelta(days=7)).date().isoformat(),
            historical=False,
        )
        actual_data = {
            key: historical[key] + current[key]
            for key in historical
        }

    response = {
        "actual": {
            actual_data["time"][i]: {
                "temp": actual_data["temperature_2m_mean"][i],
                "precip": actual_data["precipitation_sum"][i],
                "wind": actual_data["wind_speed_10m_max"][i],
            }
            for i in range(len(actual_data["time"]))
        },
        "predicted": {
            date_time.date().isoformat(): {
                "temp": prediction[0],
                "precip": prediction[1],
                "wind": prediction[2],
            }
            for date_time, prediction in zip(date_range, predictions)
        }
    }

    return JsonResponse(response)
