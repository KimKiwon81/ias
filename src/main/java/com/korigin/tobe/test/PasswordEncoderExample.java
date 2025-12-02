package com.korigin.tobe.test;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderExample {
    
    public static void main(String[] args){

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        //1. 패스워드 해싱
        String rawPassword = "test1234!";
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("해싱된 패스워드 : ["+encodedPassword+"]");

        //2.패스워드 검증
        boolean isMatch = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("패스워드 일치 여부 : ["+isMatch+"]");

    }

}
