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

```

Loading vector data for bioregion reports
```

```

Loading Bioregions
```

```

# Running production/stage server

Follow above but instead of vagrant, run puppet apply manually.

For production
* Use a different settings.APP_ID
* Use a different social.json (facebook developer account)