
var ImgUtil =
{
	TYPE_VIEW : 1
	,
	TYPE_THUMB : 10
	,
	// 뷰어 모듈 초기화 (1:정상)
	initEzViewer : function(objEzViewer)
	{
		var iRtn = -1;
		try {
			iRtn = objEzViewer.EzS_Register(EZS_VIEW_LIC_KEY1, EZS_VIEW_LIC_KEY2);
		}
		catch(e) {
			//alert(e);
		}
		
		if (iRtn == 1) {
			objEzViewer.VwDesign(1, ImgUtil.TYPE_VIEW, true);
		}
		
		return iRtn;
	}
	,
	// 썸네일 모듈 초기화 (1:정상)
	initEzThumb : function(objEzThumb)
	{
		var iRtn = -1;
		try {
			iRtn = objEzThumb.EzS_Register(EZS_VIEW_LIC_KEY1, EZS_VIEW_LIC_KEY2);
		}
		catch(e) {
			//alert(e);
		}
		
		if (iRtn == 1) {
			objEzThumb.VwDesign(1, ImgUtil.TYPE_THUMB, true);
		}
		
		return iRtn;
	}
	,
	makeWorkDirectory : function(objVoimFileTrans, psDir)
	{
		var lRet = -1;
		try {
			lRet = objVoimFileTrans.CreateDirectory(psDir);
		}
		catch(e) {
			//alert(e);
			//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.\r\nF5키를 누르고 화면을 새로고침해서 다시 설치하시기 바랍니다.");
			//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.");
		}
		
		return lRet;
	}
	,
	makeDirectory : function(objVoimFileTrans, psDir)
	{
		var lRet = -1;
		
		try {
			lRet = objVoimFileTrans.CreateDirectory(psDir);
		}
		catch(e) {
			//alert(e);
			//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.\r\nF5키를 누르고 화면을 새로고침해서 다시 설치하시기 바랍니다.");
			//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.");
		}
		
		return lRet;
	}
	,
	// 마스킹 서버에서 파일 다운로드 (0:성공)
	downloadFile : function (objVoimFileTrans, pbAlertError, psLocalPath, psServerPath) 
	{
		var receiveResult = -1;
		
		try {
			// 파일 다운로드 (0 : 성공)
			receiveResult = objVoimFileTrans.ReceiveFile(FILE_SERVER_IP, FILE_SERVER_PORT, psLocalPath, psServerPath);
			if (receiveResult != 0) {
				if (receiveResult == -120) {
					if (pbAlertError) {
						alert("서버에 파일이 존재하지 않습니다. \r\n(" + psServerPath + ")");
					}
				}
				else if (receiveResult == -104) {
					if (pbAlertError) {
						alert("파일 서버와 통신 중 오류가 발생했습니다. \r\n시스템관리자에게 문의하십시오.");
					}
				}
				else {
					if (pbAlertError) {
						alert("파일 다운로드를 실패했습니다. 에러코드(" + receiveResult + ")");
					}
				}
			}
		}
		catch(e) {
			//alert(e);
			if (pbAlertError) {
				//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.\r\nF5키를 누르고 화면을 새로고침해서 다시 설치하시기 바랍니다.");
				//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.");
			}
		}
		
		return receiveResult;
	}
	,
	// 마스킹 서버로 파일 업로드 (0:성공)
	uploadFile : function (objVoimFileTrans, pbAlertError, psServerPath, psLocalPath) 
	{
		var sendResult = -1;
		
		try {
			// 파일 업로드 (0 : 성공)
			sendResult = objVoimFileTrans.SendFile(FILE_SERVER_IP, FILE_SERVER_PORT, psServerPath, psLocalPath);
			//alert("sendResult : " + sendResult);
			if (sendResult != 0) {
				if (sendResult == -104) {
					if (pbAlertError) {
						alert("파일 서버와 통신 중 오류가 발생했습니다. \r\n시스템관리자에게 문의하십시오.");
					}
				}
				else {
					if (pbAlertError) {
						alert("파일 전송을 실패했습니다. 에러코드(" + sendResult + ")");
					}
				}
			}
		}
		catch(e) {
			//alert(e);
			if (pbAlertError) {
				//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.\r\nF5키를 누르고 화면을 새로고침해서 다시 설치하시기 바랍니다.");
				//alert("파일전송 프로그램이 정상적으로 설치되지 않았습니다.");
			}
		}
		
		return sendResult;
	}
	,
	fileDelete : function(objVoimFileTrans, psFilePath)
	{
		return;
		
		var lRet = -1;
		
		try {
			lRet = objVoimFileTrans.FileDelete(psFilePath);
			//alert("FileDelete : " + lRet);
		}
		catch(e) {
			//alert(e);
		}
		
		return lRet;
	}
	,
	getEzDir : function(objEzViewer)
	{
		var strEzDir = "";
		try {
			// C:\Users\사용자\Documents\EzSForm
			strEzDir = objEzViewer.VwOcxDirAsk(1);
		}
		catch(e) {
			//alert(e);
		}
		return strEzDir;
	}
	,
	eraseAllFiles : function(objEzViewer)
	{	
		var strEzDir = objEzViewer.VwOcxDirAsk(1);
		// 전체 삭제는 VwOcxDirAsk 로 반환되는 경로에 한해서만 가능함
		var liDelCnt = objEzViewer.EzSEraseFiles(strEzDir, "*", 0);  
		//alert(strEzDir + " / liDelCnt : " + liDelCnt);
	}
	,
	eraseAllExtFiles : function(objEzViewer, strExt)
	{	
		var strEzDir = objEzViewer.VwOcxDirAsk(1);
		// 전체 삭제는 VwOcxDirAsk 로 반환되는 경로에 한해서만 가능함
		var liDelCnt = objEzViewer.EzSEraseFiles(strEzDir, strExt, 0); // 특정 황장자만 삭제 (예: ".tif") 
		//alert(strEzDir + " / liDelCnt : " + liDelCnt);
	}
	,
	eraseFile : function(objEzViewer, psFilePath)
	{
		try {
			objEzViewer.VwEraseFile(psFilePath);
		}
		catch(e) {
			//alert(e);
		}
	}
	,
	initToolBar : function(objEzViewer, psRotate)
	{
		// 이미지뷰어 툴바 버튼 표시 (1:표시/0:숨김)
		var ToolbarBtn = new Array(); // 16개
		ToolbarBtn.push("1");       // 확대
		ToolbarBtn.push("1");       // 축소
		ToolbarBtn.push("1");       // 확대비율
		ToolbarBtn.push("1");       // 가로맞춤
		ToolbarBtn.push("1");       // 세로맞춤
		ToolbarBtn.push("1");       // 화면맞춤
		ToolbarBtn.push("1");       // 세로선
		ToolbarBtn.push(psRotate);  // 270도 회전
		ToolbarBtn.push(psRotate);  // 180도 회전
		ToolbarBtn.push(psRotate);  // 90도 회전
		ToolbarBtn.push("0");       // 여백
		ToolbarBtn.push("0");       // 이동모드
		ToolbarBtn.push("0");       // 돋보기
		ToolbarBtn.push("0");       // 선택영역 확대
		ToolbarBtn.push("0");       // 마스킹 추가
		ToolbarBtn.push("0");       // 마스킹 선택
		
		var szBtnBisible = ToolbarBtn.join("");
		objEzViewer.VwToolBtnVisible(szBtnBisible);
	}
	,
	// 이미지뷰어에 로컬 파일 조회 (1:성공)
	localFromFile : function (objEzViewer, pbAlertError, psLocalImgPath, psImgFileName, piPageNo) 
	{
		var nRtnView = -1;
		
		// 멀티-TIFF인 경우 싱글-TIFF자동변환을 위한 설정값
		var nPageNo   = piPageNo;       // 화면에 표시할 페이지 번호 (멀티-TIFF일 경우 페이지 번호)
		var nFit      = 3;              // 이미지 창에 표시할 때 크기 (1:너비맞춤, 2:높이맞춤, 3:창크기맞춤, 100:실제크기)
		var szTagDir  = psLocalImgPath; // 싱글-TIFF 저장 폴더 경로 (멀티-TIFF와 동일한 경로에 저장)
		var szTagHead = psImgFileName.substring(0, psImgFileName.lastIndexOf(".")) + "_"; // 생성할 싱글-TIFF 이미지 파일명의 선두문자열 
		var szTagExt  = ".tif";         // 생성할 싱글-TIFF 이미지 파일의 확장자명
		var nPageLen  = 3;              // 생성할 싱글-TIFF 파일명의 페이지 순번 자릿수
		
		nRtnView = objEzViewer.EzSLocalFromFile(psLocalImgPath + psImgFileName, nPageNo, nFit, szTagDir, szTagHead, szTagExt, nPageLen);
		if (nRtnView == 1) {
			// 성공
		}
		else if (nRtnView == -9) {
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일이 아닙니다.");
			}
		}
		else if (nRtnView == -23) {
			if (pbAlertError) {
				alert(psImgFileName + " - 파일이 손상되어 이미지를 조회할 수 없습니다.");
			}
		}
		else if (nRtnView == -10607) {
			if (pbAlertError) {
				alert(psImgFileName + " - PDF 파일은 조회가 불가능합니다.");
			}
		}	
		else { // 그 외 예외처리
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일 조회 중 오류가 발생했습니다. 에러코드(" + nRtnIns + ")");
			}
		}
		
		return nRtnView;
	}
	,
	// 썸네일에 이미지 추가 (1:성공)
	thumbIns : function (objEzThumb, pbAlertError, psLocalImgPath, psImgFileName, psImageType) 
	{
		var nRtnIns = -1;
		
		// 현재 썸네일 최종 갯수
		var thumbTotalCnt = objEzThumb.VwThumbCnt();
		
		// 멀티-TIFF인 경우 싱글-TIFF자동변환을 위한 설정값
		var szTagDir  = psLocalImgPath; // 싱글-TIFF 저장 폴더 경로 (멀티-TIFF와 동일한 경로에 저장)
		var szTagHead = psImgFileName.substring(0, psImgFileName.lastIndexOf(".")) + "_"; // 생성할 싱글-TIFF 이미지 파일명의 선두문자열 
		var szTagExt  = ".tif";         // 생성할 싱글-TIFF 이미지 파일의 확장자명
		var nPageLen  = 3;              // 생성할 싱글-TIFF 파일명의 페이지 순번 자릿수
		
		nRtnIns = objEzThumb.EzSThumbIns(0, psLocalImgPath + psImgFileName, szTagDir, szTagHead, szTagExt, nPageLen);
		if (nRtnIns == 1) {
			var liMultiCnt = objEzThumb.EzSViewTifCnt();
			//alert("liMultiCnt : " + liMultiCnt);
			for (var page=1; page<=liMultiCnt; page++){
				if (liMultiCnt > 1) { // 멀티-TIFF
					objEzThumb.VwThumbSetText(thumbTotalCnt + page, psImgFileName + " - [" + psImageType + "] (" + page + " / " + liMultiCnt + ") ");
				}
				else {
					objEzThumb.VwThumbSetText(thumbTotalCnt + page, psImgFileName + " - [" + psImageType + "] ");
				}
			}
		}
		else if (nRtnIns == -9) {
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일이 아닙니다.");
			}
		}
		else if (nRtnIns == -23) {
			if (pbAlertError) {
				alert(psImgFileName + " - 파일이 손상되어 이미지를 조회할 수 없습니다.");
			}
		}
		else if (nRtnIns == -10607) {
			if (pbAlertError) {
				alert(psImgFileName + " - PDF 파일은 조회가 불가능합니다.");
			}
		}	
		else { // 그 외 예외처리
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일 조회 중 오류가 발생했습니다. 에러코드(" + nRtnIns + ")");
			}
		}
		
		return nRtnIns;
	}
	,
	// 썸네일 중 특정 페이지 이미지를 replace하여 표시 (멀티-TIFF 수동마스킹 추가 후 썸네일 표시)
	thumbReplace : function (objEzThumb, pbAlertError, pnPos, psLocalImgPath, psImgFileName) 
	{
		var nRtnIns = -1;
		
		// 멀티-TIFF인 경우 싱글-TIFF자동변환을 위한 설정값 (
		var szTagDir  = ""; // 싱글-TIFF 저장 폴더 경로 (멀티-TIFF와 동일한 경로에 저장)
		var szTagHead = ""; // 생성할 싱글-TIFF 이미지 파일명의 선두문자열 
		var szTagExt  = ".tif";         // 생성할 싱글-TIFF 이미지 파일의 확장자명
		var nPageLen  = 3;              // 생성할 싱글-TIFF 파일명의 페이지 순번 자릿수
		
		// 1 : 성공
		nRtnIns = objEzThumb.EzSThumbIns(-pnPos, psLocalImgPath + psImgFileName, szTagDir, szTagHead, szTagExt, nPageLen);
		if (nRtnIns != 1) {
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일 조회 중 오류가 발생했습니다. 에러코드(" + nRtnIns + ")");
			}
		}
		
		return nRtnIns;
	}
	,
	// 썸네일을 초기화하고 메모리 방식으로 이미지 추가 (1:성공)
	thumbInsOpt : function (objEzThumb, pbAlertError, psLocalImgPath, psImgFileName, psImageType) 
	{
		var nRtnIns = -1;
		
		// 썸네일 초기화
		var nRet = objEzThumb.VwThumbDel(0);
		
		// 멀티-TIFF인 경우 싱글-TIFF자동변환을 위한 설정값
		var szTagDir  = psLocalImgPath; // 싱글-TIFF 저장 폴더 경로 (멀티-TIFF와 동일한 경로에 저장)
		var szTagHead = psImgFileName.substring(0, psImgFileName.lastIndexOf(".")) + "_"; // 생성할 싱글-TIFF 이미지 파일명의 선두문자열 
		var szTagExt  = ".tif"; // 생성할 싱글-TIFF 이미지 파일의 확장자명
		var nPageLen  = 3;      // 생성할 싱글-TIFF 파일명의 페이지 순번 자릿수
		var szVwPos   = "";     // 멀티-TIFF 특정페이지만 화면에 로드할때 사용 (값이 없으면 전체 페이지 로드)
		var nTagErase = 1;      // 값이 1일때는 썸네일 로드 후 싱글로 풀어진 이미지 파일 삭제
		var nSngSave  = 1;      // 값이 1일때는 메모리를 Clear 하고 멀티 파일인 경우 싱글로 저장된 파일 메모리에 저장함
		
		try {
			nRtnIns = objEzThumb.EzSThumbInsOpt(0, psLocalImgPath + psImgFileName, szTagDir, szTagHead, szTagExt, nPageLen, szVwPos, nTagErase, nSngSave);
			//alert("EzSThumbInsOpt : " + nRtnIns);
		}
		catch(e) {
			//alert("err : " + e);
		}
		
		if (nRtnIns == 1) {
			// 최근에 썸네일 메모리에 로드한 이미지의 페이지수
			var nTotMemCnt  = objEzThumb.EzSRefErr(4);  // 멀티-TIFF 전체 페이지 수
			var nMemLoadCnt = objEzThumb.EzsRefErr(5);  // 메모리에 로드된 페이지 수
			//alert("nTotMemCnt : " + nTotMemCnt + "  / nMemLoadCnt : " + nMemLoadCnt);
			
			var nMemCnt = objEzThumb.EzSMemCnt();
			//alert("nMemCnt : " + nMemCnt);
			
			var liMultiCnt = objEzThumb.EzSViewTifCnt();
			for (var page=1; page<=liMultiCnt; page++){
				if (liMultiCnt > 1) { // 멀티-TIFF
					objEzThumb.VwThumbSetText(page, psImgFileName + " - [" + psImageType + "] (" + page + " / " + liMultiCnt + ") ");
				}
				else {
					objEzThumb.VwThumbSetText(page, psImgFileName + " - [" + psImageType + "] ");
				}
			}
		}
		else if (nRtnIns == -9) {
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일이 아닙니다.");
			}
		}
		else if (nRtnIns == -23) {
			if (pbAlertError) {
				alert(psImgFileName + " - 파일이 손상되어 이미지를 조회할 수 없습니다.");
			}
		}
		else if (nRtnIns == -10607) {
			if (pbAlertError) {
				alert(psImgFileName + " - PDF 파일은 조회가 불가능합니다.");
			}
		}	
		else { // 그 외 예외처리
			if (pbAlertError) {
				alert(psImgFileName + " - 이미지 파일 조회 중 오류가 발생했습니다. 에러코드(" + nRtnIns + ")");
			}
		}
		return nRtnIns;
	}
	,
	// 메모리에 저장된 파일건수 반환
	getMemCnt : function (objEzThumb) 
	{
		var nTotMemCnt = 0;
		
		// 메모리에 저장된 파일건수
		nTotMemCnt = objEzThumb.EzSMemCnt();
		//alert("nTotMemCnt : " + nTotMemCnt);
		
		// 최근에 썸네일 메모리에 로드한 이미지의 페이지수
		//var nTotMemCnt  = objEzThumb.EzSRefErr(4);  // 멀티-TIFF 전체 페이지 수
		//var nMemLoadCnt = objEzThumb.EzsRefErr(5);  // 메모리에 로드된 페이지 수
		//alert("nTotMemCnt : " + nTotMemCnt + "  / nMemLoadCnt : " + nMemLoadCnt);
		
		return nTotMemCnt;
	}
	,
	// 이미지 파일을 메모리에 로드 (1이상:성공)
	// 이미지 파일을 메모리에 로드 하거나 nPos 번째의 이미지를 교체 (1이상:성공) 
	memLoadFromFile : function (objEzThumb, pnPos,  psImgFilePath) 
	{	
		var nLoadMem = -1;
		
		var nOpt = 0;      // 고정값
		
		// nPos 값이 0이면 메모리에 이미지를 추가를 하고 0보다 크면 Replace
		// 로드 가능한 이미지는 파일사이즈는 약 500MB
		try {
			// 성공 시 nPos 리턴 
			nLoadMem = objEzThumb.EzSMemLoadFromFile(pnPos, nOpt, psImgFilePath);
		}
		catch(e) {
			//alert("err : " + e);
		}
		
		return nLoadMem;
	}
	,
	// 메모리에 로드되어 있는 이미지를 파일로 저장 (1 이상 : 성공)
	memSaveToFile : function (objEzThumb, pImgPos, psSaveFilePath) 
	{
		var nRtnSave = -1;
		
		var nPos = pImgPos;  // 파일로 저장할 이미지의 순번
		var nOpt = 0;        // 고정값
		
		// 메모리에 로드되어 있는 이미지를 파일로 저장 (파일사이즈 리턴)
		nRtnSave = objEzThumb.EzSMemSaveToFile(nPos, nOpt, psSaveFilePath);
		//alert("nRtnSave : " + nRtnSave);
		if (nRtnSave < 1) {
			//alert(psSaveFilePath + " - 이미지 파일 저장 중 오류가 발생했습니다. 에러코드(" + nRtnSave + ")");
		}
		
		return nRtnSave;
	}
	,
	// 메모리에 로드되어 있는 이미지를 멀티-TIFF 파일로 저장 (1 이상 : 성공)
	memSaveToMultiTif : function (objEzThumb, psSaveFilePath) 
	{
		var nSaveCnt = 0; 
		
		var nTotMemCnt = objEzThumb.EzSMemCnt();
		var nThumbCnt = objEzThumb.VwThumbCnt();
		if (nThumbCnt != nTotMemCnt) {
			nRtnSave = -2;
			return nRtnSave;
		}
		
		var liSingleCnt = 0;
		var lsSingleFileName = "";
		
		var nRet = objEzThumb.ImgListAdd(0, ""); // 파일리스트 초기화
		if (nRet == 0) {
			for (var i=1; i<=nTotMemCnt; i++) {
				// 썸네일 메모리에 로드되어 있는 이미지를 파일로 저장 (파일사이즈 리턴)
				lsSingleFileName = ImgUtil.getSingleFileName(psSaveFilePath, i, 3);
				var nRtnSave = objEzThumb.EzSMemSaveToFile(i, 0, lsSingleFileName);
				if (nRtnSave < 1) {
					break;
				}
				else {
					// 파일리스트에 Single이미지 추가
					nRet = objEzThumb.ImgListAdd(i, lsSingleFileName); // 성공 시 페이지번호 반환
					//alert(i + " page : " + lsSingleFileName + " => nRet : " + nRet)
					if (nRet > 0) {
						liSingleCnt ++;
					}
					else {
						break;
					}
				}
			}
			
			if (nTotMemCnt == liSingleCnt) {
				// 멀티-TIFF 저장
				var nPageCnt = objEzThumb.EzSSngTifToMulti(psSaveFilePath, liSingleCnt); // 저장한 페이지수 반환
				//alert("EzSSngTifToMulti  => nRet : " + nRet);
				if (nPageCnt == liSingleCnt) {
					nSaveCnt = liSingleCnt;
				}
				else {
					//alert("멀티TIF 이미지 저장 중 오류가 발생했습니다.");
				}
			}
			else {
				//alert("Single 이미지 파일 생성 중 오류가 발생했습니다.");
			}
		}
		
		objEzThumb.ImgListAdd(-1, ""); // 파일리스트 종료
		
		return nSaveCnt;
	}
	,
	// 마스킹 주석을 포함하여 이미지 파일 저장 (0 이상 : 성공 - 저장된 마스킹 갯수 반환)
	imgAnnToFile : function (objEzViewer, pbAlertError, psSaveFilePath) 
	{	
		var nSaveCnt = -1;
		
		var nAnnKind = 0;  // 고정값 (0:마스킹)
		var dBwCol   = 0;  // 마스킹 흑백 이미지 색상 지정 (0:black)
		var dColCol  = 0;  // 마스킹 컬러 이미지 색상 지정 (0:black)
		var nBwFile  = 0;  // 고정값
		var nColFile = 0;  // 고정값
		
		try {
			
			// 수동마스킹 : 체스판 무늬 설정 
			//objEzViewer.VwMaskType(56);
			//objEzViewer.VwMaskType(50);
			objEzViewer.VwMaskType(30);
			
			// 마스킹 갯수 반환(마스킹 없이 저장하는 경우 0 반환) 
			nSaveCnt = objEzViewer.EzSimgAnnToFile(nAnnKind, psSaveFilePath, dBwCol, dColCol, nBwFile, nColFile);
			//alert("nSaveCnt : " + nSaveCnt);
		}
		catch(e) {
			//alert(e);
		}
		
		if (nSaveCnt >= 0) {
			// 성공
		}
		else { // 그 외 예외처리
			if (pbAlertError) {
				alert("수동마스킹 이미지 저장 중 오류가 발생했습니다. 에러코드(" + nSaveCnt + ")");
			}
		}
		
		return nSaveCnt;
	}
	,
	// 마스킹 주석을 포함하여 이미지 파일 저장하고, 복원영역을 별도의 파일로 저장  (0 이상 : 성공 - 저장된 마스킹 갯수 반환)
	imgAnnToKeyFileEx : function (objEzViewer, pbAlertError, psSaveFilePath, psResFilePath) 
	{	
		var nSaveCnt = -1;
		
		// nResOpt : 복원파일 저장 및 암호화 옵션
		// 11 (복원파일 별도 저장. 암호화 미적용)
		// 12 (복원파일 별도 저장. 암호화 적용)
		// 21 (마스킹파일에 복원영역 저장. 암호화 미적용)
		// 22 (마스킹파일에 복원영역 저장. 암호화 적용)
		
		//var nResOpt  = 12;   // 암호화 적용
		var nResOpt  = 11;   // 암호화 미적용
		var nAnnKind = 0;    // 고정값 (0:마스킹)
		var szImgKey = "";   // 암호키
		var dBwCol   = 0;    // 마스킹 흑백 이미지 색상 지정 (0:black)
		var dColCol  = 0;    // 마스킹 컬러 이미지 색상 지정 (0:black)
		var nBwFile  = 0;    // 고정값
		var nColFile = 0;    // 고정값
		
		try {
			
			// 수동마스킹 : 체스판 무늬 설정 
			//objEzViewer.VwMaskType(56); // 정사각형(지문-체스판), 직사각형(주민번호-체크무늬)
			//objEzViewer.VwMaskType(50); // 정사각형(지문-체스판), 직사각형(주민번호-검정색)
			objEzViewer.VwMaskType(30);
			
			// 마스킹 갯수 반환(마스킹 없이 저장하는 경우 0 반환) 
			nSaveCnt = objEzViewer.EzSImgAnnToKeyFileEx(nResOpt, nAnnKind, psSaveFilePath, psResFilePath, szImgKey, dBwCol, dColCol, nBwFile, nColFile);
			//alert("nSaveCnt : " + nSaveCnt);
		}
		catch(e) {
			//alert(e);
		}
		
		if (nSaveCnt >= 0) {
			// 성공
		}
		else { // 그 외 예외처리
			if (pbAlertError) {
				alert("수동마스킹 이미지 저장 중 오류가 발생했습니다. 에러코드(" + nSaveCnt + ")");
			}
		}
		
		return nSaveCnt;
	}
	,
	// 복원파일을 이용하여 마스킹 이미지를 원본으로 복원 (0 이상 : 성공 - 복원된 마스킹 갯수 반환)
	imgAnnRestoreFileEx : function (objEzViewer, pbAlertError, psLoadFilePath, psSaveFilePath, psResFilePath)
	{
		var nSaveCnt = -1;
		
		// nResOpt : 복원파일 저장 및 암호화 옵션
		// 11 (복원파일 별도 저장. 복호화 미적용)
		// 12 (복원파일 별도 저장. 복호화 적용)
		// 21 (마스킹파일에 복원영역 저장. 복호화 미적용)
		// 22 (마스킹파일에 복원영역 저장. 복호화 적용)
		
		//var nResOpt  = 12;   // 암호화 적용
		var nResOpt  = 11;   // 암호화 미적용
		var nRotate  = 0;    // 고정값 (사용안함)
		var szImgKey = "";   // 암호키
		
		try {
			nSaveCnt = objEzViewer.EzSImgAnnRestoreFileEx(nResOpt, nRotate, psLoadFilePath, psSaveFilePath, psResFilePath, szImgKey);
			//alert("nSaveCnt : " + nSaveCnt);
		}
		catch(e) {
			nSaveCnt = -9;
			//alert(e);
		}
		
		if (nSaveCnt >= 0) {
			// 성공
		}
		else if (nSaveCnt == -13402) {
			// 암호 오류
			if (pbAlertError) {
				alert("복원영영파일의 암호화 키값이 일치하지 않습니다.");
			}
		}
		//else if (nSaveCnt == -10009) {
		//	// 원본파일 or 복원영역파일이 존재하지 않는 경우
		//	if (pbAlertError) {
		//		alert("복원할 파일이 존재하지 않습니다.");
		//	}
		//}
		else { // 그 외 예외처리
			if (pbAlertError) {
				alert("복원 이미지 저장 중 오류가 발생했습니다. 에러코드(" + nSaveCnt + ")");
			}
		}
		
		return nSaveCnt;
	}
	,
	// 싱글파일명 생성
	getSingleFileName : function (psFileName, nPageNo, nPageLen) 
	{	
		// abcd.tif -> abcd_001.tif
		var sNewFileName = psFileName.substring(0, psFileName.lastIndexOf(".")) 
		              + "_" + CommonUtil.fn_FillZero(nPageNo, nPageLen) 
		              + psFileName.substring(psFileName.lastIndexOf("."));
		return sNewFileName;
	}
	,
	// 복원영역파일 파일명 생성
	getResFileName : function (psFileName, nPageNo, nPageLen) 
	{	
		var sNewFileName = psFileName.substring(0, psFileName.lastIndexOf(".")) + "_" + CommonUtil.fn_FillZero(nPageNo, nPageLen) + ".res";
		return sNewFileName;
	}
	
};

