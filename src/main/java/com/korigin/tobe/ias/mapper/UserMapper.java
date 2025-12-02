// src/main/java/com/korigin/tobe/ias/mapper/UserMapper.java
package com.korigin.tobe.ias.mapper;

import com.korigin.tobe.ias.dto.UserDTO;
import com.korigin.tobe.ias.dto.UserSearchDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    List<UserDTO> selectUserList(UserSearchDTO searchDTO); // 사용자 목록 검색
    UserDTO selectUserById(String userId); // 사용자 ID로 상세 조회
    int insertUser(UserDTO user); // 신규 사용자 등록
    int updateUser(UserDTO user); // 기존 사용자 정보 수정
    int deleteUser(@Param("userId") String userId); // 사용자 삭제 (하드 삭제 또는 UseYn 업데이트)
    int checkUserIdExists(@Param("userId") String userId); // 사용자 ID 중복 체크 (선택)
    
    // 비밀번호 업데이트 전용 메서드 (UserDTO에서 password만 사용)
    int updatePassword(@Param("userId") String userId, @Param("newPassword") String newPassword);
}