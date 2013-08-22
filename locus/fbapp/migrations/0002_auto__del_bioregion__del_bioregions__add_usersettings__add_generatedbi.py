# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Bioregion'
        db.delete_table(u'fbapp_bioregion')

        # Removing M2M table for field sharing_groups on 'Bioregion'
        db.delete_table(db.shorten_name(u'fbapp_bioregion_sharing_groups'))

        # Deleting model 'Bioregions'
        db.delete_table(u'fbapp_bioregions')

        # Removing M2M table for field sharing_groups on 'Bioregions'
        db.delete_table(db.shorten_name(u'fbapp_bioregions_sharing_groups'))

        # Adding model 'UserSettings'
        db.create_table('fbapp_usersettings', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], null=True, blank=True)),
            ('bioregion_drawn', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['fbapp.DrawnBioregion'], null=True, blank=True)),
            ('bioregion_gen', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['fbapp.GeneratedBioregion'], null=True, blank=True)),
        ))
        db.send_create_signal('fbapp', ['UserSettings'])

        # Adding model 'GeneratedBioregion'
        db.create_table('fbapp_generatedbioregion', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name='fbapp_generatedbioregion_related', to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length='255')),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('date_modified', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('content_type', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='fbapp_generatedbioregion_related', null=True, to=orm['contenttypes.ContentType'])),
            ('object_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('manipulators', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('geometry_orig', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
            ('geometry_final', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
            ('size_class', self.gf('django.db.models.fields.CharField')(default='medium', max_length=30)),
        ))
        db.send_create_signal('fbapp', ['GeneratedBioregion'])

        # Adding M2M table for field sharing_groups on 'GeneratedBioregion'
        m2m_table_name = db.shorten_name('fbapp_generatedbioregion_sharing_groups')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('generatedbioregion', models.ForeignKey(orm['fbapp.generatedbioregion'], null=False)),
            ('group', models.ForeignKey(orm['auth.group'], null=False))
        ))
        db.create_unique(m2m_table_name, ['generatedbioregion_id', 'group_id'])

        # Adding model 'DrawnBioregion'
        db.create_table('fbapp_drawnbioregion', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name='fbapp_drawnbioregion_related', to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length='255')),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('date_modified', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('content_type', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='fbapp_drawnbioregion_related', null=True, to=orm['contenttypes.ContentType'])),
            ('object_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('manipulators', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('geometry_orig', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
            ('geometry_final', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
        ))
        db.send_create_signal('fbapp', ['DrawnBioregion'])

        # Adding M2M table for field sharing_groups on 'DrawnBioregion'
        m2m_table_name = db.shorten_name('fbapp_drawnbioregion_sharing_groups')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('drawnbioregion', models.ForeignKey(orm['fbapp.drawnbioregion'], null=False)),
            ('group', models.ForeignKey(orm['auth.group'], null=False))
        ))
        db.create_unique(m2m_table_name, ['drawnbioregion_id', 'group_id'])

        # Deleting field 'Locus.BIOREG'
        db.delete_column(u'fbapp_locus', 'BIOREG')

        # Adding field 'Locus.BIOREG_2_I'
        db.add_column('fbapp_locus', 'BIOREG_2_I',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)


    def backwards(self, orm):
        # Adding model 'Bioregion'
        db.create_table(u'fbapp_bioregion', (
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('manipulators', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name=u'fbapp_bioregion_related', to=orm['auth.User'])),
            ('content_type', self.gf('django.db.models.fields.related.ForeignKey')(related_name=u'fbapp_bioregion_related', null=True, to=orm['contenttypes.ContentType'], blank=True)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('geometry_orig', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length='255')),
            ('date_modified', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('object_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('geometry_final', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
        ))
        db.send_create_signal(u'fbapp', ['Bioregion'])

        # Adding M2M table for field sharing_groups on 'Bioregion'
        m2m_table_name = db.shorten_name(u'fbapp_bioregion_sharing_groups')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bioregion', models.ForeignKey(orm[u'fbapp.bioregion'], null=False)),
            ('group', models.ForeignKey(orm[u'auth.group'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bioregion_id', 'group_id'])

        # Adding model 'Bioregions'
        db.create_table(u'fbapp_bioregions', (
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('content_type', self.gf('django.db.models.fields.related.ForeignKey')(related_name=u'fbapp_bioregions_related', null=True, to=orm['contenttypes.ContentType'], blank=True)),
            ('date_modified', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name=u'fbapp_bioregions_related', to=orm['auth.User'])),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('object_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length='255')),
        ))
        db.send_create_signal(u'fbapp', ['Bioregions'])

        # Adding M2M table for field sharing_groups on 'Bioregions'
        m2m_table_name = db.shorten_name(u'fbapp_bioregions_sharing_groups')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('bioregions', models.ForeignKey(orm[u'fbapp.bioregions'], null=False)),
            ('group', models.ForeignKey(orm[u'auth.group'], null=False))
        ))
        db.create_unique(m2m_table_name, ['bioregions_id', 'group_id'])

        # Deleting model 'UserSettings'
        db.delete_table('fbapp_usersettings')

        # Deleting model 'GeneratedBioregion'
        db.delete_table('fbapp_generatedbioregion')

        # Removing M2M table for field sharing_groups on 'GeneratedBioregion'
        db.delete_table(db.shorten_name('fbapp_generatedbioregion_sharing_groups'))

        # Deleting model 'DrawnBioregion'
        db.delete_table('fbapp_drawnbioregion')

        # Removing M2M table for field sharing_groups on 'DrawnBioregion'
        db.delete_table(db.shorten_name('fbapp_drawnbioregion_sharing_groups'))

        # Adding field 'Locus.BIOREG'
        db.add_column(u'fbapp_locus', 'BIOREG',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)

        # Deleting field 'Locus.BIOREG_2_I'
        db.delete_column('fbapp_locus', 'BIOREG_2_I')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'fbapp.drawnbioregion': {
            'Meta': {'object_name': 'DrawnBioregion'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'fbapp_drawnbioregion_related'", 'null': 'True', 'to': "orm['contenttypes.ContentType']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'geometry_final': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '3857', 'null': 'True', 'blank': 'True'}),
            'geometry_orig': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '3857', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'manipulators': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': "'255'"}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sharing_groups': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'fbapp_drawnbioregion_related'", 'null': 'True', 'symmetrical': 'False', 'to': "orm['auth.Group']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'fbapp_drawnbioregion_related'", 'to': "orm['auth.User']"})
        },
        'fbapp.generatedbioregion': {
            'Meta': {'object_name': 'GeneratedBioregion'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'fbapp_generatedbioregion_related'", 'null': 'True', 'to': "orm['contenttypes.ContentType']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'geometry_final': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '3857', 'null': 'True', 'blank': 'True'}),
            'geometry_orig': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '3857', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'manipulators': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': "'255'"}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sharing_groups': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'fbapp_generatedbioregion_related'", 'null': 'True', 'symmetrical': 'False', 'to': "orm['auth.Group']"}),
            'size_class': ('django.db.models.fields.CharField', [], {'default': "'medium'", 'max_length': '30'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'fbapp_generatedbioregion_related'", 'to': "orm['auth.User']"})
        },
        'fbapp.locus': {
            'AREA': ('django.db.models.fields.FloatField', [], {}),
            'BIOREG_2_I': ('django.db.models.fields.IntegerField', [], {}),
            'GRID_CODE': ('django.db.models.fields.IntegerField', [], {}),
            'Meta': {'object_name': 'Locus'},
            'PERIMETER': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'poly': ('django.contrib.gis.db.models.fields.PolygonField', [], {})
        },
        'fbapp.usersettings': {
            'Meta': {'object_name': 'UserSettings'},
            'bioregion_drawn': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['fbapp.DrawnBioregion']", 'null': 'True', 'blank': 'True'}),
            'bioregion_gen': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['fbapp.GeneratedBioregion']", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']", 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['fbapp']