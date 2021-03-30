# Embedded file name: C:\lab\w2g\ui\settings.py
import os.path
SYSTEM_PATH = 'adgjl1359/'
SYSTEM_PATH = ''
SITE_PATH = os.path.abspath(os.path.dirname(__file__))
DEBUG = True
TEMPLATE_DEBUG = DEBUG
ADMINS = ()
MANAGERS = ADMINS
DATABASES = {'default': {'ENGINE': 'django.db.backends.mysql',
			 'NAME' : 'web2ghost',
			 'USER' : '{USER}',
			 'PASSWORD' : '{PASSOWRD}',
			 'HOST' : 'localhost',
			 'PORT' : 3306
			}}

TIME_ZONE = 'Asia/Shanghai'
LANGUAGE_CODE = 'zh_CN'
SITE_ID = 1
USE_I18N = True
USE_L10N = True
MEDIA_ROOT = 'statics/'
MEDIA_URL = '/statics/'
ADMIN_MEDIA_PREFIX = '/media/'
SECRET_KEY = '&tmqx)7cgyuwwic93cpt^o1v&nlr71ejw&-i--&xzw5*!)b^b*'
LOGIN_URL = '/' + SYSTEM_PATH + 'login/'
LOGOUT_URL = '/logout/'
TEMPLATE_LOADERS = ('django.template.loaders.filesystem.Loader', 'django.template.loaders.app_directories.Loader')
MIDDLEWARE_CLASSES = ('django.middleware.common.CommonMiddleware', 'django.contrib.sessions.middleware.SessionMiddleware', 'django.middleware.csrf.CsrfViewMiddleware', 'django.contrib.auth.middleware.AuthenticationMiddleware', 'django.contrib.messages.middleware.MessageMiddleware')
ROOT_URLCONF = 'ui.urls'
TEMPLATE_DIRS = (os.path.join(SITE_PATH, 'templates'), os.path.join(os.path.dirname(__file__)))
INSTALLED_APPS = ('ui.cc', 'ui.codz', 'django.contrib.auth', 'django.contrib.contenttypes', 'django.contrib.sessions', 'django.contrib.sites', 'django.contrib.messages', 'django.contrib.admin')
LOGIN_REDIRECT_URL = '/' + SYSTEM_PATH
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
