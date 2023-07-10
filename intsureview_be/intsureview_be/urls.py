"""intsureview_be URL Configuration"""

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from intsureview_be.apps.api import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.get_data),
    path("submit/", views.add_form),
    path("delete/<str:first_name>/<str:last_name>/", views.delete_person),
]

# router = routers.DefaultRouter()
# router.register(r"users", views.UserViewSet)
# router.register(r"groups", views.GroupViewSet)
# router.register(r"items", views.ItemViewSet)

# # Wire up our API using automatic URL routing.
# # Additionally, we include login URLs for the browsable API.
# urlpatterns = [
#     path("", include(router.urls)),
#     path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
# ]
