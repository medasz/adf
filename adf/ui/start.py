# Embedded file name: ./start.py
import os
from optparse import OptionParser

def run_debug():
    """debug"""
    print '[*] web2ghost system is running at debug mode...'
    os.system('python manage.py runserver 0.0.0.0:8888')


def run_nginx():
    """nginx"""
    print '[*] make sure the nginx process is running.'
    print '[*] web2ghost system is running at nginx fastcgi mode...'
    os.system('python manage.py runfcgi method=threaded host=127.0.0.1 port=8887')


if __name__ == '__main__':
    usage = 'default run at debug mode: python start.py\n\trun at nginx fastcgi mode: python start.py --nginx'
    parser = OptionParser(usage)
    parser.add_option('--nginx', action='store_true', dest='nginx', default=False, help='run web2ghost at nginx fastcgi mode')
    options, args = parser.parse_args()
    g_nginx = options.nginx
    if g_nginx:
        run_nginx()
    else:
        run_debug()