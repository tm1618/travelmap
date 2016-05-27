from __future__ import unicode_literals

from django.db import models
from helpers import get_lat_lng

# Create your models here.


class Type(models.Model):
    type = models.CharField(max_length=100);

    def __unicode__(self):
        return self.type


class Location(models.Model):
    title = models.CharField(max_length=100)
    type = models.ForeignKey(Type)
    address = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True)
    zipcode = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100)
    latlng = models.CharField(blank=True, max_length=100)


    def __unicode__(self):
        return self.title

    ## Geocode using full address
    def get_full_address(self):
        return u'%s %s %s %s' % (self.address, self.city, self.state, self.country)
    full_address = property(get_full_address)

    ## Geocode by just using zipcode and country name (faster and more reliable)
    def get_geo_address(self):
        return u'%s %s' % (self.country, self.zipcode)
    geo_address = property(get_geo_address)

    def save(self, *args, **kwargs):
        if not self.latlng:
             if self.zipcode and self.country:
                 location = self.geo_address
                 self.latlng = get_lat_lng(location)
             else:
                 location = '+'.join(filter(None, (self.address, self.city, self.state, self.country)))
                 self.latlng = get_lat_lng(location)
        super(Location, self).save(*args, **kwargs)
