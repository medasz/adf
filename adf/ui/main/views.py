# Embedded file name: C:\lab\w2g\ui\..\ui\main\views.py
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.template import Context, RequestContext
from django.template.loader import get_template
from django.utils import simplejson

@login_required
def index(req):
    test = ''
    return render_to_response('index.html', RequestContext(req, {'test': test}))