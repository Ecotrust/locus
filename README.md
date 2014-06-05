# Setting up with ansible

* Vagrant
* VirtualBox
* Ansible

# Running dev server

Initial setup

	vagrant up 
	[Loading raster data for bioregion reports]
	[Loading vector data for bioregion reports]
	[Loading Bioregions]
	[Create local_vars.yml]
	ansible-playbook provision-locus.yml -i hosts
	[create superuser]

Loading raster data for bioregion reports
```
Get the raster data
	Ecotrusters: gis/projects/projects2013/Locus/raster_data.tar.gz
unzip to /usr/local/apps/locus/data 
	result: /usr/local/apps/locus/data/reports/...
	NOTE: This location is absolute. A different location will require many changes to the fixture.
```

Loading vector data for bioregion reports
```
Get the vector data
	Ecotrusters: gis/projects/projects2013/Locus/vector_data.tar.gz
unzip to /usr/local/apps/locus/data [or where VECTOR_DATA_LOCATION points in settings_local.py]
	result: /usr/local/apps/locus/data/shapefiles/...
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
Load the user and some initial bioregions:
	python manage.py loaddata fbapp/fixtures/gen_bioreg.json
```

Create local_vars.yml
```
copy deploy/local_vars.yml.template to deploy/local_vars.yml
get your facebook app id and app secret id from your facebook developer settings
set a database password
```

Create Superuser
```
This is a django app - simply: 
- ssh into the machine (`vagrant ssh`)
- get into your virtual environment (`source go`)
- `python manage.py createsuperuser` and follow the prompts.
```

# Running production/stage server

Follow above but instead of vagrant, run puppet apply manually.

For production
* Use a different settings.APP_ID
* Use a different social.json (facebook developer account)