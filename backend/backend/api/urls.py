from django.urls import path
from . import views

urlpatterns = [
    path('add-user/', views.addUser),
    path('get-user/<str:pk>/', views.getUserById),
    path('add-job/', views.addJob),
    path('get-jobs/<str:pk>/', views.getJobsByUserId),
    path('delete-job/<str:pk>/', views.deleteJobById)
]
