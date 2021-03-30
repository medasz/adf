# Embedded file name: Z:\Dropbox\myproject\w2g\show\ui\..\ui\setting\views.py
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.template import Context, RequestContext, loader
from django.views.generic.simple import direct_to_template, redirect_to
from django.contrib.auth.forms import PasswordChangeForm

@login_required
def index(req):
    return direct_to_template(req, 'setting/index.html')


@login_required
def changepwd(req, template):
    user = req.user
    msg = ''
    if req.method == 'GET':
        form = PasswordChangeForm(user)
    elif req.method == 'POST':
        form = PasswordChangeForm(user, req.POST)
        print req.user, req.POST, form.is_valid()
        if form.is_valid():
            form.save()
            msg = u'\u4fee\u6539\u6210\u529f\u2026\u2026'
        else:
            form = PasswordChangeForm(user, req.POST)
            msg = u'\u4fee\u6539\u5931\u8d25\u2026\u2026'
    return render_to_response(template, RequestContext(req, {'user': user,
     'form': form,
     'msg': msg}))