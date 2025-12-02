<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- Begin Page Content 부터 시작 -->
<div class="container-fluid">

    <!-- Page Heading -->
    <h1 class="h3 mb-4 text-gray-800">결재 신청</h1>

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">새 결재 요청</h6>
        </div>
        <div class="card-body">
            <form action="${pageContext.request.contextPath}/submit" method="post" enctype="multipart/form-data">
                <!-- CSRF 토큰 -->
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />

                <div class="form-group row">
                    <label for="requesterName" class="col-sm-2 col-form-label">신청자</label>
                    <div class="col-sm-4">
                        <input type="text" readonly class="form-control-plaintext" id="requesterName" value="${sessionScope.userName}">
                        <input type="hidden" name="requesterId" value="${sessionScope.userId}">
                    </div>
                    <label for="requesterDept" class="col-sm-2 col-form-label">부서</label>
                    <div class="col-sm-4">
                        <input type="text" readonly class="form-control-plaintext" id="requesterDept" value="${sessionScope.deptId}">
                    </div>
                </div>
                
                <div class="form-group row">
                    <label for="approvTyCd" class="col-sm-2 col-form-label">결재 유형</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="approvTyCd" name="approvTyCd" required onchange="showHideFields()">
                            <option value="">선택하세요</option>
                            <option value="10">결재(입금) 신청서</option>
                            <option value="20">연차 신청서</option>
                            <option value="30">반차 신청서</option>
                            <option value="40">지출 결의서</option>
                            <option value="50">휴일근무 신청서</option>
                        </select>
                    </div>
                </div>

                <!-- 연차 신청서일 때 표시될 날짜 기간 선택 필드 -->
                <div class="form-group row date-range-fields" id="dateRangeFields" style="display: none;">
                    <label for="vacationStartDate" class="col-sm-2 col-form-label">휴가 기간</label>
                    <div class="col-sm-10">
                        <div class="input-daterange input-group"> <!-- input-daterange 클래스를 전체 input-group에 적용 -->
                            <div class="input-group input-daterange"> <!-- 가장 바깥쪽 input-group (flex container) -->
                                <!-- 시작일 입력 필드 -->
                                <input type="text" class="form-control" id="vacationStartDate" name="vacationStartDate" placeholder="시작일" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="spnStIcon"><i class="fas fa-calendar"></i></span>
                                </div>
                                <!-- 구분자 -->
                                <span class="input-group-text">~</span>
                                <!-- 종료일 입력 필드 -->
                                <input type="text" class="form-control" id="vacationEndDate" name="vacationEndDate" placeholder="종료일" readonly>
                                <div class="input-group-append">
                                    <span class="input-group-text" id="spnEdIcon"><i class="fas fa-calendar"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 반차 신청서일 때 표시될 날짜 선택 필드 -->
                <div class="form-group row date-single-field" id="dateSingleField" style="display: none;">
                    <label for="halfDayDate" class="col-sm-2 col-form-label">반차 일자</label>
                    <div class="col-sm-6">
                        <div class="input-group date">
                            <input type="text" class="form-control" id="halfDayDate" name="halfDayDate" placeholder="날짜 선택" readonly>
                            <div class="input-group-append">
                                <span class="input-group-text" id="spnHfIcon"><i class="fas fa-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <select class="form-control" id="halfDayType" name="halfDayType">
                            <option value="AM">오전 반차</option>
                            <option value="PM">오후 반차</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="docTitle" class="col-sm-2 col-form-label">제목</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="docTitle" name="docTitle" placeholder="제목을 입력하세요" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="docContent" class="col-sm-2 col-form-label">내용</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="docContent" name="docContent" rows="5" placeholder="상세 내용을 입력하세요" required></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="attachment" class="col-sm-2 col-form-label">첨부 파일</label>
                    <div class="col-sm-10">
                        <input type="file" class="form-control-file" id="attachment" name="attachment">
                    </div>
                </div>
                
                <hr>

                <div class="form-group row">
                    <div class="col-sm-10 offset-sm-2">
                        <button type="submit" class="btn btn-primary">결재 신청</button>
                        <button type="reset" class="btn btn-secondary">초기화</button>
                        <a href="${pageContext.request.contextPath}/approvalList" class="btn btn-light">목록으로</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- /.container-fluid -->

<!-- Bootstrap core JavaScript-->
<script src="${pageContext.request.contextPath}/vendor/jquery/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="${pageContext.request.contextPath}/vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="${pageContext.request.contextPath}/js/sb-admin-2.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/locales/bootstrap-datepicker.ko.min.js"></script>

<!-- 결재 유형에 따른 필드 표시/숨김 처리 -->
<script>
    $(document).ready(function() {
        // 결재 유형에 따른 필드 표시/숨김
        $('#approvTyCd').change(function() {
            showHideFields();
        });
        
        $('#vacationStartDate, #vacationEndDate').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'ko',
            todayHighlight: true,
            todayBtn: true
        });

        $('#halfDayDate').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: 'ko',
            todayHighlight: true,
            todayBtn: true
        });
        
        // 초기 상태 설정
        showHideFields();
    });

    function showHideFields() {
        var approvTyCd = $('#approvTyCd').val();
        
        // 모든 날짜 필드 숨기기
        $('#dateRangeFields').hide();
        $('#dateSingleField').hide();
        
        // 선택된 결재 유형에 따라 필드 표시
        if (approvTyCd === '20') { // 연차 신청서
            $('#dateRangeFields').show();
        } else if (approvTyCd === '30') { // 반차 신청서
            $('#dateSingleField').show();
        }
    }

    // 달력 아이콘에 직접 이벤트 연결
    $('#spnStIcon').click(function() {
        $(this).closest('.input-group').find('input').eq(0).datepicker('show');
    });

    $('#spnEdIcon').click(function() {
        $(this).closest('.input-group').find('input').eq(1).datepicker('show');
    });

    $('#spnHfIcon').click(function() {
        $(this).closest('.input-group').find('input').datepicker('show');
    });

</script>

</body>
</html>