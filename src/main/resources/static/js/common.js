//가이드 페이지 이동
function open_guid() {
	var popUrl = "./resource/guide/[4]ICS_GuidHtml_v1.3.htm"; //팝업창에 출력될 페이지 URL
	var popOption = "width=800, height=800, resizable=yes, scrollbars=yes, status=yes;"; //팝업창 옵션(optoin)

	window.open(popUrl, "", popOption);
}

//otp생성패이지 이동
function otpMakePage() {
	var popUrl = "http://61.36.66.36/IcsmKey/makeOtpPage.do";   //팝업창에 출력될 페이지 URL
	//var popUrl = "http://192.168.0.39:8080/IcsmKey/makeOtpPage.do"; //팝업창에 출력될 페이지 URL
	//var popUrl = "http://192.168.0.23:8086/IcsmKey/makeOtpPage.do";   //팝업창에 출력될 페이지 URL
	var popOption = "width=800, height=800, resizable=yes, scrollbars=yes, status=yes;"; //팝업창 옵션(optoin)
	window.open(popUrl, "", popOption);
}

//숫자만 입력 받게
function onlyNumber(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105)
			|| keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
		return;
	else
		return false;
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}