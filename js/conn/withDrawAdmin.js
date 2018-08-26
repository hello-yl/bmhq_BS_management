var page = 1;
var lock = true;		//防重复提交锁
$(document).ready(
	function() {
		//先執行一次差尋
		getPageList();
		$(".btn-search").click(function() {
			page = 1;
			getPageList();
		});
	})

// 查询未处理信息记录
function getPageList(){
	
	$.ajax({
		type : "POST",
		dataType : 'json',
		url : "../eth/getPageList",
		data : {
			status : $("#status").val(),
			type : 2,
			start : page,
			mobile: $('#mobile').val(),
			code: $('#code').val()
		},
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend : function(xhr) {
			xhr.withCredentials = true;
		},
		success : function(data) {
			console.log(data);
			if(data == null){
				alert("获取信息失败");
			}else if(data.code == 1013){
				parent.location.href="../login.html";
			}else{
				if(data.code != 200){
					alert(data.msg);
				}else{
					$(".table.table-bordered").empty();
					$(".pagination").empty();
					if(data.result.list != null){
						var list = data.result.list;
						var html = "<thead><tr><th>序号</th><th>提现账户</th><th>会员编号</th><th>手机号码</th><th>会员名称</th><th>提现ETH金额</th><th>手续费</th><th>申请时间</th><th>操作</th></tr></thead>";
						
						list.forEach(function(item, index) {
							html += '<tbody><th scope="row">' + (index + 1 + data.result.start) + '</th>"' 
							     + '<td>' + item.account + '</td>' 
							     + '<td>' + item.memberId + '</td>'
							     + '<td>' + item.mobile + '</td>' 
							     + '<td>' + item.userName + '</td>' 
							     + '<td>' + item.eth + '</td>' 
							     + '<td>' + item.fee + '</td>' 
							     + '<td>' + item.time + '</td>'
								 + '<td>' 
								 + '&nbsp;&nbsp;<button type="button" class="btn btn-xs btn-warning" onclick="aldiv(' + item.id +  ');">确认提现</button></tbody>';
						});
						var total = data.result.totalPage;
						var pageHtml = "";
						for(var i = 0;i<total;i++){
							if(i == (page-1))
							{
								pageHtml +="<li onclick='trunPage("+(i+1)+")'> <span style='background-color: #22B8DD;'>"+(i+1)+"</span> </li>";
							}else{
								pageHtml +="<li onclick='trunPage("+(i+1)+")'> <span>"+(i+1)+"</span> </li>";
							}
							
						}
						$(".table.table-bordered").append(html);
						$(".pagination").append(pageHtml);
					}
				}
			}
		},
		faile:function(err){
			var data = err.responseText;
			if(data == 1013){
				parent.location.href="../login.html";
			}
		},
		error : function(err) {
			var data = err.responseText;
			if(data == 1013){
				parent.location.href="../login.html";
			}
//			parent.location.href="../login.html";
//			window.location.href="www.baidu.com";
		}
	});
}

function aldiv(id){
	$('#myModal').modal('show');
	$("#submit_btn").attr( "att" ,id )
}

$("#submit_btn").click(function() {
	var id = $(this).attr("att");
	//判断password是否有输入值
	if($("#pwd").val() == ''){
		alert('请输入密码');
		return;
	}else{
		updateEthOrder(id);
	}
});


//申请eth提现功能
function updateEthOrder(id)
{
	
	/*var result = confirm("确认允许提现");
	if(result)
	{*/
		if(lock == false){
			return;
		}
		buttonControl(false);    //禁用按钮
		
		$.ajax({
			type : "POST",
			dataType : 'json',
			url : "../eth/updateEthOrder",
			data : {
				id : id,
				pwd: $("#pwd").val()
			},
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			beforeSend : function(xhr) {
				xhr.withCredentials = true;
			},
			success : function(data) {
				if(data.code == 200){
					alert("处理成功!");
					getPageList();
					$('#myModal').modal('hide');
				}else if(data.code == 1003){
					alert("密码不正确");
				}else{
					alert("处理信息可能失败,请记下ID："+id);
				}
				buttonControl(true);    //启用按钮
			},
			error : function(err) {

			}
		});
	/*}else{
		
	}*/
}

function trunPage(limit){
	page = limit;
	getPageList();
}

//按钮禁用与启用	flag: true 启用   flag:false 禁用
function buttonControl(flag){
	if(flag)
	{
		lock = true;
		$(".btn").removeAttr("disabled");
	}else{
		lock = false;
		$(".btn").attr({"disabled":"disabled"});
	}
}


