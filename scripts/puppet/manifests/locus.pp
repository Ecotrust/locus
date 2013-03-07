class install {

    $appuser = "vagrant"
    $sourcepath = "/vagrant"
    $dbname = "locus"
    $reponame = "locus"
    $projectname = "locus"
    $appname = "fbapp"
    $secretkey = "secret"
    $mapkey = "map_key"

    # ensure that apt update is run before any packages are installed
    class apt {
      exec { "apt-update":
        command => "/usr/bin/apt-get update"
      }

      # Ensure apt-get update has been run before installing any packages
      Exec["apt-update"] -> Package <| |>

    }

    include apt

    exec { "add-apt":
      command => "/usr/bin/add-apt-repository -y ppa:mapnik/nightly-2.0 && /usr/bin/apt-get update",
      subscribe => Package["python-software-properties"]
    }

    package { "libmapnik":
        ensure => "installed",
        subscribe => Exec['add-apt']
    }

    package { "mapnik-utils":
        ensure => "installed",
        subscribe => Exec['add-apt']
    }

    package { "python-mapnik":
        ensure => "latest",
        subscribe => Exec['add-apt']
    }

    package { "build-essential":
        ensure => "installed"
    }

    package { "python-software-properties":
        ensure => "installed"
    }

    package { "git-core":
        ensure => "latest"
    }

    package { "subversion":
        ensure => "latest"
    }

    package { "mercurial":
        ensure => "latest"
    }

    package { "csstidy":
        ensure => "latest"
    }

    package { "vim":
        ensure => "latest"
    }

    package { "python-psycopg2":
        ensure => "latest"
    }

    package { "python-virtualenv":
        ensure => "latest"
    }

    package { "python-dev":
        ensure => "latest"
    }

    package { "python-numpy":
        ensure => "latest"
    }

    package { "python-scipy":
        ensure => "latest"
    }

    package { "python-gdal":
        ensure => "latest"
    }

    package { "gfortran":
        ensure => "latest"
    }

    package { "libopenblas-dev":
        ensure => "latest"
    }

    package { "liblapack-dev":
        ensure => "latest"
    }

    package { "redis-server":
        ensure => "latest"
    }

    package {'libgeos-dev':
        ensure => "latest"
    }

    package {'libgdal1-dev':
        ensure => "latest"
    }

    package {'supervisor':
        ensure => "latest"
    }

    class { "postgresql::server": version => "9.1",
        listen_addresses => 'localhost',
        max_connections => 100,
        shared_buffers => '24MB',
    }

    postgresql::database { $dbname:
      owner => "${appuser}",
    }

    exec { "load postgis":
      command => "/usr/bin/psql -f /usr/share/postgresql/9.1/contrib/postgis-1.5/postgis.sql -d ${dbname}",
      user => "${appuser}",
      require => Postgresql::Database[$dbname]
    }

    exec { "load spatialrefs":
      command => "/usr/bin/psql -f /usr/share/postgresql/9.1/contrib/postgis-1.5/spatial_ref_sys.sql -d ${dbname}",
      user => "${appuser}",
      require => Postgresql::Database[$dbname]
    }
        
    python::venv::isolate { "/usr/local/venv/${projectname}":
      subscribe => [Package['python-mapnik'], Package['build-essential']]
    }

    file { "settings_local.py":
      path => "${sourcepath}/${projectname}/settings_local.py",
      content => template("settings_vagrant.py")
    #  require => Exec['load spatialrefs template1']
    }

    file { "go":
      path => "/home/${appuser}/go",
      content => template("go"),
      owner => "${appuser}",
      group => "${appuser}",
      mode => 0775
    }
    
    file { "celeryd.conf":
      path => "/etc/supervisor/conf.d/celeryd.conf",
      content => template("celeryd.conf")
    }
    
    file { "fabfile.py":
      path => "${sourcepath}/fabfile.py",
      content => template("fabfile.py")
    }

}

include install