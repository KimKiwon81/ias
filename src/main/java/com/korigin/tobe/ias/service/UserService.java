// src/main/java/com/korigin/tobe/ias/service/UserService.java
package com.korigin.tobe.ias.service;

import com.korigin.tobe.ias.dto.UserDTO;
import com.korigin.tobe.ias.dto.UserSearchDTO;
import com.korigin.tobe.ias.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder; // Spring Security의 PasswordEncoder 사용
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화를 위한 인코더

    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getUserList(UserSearchDTO searchDTO) {
        return userMapper.selectUserList(searchDTO);
    }

    public UserDTO getUserById(String userId) {
        return userMapper.selectUserById(userId);
    }

    @Transactional
    public void saveUser(UserDTO user, String currentUserId) { // currentUserId는 등록자/수정자 기록용
        
        String userId = user.getUsrId();

        boolean isNewUser = (userMapper.selectUserById(userId) == null);

        if(isNewUser){

            log.info("신규 사용자 등록 : {}", userId);

            if(userMapper.checkUserIdExists(userId) > 0) {
                throw new IllegalArgumentException("이미 존재하는 사용자 ID 입니다.");
            }
            
            String rawPassword = (user.getPasswd() != null && !user.getPasswd().isEmpty()) ? user.getPasswd() : "tobe1234!";
            user.setPasswd(passwordEncoder.encode(rawPassword));
            log.debug("신규 사용자 [{}] 비밀번호 설정 완료: {}", userId, rawPassword.equals("tobe1234!") ? "기본 비밀번호" : "입력 비밀번호");
            
            user.setRegUsrId(currentUserId);
            user.setRegDtm(LocalDateTime.now());
            user.setModiUsrId(currentUserId);
            user.setModiDtm(LocalDateTime.now());

            // 신규 사용자의 초기 휴가 설정 (만약 DTO에 없으면 기본값 부여)
            if (user.getTotVac() == null) user.setTotVac(0.0);
            if (user.getRestVac() == null) user.setRestVac(0.0);
            if (user.getApprLvl() == null) user.setApprLvl(5); // 기본 결재 등급
            if (user.getUseYn() == null) user.setUseYn("Y"); // 기본 사용 여부

            int insertedRows = userMapper.insertUser(user);
            if (insertedRows == 0) {
                throw new RuntimeException("사용자 정보 수정에 실패했습니다. (ID: " + userId + ")");
            }
        } else { // 신규 사용자 등록 (INSERT)
            log.info("사용자 정보 수정: {}", userId);
            
            // [***** 수정된 부분 *****] 기존 사용자 비밀번호 수정:
            // 폼에서 비밀번호를 입력한 경우에만 암호화하여 업데이트. 비워두면 기존 비밀번호 유지.
            if (user.getPasswd() != null && !user.getPasswd().isEmpty()) {
                user.setPasswd(passwordEncoder.encode(user.getPasswd()));
                 log.debug("기존 사용자 [{}] 비밀번호 변경 완료", userId);
            } else {
                user.setPasswd(null); // 비밀번호를 변경하지 않을 것이므로 null로 설정하여 Mapper에서 스킵
                 log.debug("기존 사용자 [{}] 비밀번호 변경 요청 없음", userId);
            }
            
            user.setModiUsrId(currentUserId);
            user.setModiDtm(LocalDateTime.now());
            int updatedRows = userMapper.updateUser(user);
            if (updatedRows == 0) {
                throw new RuntimeException("사용자 정보 수정에 실패했습니다. (ID: " + userId + ")");
            }
        }
    }

    @Transactional
    public void deleteUser(String userId) {
        log.info("사용자 삭제: {}", userId);
        int deletedRows = userMapper.deleteUser(userId);
        if (deletedRows == 0) {
            throw new RuntimeException("사용자 삭제에 실패했습니다. (ID: " + userId + ")");
        }
    }
}