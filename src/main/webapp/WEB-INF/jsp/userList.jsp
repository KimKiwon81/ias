<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- Begin Page Content -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">사용자 관리</h1>

    <!-- Search Card -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">검색 조건</h6>
        </div>
        <div class="card-body">
            <form id="userSearchForm">
                <div class="form-group row">
                    <label for="searchUserId" class="col-sm-2 col-form-label">사용자 ID</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="searchUserId" name="searchUserId" placeholder="사용자 ID">
                    </div>
                    <label for="searchUserName" class="col-sm-2 col-form-label">사용자명</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="searchUserName" name="searchUserName" placeholder="사용자명">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="searchDeptCd" class="col-sm-2 col-form-label">부서</label>
                    <div class="col-sm-4">
                        <select class="form-control" id="searchDeptCd" name="searchDeptCd">
                            <option value="">-- 전체 --</option>
                            <c:forEach var="code" items="${deptCodes}">
                                <option value="${code.codeValue}">${code.codeName}</option>
                            </c:forEach>
                        </select>
                    </div>
                     <label for="searchRole" class="col-sm-2 col-form-label">권한</label>
                    <div class="col-sm-4">
                        <select class="form-control" id="searchRole" name="searchRole">
                            <option value="">-- 전체 --</option>
                            <c:forEach var="code" items="${roleCodes}">
                                <option value="${code.codeValue}">${code.codeName}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="searchUseYn" class="col-sm-2 col-form-label">사용 여부</label>
                    <div class="col-sm-4">
                        <select class="form-control" id="searchUseYn" name="searchUseYn">
                            <option value="">-- 전체 --</option>
                            <option value="Y">사용</option>
                            <option value="N">미사용</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12 text-right">
                        <button type="button" class="btn btn-primary" onclick="performUserSearch();">검색</button>
                        <button type="button" class="btn btn-secondary" onclick="$('#userSearchForm')[0].reset();">초기화</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- User List Card -->
    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">사용자 목록</h6>
            <div>
                <a href="javascript:void(0);" class="btn btn-primary btn-sm" onclick="openUserFormForNew();">
                    <i class="fas fa-plus"></i> 신규 등록
                </a>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="userTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>사용자명</th>
                            <th>부서</th>
                            <th>권한</th>
                            <th>잔여 휴가</th>
                            <th>사용여부</th>
                            <th>최종 로그인</th>
                            <th>기능</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody">
                        <c:choose>
                            <c:when test="${not empty userList}">
                                <c:forEach var="user" items="${userList}" varStatus="status">
                                    <tr class="clickable-row" data-user-id="${user.userId}">
                                        <td>${user.userId}</td>
                                        <td>${user.userName}</td>
                                        <td>${user.deptNm}</td> <%-- 부서명은 코드테이블 조인을 통해 가져온다고 가정 --%>
                                        <td>${user.roleNm}</td> <%-- 권한명은 코드테이블 조인을 통해 가져온다고 가정 --%>
                                        <td>${user.restVac} 일</td>
                                        <td>${user.useYn eq 'Y' ? '사용' : '미사용'}</td>
                                        <td>
                                            <c:choose>
                                                <c:when test="${not empty user.finalLoginDate}">
                                                    <fmt:formatDate value="${user.finalLoginDate}" pattern="yyyy-MM-dd HH:mm:ss" />
                                                </c:when>
                                                <c:otherwise>-</c:otherwise>
                                            </c:choose>
                                        </td>
                                        <td>
                                            <%-- 삭제 기능 (비활성 사용자는 삭제 버튼 숨김 등 비즈니스 로직 추가 가능) --%>
                                            <a href="javascript:void(0);" class="btn btn-danger btn-sm" onclick="event.stopPropagation(); confirmDeleteUser('${user.userId}');">삭제</a>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </c:when>
                            <c:otherwise>
                                <tr>
                                    <td colspan="8" class="text-center no-data-row">등록된 사용자 정보가 없습니다.</td>
                                </tr>
                            </c:otherwise>
                        </c:choose>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- User Detail Form Area (사용자 상세 정보 및 등록/수정 폼이 로드될 영역) -->
    <div id="userDetailFormArea" class="card shadow mb-4" style="display:none;">
        <%-- userForm.jsp 내용이 이곳에 로드됨 --%>
    </div>
    

</div>
<!-- /.container-fluid -->

