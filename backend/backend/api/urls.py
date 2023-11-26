from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('add-user/', views.addUser),
    path('get-user/<str:pk>/', views.getUserById),
    path('add-job/', views.addJob),
    path('get-jobs/<str:pk>/', views.getJobsById),
]
