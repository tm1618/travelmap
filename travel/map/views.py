from django.shortcuts import render, HttpResponseRedirect
from models import Location
from forms import LocationForm

# Create your views here.


def all_locations(request):
    locations = Location.objects.all().order_by('type')

    for i in locations:
        lat, long = i.latlng.split(",")

    return render(request, "locations.html", locals())


def editlocation(request):

    if request.POST:
        form = LocationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = LocationForm()

    location = Location.objects.all()
    title = "Location"
    url = "location"

    return render(request, 'editlocation.html', locals())

