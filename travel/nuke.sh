#!/usr/bin/env bash
rm -rf db.sqlite3
rm -rf inventory/migrations/
mkdir inventory/migrations/
touch inventory/migrations/__init__.py
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata data.json
python manage.py runserver
