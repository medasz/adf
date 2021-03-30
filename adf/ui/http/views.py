# Embedded file name: Z:\Dropbox\myproject\w2g\show\ui\..\ui\http\views.py
from django.views.generic.simple import direct_to_template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.template import Context, RequestContext, loader
from django.template.loader import get_template
from django.utils import simplejson
import urllib2
import urllib
import charsetck

@login_required
def index(req):
    return direct_to_template(req, 'http/index.html')


def formatUrl(url):
    """\xe6\xa0\xbc\xe5\xbc\x8f\xe5\x8c\x96\xe5\x85\xa5\xe5\x8f\xa3url"""
    url = url.strip()
    tmpurl = url.lower()
    if not tmpurl.startswith(('http://', 'https://')):
        url = 'http://' + url
    return url


@login_required
def request(req):
    url = req.REQUEST.get('url')
    if not url or url.strip() == 'http://':
        return_json = {'success': 0,
         'info': u'URL\u4e0d\u80fd\u4e3a\u7a7a\u2026\u2026'}
        return HttpResponse(simplejson.dumps(return_json), mimetype='application/json')
    url = formatUrl(url)
    method = req.REQUEST.get('method', '').upper()
    req_headers = req.REQUEST.get('req_headers', '')
    postdata = req.REQUEST.get('postdata', '')
    req_headers_dict = {}
    if req_headers.strip():
        hl = req_headers.split('\n')
        for l in hl:
            if not l.strip():
                continue
            k, v = l.split(':', 1)
            req_headers_dict[k.strip()] = v.strip()

    if method == 'GET':
        req = urllib2.Request(url, headers=req_headers_dict)
    elif method == 'POST':
        if not postdata:
            return_json = {'success': 0,
             'info': u'POST DATA\u4e0d\u80fd\u4e3a\u7a7a\u2026\u2026'}
            return HttpResponse(simplejson.dumps(return_json), mimetype='application/json')
        datas = postdata.split('&')
        dataDict = {}
        for data in datas:
            dataList = data.split('=')
            dataDict[dataList[0]] = dataList[1]

        data = urllib.urlencode(dataDict)
        req = urllib2.Request(url, data=data, headers=req_headers_dict)
    else:
        return_json = {'success': 0,
         'info': u'\u8bf7\u6c42\u7c7b\u578b\u9519\u8bef\u2026\u2026'}
        return HttpResponse(simplejson.dumps(return_json), mimetype='application/json')
    usock = urllib2.urlopen(req)
    if not usock.url.startswith('http'):
        return_json = {'success': 0,
         'info': u'\u76ee\u6807URL\u8df3\u8f6c\u5230\u975e\u6cd5\u534f\u8bae\u5730\u5740\u2026\u2026'}
        return HttpResponse(simplejson.dumps(return_json), mimetype='application/json')
    headers = usock.headers.dict
    html = usock.read()
    usock.close()
    httpHead = ''
    for k in headers:
        httpHead += k + ': ' + headers[k] + '\n'

    charset = charsetck.check(headers, html)
    if charset != 'utf-8':
        try:
            html = html.decode(charset, 'ignore').encode('utf-8')
        except Exception as e:
            pass

    return_json = {'success': 1,
     'info': u'\u8bf7\u6c42\u6210\u529f\u2026\u2026',
     'httphead': httpHead,
     'httpbody': html}
    return HttpResponse(simplejson.dumps(return_json), mimetype='application/json')