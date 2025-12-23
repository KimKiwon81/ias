var DateUtil =
{
	Gch_TmSprtr : ':'
	,
	Gch_DtSprtr : '-'
	,
	/*
	 * =========================================================
	 * Date, Time
	 * =========================================================
	 * yyyyMMddHHmmss
	 * Array[0] = yyyyMMdd
	 * Array[1] = HHmmss
	 * =========================================================
	 */
	fn_SplitDtTm : function(pstStr)
	{
		var larDate = new Array();
		if(CommonUtil.fn_Equal(pstStr, 14))
		{
			var lstTemp = CommonUtil.fn_Separator(pstStr);
			larDate.push(lstTemp.substring(0,8));
			larDate.push(lstTemp.substring(8,14));
		}
		else if(CommonUtil.fn_Equal(pstStr, 12))
		{
			var lstTemp = CommonUtil.fn_Separator(pstStr);
			larDate.push(lstTemp.substring(0,7));
			larDate.push(lstTemp.substring(7,12));
		}
		return larDate;
	}
	,
	/*
	 * =========================================================
	 * Date
	 * =========================================================
	 * Array[0] = YYYY
	 * Array[1] = MM
	 * Array[2] = DD
	 * =========================================================
	 */
	fn_SplitDt : function(pstStr)
	{
		var larDate = new Array();
		if (CommonUtil.fn_Equal(pstStr, 8)) 
		{
			var temp = CommonUtil.fn_SeparatorWithSpace(pstStr);
			larDate.push(temp.substring(0,4));
			larDate.push(temp.substring(4,6));
			larDate.push(temp.substring(6,8));
		}
		return larDate;
	}
	,
	/*
	 * =========================================================
	 * Date
	 * =========================================================
	 * yyyy-MM-dd
	 * =========================================================
	 */
	fn_InsrtSprtrToDt : function(pstStr)
	{
		try {
			if(CommonUtil.fn_NotEqual(pstStr, 8)) {
				return pstStr;
			}
			else {
				return this.fn_SplitDt(pstStr).join(this.Gch_DtSprtr);
			}
		}
		catch (e) {
			//alert("fn_InsrtSprtrToDt : " + e);
		}	
	}
	,
	/*
	 * =========================================================
	 * Time
	 * =========================================================
	 * Array[0] = HH
	 * Array[1] = mm
	 * Array[2] = ss
	 * =========================================================
	 */
	fn_SplitTm : function(pstStr)
	{
		var larTmp = new Array();
		var temp = CommonUtil.fn_SeparatorWithSpace(pstStr);
		if (CommonUtil.fn_Equal(pstStr, 6)) 
		{
			larTmp.push(temp.substring(0,2));
			larTmp.push(temp.substring(2,4));
			larTmp.push(temp.substring(4,6));
		}
		else if(CommonUtil.fn_Equal(pstStr, 4))
		{
			larTmp.push(temp.substring(0,2));
			larTmp.push(temp.substring(2,4));
		}
		return larTmp;
	}
	,
	/*
	 * =========================================================
	 * Time 
	 * =========================================================
	 * HH:mm:ss
	 * =========================================================
	 */
	fn_InsrtSprtrToTm : function(pstStr)
	{
		var lstTemp = "";
		if(CommonUtil.fn_Equal(pstStr, 6))
			lstTemp = this.fn_SplitTm(pstStr).join(this.Gch_TmSprtr);
		else if(CommonUtil.fn_Equal(pstStr, 4))
			lstTemp = this.fn_SplitTm(pstStr).join(this.Gch_TmSprtr);
		return lstTemp;                         
	}
	,
	fn_ReplaceSprtrToDt : function(pstStr)
	{
		return CommonUtil.fn_ReplaceAll(pstStr, this.Gch_DtSprtr);
	}
	,
	fn_GetToDate : function(pSprtr)
	{	
		var now_date = new Date();
		var s_year	 = now_date.getFullYear();

		var s_month  = this.return0(now_date.getMonth()+1);	 // Date.getMonth() : 0 to 11
		var s_day 	 = this.return0(now_date.getDate());	 // 1 to 31

		return s_year + pSprtr + s_month + pSprtr + s_day;
	}
	,
	fn_GetDate : function(pSprtr, delay)
	{	
		var tDate = new Date();
		var tar_date = tDate.valueOf()+1000*60*60*24*delay;
		
		var now_date = new Date(tar_date);
		
		var s_year	 = now_date.getFullYear();
		
		var s_month  = this.return0(now_date.getMonth()+1);	 // Date.getMonth() : 0 to 11
		var s_day 	 = this.return0(now_date.getDate());	 // 1 to 31
				
		return s_year + pSprtr + s_month + pSprtr + s_day;
	}
	,
	fn_GetNowTime : function(pSprtr)
	{
		var time = new Date();	
		var s_hour = time.getHours();
		var s_min  = time.getMinutes();
		var s_sec  = time.getSeconds();

		if(s_hour<10) s_hour = "0" + s_hour;
		if(s_min<10)  s_min  = "0" + s_min;
		if(s_sec<10)  s_sec  = "0" + s_sec;

		return s_hour + pSprtr + s_min + pSprtr + s_sec;		
	}
	,
	return0 : function(str){
		
		str=""+str;
		if (str.length == 1) 
			str="0"+str;
			
		return str;
	}
	,
	fn_InputDate : function(obj, prefix)
	{

	    var inputDateVal = obj.value.replace(new RegExp(prefix, "g"), "");

	    if(new RegExp(/[^0-9]/).test(inputDateVal))
	    {
		    //alert('Enter only numbers.');	
		    //obj.select();
	    }

	    if(inputDateVal.length == 4 || inputDateVal.length == 6)
	    {
	    	obj.value = obj.value + prefix;
	    }
	}
	,
	/*
	 * =========================================================
	 * Date "-" remove
	 * =========================================================
	 * yyyyMMdd
	 * =========================================================
	 */
	fn_SplitDtSum : function(pstStr)
	{	
		var returnStr = pstStr.replace(new RegExp('[' + this.Gch_DtSprtr + ']', 'g'), '');
		
		return returnStr ;
	}
	,
	fn_CaptionDate : function (date,num) {

		var year = Number(date.substring(0,4));
		var month = Number(date.substring(4,6));
		var returnStr ;
		
		month = month + Number(num);
		
		if (month > 12) {
			month = month - 12;
			year = year + 1;
		}

		returnStr = new Array(String(year),String(month));

		return returnStr;
		
	}
	,
	fn_getNowYear(){

		var now_date = new Date();
		var s_year	 = now_date.getFullYear();
		
		return s_year + "";

	}
	,
	fn_getNowMonth(){

		var now_date = new Date();
		var s_month  = this.return0(now_date.getMonth()+1);	 // Date.getMonth() : 0 to 11
		
				
		return s_month;
		
	}
	,
	// 오늘로부터 1주일전 날짜 반환
	fn_GetLastWeek : function(pSprtr)
	{
		var now_date = new Date();
		var dayOfMonth = now_date.getDate();
		now_date.setDate(dayOfMonth - 7);

		var s_year	 = now_date.getFullYear();
		var s_month  = this.return0(now_date.getMonth()+1);	 // Date.getMonth() : 0 to 11
		var s_day 	 = this.return0(now_date.getDate());	 // 1 to 31

		return s_year + pSprtr + s_month + pSprtr + s_day;

	}


};



