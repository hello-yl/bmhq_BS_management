$(document).ready(function(){
	$(".btn.btn-primary.block.full-width.m-b").click(function(){
		$.ajax({
			type : "POST",
			async : false,
			dataType : 'json',
			url : "index/login",
			data : {
				mobile : $(".form-control.username").val(),
				loginPwd : $(".form-control.pwd").val(),
			},
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			beforeSend : function(xhr) {
				xhr.withCredentials = true;
			},
			success : function(data) {
				console.log(data);
				if(data.code == 200){
					$.cookie("token", data.result.token, {path: '/'});
					window.location.href="html/index.html";
				}else{
					alert(data.msg);
				}
			},
			error : function(err) {
				
			}
		});
	});
})