<script>
    
    (function() {
        if (typeof window.jQuery === 'undefined') {
            console.warn("jQuery is not defined when userList.jsp script starts. Waiting for jQuery.");
            setTimeout(arguments.callee, 50);
            return;
        }

        jQuery(document).ready(function($) {

            // [핵심] 페이지 콘텐츠를 로드하는 범용 함수
            // main.jsp에 정의된 loadContent 함수와 동일하게 사용됩니다.
            // 만약 main.jsp에 전역 함수로 이미 정의되어 있다면, 이 부분은 제거해도 됩니다.
            if (typeof window.loadContent === 'undefined') {
                window.loadContent = function(url, targetAreaId, callback) {
                    targetAreaId = targetAreaId || '#dynamic-content-area';
                    console.log("Loading content from: " + url + " into " + targetAreaId);
                    $(targetAreaId).load(url, function(responseTxt, statusTxt, xhr) {
                        if (statusTxt == "error") {
                            console.error("Error loading content:", xhr.status + ": " + xhr.statusText);
                            alert("페이지를 불러오지 못했습니다: " + xhr.statusText);
                        } else {
                            console.log("Content loaded successfully into " + targetAreaId);
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }
                    });
                };
            }
            
            // 신규 사용자 등록 폼 열기
            window.openUserFormForNew = function() {
                window.loadContent('<c:url value="/userForm"/>', '#userDetailFormArea', function() {
                    $('#userDetailFormArea').show(); // 상세 폼 영역 표시
                    $('#userTableBody .clickable-row').removeClass('table-active'); // 선택된 행 하이라이트 해제
                });
            }

            // [핵심] 그리드 row 클릭 이벤트 - 사용자 정보 수정 폼 열기
            $(document).on('click', '#userTableBody .clickable-row', function() {
                var userId = $(this).data('user-id');
                if (userId) {
                    // 클릭된 행 하이라이트
                    $('#userTableBody .clickable-row').removeClass('table-active');
                    $(this).addClass('table-active');

                    window.loadContent('<c:url value="/userForm?userId="/>' + userId, '#userDetailFormArea', function() {
                        $('#userDetailFormArea').show(); // 상세 폼 영역 표시
                    });
                }
            });

            // AJAX로 사용자 목록을 검색하고 테이블을 업데이트하는 함수
            window.performUserSearch = function() {
                var formData = $('#userSearchForm').serialize();
                var token = $("meta[name='_csrf']").attr("content");
                var header = $("meta[name='_csrf_header']").attr("content");

                $.ajax({
                    url: '<c:url value="/api/users/search"/>', // 백엔드 검색 API 엔드포인트
                    type: 'GET',
                    data: formData,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, token);
                    },
                    success: function(response) {
                        updateUserTable(response); // 검색 결과로 테이블 업데이트
                        $('#userDetailFormArea').hide(); // 상세 폼 숨기기
                        $('#userTableBody .clickable-row').removeClass('table-active'); // 하이라이트 해제
                    },
                    error: function(xhr, status, error) {
                        console.error("사용자 목록 검색 실패:", status, error, xhr.responseText);
                        alert("사용자 목록을 불러오는 데 실패했습니다.");
                    }
                });
            }

            // 사용자 목록 테이블을 업데이트하는 함수
            function updateUserTable(userList) {
                var $tbody = $('#userTableBody');
                $tbody.empty(); // 기존 내용 삭제

                if (userList && userList.length > 0) {
                    $.each(userList, function(index, user) {
                        var finalLoginDate = user.finalLoginDate ? new Date(user.finalLoginDate).toLocaleString() : '-';
                        var row = `<tr class="clickable-row" data-user-id="${user.userId}">
                                        <td>${user.userId}</td>
                                        <td>${user.userName}</td>
                                        <td>${user.deptNm || ''}</td>
                                        <td>${user.roleNm || ''}</td>
                                        <td>${user.restVac != null ? user.restVac + ' 일' : ''}</td>
                                        <td>${user.useYn == 'Y' ? '사용' : '미사용'}</td>
                                        <td>${finalLoginDate}</td>
                                        <td>
                                            <a href="javascript:void(0);" class="btn btn-danger btn-sm" onclick="event.stopPropagation(); confirmDeleteUser('${user.userId}');">삭제</a>
                                        </td>
                                   </tr>`;
                        $tbody.append(row);
                    });
                } else {
                    $tbody.append('<tr><td colspan="8" class="text-center no-data-row">등록된 사용자 정보가 없습니다.</td></tr>');
                }
            }

            // 사용자 삭제 확인 함수 (추가)
            window.confirmDeleteUser = function(userId) {
                if (confirm("정말로 사용자 '" + userId + "'를 삭제하시겠습니까?")) {
                    var token = $("meta[name='_csrf']").attr("content");
                    var header = $("meta[name='_csrf_header']").attr("content");

                    $.ajax({
                        url: '<c:url value="/api/user/delete"/>' + '/' + userId, // 백엔드 삭제 API 엔드포인트
                        type: 'POST', // RESTful delete는 보통 DELETE지만, HTML 폼/JS로는 POST/GET이 편할 수 있습니다.
                                       // Spring Security CSRF 보호를 위해 POST 권장
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader(header, token);
                        },
                        success: function(response) {
                            if (response.status === 'success') {
                                alert(response.message);
                                performUserSearch(); // 목록 새로고침
                                $('#userDetailFormArea').hide(); // 상세 폼 숨기기
                            } else {
                                alert('삭제 실패: ' + response.message);
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("사용자 삭제 실패:", status, error, xhr.responseText);
                             var errorMessage = "사용자 삭제 중 오류가 발생했습니다.";
                            try {
                                var errorResponse = JSON.parse(xhr.responseText);
                                errorMessage = errorResponse.message || errorMessage;
                            } catch (e) { /* JSON 파싱 실패 */ }
                            alert('삭제 실패: ' + errorMessage);
                        }
                    });
                }
            }
        });

    })();
    
</script>