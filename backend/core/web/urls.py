from django.urls import path

from core.web.views.data import data_view

urlpatterns = [
    path("data/", data_view, name="data"),
]
