package com.korigin.tobe.ias.service;

import javax.servlet.http.HttpServletRequest;

import com.korigin.tobe.ias.model.Login;

public interface LoginService {
    
    public Login getLoginUser(Login login) throws Exception;

    public String sessionCheck(HttpServletRequest request);

}
