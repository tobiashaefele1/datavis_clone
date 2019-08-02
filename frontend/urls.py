from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    # path('', views.send_var_names_to_backend)
]