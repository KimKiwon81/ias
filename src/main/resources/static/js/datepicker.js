$(function() {
	$.datepicker.regional['ko'] = {
            prevText : '이전달',
            nextText : '다음달',
            monthNames : [  '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
            monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
            dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
            dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
            dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
            firstDay : 0,
            yearSuffix : '',
            showAnim : "slideDown"  
 	};
	$.datepicker.setDefaults( $.datepicker.regional[ "ko" ] );
    $('.month-picker').datepicker( {
    	showOn: "button",
		buttonImage: "../resource/images/icon/ico_date.png",
		buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: false,
        dateFormat: 'yy mm dd'
    });   
});
