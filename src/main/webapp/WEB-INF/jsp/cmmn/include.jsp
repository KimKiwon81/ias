<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/design.js"></script>
<script type="text/javascript" src="/js/common.js"></script>

<script type="text/javascript" src="/js/CommonUtil.js"></script>
<script type="text/javascript" src="/js/InputUtil.js"></script>
<script type="text/javascript" src="/js/DateUtil.js"></script>
<script type="text/javascript" src="/js/dayjs.min.js"></script>

<script type="text/javascript">
var CONTEXT_ROOT = "/";
$(document)
.ajaxStart( function()
{
	$(".loading").show();
})
.ajaxComplete( function(ev, xhr, s)
{
	$(".loading").hide();
	
	try {
		eval('var ljData = ' + xhr.responseText);
		
		var sSessionExpired = "";
		var sAuthError = "";
		var sErrorCode = "";
		
		if (!CommonUtil.fn_IsEmpty(ljData.SESSION)) {
			sSessionExpired = ljData.SESSION;
		}
		
		if (!CommonUtil.fn_IsEmpty(ljData.AUTH_ERROR)) {
			sAuthError = ljData.AUTH_ERROR;
		}
		
		if (!CommonUtil.fn_IsEmpty(ljData.ERROR_CODE)) {
			sErrorCode = ljData.ERROR_CODE;
		}
		// 2023.12.13 db연결전 세션체크 임시주석
		// if (sSessionExpired === "EXPIRED") {
		// 	alert("접속 시간이 초과되었거나 잘못된 접근입니다.\r\n다시 로그인 하시기 바랍니다.");
		// 	top.location.href = "/login";
		// }
		else if (sAuthError === "NOTALLOW") {
			alert("요청하신 기능의 처리권한이 존재하지 않습니다.");
			return false;
		}
		else if (sErrorCode != "") {
			var lstParameter = "?ERROR_CODE="  + ljData.ERROR_CODE;
			// Error 화면 오픈
			WindowUtil.fn_Open("/common/CmnError/doInitPage.go"+lstParameter, "", 520, 320);
		}
	}
	catch(e) {
		alert("처리 중 시스템 오류가 발생했습니다.");
	}
});
</script>
