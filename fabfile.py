from fabric.api import *

vars = {
    'app_dir': '/usr/local/apps/locus/locus',
    'venv': '/usr/local/venv/locus'
}

env.forward_agent = True
env.key_filename = '~/.vagrant.d/insecure_private_key'


def dev():
    """ Use development server settings """
    servers = ['vagrant@127.0.0.1:2222']
    env.hosts = servers
    return servers


def prod():
    """ Use production server settings """
    servers = []
    env.hosts = servers
    return servers


def test():
    """ Use test server settings """
    servers = []
    env.hosts = servers
    return servers


def all():
    """ Use all servers """
    env.hosts = dev() + prod() + test()


def _install_requirements():
    run('cd %(app_dir)s && %(venv)s/bin/pip install distribute' % vars)
    run('cd %(app_dir)s && %(venv)s/bin/pip install -r ../requirements.txt' % vars)


def _install_django():
    run('cd %(app_dir)s && %(venv)s/bin/python add_srid.py' % vars)
    run('cd %(app_dir)s && %(venv)s/bin/python manage.py syncdb --noinput && \
                           %(venv)s/bin/python manage.py install_cleangeometry && \
                           %(venv)s/bin/python manage.py migrate --noinput && \
                           %(venv)s/bin/python manage.py install_media -a && \
                           %(venv)s/bin/python manage.py enable_sharing --all' % vars)


def create_superuser():
    """ Create the django superuser (interactive!) """
    run('cd %(app_dir)s && %(venv)s/bin/python manage.py createsuperuser' % vars)


def import_data():
    """ Fetches and installs data fixtures"""
    run('echo "NOT IMPLEMENTED YET"' % vars)


def init():
    """ Initialize the forest planner application """
    _install_requirements()
    _install_django()
    _install_starspan()

def install_media():
    """ Run the django install_media command """
    run('cd %(app_dir)s && %(venv)s/bin/python manage.py install_media' % vars)


def copy_media():
    """ Just copy the basic front end stuff. Speed! """
    run('rsync -rtvu /usr/local/apps/locus/media/common/ /usr/local/apps/locus/mediaroot/common' % vars)

def runserver():
    """ Run the django dev server on port 8000 """
    run('cd %(app_dir)s && %(venv)s/bin/python manage.py runserver 0.0.0.0:8000' % vars)

def _install_starspan():
    run('mkdir -p ~/src && cd ~/src && \
        if [ ! -d "starspan" ]; then git clone git://github.com/Ecotrust/starspan.git; fi && \
        cd starspan && \
        if [ ! `which starspan` ]; then ./configure && make && sudo make install; fi')
