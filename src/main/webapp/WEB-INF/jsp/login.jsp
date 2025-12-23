<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="./cmmn/include.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" type="text/css" href="./css/common.css" />
<title>IAS - tobe</title>
</head>
<body>
	<div class="wrap">
		<!-- header -->
		<header class="header">
			<div class="header-top">
				<h1 class="logo">
					<img src="/images/common/CI_w.gif" height="33px"/>
				</h1>
			</div>
			<div class="gnb-area">
				<ul class="gnb">
					<li class="depth1"></li>
					<li class="depth1"></li>
					<li class="depth1"></li>
					<li class="depth1"></li>
				</ul>
			</div>
		</header>
		<!-- content -->
		<div class="content">
			<div class="certificationArea login">
				<div class="inner">
					<h1>
						<span>통합 결재 시스템</span>
					</h1>
					<div class="inp-login-area">
						<div class="fl">
							<div class="inp">
								<input type="text" placeholder="아이디" id="USR_ID" name="USR_ID" value="" class="inpLogin" 
									style="ime-mode:disabled;"
									onKeyPress="if(event.keyCode == 13) { PASSWD.focus(); }" maxlength="12" />
								<input type="password" placeholder="비밀번호" id="PASSWD" name="PASSWD" value="" class="inpLogin" 
									onKeyPress="if(event.keyCode == 13) { fnLogin(); }"/>
							</div>
							<button class="login-btn" title="로그인" id="btnLogin">로그인</button>
						</div>
					</div>
				</div>
			</div>
			<div class="fl-wrap" style="width:100%; border:0px solid green;">
				<div class="tit-btn-area m_t15" style="float:right;">
					<a href="javascript:;" class="btn" style="height:35px; padding:0 26px; line-height:35px;" title="비밀번호 변경" onclick="popupOpen()">비밀번호 변경</a>
				</div>
			</div>
			
		</div>
		<!-- // content -->

	</div>

<script type="text/javascript">

var pwPop;
var focus_select = '';

$(document).ready(function(){

});

//로그인 결과
function fnLoginFail(rtnCd) {

	var msg = "";

	switch(rtnCd){
		case "10": 
			msg = "등록된 ID가 아닙니다. \r\n시스템 운영관리자에게 문의 바랍니다.";
			break;

		case "20": 
			msg = "미사용 계정입니다. \r\n시스템 운영관리자에게 문의하십시오.";
			break;

		case "30": 
			msg = "계정이 잠김상태입니다. \r\n시스템 운영관리자에게 계정잠김 해제를 요청하십시오.";
			break;

		case "40": 
			msg = "비밀번호 오류 5회 이상으로 계정이 잠김상태입니다. \r\n시스템 운영관리자에게 계정잠김 해제를 요청하십시오.";
			break;

		case "50": 
			msg = "장기(90일 이상) 미접속으로 계정이 잠김상태입니다. \r\n시스템 운영관리자에게 계정잠김 해제를 요청하십시오.";
			break;

		case "60": 
			msg = "초기화된 비밀번호입니다. \r\n비밀번호를 변경 후 로그인 하시기 바랍니다.";
			break;

		case "70": 
			msg = "비밀번호는 90일 마다 변경해야 합니다. \r\n비밀번호를 변경 후 로그인 하시기 바랍니다.";
			break;

		case "90": 
			msg = "아이디나 비밀번호가 정확하지 않습니다.";
			break;

		case "99": 
			msg = "로그인 중 시스템 오류가 발생했습니다.";
			break;

		default: 
			msg = "로그인 중 시스템 오류가 발생했습니다.";
			break;
	}

	$("#USR_ID").focus();

	return msg;
}

$("#btnLogin").click(function(){

	fnLogin();

});

function fnLogin(){

	if ($("#USR_ID").val() == "") {
		
		alert("아이디를 입력해 주십시오.");
		$("#USR_ID").focus();

	}else if ($("#PASSWD").val() == "") {
	
		alert("패스워드를 입력해 주십시오.");
		$("#PASSWD").focus();

	}else {
		fnLoginProc();
	}

}


function fnLoginProc(){

	var param = {
		usrId : $("#USR_ID").val()
		, passwd : $("#PASSWD").val()
	};

	$.ajax({
		type : "post"
		, dataType : "json"
		, async : true
		, url : "loginProc"
		, data : param
		, contentType : "application/x-www-form-urlencoded; charset=UTF-8"
		, beforeSend : function(request){
			request.setRequestHeader("AJAX", "true");
		}
		, success : function(data, textStatus){
			console.log("=== success ===");
			console.log(data);
			console.log("=== success ===");
			if(data.RTN_CD != "00"){
				var msg = fnLoginFail(data.RTN_CD);
				alert(msg);
				return false;
			}else{
				//location ="home";
				alert("SUCCESS!!!");
			}
			
		}
		, complete : function(){
		}
		,error : function(xhr, status, err){
			console.log("=== error ===");
			console.log(xhr);
			console.log("=== error ===");
		}
	});

}

	function popupOpen(){
		/*
		var EMP_ID='';
		USR_ID=document.getElementById('EMP_ID').value;
		var scWidth="";
		var scHeight="";
		scWidth=((screen.width/2)-(500/2))+"px";
		scHeight=((window.screen.height/2)-(600/2))+"px";
		window.name="parentForm"
		pwPop = window.open('/userChange?EMP_ID=' + EMP_ID,'pwchgpop', 'toolbar=no, location=no, directories=no, status=no, addressbar=no, menubar=no, copyhistory=no, width=500px, height=600px, top='+scHeight+',left='+scWidth);
		pwPop.focus();
		*/
		var popupParam = {
				EMP_ID : $("#EMP_ID").val()
				, ORG_CD : $("#ORG_CD").val()
				, ORG_NM : $("#ORG_CD option:selected").text()
			};

			openPopup(popupParam);
	}

	const openPopup = (params) => {
		const width = 500;
		const height = 650;
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;
		const target = dayjs().format("YYYYMMDD");

		window.open("", target, `width=\${width}, height=\${height}, left=\${left}, top=\${top}`);

		const form = $('<form>', {
			action: "/popup/passChange",
			method: "GET",
			target: target
		});

		if (params) {
		Object.entries(params).forEach(([key, val]) => {
			form.append(`<input type='hidden' name='\${key}' value='\${val}' />`);
		});
		}

		$("body").append(form);
		form.submit();
		form.remove();
  	};

</script>
</body>
</html>
