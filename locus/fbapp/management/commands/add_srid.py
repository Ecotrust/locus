#!/usr/local/venv/locus/bin/python


import os
from django.core.management.base import BaseCommand, CommandError
from django.contrib.gis.utils import add_postgis_srs
# Add world mollweide
# <54009> +proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs <>

# Set the DJANGO_SETTINGS_MODULE environment variable.
# os.environ['DJANGO_SETTINGS_MODULE'] = "settings"
class Command(BaseCommand):

    def handle(self, *args, **options):
        add_postgis_srs(54009)

