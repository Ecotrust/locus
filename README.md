# Requirements

* Vagrant
* VirtualBox
* Fabric

# Running dev server

Initial setup

	vagrant up 
	vagrant provision
	fab dev init

Social app stuff

	vagrant ssh
	source /usr/local/venv/locus/bin/activate
	cd /usr/local/apps/locus/locus
	## From gis/projects/projects2013/Locus/keys
	python manage.py loaddata fbapp/fixtures/social.json 

Loading raster data for bioregion reports
```
Get the raster data
	Ecotrusters: gis/projects/projects2013/Locus/raster_data.tar.gz
unzip to /usr/local/apps/locus/data 
	result: /usr/local/apps/locus/data/reports/...
	NOTE: This location is absolute. A different location will require many changes to the fixture.
run python manage.py loaddata analysis/fixtures/rasters.json
```

Loading vector data for bioregion reports
```
Get the vector data
	Ecotrusters: gis/projects/projects2013/Locus/vector_data.tar.gz
unzip to /usr/local/apps/locus/data [or where VECTOR_DATA_LOCATION points in settings_local.py]
	result: /usr/local/apps/locus/data/shapefiles/...
run /usr/local/apps/locus/scripts/map_report_vectors.py (this will take some time).

```

Loading Bioregions
```
Get the bioregion and thiessen data
	Ecotrusters: gis/projects/projects2013/Locus/DEMO.tar.gz
unzip to /usr/local/apps/locus/media
	result: /usr/local/apps/locus/media/DEMO/...
Set your local settings to include [this should be done by default]:
	THIESSEN_LOCATION = '/usr/local/apps/locus/media/DEMO/geo/bioreg_2_polygon.shp'
	BIOREGION_LOCATION = '/usr/local/apps/locus/media/DEMO/geo/generated_bioregions_2.shp'
run python /usr/local/apps/locus/scripts/map_thiessen.py [untested]
```

# Running production/stage server

Follow above but instead of vagrant, run puppet apply manually.

For production
* Use a different settings.APP_ID
* Use a different social.json (facebook developer account)