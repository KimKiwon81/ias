<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- 메시지 표시 영역 -->
<c:if test="${not empty message}">
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</c:if>
<c:if test="${not empty errorMessage}">
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${errorMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</c:if>

<!-- Search Conditions Card -->
<div class="card shadow mb-1">
    <div class="card-body">
        <form id="searchForm" onsubmit="return false;"> <%-- [변경] form 기본 제출 방지 --%>
            <div class="form-group row">
                <label for="regDateFrom" class="col-sm-1 col-form-label">등록일자</label>
                <div class="col-sm-2">
                    <div class="input-group">
                        <input type="text" class="form-control" id="regDateFrom" name="regDateFrom" value="${searchDTO.regDateFrom}">
                        <span class="input-group-text">~</span>
                        <input type="text" class="form-control" id="regDateTo" name="regDateTo" value="${searchDTO.regDateTo}">
                    </div>
                </div>
                
                <label for="userName" class="col-sm-1 col-form-label">등록자명</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="userName" name="userName" placeholder="사용자명 입력" value="${searchDTO.userName}">
                </div>
            
                <label for="deptName" class="col-sm-1 col-form-label">부서명</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="deptName" name="deptName" placeholder="부서명 입력" value="${searchDTO.deptName}">
                </div>
            
                <label for="approvalType" class="col-sm-1 col-form-label">결재유형</label>
                <div class="col-sm-2">
                    <select class="form-control" id="approvalType" name="approvalType">
                        <option value="">-- 전체 --</option>
                        <c:forEach var="code" items="${approvalTypes}">
                            <option value="${code.codeValue}" ${searchDTO.approvalType eq code.codeValue ? 'selected' : ''}>${code.codeName}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="approvalStatus" class="col-sm-1 col-form-label">결재상태</label>
                <div class="col-sm-2">
                    <select class="form-control" id="approvalStatus" name="approvalStatus">
                        <option value="">-- 전체 --</option>
                        <c:forEach var="code" items="${docStatuses}">
                            <option value="${code.codeValue}" ${searchDTO.approvalStatus eq code.codeValue ? 'selected' : ''}>${code.codeName}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="col-sm-9 text-right">
                    <button type="button" class="btn btn-primary" id="searchButton"> <%-- [변경] type="submit" -> type="button" --%>
                        <i class="fas fa-search"></i> 조회
                    </button>
                    <button type="button" class="btn btn-secondary" id="resetButton"> <%-- [변경] type="reset" -> type="button" --%>
                        <i class="fas fa-redo"></i> 초기화
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">결재 목록</h6>
        <a href="javascript:void(0);" class="btn btn-primary btn-sm" onclick="loadContent('<c:url value="/approvalForm"/>');">
            <i class="fas fa-plus"></i> 결재 등록
        </a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>등록일시</th>
                        <th>등록자</th>
                        <th>부서</th>
                        <th>결재유형</th>
                        <th>결재상태</th>
                        <th>최종 결재 일시</th>
                        <th>첨부</th>
                        <th>기능</th>
                    </tr>
                </thead>
                <tbody id="tblBody">
                    <%-- 초기 로딩 시 서버에서 받은 데이터를 JSTL로 먼저 채워 넣습니다 --%>
                    <c:choose>
                        <c:when test="${not empty approvalDocList}">
                            <c:forEach var="doc" items="${approvalDocList}" varStatus="status">
                                <tr>
                                    <td>${status.count}</td>
                                    <td><spring:eval expression="doc.regDt.format(T(java.time.format.DateTimeFormatter).ofPattern('yyyy-MM-dd HH:mm:ss'))" /></td>
                                    <td>${doc.reqUserNm}</td>
                                    <td>${doc.reqDeptNm}</td>
                                    <td>${doc.approvTyNm}</td>
                                    <td>${doc.docStatNm}</td>
                                    <td>
                                        <c:choose>
                                            <c:when test="${not empty doc.finalApprDt}">
                                                <spring:eval expression="doc.finalApprDt.format(T(java.time.format.DateTimeFormatter).ofPattern('yyyy-MM-dd HH:mm:ss'))" />
                                            </c:when>
                                            <c:otherwise>-</c:otherwise>
                                        </c:choose>
                                    </td>
                                    <td>
                                        <c:if test="${not empty doc.atchFilePath}">
                                            <a href="<c:url value="${doc.atchFilePath}"/>" target="_blank" class="btn btn-info btn-circle btn-sm">
                                                <i class="fas fa-file"></i>
                                            </a>
                                        </c:if>
                                        <c:if test="${empty doc.atchFilePath}">
                                            -
                                        </c:if>
                                    </td>
                                    <td>
                                        <a href="#" class="btn btn-primary btn-sm">상세</a>
                                        <c:if test="${doc.reqUserId eq userId}">
                                            <a href="javascript:void(0);" class="btn btn-danger btn-sm" onclick="confirmDelete('${doc.approvDocId}');">삭제</a>
                                        </c:if>
                                    </td>
                                </tr>
                            </c:forEach>
                        </c:when>
                        <c:otherwise>
                            <tr>
                                <td colspan="9" class="text-center no-data-row">등록된 결재 문서가 없습니다.</td>
                            </tr>
                        </c:otherwise>
                    </c:choose>
                </tbody>
            </table>
        </div>
    </div>
</div>


<!-- Custom scripts for this content -->
<script>
    (function($){

        if (typeof window.jQuery === 'undefined') {
            console.warn("jQuery is not defined when approvalList.jsp script starts. Waiting for jQuery.");
            setTimeout(arguments.callee, 50);
            return;
        }

        jQuery(document).ready(function($) {
            // Datepicker 초기화
            const $regDateFrom = $('#regDateFrom');
            const $regDateTo = $('#regDateTo');

            $regDateFrom.datepicker({ format: 'yyyy-mm-dd', autoclose: true, language: 'ko', todayHighlight: true });
            $regDateTo.datepicker({ format: 'yyyy-mm-dd', autoclose: true, language: 'ko', todayHighlight: true });

            if (!$regDateTo.val()) { // regDateTo 필드가 비어있을 경우 오늘 날짜로 세팅
                const today = new Date();
                $regDateTo.datepicker('setDate', today);
            }

            if (!$regDateFrom.val()) { // regDateFrom 필드가 비어있을 경우 일주일 전 날짜로 세팅
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                $regDateFrom.datepicker('setDate', sevenDaysAgo);
            }

            $('#searchButton').on('click', function() {
                performAjaxSearch();
            });

            function performAjaxSearch() {
                // 폼 데이터를 직렬화 (jQuery .serialize() 사용)
                var formData = $('#searchForm').serialize();
                console.log("AJAX search initiated with data:", formData);

                // 검색 버튼을 비활성화하여 중복 클릭 방지 (선택 사항)
                $('#searchButton').prop('disabled', true);
                
                $.ajax({
                    url: '<c:url value="/approvalList/searchAjax"/>', // [변경] AJAX 전용 엔드포인트
                    type: 'GET',
                    data: formData,
                    dataType: 'json', // 서버에서 JSON을 받을 것을 기대
                    success: function(response) {
                        console.log("AJAX search successful. Response:", response);
                        updateTable(response); // 테이블 업데이트 함수 호출
                    },
                    error: function(xhr, status, error) {
                        console.error("AJAX search failed:", status, error, xhr.responseText);
                        alert('결재 목록을 불러오는데 실패했습니다. 에러: ' + xhr.status + ' ' + xhr.statusText);
                    },
                    complete: function() {
                        // AJAX 요청 완료 후 버튼 다시 활성화
                        $('#searchButton').prop('disabled', false);
                    }
                });
            }

             // [추가] 테이블 업데이트 함수
            function updateTable(approvalDocList) {
                var $tblBody = $('#tblBody');
                $tblBody.empty(); // 기존 내용 모두 비우기

                if (approvalDocList && approvalDocList.length > 0) {
                    $.each(approvalDocList, function(index, doc) {
                        var row = '<tr>';
                        row += '<td>' + (index + 1) + '</td>'; // 순번
                        row += '<td>' + formatLocalDateTime(doc.regDt) + '</td>'; // 등록일시
                        row += '<td>' + escapeHtml(doc.reqUserNm) + '</td>'; // 등록자
                        row += '<td>' + escapeHtml(doc.reqDeptNm) + '</td>'; // 부서
                        row += '<td>' + escapeHtml(doc.approvTyNm) + '</td>'; // 결재유형
                        row += '<td>' + getBadgeHtml(doc.docStatNm, doc.docStatCd) + '</td>'; // 결재상태
                        row += '<td>' + (doc.finalApprDt ? formatLocalDateTime(doc.finalApprDt) : '-') + '</td>'; // 최종 결재 일시
                        row += '<td>' + getAttachmentHtml(doc.atchFilePath) + '</td>'; // 첨부
                        row += '<td>';
                        row += '<a href="#" class="btn btn-primary btn-sm">상세</a> ';
                        // 현재 로그인한 사용자 ID와 문서 신청자 ID 비교
                        if (doc.reqUserId === "${userId}") { // [${userId}는 서버 사이드에서 Model에 담겨온 로그인 사용자 ID]
                            row += '<a href="javascript:void(0);" class="btn btn-danger btn-sm" onclick="confirmDelete(\'' + doc.approvDocId + '\');">삭제</a>';
                        }
                        row += '</td>';
                        row += '</tr>';
                        $tblBody.append(row);
                    });
                } else {
                    $tblBody.append('<tr><td colspan="9" class="text-center no-data-row">등록된 결재 문서가 없습니다.</td></tr>');
                }
            }
            
            // 초기화 버튼 클릭 시 검색 폼 초기화
            $('button[type="reset"]').click(function(e) {
                e.preventDefault(); 
                $('#searchForm')[0].reset();
                $('#regDateFrom').val('');
                $('#regDateTo').val('');
                loadContent('<c:url value="/approvalList"/>'); // 초기화 후 전체 목록 다시 로드
            });

            function formatLocalDateTime(dateValue) {
                if (!dateValue) {
                    return '';
                }

                let dateObj;

                // Case 1: 이미 "YYYY-MM-DD HH:mm:ss" 형식의 문자열인 경우 (서버에서 이미 포맷팅된 경우)
                if (typeof dateValue === 'string') {
                    dateObj = new Date(dateValue.replace(' ', 'T'));
                }
                
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                const hour = String(dateObj.getHours()).padStart(2, '0');
                const minute = String(dateObj.getMinutes()).padStart(2, '0');
                const second = String(dateObj.getSeconds()).padStart(2, '0');

                return year + "-" + month + "-" + day + " "+ hour + ":" + minute + ":" + second;
            }

            function escapeHtml(text) {
                // 입력 값이 null이거나 undefined이면 빈 문자열을 반환하여 replace 호출 시 오류 방지
                if (text === null || typeof text === 'undefined') {
                    return '';
                }
                // 입력 값을 문자열로 강제 변환하여 혹시 모를 비-문자열 타입에도 대비
                text = String(text); 
                var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                // 정규식을 사용하여 맵에 정의된 문자들을 치환
                return text.replace(/[&<>"']/g, function(m) { return map[m]; });
            }

            function getBadgeHtml(statusName, statusCode) {
                var badgeClass = '';
                switch (statusCode) {
                    case '10': badgeClass = 'badge-secondary'; break; // 대기
                    case '20': badgeClass = 'badge-warning'; break;  // 팀장승인/담당대기
                    case '30': badgeClass = 'badge-info'; break;     // 담당승인/대표대기
                    case '40': badgeClass = 'badge-success'; break;  // 대표승인
                    case '90': badgeClass = 'badge-danger'; break;   // 반려
                    default: badgeClass = 'badge-light'; break;
                }
                return '<span class="badge ' + badgeClass + '">' + escapeHtml(statusName) + '</span>';
            }

            function getAttachmentHtml(filePath) {
                if (filePath) {
                    // "${pageContext.request.contextPath}"는 JSP 스크립트릿이 로드된 후에만 사용 가능
                    var contextPath = "${pageContext.request.contextPath}";
                    return '<a href="' + contextPath + filePath + '" target="_blank" class="btn btn-info btn-circle btn-sm">' +
                            '<i class="fas fa-file"></i></a>';
                }
                return '-';
            }

            // 삭제 확인 함수 (이전과 동일)
            function confirmDelete(approvDocId) {
                if (confirm("정말로 이 결재 문서를 삭제하시겠습니까? (삭제된 문서는 목록에 표시되지 않습니다)")) {
                    var form = document.createElement('form');
                    form.setAttribute('method', 'post');
                    form.setAttribute('action', '<c:url value="/delete"/>'); 

                    var csrfParam = document.createElement('input');
                    csrfParam.setAttribute('type', 'hidden');
                    csrfParam.setAttribute('name', '${_csrf.parameterName}');
                    csrfParam.setAttribute('value', '${_csrf.token}');
                    form.appendChild(csrfParam);

                    var hiddenField = document.createElement('input');
                    hiddenField.setAttribute('type', 'hidden');
                    hiddenField.setAttribute('name', 'approvDocId');
                    hiddenField.setAttribute('value', approvDocId);
                    form.appendChild(hiddenField);

                    document.body.appendChild(form);
                    form.submit();
                }
            }

            window.confirmDelete = confirmDelete;

        });

    })();

</script>