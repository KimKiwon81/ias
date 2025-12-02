<%-- userForm.jsp --%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
    <h6 class="m-0 font-weight-bold text-primary">
        <c:choose>
            <c:when test="${not empty user.userId}">사용자 정보 수정</c:when>
            <c:otherwise>신규 사용자 등록</c:otherwise>
        </c:choose>
    </h6>
    <button type="button" class="close" aria-label="Close" onclick="closeUserDetailFormArea()">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="card-body">
    <form id="userForm" onsubmit="return false;">
        <%-- userId (PK) - 신규 등록 시에는 비어있음, 수정 시에는 값이 채워짐 --%>
        <input type="hidden" id="userIdHidden" name="userId" value="${user.userId}">

        <div class="form-group row">
            <label for="userId" class="col-sm-2 col-form-label">사용자 ID</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="userId" name="userId"
                       value="${user.userId}"
                       <c:if test="${not empty user.userId}">readonly</c:if> <%-- 수정 모드일 때 ID는 변경 불가 --%>
                       placeholder="사용자 ID">
                <c:if test="${empty user.userId}">
                    <small id="userIdHelp" class="form-text text-muted">ID는 한 번 등록하면 변경할 수 없습니다.</small>
                </c:if>
            </div>
             <label for="userName" class="col-sm-2 col-form-label">사용자명</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="userName" name="userName"
                       value="${user.userName}"
                       placeholder="사용자명">
            </div>
        </div>

        <div class="form-group row">
            <label for="password" class="col-sm-2 col-form-label">비밀번호</label>
            <div class="col-sm-4">
                <c:choose>
                    <c:when test="${not empty user.userId}"> <%-- 수정 모드 --%>
                        <input type="password" class="form-control" id="password" name="password" placeholder="변경하려면 입력하세요 (미입력 시 기존 유지)">
                    </c:when>
                    <c:otherwise> <%-- 신규 등록 모드 --%>
                        <input type="password" class="form-control" id="password" name="password" placeholder="기본 비밀번호: tobe1234! (변경하려면 입력하세요)">
                    </c:otherwise>
                </c:choose>
            </div>
            <label for="confirmPassword" class="col-sm-2 col-form-label">비밀번호 확인</label>
            <div class="col-sm-4">
                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인">
            </div>
        </div>

        <div class="form-group row">
            <label for="deptCd" class="col-sm-2 col-form-label">부서</label>
            <div class="col-sm-4">
                <select class="form-control" id="deptCd" name="deptCd">
                    <option value="">-- 선택 --</option>
                    <c:forEach var="code" items="${deptCodes}">
                        <option value="${code.codeValue}" ${user.deptCd eq code.codeValue ? 'selected' : ''}>${code.codeName}</option>
                    </c:forEach>
                </select>
            </div>
            <label for="role" class="col-sm-2 col-form-label">권한</label>
            <div class="col-sm-4">
                <select class="form-control" id="role" name="role">
                    <option value="">-- 선택 --</option>
                    <c:forEach var="code" items="${roleCodes}">
                        <option value="${code.codeValue}" ${user.role eq code.codeValue ? 'selected' : ''}>${code.codeName}</option>
                    </c:forEach>
                </select>
            </div>
        </div>
        
        <div class="form-group row">
            <label for="apprLvl" class="col-sm-2 col-form-label">결재 등급</label>
            <div class="col-sm-4">
                <input type="number" class="form-control" id="apprLvl" name="apprLvl"
                       value="${user.apprLvl}" min="1" max="10" placeholder="1-10">
            </div>
            <label for="useYn" class="col-sm-2 col-form-label">사용 여부</label>
            <div class="col-sm-4">
                <select class="form-control" id="useYn" name="useYn">
                    <option value="Y" ${user.useYn eq 'Y' ? 'selected' : ''}>사용</option>
                    <option value="N" ${user.useYn eq 'N' ? 'selected' : ''}>미사용</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="totVac" class="col-sm-2 col-form-label">총 휴가</label>
            <div class="col-sm-4">
                <input type="number" step="0.5" class="form-control" id="totVac" name="totVac"
                       value="${user.totVac}" min="0" placeholder="총 부여 휴가일수">
            </div>
            <label for="restVac" class="col-sm-2 col-form-label">잔여 휴가</label>
            <div class="col-sm-4">
                <input type="number" step="0.5" class="form-control" id="restVac" name="restVac"
                       value="${user.restVac}" min="0" placeholder="잔여 휴가일수">
            </div>
        </div>

        <div class="form-group row justify-content-center">
            <div class="col-sm-10 text-right">
                <button type="submit" class="btn btn-primary" id="saveUserBtn">저장</button>
                <button type="button" class="btn btn-secondary" onclick="closeUserDetailFormArea()">취소</button>
            </div>
        </div>
    </form>
