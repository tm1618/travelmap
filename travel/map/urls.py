from django.conf.urls import url
from views import all_locations, editlocation, deletelocation

urlpatterns = [
    url(r'^$', all_locations, name="locations"),
    url(r'^location/(?P<location_id>[0-9]+)/$', editlocation, name='editlocation'),
    url(r'^location/delete/(?P<location_id>[0-9]+)/$', deletelocation, name='deletelocation'),

    ]