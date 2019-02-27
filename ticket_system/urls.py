from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ticket_database/', include('django.contrib.auth.urls')),
]