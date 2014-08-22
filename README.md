# Setting up with ansible

* Vagrant
* VirtualBox
* Ansible

# Running dev server

Initial setup

	`vagrant up`
	[Loading raster data for bioregion reports]
	[Loading vector data for bioregion reports]
	[Create local_vars.yml]
	[Loading Bioregions]
	`cd deploy`
	`ansible-playbook provision-locus.yml -i hosts`
	[Create superuser]
	[Run server]
	[Create Social App Profiles]
	[Map report vectors]

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

Create local_vars.yml
```
copy deploy/local_vars.yml.template to deploy/local_vars.yml
get your facebook app id and app secret id from your facebook developer settings
set a database password
Also set your Twitter API Credentials while you're in there:
	twitteraccesstoken and twitteraccesstokensecret (log in to dev.twitter.com and look at your API keys)
```

Loading Bioregions
```
Get the bioregion and thiessen data
	Ecotrusters: gis/projects/projects2013/Locus/DEMO.tar.gz
unzip to /usr/local/apps/locus/media
	result: /usr/local/apps/locus/media/DEMO/...
Load the user and some initial bioregions:
	python manage.py loaddata fbapp/fixtures/gen_bioreg.json
```

Create Superuser
```
This is a django app - simply: 
- ssh into the machine (`vagrant ssh`)
- get into your virtual environment (`source go`)
- `python manage.py createsuperuser` and follow the prompts.
```

Run server
```
from host: 
	if you have fabric installed, run `fab dev runserver`
from VM:
	`source ~/go`  (get into virtual env, cd /usr/local/apps/locus/locus)
	`python manage.py runserver`
```

Create Social App Profiles
```
Log in to the django admin with the superuser you created:
	http://locahost:8000/admin
Select Social apps
	Facebook should already exist
Click 'Add social app'
	Provider: Twitter
	Name: twitter
	Client id:	[from dev.twitter.com 'API key']
	Secret:	[from dev.twitter.com 'API secret']
```

Map report vectors
```
vagrant ssh
source go
python manage.py map_report_vectors

# Running production/stage server

Follow above but instead of vagrant, run puppet apply manually.

For production
* Use a different settings.APP_ID
* Use a different social.json (facebook developer account)