$(function(){
	if (!Modernizr.inputtypes.date){
		$('#FROMDATE').datepicker({
			dayNamesMin: ['일','월', '화', '수', '목', '금', '토'],
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			nextText: '다음 달',
			prevText: '이전 달',
			dateFormat: 'yy-mm-dd',
			beforeShow: function(input){
				//document.getElementById('date_area').style.marginTop = "120px";
			},
			onClose: function(){
				//document.getElementById('date_area').style.marginTop = "-120px";
			}
			
		}); 
        $('#TODATE').datepicker({
        	dayNamesMin: [ '일','월', '화', '수', '목', '금', '토', '일'],
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			nextText: '다음 달',
			prevText: '이전 달',
            dateFormat: 'yy-mm-dd',
            beforeShow: function(input){
            	//document.getElementById('date_area').style.marginTop = "120px";
			},
			onClose: function(){
				//document.getElementById('date_area').style.marginTop = "-120px";
			}
        });
        
        $('#ARG_INFO').datepicker({
        	dayNamesMin: ['일','월', '화', '수', '목', '금', '토', '일'],
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			nextText: '다음 달',
			prevText: '이전 달',
            dateFormat: 'yy-mm-dd',
            beforeShow: function(input){
            	//document.getElementById('date_area').style.marginTop = "120px";
			},
			onClose: function(){
				//document.getElementById('date_area').style.marginTop = "-120px";
			}
        });
        
        
    }
});
