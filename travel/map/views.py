from django.shortcuts import render, HttpResponseRedirect, get_object_or_404, render_to_response, RequestContext
from django.contrib import messages
from models import Location
from forms import LocationForm

# Create your views here.


def all_locations(request):
    locations = Location.objects.all().order_by('type')

    for i in locations:
        lat, long = i.latlng.split(",")

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

    return render(request, "locations.html", locals())


def editlocation(request, location_id):
    location = get_object_or_404(Location, pk=location_id)

    if request.POST:
        form = LocationForm(request.POST, instance=location)
        if form.is_valid():
            form.save()

            return HttpResponseRedirect('/')

    else:
        form = LocationForm(instance=location)

    return render_to_response("editlocation.html", {
        'form': form,
        'location': location,

    }, context_instance=RequestContext(request))


def deletelocation(request, location_id):
    get_object_or_404(Location, pk=location_id).delete()

    messages.success(request, 'Location Removed!')
    return HttpResponseRedirect('/')


