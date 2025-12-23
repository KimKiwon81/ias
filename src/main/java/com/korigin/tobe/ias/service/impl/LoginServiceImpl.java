package com.korigin.tobe.ias.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.korigin.tobe.ias.model.Login;
import com.korigin.tobe.ias.service.LoginService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginServiceImpl implements LoginService {
    
    @Autowired
    private final com.korigin.tobe.ias.mapper.LoginMapper loginMapper;

    @Override
    public com.korigin.tobe.ias.model.Login getLoginUser(Login login) {
        return loginMapper.getLoginUser(login);
    }

    @Override
    public String sessionCheck(HttpServletRequest request){

        HttpSession session = request.getSession();

        Login loginSess = (Login) session.getAttribute("SESS_LOGIN_INFO");

        if(loginSess == null){

            log.debug("Session Usr Id is null......");
            
            return "N";
        }

        log.debug("This Session Usr Id is [{}]", loginSess.getUsrId());

        return "Y";
    }

}
