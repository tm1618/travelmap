from django.db import models
from models import Location
from django import forms


class LocationForm(forms.ModelForm):

    class Meta:
        model = Location
        exclude = ('latitude','longitude')
