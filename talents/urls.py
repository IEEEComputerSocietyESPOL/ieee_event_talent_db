from django.urls import path
from . import views

urlpatterns = [
    path('registro/', views.registro, name='registro'),
    path('registro/exito/', views.registro_exito, name='registro_exito'), # <-- Asegúrate de que tenga el 'registro/' antes
]