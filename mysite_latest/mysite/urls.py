"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from rest_framework import routers
from mysite import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf.urls import url
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'staff', views.StaffViewSet, base_name='staff')
router.register(r'superstaff', views.SuperStaffViewSet, base_name='superstaff')
router.register(r'groups', views.GroupViewSet, base_name='group')
# router.register(r'reacttickets', views.ReactMessageViewSet)
# router.register(r'tickets', views.MessageViewSet)
# router.register(r'users', views.UserViewSet, base_name='user')
# router.register(r'adminreply', views.AdminReplyViewSet, base_name='adminreply')
# router.register(r'userreply', views.UserReplyViewSet, base_name='userreply')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^api/user/$', views.user_detail),
    url(r'^api/staff/$', views.staff_list),
    url(r'^api/staffdetail/(?P<pk>[0-9]+)$', views.staff_detail),
    # url(r'^api/tickets/$', views.message_list),
    # url(r'^api/tickets/post/$', views.message_post),
    # url(r'^api/ticketdetail/(?P<pk>[0-9]+)$', views.message_detail),
]