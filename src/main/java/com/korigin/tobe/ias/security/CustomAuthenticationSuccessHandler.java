package com.korigin.tobe.ias.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.korigin.tobe.ias.dto.UserDTO;
import com.korigin.tobe.ias.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        
        HttpSession session = request.getSession();
        
        // UserDetails에서 사용자 정보 가져오기
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        
        // UserMapper를 통해 추가 정보 조회
        UserDTO user = userMapper.selectUserById(userId);
        
        // 세션에 사용자 정보 저장
        session.setAttribute("userId", user.getUsrId());
        session.setAttribute("userName", user.getUsrName());
        session.setAttribute("deptCd", user.getDeptCd());
        session.setAttribute("deptName", user.getDeptNm());
        session.setAttribute("role", user.getRole());
        
        // 원하는 페이지로 리다이렉트
        response.sendRedirect("/main");
    }
    
    @Autowired
    private UserMapper userMapper;
}