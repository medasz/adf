# Embedded file name: ./w2g_deploy.py
import os
import sys
import re
g_w2g_site_pre = ''
g_w2g_site = ''

def go():
    global g_w2g_site_precd
    all_files = []
    for root, dirs, files in os.walk('.'):
        if root.endswith('w2g.bak'):
            continue
        for f in files:
            if not f.endswith(('.py', '.js')):
                continue
            if f in __file__:
                continue
            all_files.append(os.path.abspath(os.path.join(root, f)))

    for f in all_files:
        o = open(f)
        c = o.read()
        o.close()
        if 'w2g_site' in c:
            replace(f)

    print '[*] w2g_site: %s -> %s' % (g_w2g_site_pre, g_w2g_site)


def replace(f):
    global g_w2g_site_pre
    o = open(f)
    c = o.read()
    o.close()
    if not g_w2g_site_pre:
        try:
            begin = re.search('w2g_site\\s*=\\s*[\'"]', c).end()
        except:
            return

        end = begin + c[begin:].index("'")
        raw_str = c[begin:end]
        g_w2g_site_pre = raw_str
    c = c.replace(g_w2g_site_pre, g_w2g_site)
    o = open(f, 'w')
    o.write(c)
    o.close()
    print '[+] %s changed.' % f


if __name__ == '__main__':
    g_w2g_site = raw_input('[*] set w2g_site value of web2ghost system, eg: http://w2g:8888\n[*] enter here: ').strip()
    if not g_w2g_site:
        raw_input('[*] w2g_site is null, exit.')
        sys.exit(0)
    if not g_w2g_site.startswith(('http://', 'https://')):
        raw_input('[*] w2g_site must startswith http:// or https://, exit.')
        sys.exit(0)
    if len(g_w2g_site) < 11:
        raw_input('[*] w2g_site seems to be not right, exit.')
        sys.exit(0)
    yn = raw_input('[*] w2g_site is %s, sure? Y/N: ' % g_w2g_site)
    print ''
    if yn.upper().strip() == 'Y':
        go()
    raw_input('\n[*] press any key to exit.')