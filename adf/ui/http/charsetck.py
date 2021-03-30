# Embedded file name: Z:\Dropbox\myproject\w2g\show\ui\..\ui\http\charsetck.py
"""\xe6\xa3\x80\xe6\xb5\x8b\xe7\xbd\x91\xe9\xa1\xb5\xe7\xbc\x96\xe7\xa0\x81
"""
import re
import chardet

def check(headers, html):
    charset = ''
    if headers and headers.has_key('content-type'):
        ct = headers['content-type'].lower()
        i = ct.find('charset=')
        if i != -1:
            charset = ct[i + len('charset='):].split(';')[0]
    if html and not charset:
        co = re.compile('<meta[^<>]+http-equiv[\\s="\']+Content-Type[^<>]*>', re.I)
        ct = co.findall(html)
        if ct:
            co = re.compile('charset\\s*=\\s*([^\'"\\s<>]+)', re.I)
            ctt = co.findall(html)
            if ctt:
                charset = ctt[0]
    if html and not charset:
        lines = html.split('\n')
        for i in [10, 30, 100]:
            charset = chardet.detect('\n'.join(lines[:i]))['encoding']
            if charset and charset.lower() != 'ascii':
                break

    if charset == None:
        charsrt = ''
    return charset.lower()


if __name__ == '__main__':
    import urllib2
    import sys
    import socket
    socket.setdefaulttimeout(8)
    try:
        url = sys.argv[1]
    except:
        print 'Usage: python charsetck.py http://www.baidu.com/'
        sys.exit(0)

    req = urllib2.Request(url)
    req.add_header('User-Agent', 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)')
    usock = urllib2.urlopen(req)
    headers = usock.headers.dict
    html = usock.read()
    usock.close()
    print check(headers, html)