<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="wrap">
	<header class="header">
		<div class="header-top">
			<h1 class="logo">
				<a href="/home" id="aLink">
					<img src="/images/common/CI_w.gif" height="33px"/>
				</a>
			</h1>
			<div class="user-area">
				<span class="user"><%=session.getAttribute("SESS_USR_NAME") %> 님</span>
				<button id="btnLogout" class="logout">로그아웃</button>
				<input type="hidden" id="hdDeptCd" name="hdDeptCd" value='<%= session.getAttribute("SESS_DEPT_CD") %>' />
				<input type="hidden" id="hdUsrId" name="hdUsrId" value='<%= session.getAttribute("SESS_USR_ID") %>' />
			</div>
		</div>
		
		<div class="gnb-area">
			<ul class="gnb">
			</ul>
		</div>
	</header>
</div>
<script>
$(document).ready(function(){
	
	
	var param = "";

	$.ajax({
		type : "post"
		, dataType : "json"
		, async : true
		, url : "/getMenu"
		, data : param
		, contentType : "application/x-www-form-urlencoded; charset=UTF-8"
		, beforeSend : function(request){
			request.setRequestHeader("AJAX", "true");
		}
		, success : function(data, textStatus){

			if(data.SESSION == "EXPIRED"){
				alert("세션이 만료 되었습니다.\n다시 로그인 해주시기 바랍니다.");
				location = "/logoutProc";
			}

			var topMenu = data.TOP_MENU;

			if(topMenu != null && topMenu != ""){

				$(".gnb").empty();

				var m = Math.floor(96/topMenu.length);
				

				for(var idx=0 ; idx < topMenu.length ; idx++){

					var tMenu = "";
					var iii = "25";
					tMenu += "<li class='depth1' style='width:"+m+"%;' id='"+topMenu[idx].menuId+"'><a href='#'>"+topMenu[idx].menuName+"</a></li>";

					$(".gnb").append(tMenu);
				}

				var subMenu = data.SUB_MENU;
				
				for(var i=0 ; i < subMenu.length ; i++){

					var menu = subMenu[i].MENU_LIST;
					var menuId = subMenu[i].UP_MENU;

					var sMenu = "";

					if(menu.length > 0){

						sMenu += "<ul class='depth2'>";

						for(var x=0 ; x < menu.length ; x++){
							
							sMenu += "<li><a href='"+menu[x].url+"' >"+menu[x].menuName+"</a></li>";
							
						}

						sMenu += "</ul>";

						$("#"+menuId).append(sMenu);

					}

				}

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

});

$("#btnLogout").click(function(){

	var msg='로그아웃 하시겠습니까?';
	
	if(confirm(msg)){
			location = "/logoutProc";
	}

});

</script>