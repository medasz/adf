# Embedded file name: C:\lab\w2g\ui\..\ui\cc\templatetags\w2gfilter.py
# -*- coding:utf-8 -*-
from django import template
register = template.Library()

@register.filter
def clean(v):
    """\xe5\x87\x80\xe5\x8c\x96"""
    v = v.replace('&', '&amp;')
    v = v.replace('\t', ' ').replace(' ', '&nbsp;')
    v = v.replace('<', '&lt;')
    v = v.replace('>', '&gt;')
    v = v.replace("'", '&#39;')
    v = v.replace("'", '&#39;')
    v = v.replace('"', '&quot;')
    v = '<br />'.join(v.split('\n'))
    return v


@register.filter
def clean_less(v):
    """\xe5\x87\x80\xe5\x8c\x96"""
    v = v.replace('&', '&amp;')
    v = v.replace('\t', ' ').replace(' ', '&nbsp;')
    v = v.replace('<', '&lt;')
    v = v.replace('>', '&gt;')
    v = v.replace("'", '&#39;')
    v = v.replace("'", '&#39;')
    v = v.replace('"', '&quot;')
    v = '<br />'.join(v.split('\n')[:2])
    return v


@register.filter
def truncatechars(v, num):
    """\xe6\x88\xaa\xe6\x96\xad"""
    if len(v) <= num:
        return v
    return v[:num] + '...'


@register.filter
def codz_type(v):
    """\xe7\xae\x80\xe5\x8c\x96codz type"""
    if v == 'payload':
        return 'payload'
    if v == 'exploit':
        return 'exploit'
    if v == 'system':
        return '<font color="red">system</font>'
    if v == 'other':
        return 'other'


@register.filter
def codz_api(k):
    """api\xe5\xaf\xb9\xe5\xba\x94\xe7\x9a\x84\xe4\xb8\xad\xe6\x96\x87\xe6\x8f\x8f\xe8\xbf\xb0"""
    kv = {'w2g.net.inner_ip': '\xe5\x86\x85\xe7\xbd\x91IP\xe8\x8e\xb7\xe5\x8f\x96',
     'w2g.net.GetInnerIP': u'获取内网IP(webkit)',
     'w2g.watermark.set': '\xe8\xae\xbe\xe7\xbd\xae\xe6\x8c\x81\xe4\xb9\x85\xe6\x80\xa7\xe6\xb0\xb4\xe5\x8d\xb0',
     'w2g.watermark.get': '\xe8\x8e\xb7\xe5\x8f\x96\xe6\x8c\x81\xe4\xb9\x85\xe6\x80\xa7\xe6\xb0\xb4\xe5\x8d\xb0',
     'w2g.misc.ddos': 'HTTP DDOS\xe6\x94\xbb\xe5\x87\xbb',
     'w2g.cookie.del': '\xe5\x88\xa0\xe9\x99\xa4\xe6\x8c\x87\xe5\xae\x9acookie',
     'w2g.cookie.get': '\xe8\x8e\xb7\xe5\x8f\x96\xe6\x8c\x87\xe5\xae\x9acookie',
     'w2g.cookie.set': '\xe8\xae\xbe\xe7\xbd\xae\xe6\x96\xb0\xe7\x9a\x84cookie',
     'w2g.net.post': '\xe5\x8f\x91\xe8\xb5\xb7POST\xe8\xaf\xb7\xe6\xb1\x82',
     'w2g.net.get': '\xe5\x8f\x91\xe8\xb5\xb7GET\xe8\xaf\xb7\xe6\xb1\x82',
     'w2g.ajax.req': '\xe5\x8f\x91\xe8\xb5\xb7AJAX\xe8\xaf\xb7\xe6\xb1\x82',
     'w2g.inject.script': '\xe6\xb3\xa8\xe5\x85\xa5js\xe6\x96\x87\xe4\xbb\xb6',
     'w2g.inject.script2obj': '\xe6\xb3\xa8\xe5\x85\xa5js\xe6\x96\x87\xe4\xbb\xb6\xe5\x88\xb0\xe7\x9b\xae\xe6\xa0\x87iframe\xe5\xaf\xb9\xe8\xb1\xa1',
     'w2g.inject.iframe': '\xe6\xb3\xa8\xe5\x85\xa5iframe\xe5\xbc\x95\xe7\x94\xa8',
     'w2g.inject.flash': '\xe6\xb3\xa8\xe5\x85\xa5flash\xe5\xbc\x95\xe7\x94\xa8',
     'w2g.hijack.links': '\xe5\x8a\xab\xe6\x8c\x81\xe6\x89\x80\xe6\x9c\x89\xe9\x93\xbe\xe6\x8e\xa5\xe7\x82\xb9\xe5\x87\xbb',
     'w2g.hijack.clickhijack': u'点击劫持',
     'w2g.hijack.screenshots': u'定时页面截屏'
    
    }
    try:
        return kv[k]
    except:
        return k