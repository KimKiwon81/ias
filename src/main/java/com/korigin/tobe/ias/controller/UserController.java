// src/main/java/com/korigin/tobe/ias/controller/UserController.java
package com.korigin.tobe.ias.controller;

import com.korigin.tobe.ias.dto.UserDTO;
import com.korigin.tobe.ias.dto.UserSearchDTO;
import com.korigin.tobe.ias.service.CodeService;
import com.korigin.tobe.ias.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
public class UserController {

    private final UserService userService;
    private final CodeService codeService; // 부서 코드, 권한 코드 등을 가져오기 위해 사용

    public UserController(UserService userService, CodeService codeService) {
        this.userService = userService;
        this.codeService = codeService;
    }

    // 사용자 목록 화면 로드
    @GetMapping("/userList")
    public String userList(@ModelAttribute UserSearchDTO userSearchDTO, Model model, HttpSession session) {
        
        model.addAttribute("userList", userService.getUserList(userSearchDTO)); // 초기 전체 목록 로드
        model.addAttribute("deptCodes", codeService.getCodeListByGrpCode("DEPT")); // 부서 코드 목록
        model.addAttribute("roleCodes", codeService.getCodeListByGrpCode("ROLE_TYPE")); // 권한 코드 목록
        return "userList";
    }

    // 사용자 목록 AJAX 검색
    @GetMapping("/api/users/search")
    @ResponseBody
    public List<UserDTO> searchUsers(UserSearchDTO searchDTO) {
        log.info("사용자 검색 요청: {}", searchDTO);
        return userService.getUserList(searchDTO);
    }

    // 사용자 등록/수정 폼 로드 (userForm.jsp)
    @GetMapping("/userForm")
    public String userForm(@RequestParam(value = "userId", required = false) String userId,
                           Model model) {
        UserDTO user = new UserDTO();
        if (userId != null && !userId.isEmpty()) { // userId가 있으면 수정 모드
            user = userService.getUserById(userId);
            if (user == null) {
                log.warn("ID [{}]에 해당하는 사용자를 찾을 수 없습니다. 신규 등록 모드로 전환.", userId);
                user = new UserDTO();
            } else {
                log.info("사용자 수정 폼 로딩 (ID: {}).", userId);
            }
        } else { // 신규 등록 모드
            log.info("신규 사용자 등록 폼 로딩.");
        }
        model.addAttribute("user", user);
        model.addAttribute("deptCodes", codeService.getCodeListByGrpCode("DEPT_CD")); // 부서 코드 목록
        model.addAttribute("roleCodes", codeService.getCodeListByGrpCode("ROLE_TYPE")); // 권한 코드 목록
        return "userForm";
    }

    // 사용자 정보 저장 (신규 등록 및 업데이트 통합)
    @PostMapping("/api/user/save")
    @ResponseBody
    public ResponseEntity<?> saveUser(@ModelAttribute UserDTO user, HttpSession session) {
        String currentUserId = (String) session.getAttribute("userId"); // 현재 로그인 사용자 ID

        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        
        // 신규 등록 시에는 ID 중복 체크가 Controller 레벨에서 한번 더 필요할 수 있음
        if (user.getUsrSeq() == null && userService.getUserById(user.getUsrId()) != null) {
             return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "이미 존재하는 사용자 ID입니다."));
        }

        try {
            userService.saveUser(user, currentUserId);
            String message = (user.getUsrSeq() == null) ? "새 사용자가 등록되었습니다." : "사용자 정보가 수정되었습니다.";
            return ResponseEntity.ok(Map.of("status", "success", "message", message));
        } catch (IllegalArgumentException e) {
            log.error("사용자 저장 실패 (입력 데이터 문제): {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
        } catch (Exception e) {
            log.error("사용자 저장 중 알 수 없는 오류 발생: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("status", "error", "message", "사용자 정보 저장 중 오류가 발생했습니다."));
        }
    }

    // 사용자 삭제
    @PostMapping("/api/user/delete/{userId}") // POST + 경로 변수 사용
    @ResponseBody
    public ResponseEntity<?> deleteUser(@PathVariable String userId, HttpSession session) {
        String currentUserId = (String) session.getAttribute("userId");
        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "로그인이 필요합니다."));
        }
        if (currentUserId.equals(userId)) { // 자기 자신은 삭제할 수 없도록
             return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("status", "error", "message", "자기 자신은 삭제할 수 없습니다."));
        }

        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok(Map.of("status", "success", "message", "사용자 '" + userId + "'가 삭제되었습니다."));
        } catch (Exception e) {
            log.error("사용자 삭제 중 오류 발생: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("status", "error", "message", "사용자 삭제 중 오류가 발생했습니다."));
        }
    }
}