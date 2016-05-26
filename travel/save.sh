#!/usr/bin/env bash

python manage.py dumpdata -e contenttypes -e auth --indent=4 > data.json
