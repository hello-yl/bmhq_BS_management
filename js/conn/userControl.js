var page = 1;
$(document).ready(
    function () {
        //先执行一次查询
        getPageList(page);
        $(".btn.btn-primary").click(
            function () {
                page = 1;
                getPageList(page);
            });

    });

//冻结用户:-1     /解锁用户:1
function operateMember(mobile, flag) {

    $.ajax({
        async: false,
        dataType: 'json',
        url: "../memberAccounts/onOffMember",
        data: {
            mobile: mobile,
            flag: flag
        },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function (data) {
            if (data.code === 200) {
                alert("success");
                location.reload();
            }

        },
        fail: function () {
            alert("未知错误，请重试");
        }
    })
}

//冻结用户
function blockMember(mobile) {
    operateMember(mobile, -1);
}

//解锁用户
function unblockMember(mobile) {
    operateMember(mobile, 1);
}


//设为商家 取消商家
function setMerchant(mobile, flag) {
    $.ajax({
        async: false,
        dataType: 'json',
        url: "../memberAccounts/setMerchant",
        data: {
            mobile: mobile,
            flag: flag
        },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function (data) {
            if (data.code === 200) {
                alert("success");
                location.reload();
            }
        },
        fail: function () {
            alert("未知错误，请重试");
        }
    })
}

//增加商家资格
function addMerchant(mobile) {
    setMerchant(mobile, 0);
}

//删除商家资格
function removeMerchant(mobile) {
    setMerchant(mobile, -1);
}

// 查询成员列表
function getPageList(start) {
    $.ajax({
        type: "POST",
        async: false,
        dataType: 'json',
        url: "../memberAccounts/getPageList",
        data: {
            state: null,
            userType: null,
            mobile: $(".per-form-control.form-control.mobile").val(),
            start: page,
            size: 20
        },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
            if (data == null) {
                alert("获取信息失败");
            } else if (data.code == 1013) {
                parent.location.href = "../login.html";
            } else {
                if (data.code != 200) {
                    alert(data.msg);
                } else {
                    $(".table.table-bordered").empty();
                    $(".pagination").empty();
                    if (data.result.list != null) {
                        var list = data.result.list;
                        var html = "<thead><tr><th>序号</th><th>会员昵称</th><th>会员类型</th><th>会员状态</th><th>邮箱地址</th><th>联系方式</th><th>操作</th></tr></thead>";

                        list.forEach(function (item, index) {

                            html += '<tbody><th scope="row">' + (index + 1) + '</th>"' + '<td>' + item.userName + '</td>' + '<td>' + translateEmpty(item.userType)
                                + '</td>' + '<td>' + translateEmpty(item.state) + '</td>' + '<td>' + translateEmpty(item.email) + '</td>' + '<td>' + item.mobile + '</td>'
                                + '<td>' + '<button type="button" class="btn btn-xs btn-info" data-toggle="modal" data-target="#find" ' + 'onclick="switchToDetails(\''
                                + item.id + '\',\'' + item.mobile + '\')">查看/操作会员</button></tbody>';

                        });
//						console.log(html);
                        var total = data.result.totalPage;
                        var pageHtml = "";
                        for (var i = 0; i < total; i++) {
                            if (i == (page - 1)) {
                                pageHtml += "<li onclick='trunPage(" + (i + 1) + ")'> <span style='background-color: #22B8DD;'>" + (i + 1) + "</span> </li>";
                            } else {
                                pageHtml += "<li onclick='trunPage(" + (i + 1) + ")'> <span>" + (i + 1) + "</span> </li>";
                            }

                        }
                        $(".table.table-bordered").append(html);
                        $(".pagination").append(pageHtml);
                    }
                }
            }
        },
        fail: function (err) {
            var data = err.responseText;
            if (data == 1013) {
                parent.location.href = "../login.html";
            }
//			parent.location.href="../login.html";
//			window.location.href="www.baidu.com";
        },
        error: function (err) {
            var data = err.responseText;
            if (data == 1013) {
                parent.location.href = "../login.html";
            }
//			parent.location.href="../login.html";
//			window.location.href="www.baidu.com";
        }
    });
}

function translateEmpty(ele) {
    if (ele == null || ele === undefined || ele === "") {
        return "";
    }

    return ele;
}

function switchToDetails(id, mobile) {
    $.ajax({
        type: "POST",
        async: false,
        dataType: 'json',
        url: "../memberAccounts/getMemberInfo",
        data: {
            mobile: mobile
        },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
            if (data == null) {
                alert("获取信息失败");
            }
            var member = data.result;
            $("#userName").html(member.userName);
            $("#mobile").html(member.mobile);
            $("#eth").html(member.eth);
            $("#cashEth").html(member.cashEth);
            $("#freezeEth").html(member.freezeEth);
            $("#amount").html(member.amount);
            $("#cashAmount").html(member.cashAmount);
            $("#freezeAmount").html(member.freezeAmount);

            console.log("用户类型：" + member.userType);
            console.log("用户状态：" + member.state);
            //按钮属性添加
            if (member.userType === 0) {
                $("#addMerchant").hide();
            } else {
                $("#removeMerchant").hide();
            }
            if (member.state===1) {
                $("#unblockMember").hide();
            }else {
                $("#blockMember").hide();
            }

            $("#removeMerchant").attr("onclick", "removeMerchant(" + "'" + member.mobile + "'" + ")");
            $("#addMerchant").attr("onclick", "addMerchant(" + "'" + member.mobile + "'" + ")");
            $("#blockMember").attr("onclick", "blockMember(" + "'" + member.mobile + "'" + ")");
            $("#unblockMember").attr("onclick", "unblockMember(" + "'" + member.mobile + "'" + ")");


        },
        faile: function (err) {
            console.log(err.responseText);
            var data = err.responseText;

//			parent.location.href="../login.html";
//			window.location.href="www.baidu.com";
        },
        error: function (err) {
            console.log(err.responseText);
            var data = err.responseText;
//			parent.location.href="../login.html";
//			window.location.href="www.baidu.com";
        }
    });
}


function trunPage(start) {
    page = start;
    getPageList(start);
}



