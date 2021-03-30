# Embedded file name: C:\lab\w2g\ui\..\ui\codz\views.py
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.core.paginator import Paginator, InvalidPage, EmptyPage
from django.views.generic import list_detail
from django.template import Context, RequestContext, loader
from django.template.loader import get_template
from django.utils import simplejson
from django.db.models import Q
from ui.codz.models import *
from ui import settings
import urllib2

@login_required
def index(req):
    return list_detail.object_list(req, queryset=Codz.objects.order_by('-id'), template_name='codz/index.html', template_object_name='codz', extra_context={})


@login_required
def addcodz(req):
    codz = req.POST.get('codz', '')
    desc = req.POST.get('desc', '')
    action = req.POST.get('action', '')
    _type = req.POST.get('type', '')
    key = req.POST.get('key', '')
    catelog = req.POST.get('catelog', 'default')
    if _type == 'system':
        codz = '-'
    if not catelog:
        catelog = 'default'
    author = req.POST.get('author', '')
    if not codz:
        info = "error: Codz cann't be null"
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    if not desc:
        info = "error: Desc cann't be null"
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    if not key:
        info = "error: Key cann't be null"
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    if not _type:
        info = "error: Type cann't be null"
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    try:
        codz_sets = Codz.objects.get(key=key)
        if action == 'edit':
            codz_sets.codz = codz
            codz_sets.desc = desc
            codz_sets.type = _type
            codz_sets.catelog = catelog
            codz_sets.author = author
            codz_sets.save()
            info = 'Edit codz success'
            return HttpResponse(simplejson.dumps({'success': 1,
             'info': info}, ensure_ascii=False), mimetype='application/json')
        info = 'error: Key exist'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    except:
        pass

    z = Codz.objects.create(codz=codz, desc=desc, type=_type, key=key, catelog=catelog, author=author)
    info = 'Add codz success'
    return HttpResponse(simplejson.dumps({'success': 1,
     'info': info,
     'id': z.id}, ensure_ascii=False), mimetype='application/json')


@login_required
def delcodz(req):
    xids = req.REQUEST.get('ids', '')
    if not xids:
        info = 'Nothing to be deleted'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    try:
        xid_list = xids.split(',')
        xid_list = [ xid.strip() for xid in xid_list if xid.strip() ]
        for xid in xid_list:
            x = Codz.objects.get(id=xid)
            x.delete()

        info = 'Delete codz success'
        return HttpResponse(simplejson.dumps({'success': 1,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    except Exception as e:
        print 'delcodz error: %s' % e
        info = 'Delete codz failure'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')


@login_required
def editcodz(req):
    if req.REQUEST.get('action', '') == 'show':
        xid = req.REQUEST.get('id', '')
        x = Codz.objects.get(id=xid)
        result = {'codz': x.codz,
         'desc': x.desc,
         'key': x.key,
         'type': x.type,
         'catelog': x.catelog,
         'author': x.author}
        return HttpResponse(simplejson.dumps(result, ensure_ascii=False), mimetype='application/json')


@login_required
def detail(req, template):
    xid = req.GET.get('id', '')
    x = Codz.objects.get(id=xid)
    codz_key = x.key
    codz_codz = x.codz
    codz_desc = x.desc
    __codz_codz = __get_system_codz(codz_key)
    if __codz_codz:
        codz_codz = __codz_codz
    result = RequestContext(req, {'codz_key': codz_key,
     'codz_codz': codz_codz,
     'codz_desc': codz_desc})
    return render_to_response(template, result)


def __get_system_codz(codz_key):
    f = open(settings.SITE_PATH + '/payloads/lib/w2g.js')
    cl = f.readlines()
    f.close()
    codz = []
    codz_append = False
    brace = 0
    for l in cl:
        l = l.decode('utf-8')
        if l.strip().startswith(codz_key) and l.strip()[len(codz_key):].strip().startswith('='):
            codz_append = True
        if codz_append:
            codz.append(l)
            if '{' in l:
                brace += 1
            if '}' in l:
                brace -= 1
            if brace == 0:
                codz_append = False

    return ''.join(codz)