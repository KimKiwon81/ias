package com.korigin.tobe.ias.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class ApprovalSearchDTO {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate regDateFrom;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate regDateTo;
    private String userName;        // 등록자명 (REQ_USER_NM)
    private String approverName;    // 부서명 (REQ_DEPT_ID)
    private String approvalType;    // 결재유형 (APPROV_TY_CD)
    private String approvalStatus;  // 결재상태 (DOC_STAT_CD)
    private String deptName;
}
