#!/bin/bash
# desc: install component
# by . 2012/8/25

pids=`ps aux|grep manage.py|grep -v 'grep'|awk -F' ' '{print $2}'`
if [ "$pids" ];then
    kill -9 $pids
fi
