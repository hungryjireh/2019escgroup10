from django.contrib import admin
from . import views
from django.urls import path
from django.views.generic.base import TemplateView

urlpatterns=[
    path('signup/', views.Signup.as_view(), name='signup'),
    path('adminpage/', views.admin_view, name='admin'),
    path('success/', TemplateView.as_view(template_name='success.html'), name='success'),
    path('ticketform/', views.UserFormView.as_view(), name='ticketform'),
    ]