</div>

<script>
    (function() {
        if (typeof window.jQuery === 'undefined') {
            console.warn("jQuery is not defined when userForm.jsp script starts. Waiting for jQuery.");
            setTimeout(arguments.callee, 50);
            return;
        }

        jQuery(document).ready(function($) {
            // [핵심] 상세 폼 닫기 (이 영역을 숨기고 그리드 하이라이트 해제)
            window.closeUserDetailFormArea = function() {
                $('#userDetailFormArea').hide();
                $('#userTableBody .clickable-row').removeClass('table-active'); // 그리드의 선택된 row 하이라이트 해제
            }

            // [핵심] 폼 제출(저장) 처리
            $('#userForm').on('submit', function(e) {
                e.preventDefault(); // 기본 폼 제출 방지

                var form = $(this);
                var formData = form.serialize(); // FormData를 사용하지 않으므로 일반 serialize() 사용

                // 유효성 검사
                var userId = $('#userId').val();
                var userName = $('#userName').val();
                var password = $('#password').val();
                var confirmPassword = $('#confirmPassword').val();
                var isUpdateMode = ($('#userIdHidden').val() !== ''); // 수정 모드인지 확인 (userIdHidden은 hidden 필드의 value)

                if (!userId) { alert('사용자 ID를 입력하세요.'); $('#userId').focus(); return; }
                if (!userName) { alert('사용자명을 입력하세요.'); $('#userName').focus(); return; }
                
                // 신규 등록이거나 비밀번호가 입력된 경우에만 비밀번호 검사
                 if (!isUpdateMode) { // 신규 등록 모드일 때
                    if (password && password.length < 4) { // 사용자가 입력했지만 짧은 경우
                        alert('비밀번호를 4자 이상 입력하세요.'); $('#password').focus(); return;
                    }
                } else { // 수정 모드일 때
                    if (password && password.length < 4) { // 사용자가 입력했지만 짧은 경우
                        alert('비밀번호를 4자 이상 입력하세요.'); $('#password').focus(); return;
                    }
                }
                if (password || confirmPassword) { // 둘 중 하나라도 입력되었으면 검사
                    if (password !== confirmPassword) {
                        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                        $('#confirmPassword').focus();
                        return;
                    }
                }


                var token = $("meta[name='_csrf']").attr("content");
                var header = $("meta[name='_csrf_header']").attr("content");

                $.ajax({
                    url: '<c:url value="/api/user/save"/>', // 백엔드 저장 API 엔드포인트
                    type: 'POST',
                    data: formData,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, token); // CSRF 토큰 헤더 추가
                    },
                    success: function(response) {
                        if (response.status === 'success') {
                            alert(response.message);
                            closeUserDetailFormArea(); // 폼 닫기
                            window.performUserSearch(); // 사용자 목록 새로고침
                        } else {
                            alert('저장 실패: ' + response.message);
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error("사용자 저장 실패:", status, error, xhr.responseText);
                        var errorMessage = "사용자 정보 저장 중 오류가 발생했습니다.";
                        try {
                            var errorResponse = JSON.parse(xhr.responseText);
                            errorMessage = errorResponse.message || errorMessage;
                        } catch (e) { /* JSON 파싱 실패 */ }
                        alert('저장 실패: ' + errorMessage);
                    }
                });
            });
        });
    })();
</script>