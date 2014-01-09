#!/usr/local/venv/locus/bin/python

# Add world mollweide
# <54009> +proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs <>
import os

# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = "settings"

from django.contrib.gis.utils import add_postgis_srs
add_postgis_srs(54009)
