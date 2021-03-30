# Embedded file name: C:\lab\w2g\ui\..\ui\codz\models.py
import datetime
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from django.db import models

class Codz(models.Model):
    key = models.CharField(max_length=200, unique=True)
    type = models.CharField(null=True, blank=True, max_length=30, help_text=u'XSS\u7c7b\u578b\uff1aexploit/payload', verbose_name=u'XSS\u7c7b\u578b')
    catelog = models.CharField(max_length=100)
    codz = models.TextField(max_length=1000)
    desc = models.TextField(max_length=1000)
    author = models.CharField(null=True, blank=True, max_length=100)
    add_time = models.DateTimeField(auto_now=True, auto_now_add=True)
    up_time = models.DateTimeField(auto_now=True, auto_now_add=True)

    class Meta:
        db_table = u'codz'
        ordering = ('-add_time',)