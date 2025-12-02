package com.korigin.tobe.ias.mapper;

import com.korigin.tobe.ias.dto.ApprovalDocDTO;
import com.korigin.tobe.ias.dto.ApprovalSearchDTO;
import com.korigin.tobe.ias.dto.UserDTO; // IAS_USER 테이블에 맞는 DTO가 있다고 가정

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ApprovalMapper {

    // 결재 문서 등록
    int insertApprovalDoc(ApprovalDocDTO approvalDoc);

    // 사용자 정보 조회 (신청자 이름, 부서 정보 가져오기 위함)
    UserDTO selectUserByUserId(@Param("userId") String userId);

    // [수정] 결재 문서 목록 조회 (검색 조건 추가)
    List<ApprovalDocDTO> selectApprovalDocList(ApprovalSearchDTO searchDTO);

    // (선택사항) 결재 상태 업데이트 시 최종 결재 일시도 업데이트하는 메서드
    int updateApprovalDocStatus(@Param("approvDocId") String approvDocId, @Param("docStatCd") String docStatCd);

    // [추가] 결재 문서 삭제 (소프트 삭제)
    int deleteApprovalDoc(@Param("approvDocId") String approvDocId);

    String selectRequesterIdByDocId(@Param("approvDocId") String approvDocId);

}
