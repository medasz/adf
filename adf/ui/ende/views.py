# Embedded file name: C:\lab\w2g\ui\..\ui\ende\views.py
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.template import Context, RequestContext, loader
from django.views.generic.simple import direct_to_template, redirect_to

@login_required
def ende_basic(req):
    return direct_to_template(req, 'ende/basic.html')