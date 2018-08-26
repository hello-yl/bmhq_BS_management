var page = 1;
$(document).ready(
	function() {
		//先執行一次差尋
		getPageList();
		$(".btn.btn-primary").click(
				function() {
					getPageList();
				});
	})

// 查询PDB订单列表
function getPageList(){
	$.ajax({
		type : "POST",
		async : false,
		dataType : 'json',
		url : "../pdb/getPageList",
		data : {
			status : $("#status").val(),
			type : 1,
			mobile : $(".per-form-control.form-control.mobile").val(),
			code : $(".per-form-control.form-control.code").val(),
			page : page
		},
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend : function(xhr) {
			xhr.withCredentials = true;
		},
		success : function(data) {
			console.log(data);
			if(data == null){
				alert("获取信息失败");
			}else
			if(data.code == 1013){
				parent.location.href="../login.html";
			}else{
				if(data.code != 200){
					alert(data.msg);
				}else{
					$(".table.table-bordered").empty();
					$(".pagination").empty();
					if(data.result.list != null){
						var list = data.result.list;
						var html = "<thead><tr><th>序号</th><th>订单号</th><th>会员昵称</th><th>类型</th><th>购买PDB数量</th><th>手续费</th><th>联系方式</th><th>下单时间</th><th>操作</th></tr></thead>";
						
						list.forEach(function(item, index) {
							html += '<tbody><th scope="row">' + (index + 1) + '</th>"' + '<td>' + item.code + '</td>' + '<td>' + item.userName + '</td>' + '<td>' + item.typeName
									+ '</td>' + '<td>' + item.amount + '</td>' + '<td>' + item.fee + '</td>' + '<td>' + item.mobile + '</td>' + '<td>' + item.time
									+ '</td>' + '<td>' 
									+ '&nbsp;&nbsp;<button type="button" class="btn btn-xs btn-warning" onclick="updateOrder(' + item.id + ',' + 3 + ');">确认已收款</button></tbody>';
							// '<button type="button" class="btn btn-xs
							// btn-danger"></button></td>'
						});
//						console.log(html);
						var total = data.result.totalPage;
						var pageHtml = "";
						for(var i = 0;i<total;i++){
							pageHtml +="<li onclick='trunPage("+(i+1)+")'> <span>"+(i+1)+"</span> </li>";
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
//			parent.location.href="../login.html";
//			window.location.href="www.baidu.com";
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

function updateOrder(id, status) {
	$.ajax({
		type : "POST",
		async : false,
		dataType : 'json',
		url : "../pdb/updatePDBOrder",
		data : {
			status : status,
			id : id
		},
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend : function(xhr) {
			xhr.withCredentials = true;
		},
		success : function(data) {
			if(data.code == 200){
				alert("处理成功!");
				getPageList();
			}else{
				alert("处理信息可能失败,请记下ID："+id);
			}
		},
		error : function(err) {

		}
	});
}

function trunPage(limit){
	page = limit;
	getPageList();
}



