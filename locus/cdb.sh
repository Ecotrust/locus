#!/bin/bash

export DJANGO_SETTINGS_MODULE=settings

DB="locus"

export PYTHONPATH=$PYTHONPATH:/usr/local/venv/locus/lib/python2.7/site-packages/django/:.

createdb -T template_postgis $DB
# createdb -T gis_template $DB

# psql -d $DB -f /usr/local/apps/locus/media/DEMO/geo/mollweide.sql

python manage.py syncdb --noinput
