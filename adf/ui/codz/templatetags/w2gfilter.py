# Embedded file name: ./codz\templatetags\w2gfilter.py
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