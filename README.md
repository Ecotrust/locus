# Requirements

* Vagrant
* VirtualBox
* Fabric

# Initial setup

```
Edit files/vagrant_settings.py to fit your needs

```

# Running 

```
vagrant up 
fab dev init
``` 

## Caveats

This will try to put your stuff directly in ~/ .. if your windows machine has home as the network U: drive,

You can change this behavior by settings the ``VAGRANT_HOME`` environment variable:

    set VAGRANT_HOME=E:\projects\vagrant\.vagrant.d
    echo %VAGRANT_HOME%