package com.korigin.tobe.ias.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data // Lombok을 사용하여 Getter, Setter, toString 등을 자동 생성
public class ApprovalDocDTO {
    private String approvDocId; // YYYYMMDD + SEQ_NUM
    private String docTitle;
    private String docContent;
    private String reqUserId;
    private String reqUserNm;
    private String reqDeptId;
    private String approvTyCd;
    private String docStatCd; // 기본값 '10' (대기)
    private String curApprUserId; // 현재 결재자
    private LocalDate vacStrtDt; // 휴가 시작일
    private LocalDate vacEndDt;  // 휴가 종료일
    private String hlfTyCd;      // 반차 유형 (AM/PM)
    private String atchFilePath; // 첨부 파일 경로 (DB 저장용)
    private LocalDateTime regDt;
    private LocalDateTime updDt;
    private LocalDateTime finalApprDt; // [추가] 최종 결재 완료 일시

    // [추가] 삭제 여부
    private String delYn = "N"; // 기본값 'N'

     // [추가] 코드명 (조회 화면 표시용)
    private String reqDeptNm;      // 신청자 부서명
    private String approvTyNm;     // 결재 유형명
    private String docStatNm;      // 문서 상태명
    private String hlfTyNm;        // 반차 유형명

    private MultipartFile attachment; // 파일 업로드를 위한 필드 (DB 테이블 컬럼 아님)
}