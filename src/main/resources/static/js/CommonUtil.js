var Gst_NumberStr        = /[0-9]/g;
var Gst_NotNumberStr     = /[^0-9]/g;
var Gst_NotNumOrNotSprtr = /[^0-9-\/,:]/g;
var Gst_SeparatorStr     = /[-\/:]/g;
var Gst_SpaceStr         = /[\s]/g;
var Gst_AlphabatStr      = /[a-zA-Z]/g;
var Gst_NotAlphabatStr   = /[^a-zA-Z]/g;
var Gst_TimeSeparatorStr = /:/g;
var Gst_DtTmSeparatorStr = /[-:]/g;

var CommonUtil = {
	
	fn_ReplaceAll: function (str, char1, char2) 
	{
	    var sTempStr = "";
	    for(var i=0; i<str.length; i++) {
	        if(str.charAt(i) == char1) {
	            sTempStr += char2;
	        }
	        else {
	            sTempStr += str.charAt(i);
	        }
	    }
	    
	    return sTempStr;
	}
	,
	
	fn_DateFormat: function (strDate) {
		var dateRtn = "";
		
		var strDate1 = "";
		var strDate2 = "";
		var strDate3 = "";
		var strHour = "";
		var strMinute = "";
		var strSecond = "";
		
		if (strDate.length == 6) {
			strDate1 = strDate.substring(0,4);
			strDate2 = strDate.substring(4,6);			
			dateRtn = strDate1 + "-" + strDate2;
		}
		else if (strDate.length == 8) {
			strDate1 = strDate.substring(0,4);
			strDate2 = strDate.substring(4,6);
			strDate3 = strDate.substring(6,8);			
			dateRtn = strDate1 + "-" + strDate2 + "-" + strDate3;
		}
		else if (strDate.length == 14) {
			strDate1 = strDate.substring(0,4);
			strDate2 = strDate.substring(4,6);
			strDate3 = strDate.substring(6,8);			
			strHour = strDate.substring(8,10);
			strMinute = strDate.substring(10,12);
			strSecond = strDate.substring(12,14);			
			dateRtn = strDate1 + "-" + strDate2 + "-" + strDate3 + " " + strHour + ":" + strMinute + ":" + strSecond;
		}
		else {
			dateRtn = strDate;
		}
		
		return dateRtn;
	}
	,
	fn_NotEqual : function(pstStr, pitLength)
	{
		if(CommonUtil.fn_SeparatorWithSpace(pstStr).length !== parseInt(pitLength))
			return true;
		return false;
	}
	,
	
	fn_Equal : function(pstStr, pilLgth)
	{
		if(CommonUtil.fn_SeparatorWithSpace(pstStr).length === parseInt(pilLgth))
			return true;
		return false;
	}
	, 

	fn_SeparatorWithSpace : function(pstStr)
	{
		if(CommonUtil.fn_IsEmpty(pstStr))
			return "";
		return CommonUtil.fn_Space(CommonUtil.fn_Separator(pstStr));
	}
	,
	
	fn_Space : function(pstStr)
	{
		if(CommonUtil.fn_IsEmpty(pstStr))
			return "";
		return pstStr.valueOf().replace(Gst_SpaceStr, "");
	}
	,
	
	fn_Separator : function(pstStr)
	{
		if(CommonUtil.fn_IsEmpty(pstStr))
			return "";
		return (pstStr.valueOf()).replace(Gst_SeparatorStr, "");
	}	
	,
	
	fn_ReplaceChar : function(pstStr, pcChar1, pcChar2)
	{
		return pstStr.replace(new RegExp('[' + pcChar1 + ']', 'g'), pcChar2);
	}
	,
	
	fn_ReplaceAllChar : function(pstStr, pcChar1, pcChar2)
	{
		return pstStr.replace(new RegExp('[' + pcChar1 + ']', 'g'), pcChar2);
	}
	,
	
	fn_ReplaceEnter : function(pstStr)
	{
		for( var i=0; i < pstStr.length; i++ )
		{
			if( pstStr.charAt(i) == "\n" )
			{
				pstStr = pstStr.replace("\n"  , "<br />");
			}
		}		
		return pstStr;
	},
	
	fn_Trim : function(str)
	{
	    if (str == null) return "";
	
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	,
		
	fn_IsNumber : function(pstStr)
	{
		return Gst_NumberStr.test(pstStr);
	}
	,
	
	fn_IsSeparator : function(pstStr)
	{
		return Gst_SeparatorStr.test(pchChar);
	}
	,
	
	fn_IsEmpty : function(pstStr)
	{
		if(pstStr === undefined || pstStr === null ||  pstStr === "" || pstStr.length < 1)
			return true;
		return false;
	}
	,
	fn_IsNotEmpty : function(pstStr)
	{
		return !(this.fn_IsEmpty(pstStr));
	}
	,
	fn_FillZero : function(pstStr, piStrLen)
	{
		pstStr = pstStr + "";
		piStrLen = parseInt(piStrLen);
		
		var rtnStr = pstStr;
		var temStr = "";
		
		if (pstStr.length < piStrLen) {
			for (var i=0; i<piStrLen; i++) {
				temStr = temStr + "0";
			}
			
			rtnStr = temStr + pstStr;
			rtnStr = rtnStr.substring(rtnStr.length-piStrLen, rtnStr.length);
		}	
		
		return rtnStr;
	},
	fnAjaxCmm: (type, url, params, callback, errorAlert) => {
		$.ajax({
			type: type,
			url: url,
			data: params,
			// contentType: 'application/json',
			success: function (data, status, xhr) {
				return callback(data);
			},
			error: function (xhr, status, error) {
				console.error("xhr : ", xhr);
				if (errorAlert) {
					alert(errorAlert);
				} else {
					alert(xhr.responseJSON.message);
				}
			}
		});
	},
	fnAjaxCmmJson: (type, url, params, callback, errorAlert) => {
		$.ajax({
			type: type,
			url: url,
			data: JSON.stringify(params),
			contentType: 'application/json',
			success: function (data, status, xhr) {
				return callback(data);
			},
			error: function (xhr, status, error) {
				console.error("xhr : ", xhr);
				if (errorAlert) {
					alert(errorAlert);
				} else {
					alert(xhr.responseJSON.message);
				}
			}
		});
	},
	fnGetSbCodeListCmm: (code, callback, async) => {
		$.ajax({
			type: "POST",
			async: async ? true : async,
			url: "/getSbCodeList",
			data: {cdGrp: code},
			// contentType: 'application/json',
			success: function (data, status, xhr) {
				return callback(data.rtn.SBCODE_LIST);
			},
			error: function (xhr, status, error) {
				console.error("xhr : ", xhr);
				alert(xhr.responseJSON.message);
			}
		});
	},
	fnGetIvsCode: (code, callback, useYn, async) => {
		const params = {
			cdGrp: code,
			useYn: useYn
		};

		$.ajax({
			type: "POST",
			url: "/getIvsCode",
			contentType: 'application/json',
			async: async ? true : async,
			data: JSON.stringify(params),
			success: function (result, status, xhr) {
				if (result.data.length === 0) {
					alert("조회 데이터가 없습니다. 공통코드를 확인해 주세요.");
					return false;
				}
				return callback(result);
			},
			error: function (xhr, status, error) {
				console.error("xhr : ", xhr);
				alert(xhr.responseJSON.message);
			}
		});
	},
	/*
	* 저축은행 코드 (CBSOWN 공통?)
	*/
	fnGetSavBankCode: (callback, sbcd, async) => {
		const params = {
			sbcd: sbcd
		};

		$.ajax({
			type: "POST",
			url: "/getSavBankCode",
			contentType: 'application/json',
			async: async ? true : async,
			data: JSON.stringify(params),
			success: function (result, status, xhr) {
				if (result.data.length === 0) {
					alert("조회 데이터가 없습니다.");
					return false;
				}
				return callback(result);
			},
			error: function (xhr, status, error) {
				console.error("xhr : ", xhr);
				alert(xhr.responseJSON.message);
			}
		});
	},
	/*
	* 저축은행 콤보박스 공통처리
	*/
	fnGetOrgCd: (targetId, orgCd) => {
		// 로긴 저축은행 코드 체크
		const curOrgCd = $("#" + orgCd).val();

		return new Promise(resolve => {
			CommonUtil.fnGetSavBankCode(result => {
				if(curOrgCd === "900"){
					$("#" + targetId).empty().append("<option value=''>전체</option>");
					result.data.forEach(item => $("#" + targetId).append(`<option value='${item.sbcd}'>${item.svbnKrnAbrvNm}(${item.sbcd})</option>`));
				} else {
					$("#" + targetId).val(curOrgCd).attr("disabled", true);
					// 자기 저축은행만 append
					result.data.filter(item => item.sbcd === curOrgCd && $("#" + targetId).append(`<option value='${item.sbcd}'>${item.svbnKrnAbrvNm}(${item.sbcd})</option>`));
				}
				resolve("OK");
			});
		});
	}
};





