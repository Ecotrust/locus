# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'FriendRequest'
        db.create_table('fbapp_friendrequest', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('requester', self.gf('django.db.models.fields.related.ForeignKey')(related_name='requesting_user', to=orm['auth.User'])),
            ('requestee', self.gf('django.db.models.fields.related.ForeignKey')(related_name='requested_user', to=orm['auth.User'])),
            ('created', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now)),
            ('status', self.gf('django.db.models.fields.CharField')(default='user', max_length=30)),
        ))
        db.send_create_signal('fbapp', ['FriendRequest'])

        # Adding M2M table for field friends on 'UserSettings'
        m2m_table_name = db.shorten_name('fbapp_usersettings_friends')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_usersettings', models.ForeignKey(orm['fbapp.usersettings'], null=False)),
            ('to_usersettings', models.ForeignKey(orm['fbapp.usersettings'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_usersettings_id', 'to_usersettings_id'])


    def backwards(self, orm):
        # Deleting model 'FriendRequest'
        db.delete_table('fbapp_friendrequest')

        # Removing M2M table for field friends on 'UserSettings'
        db.delete_table(db.shorten_name('fbapp_usersettings_friends'))


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
        'fbapp.friendrequest': {
            'Meta': {'object_name': 'FriendRequest'},
            'created': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'requestee': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'requested_user'", 'to': "orm['auth.User']"}),
            'requester': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'requesting_user'", 'to': "orm['auth.User']"}),
            'status': ('django.db.models.fields.CharField', [], {'default': "'user'", 'max_length': '30'})
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
            'thiessen': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['fbapp.ThiessenPolygon']", 'null': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'fbapp_generatedbioregion_related'", 'to': "orm['auth.User']"})
        },
        'fbapp.locus': {
            'AREA': ('django.db.models.fields.FloatField', [], {}),
            'BIOREG_2_I': ('django.db.models.fields.IntegerField', [], {}),
            'GRID_CODE': ('django.db.models.fields.IntegerField', [], {}),
            'Meta': {'object_name': 'Locus'},
            'PERIMETER': ('django.db.models.fields.FloatField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'poly': ('django.contrib.gis.db.models.fields.PolygonField', [], {'srid': '900913'})
        },
        'fbapp.storypoint': {
            'Meta': {'object_name': 'StoryPoint'},
            'content': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'flag_reason': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'flagged': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'geometry': ('django.contrib.gis.db.models.fields.PointField', [], {'srid': '900913'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'is_permanent': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'source_link': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'source_type': ('django.db.models.fields.CharField', [], {'default': "'user'", 'max_length': '30'}),
            'source_user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']", 'null': 'True', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50', 'null': 'True', 'blank': 'True'})
        },
        'fbapp.thiessenpolygon': {
            'Meta': {'object_name': 'ThiessenPolygon'},
            'base_id': ('django.db.models.fields.IntegerField', [], {'primary_key': 'True'}),
            'geometry': ('django.contrib.gis.db.models.fields.MultiPolygonField', [], {'srid': '900913'})
        },
        'fbapp.usersettings': {
            'Meta': {'object_name': 'UserSettings'},
            'bioregion_drawn': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['fbapp.DrawnBioregion']", 'null': 'True', 'blank': 'True'}),
            'bioregion_gen': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['fbapp.GeneratedBioregion']", 'null': 'True', 'blank': 'True'}),
            'friends': ('django.db.models.fields.related.ManyToManyField', [], {'blank': 'True', 'related_name': "'friends_rel_+'", 'null': 'True', 'to': "orm['fbapp.UserSettings']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'locus_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'ns_friend_story_points': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'ns_public_story_points': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'ns_tweets': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['auth.User']", 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['fbapp']