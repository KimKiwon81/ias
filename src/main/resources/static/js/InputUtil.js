var InputUtil =
{
	GchDateSeparator : '-'
	,
	GchMoneySeparator : ','
	,
	
	fn_InstSprtrMoney : function(poThis)
	{
		
		var lstTmp  = poThis.value;
		var liLngth = parseInt(lstTmp.length / 3)+1;
		var liTmp   = lstTmp.length % 3;
		var llTmp   = new Array();
		var liCnt   = 0;
		
		for(var i=0; i < liLngth; i++)
		{
			llTmp.push(lstTmp.substring(liCnt, (i*3)+liTmp));
			liCnt = (i*3)+liTmp;
		}
		if(liTmp === 0)
			poThis.value = llTmp.join(this.GchMoneySeparator).substring(1);
		else
			poThis.value = llTmp.join(this.GchMoneySeparator);
		
		return ;
	}
	,
	
	fn_ReplaceSprtrMoney : function(poThis)
	{
		var lsTmp = poThis.value;
		poThis.value = poThis.value.replace(/,/g, "");
		return;
	}
	,
	
	/*
	* =========================================================
	* Character remove
	* =========================================================
	*/
	fn_ChkNumberOnly : function(pObj)
	{	
		var NotNumOrNotSprtr = /[^0-9-\/,:]/g;
		var lstTemp = pObj.value;
		pObj.value  = lstTemp.replace(NotNumOrNotSprtr, '');
	}
	,
	
	fn_OnlyNumberInput : function() 
	{ 
		var code = window.event.keyCode; 
		
		if ((code > 34 && code < 41) 
				|| (code > 47 && code < 58)
				|| (code > 95 && code < 106) 
				|| code == 8 || code == 9 || code == 13 || code == 46) 
		{ 
			window.event.returnValue = true; 
			return; 
		} 
		window.event.returnValue = false; 
	} 
	,
	
	fn_replaceToNumber : function(pObj)
	{
		var elPObj = document.getElementById(pObj);
		var notNumRegExp = /[^0-9]/g;
		var lstTemp = elPObj.value;
		elPObj.value  = lstTemp.replace(notNumRegExp, '');

		return elPObj.value;
	}
	,
	/*
	 * ========================================================= 
	 * Move to the next object.
	 * =========================================================
	 * poThis    : Input Object
	 * pstNextId : Next Input Object ID
	 * =========================================================
	 */
	fn_MaxValueToNext : function(poThis, pstNextId)
	{	
		if(parseInt(poThis.value.length) === parseInt(poThis.maxLength))
			document.getElementById(pstNextId).focus();
		
		return;
	}
	,
	
	fn_InstSprtrToDate : function(poThis)
	{
		var litLngt = parseInt(CommonUtil.fn_SeparatorWithSpace(poThis.value).length); 
		if(litLngt === 4 || litLngt === 6)
			poThis.value = poThis.value + this.GchDateSeparator;
		return this.fn_ChkNumberOnly(poThis);
	}
	,
	
	// Input type is only korea
	fn_Chk_Hangul : function() 
	{	
		if ((event.keyCode<48) || (event.keyCode>57)){  // Korean
			event.returnValue = true;
		}else{ 
			event.returnValue = false; 		
		}
	}
	,	
	
	/*
	 * ========================================================= 
	 * Date Mask "-" add
	 * =========================================================
	 * poThis    : Input Object
	 * =========================================================
	 */
	fn_DateMaskOn : function(poThis)
	{ 
		// "-" remove
		var lsText = poThis.value;
		lsText = CommonUtil.fn_ReplaceAll(lsText, this.GchDateSeparator, "");
		
	    if(lsText.length > 3 ) {
	        var a1 = lsText.substring(0,4) + this.GchDateSeparator;
	        var a2 = lsText.substr(4, lsText.length);
	        var a3 = "";
	        if (lsText.length > 5){
	            a2 = lsText.substring(4,6) + this.GchDateSeparator;
	            a3 = lsText.substr(6, lsText.length);
	        }

	        poThis.value = a1 + a2 + a3;
	    }
	    else {
	    	poThis.value = lsText;
	    }
	    
	    return;
	}
	,
	fn_DateMaskOnValue : function(val)
	{ 
		// "-" remove
		var lsText = val;
		lsText = CommonUtil.fn_ReplaceAll(lsText, this.GchDateSeparator, "");

		var rtn = "";
		
	    if(lsText.length > 3 ) {
	        var a1 = lsText.substring(0,4) + this.GchDateSeparator;
	        var a2 = lsText.substr(4, lsText.length);
	        var a3 = "";
	        if (lsText.length > 5){
	            a2 = lsText.substring(4,6) + this.GchDateSeparator;
	            a3 = lsText.substr(6, lsText.length);
	        }

	        lsText = a1 + a2 + a3;
	    }
	    
	    
	    return lsText;
	}
	,
	
	/*
	 * ========================================================= 
	 * Date Mask "-" remove
	 * =========================================================
	 * poThis    : Input Object
	 * =========================================================
	 */
	fn_DateMaskOff : function(poThis)
	{
		var lsText = poThis.value;
	    var tmp = lsText.split(this.GchDateSeparator);
	    tmp = tmp.join("");	    
	    poThis.value = tmp;
	    return;
	}
	,
	fn_ValidDate : function (poFromDate, poToDate, maxDay)
	{	
		var elPoFromDate = document.getElementById(poFromDate);
		var elPoToDate = document.getElementById(poToDate);

		var sStartDate	= CommonUtil.fn_ReplaceAll(elPoFromDate.value, "-", "");
		var sEndDate  	= CommonUtil.fn_ReplaceAll(elPoToDate.value, "-", "");
		
		if (sStartDate == "") {
			alert("조회기간 시작일자를 입력하십시오.");
			elPoFromDate.focus();
			return false;
		}
		else if (sStartDate.length != 8) {
			alert("시작일자 연월일 8자리를 정확히 입력하십시오. (YYYY-MM-DD)");
			elPoFromDate.focus();
			return false;
		}
		else if (sEndDate == "") {
			alert("조회기간 종료일자를 입력하십시오.");
			elPoToDate.focus();
			return false;
		}
		else if (sEndDate.length != 8) {
			alert("종료일자 연월일 8자리를 정확히 입력하십시오. (YYYY-MM-DD)");
			elPoToDate.focus();
			return false;
		}

		var from_date = new Date(sStartDate.substring(0,4), sStartDate.substring(4,6), sStartDate.substring(6,8));
		var to_date   = new Date(sEndDate.substring(0,4), sEndDate.substring(4,6), sEndDate.substring(6,8));
		from_time = from_date.getTime();
		to_time   = to_date.getTime();
		//alert("from_time : " + from_time);
		//alert("to_time : " + to_time);
		if (to_date - from_date < 0) {
			alert("종료일은 시작일보다 작을 수 없습니다.");
			elPoToDate.focus();
			return false;
		}
		
		if (maxDay > 0) {
			if (from_time < to_time) {
				var day = to_time - from_time ;
				day = Math.floor(day/(24*3600*1000));
				//alert(day);
				if (day > maxDay) {
					if (maxDay == 31) {
						alert("최대 1개월 단위로만 조회 가능합니다.");
					}
					else if (maxDay == 365) {
						alert("최대 1년 단위로만 조회 가능합니다.");
					}
					else {
						alert("최대 " + maxDay + "일 이내로만 조회 가능합니다.");
					}
					elPoToDate.focus();
					return false;
				}
			}
		}
		
		return true;
	}
	,
	fn_ValidMonth : function (poFromDate, poToDate, maxMonth)
	{	
		var elPoFromDate = document.getElementById(poFromDate);
		var elPoToDate = document.getElementById(poToDate);

		var sStartDate	= CommonUtil.fn_ReplaceAll(elPoFromDate.value, "-", "");
		var sEndDate  	= CommonUtil.fn_ReplaceAll(elPoToDate.value, "-", "");
		
		if (sStartDate == "") {
			alert("조회기간 시작월을 선택 하십시오.");
			elPoFromDate.focus();
			return false;
		}
		else if (sStartDate.length != 6) {
			alert("시작일자 연월 6자리를 정확히 입력하십시오. (YYYY-MM)");
			elPoFromDate.focus();
			return false;
		}
		else if (sEndDate == "") {
			alert("조회기간 종료일자를 입력하십시오.");
			elPoToDate.focus();
			return false;
		}
		else if (sEndDate.length != 6) {
			alert("종료일자 연월 6자리를 정확히 입력하십시오. (YYYY-MM)");
			elPoToDate.focus();
			return false;
		}

		if (sEndDate - sStartDate < 0) {
			alert("종료월은 시작월보다 작을 수 없습니다.");
			elPoToDate.focus();
			return false;
		}
		
		if (maxMonth > 0) {
			if (sStartDate < sEndDate) {
				var mm = sEndDate - sStartDate ;
				//alert(day);
				if (mm > maxMonth) {
					alert("최대 " + maxMonth + "개월 이내로만 조회 가능합니다.");
					elPoToDate.focus();
					return false;
				}
			}
		}
		
		return true;
	}
	,
	fn_CheckRadioByValue : function (pstRadioName, pstValue)
	{   
		$("input:radio[name='"+pstRadioName+"']").removeAttr("checked");
		$("input:radio[name='"+pstRadioName+"']:radio[value='" + pstValue + "']").prop("checked",true);
	}
	,
	// radio 버튼에서 체크된 값 가져오기
    fn_getCheckedValue : function(psRadioName) {
        var lsChkValue = "";
        lsChkValue = $(':radio[name="' + psRadioName + '"]:checked').val();
        return lsChkValue;
    }
    ,
    // radio 버튼 값 체크하기
    fn_checkValue : function(psRadioName, psChkValue) {
        $('input:radio[name=' + psRadioName + ']:input[value=' + psChkValue + ']').attr("checked", true);
    }
    ,
    // 체크박스 전체 선택/해제
    fn_allCheckBox : function(objAllCheckbox, psCheckBoxName) {
        var thisChecked = $(objAllCheckbox).prop("checked");
    	if (thisChecked) {
    		$('input:checkbox[name=' + psCheckBoxName + ']').attr("checked", true);
    	}
    	else {
    		$('input:checkbox[name=' + psCheckBoxName + ']').attr("checked", false);
    	}
    }
	,
	fn_ValidJuminNo : function (pObj)
	{	
		var elPObj = document.getElementById(pObj);
		var juminRegExp = /\d{2}([0][1-9]|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])\d{7}/g;
		var lstTemp = elPObj.value;
		return juminRegExp.test(lstTemp);
	}
};

