package com.korigin.tobe.ias.controller;

import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class LoginController {
    
    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error, Model model){

        if(error != null){
            model.addAttribute("loginError", "아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return "login";
    }

    @GetMapping("/changePasswordPop")
    public String changePassword(@RequestParam(value = "userId", required = false) String userId, Model model){

        if(userId != null && !userId.isEmpty()){
            model.addAttribute("userId", userId);
        }

        return "changePassword";

    }

    // 비밀번호 변경 처리 메서드 (선택적으로 추가)
    @PostMapping("/changePassword")
    public String processChangePassword(
            @RequestParam("currentPassword") String currentPassword,
            @RequestParam("newPassword") String newPassword,
            @RequestParam("confirmPassword") String confirmPassword,
            Authentication authentication,
            RedirectAttributes redirectAttributes) {
        
        // 현재 로그인한 사용자 정보 가져오기
        String userId = authentication.getName();
        
        // 여기에 비밀번호 변경 로직 구현
        // 1. 현재 비밀번호 확인
        // 2. 새 비밀번호와 확인 비밀번호 일치 여부 확인
        // 3. 비밀번호 변경 처리
        
        // 성공 메시지 추가
        redirectAttributes.addFlashAttribute("message", "비밀번호가 성공적으로 변경되었습니다.");
        
        // 메인 페이지 또는 설정 페이지로 리다이렉트
        return "redirect:/approval";
    }

    @GetMapping("/main")
    public String approval(HttpSession session, Model model){

        String userId = (String) session.getAttribute("userId");
        String userName = (String) session.getAttribute("userName");
        String deptCd = (String) session.getAttribute("deptCd");
        String deptName = (String) session.getAttribute("deptNm");
        String role = (String) session.getAttribute("role");
        

        model.addAttribute("userId", userId);
        model.addAttribute("userName", userName);
        model.addAttribute("deptCd", deptCd);
        model.addAttribute("role", role);

        return "main";
    }

}
