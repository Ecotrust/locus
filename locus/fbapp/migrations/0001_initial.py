# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Bioregion'
        db.create_table(u'fbapp_bioregion', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name=u'fbapp_bioregion_related', to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length='255')),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('date_modified', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('content_type', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name=u'fbapp_bioregion_related', null=True, to=orm['contenttypes.ContentType'])),
            ('object_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('manipulators', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('geometry_orig', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
            ('geometry_final', self.gf('django.contrib.gis.db.models.fields.PolygonField')(srid=3857, null=True, blank=True)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
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
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name=u'fbapp_bioregions_related', to=orm['auth.User'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length='255')),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('date_modified', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('content_type', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name=u'fbapp_bioregions_related', null=True, to=orm['contenttypes.ContentType'])),
            ('object_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('description', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
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

        # Adding model 'Locus'
        db.create_table(u'fbapp_locus', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('poly', self.gf('django.contrib.gis.db.models.fields.PolygonField')()),
            ('AREA', self.gf('django.db.models.fields.FloatField')()),
            ('PERIMETER', self.gf('django.db.models.fields.FloatField')()),
            ('BIOREG', self.gf('django.db.models.fields.IntegerField')()),
            ('GRID_CODE', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'fbapp', ['Locus'])


    def backwards(self, orm):
        # Deleting model 'Bioregion'
        db.delete_table(u'fbapp_bioregion')

        # Removing M2M table for field sharing_groups on 'Bioregion'
        db.delete_table(db.shorten_name(u'fbapp_bioregion_sharing_groups'))

        # Deleting model 'Bioregions'
        db.delete_table(u'fbapp_bioregions')

        # Removing M2M table for field sharing_groups on 'Bioregions'
        db.delete_table(db.shorten_name(u'fbapp_bioregions_sharing_groups'))

        # Deleting model 'Locus'
        db.delete_table(u'fbapp_locus')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'fbapp.bioregion': {
            'Meta': {'object_name': 'Bioregion'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "u'fbapp_bioregion_related'", 'null': 'True', 'to': u"orm['contenttypes.ContentType']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'geometry_final': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '3857', 'null': 'True', 'blank': 'True'}),
            'geometry_orig': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '3857', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'manipulators': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': "'255'"}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sharing_groups': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "u'fbapp_bioregion_related'", 'null': 'True', 'symmetrical': 'False', 'to': u"orm['auth.Group']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "u'fbapp_bioregion_related'", 'to': u"orm['auth.User']"})
        },
        u'fbapp.bioregions': {
            'Meta': {'object_name': 'Bioregions'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "u'fbapp_bioregions_related'", 'null': 'True', 'to': u"orm['contenttypes.ContentType']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'date_modified': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': "'255'"}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sharing_groups': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "u'fbapp_bioregions_related'", 'null': 'True', 'symmetrical': 'False', 'to': u"orm['auth.Group']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "u'fbapp_bioregions_related'", 'to': u"orm['auth.User']"})
        },
        u'fbapp.locus': {
            'AREA': ('django.db.models.fields.FloatField', [], {}),
            'BIOREG': ('django.db.models.fields.IntegerField', [], {}),
            'GRID_CODE': ('django.db.models.fields.IntegerField', [], {}),
            'Meta': {'object_name': 'Locus'},
            'PERIMETER': ('django.db.models.fields.FloatField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'poly': ('django.contrib.gis.db.models.fields.PolygonField', [], {})
        }
    }

    complete_apps = ['fbapp']