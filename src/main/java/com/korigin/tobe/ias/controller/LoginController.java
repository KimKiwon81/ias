package com.korigin.tobe.ias.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.korigin.tobe.ias.model.Login;
import com.korigin.tobe.ias.service.LoginService;
import com.korigin.tobe.ias.util.CryptUtil;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class LoginController {

    @Autowired
    private LoginService loginService;
    
    @RequestMapping("/login")
    public ModelAndView login(HttpServletRequest request, Model model) {

        ModelAndView mnv = new ModelAndView();

        mnv.setViewName("login");

        return mnv;
    }

    @RequestMapping("/loginProc")
    public ModelAndView loginProc(HttpServletRequest request, Model model, @ModelAttribute Login login) {

        ModelAndView mnv = new ModelAndView();
        mnv.setViewName("jsonView");

        String rtnCd = "00";

        Login loginUser = null;

        try {

            log.debug("LOGIN => EMP_ID : [{}]", login.getUsrId());

            loginUser = loginService.getLoginUser(login);

            if (loginUser == null) {
                // 계정 정보 없음
                rtnCd = "10";
                mnv.addObject("RTN_CD", rtnCd);
                return mnv;
            }

            String encPasswd = CryptUtil.encryptString(login.getPasswd());

            // 패스워드 불일치 관련 리턴
            if (!encPasswd.equals(loginUser.getPasswd())) {

                // 패스워드 불일치
                rtnCd = "90";

                mnv.addObject("RTN_CD", rtnCd);
                return mnv;
            }


            HttpSession session = request.getSession(true);

            session.setAttribute("SESS_LOGIN_INFO", loginUser);
            session.setAttribute("SESS_USR_ID", loginUser.getUsrId());

            session.setAttribute("SESS_USR_NAME", loginUser.getUsrName());
            session.setAttribute("SESS_DEPT_CD", loginUser.getDeptCd());
            session.setAttribute("SESS_DEPT_NM", loginUser.getDeptNm());

            session.setAttribute("SESS_ROLE", loginUser.getRole());
            session.setAttribute("SESS_APPRV_LVL", loginUser.getApprLvl());

            session.setAttribute("SESS_TOT_VAC", loginUser.getTotVac());
            session.setAttribute("SESS_REST_VAC", loginUser.getRestVac());

            // session timeout 설정(현재 30분)
            session.setMaxInactiveInterval(60 * 30);


        } catch (Exception e) {

            rtnCd = "99";
            e.printStackTrace();
        } finally {
            try {

                if (!"00".equals(rtnCd)) {
                    request.getSession(true).invalidate();
                }

            } catch (Exception e) {

            }
        }

        log.debug("rtnCd : {}", rtnCd);
        mnv.addObject("RTN_CD", rtnCd);

        return mnv;

    }

    @RequestMapping("/logoutProc")
    public String logoutProc(HttpServletRequest request) {

        HttpSession session = request.getSession();

        session.invalidate();

        return "redirect:login";

    }

    @RequestMapping("/sessionExpried")
    public ModelAndView doSessionExpried(HttpServletRequest request, HttpServletResponse response) {
        log.debug("####################### LoginController sessionExpried");
        ModelAndView mnv = new ModelAndView("jsonView");
        mnv.addObject("SESSION", "EXPIRED");
        return mnv;
    }

}
