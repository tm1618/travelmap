from django.conf.urls import url
from views import all_locations, editlocation

urlpatterns = [
    url(r'^$', all_locations, name="locations"),
    url(r'^location/edit/$', editlocation, name="editlocation"),

    ]