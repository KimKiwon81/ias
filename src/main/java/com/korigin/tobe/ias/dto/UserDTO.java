// src/main/java/com/korigin/tobe/ias/dto/UserDTO.java
package com.korigin.tobe.ias.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data // Lombok을 사용하여 Getter, Setter, toString 등을 자동 생성
public class UserDTO {
    private Long usrSeq; // SEQ 번호
    private String usrId; // 사용자 ID (PK)
    private String passwd; // 비밀번호
    private String usrName; // 사용자명
    private String role; // 권한 (MEMBER, ADMIN 등)
    private String roleNm; // 권한명 (코드 조인)
    private Integer apprLvl; // 결재 등급
    private String useYn; // 사용 여부 (Y/N)
    private String deptCd; // 부서 코드
    private String deptNm; // 부서명 (코드 조인)
    private Double totVac; // 총 휴가 일수
    private Double restVac; // 잔여 휴가 일수
    private LocalDateTime finalLoginDate; // 최종 로그인 날짜
    private String regUsrId; // 등록자 ID
    private LocalDateTime regDtm; // 등록 일시
    private String modiUsrId; // 수정자 ID
    private LocalDateTime modiDtm; // 수정 일시

    // 비밀번호 확인 필드는 DTO에 포함하지 않고 Controller 또는 Service에서 일시적으로 사용
    // private String confirmPassword;
}