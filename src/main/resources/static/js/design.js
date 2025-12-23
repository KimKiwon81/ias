//layer popup
function layer_open(el) {
   $('#layer1, #layer2, #layer3, #layer4, #layer5, #layer6, #layer7, #layer8, #layer9, #layer10').css('display', 'none'); //레이어 팝업 갯수
    var temp = $('#' + el);
    var bg = temp.parents('bg');
    if (bg) {
        $('.layer').fadeIn();
    } else {
        temp.fadeIn();
    }
    
    temp.css('display', 'block');
    if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
    else temp.css('top', '0px');
    if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
    else temp.css('left', '0px');

	//$("body").attr("style", "overflow-y:hidden");

    $('body section').each(function (i, e) {
    spotarr.push($(e).offset().top)
    })

    temp.find('a.pop-cbtn').each(function () {
        $(this).bind("click", function (e) {
            if (bg) {
                $('.layer').fadeOut();
            } else {
                temp.fadeOut();
            }
            e.preventDefault();
            $("body").attr("style", "overflo-y:scroll");
        });
    });

	$('.layer .bg').click(function (e) {
        $('.layer').fadeOut();
        e.preventDefault();
        $("body").attr("style", "overflow-y:scroll");
    });
	
};


//레이어 팝업 탭메뉴
$(".tab-tit > li:first-child").addClass("active");
$(".tab-content").hide();
$(".tab-content:first").show();

$(".tab-tit > li").click(function () {
	$(".tab-tit > li").removeClass("active");
	$(this).addClass("active");
	$(".tab-content").hide();
	var activeTab = $(this).attr("rel");
	$("#" + activeTab).show();
});


