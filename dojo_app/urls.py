from django.urls import path
from . import views 

app_name = 'dojo_app'

urlpatterns = [
    path('', views.home, name='home'),
    path('contact_view/', views.contact_view, name='contact'),
]