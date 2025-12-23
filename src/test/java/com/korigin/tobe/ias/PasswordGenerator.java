package com.korigin.tobe.ias;

import com.korigin.tobe.ias.util.CryptUtil;

public class PasswordGenerator {
    
    public static void main(String[] args){

        String orgPasswd = "tobe1234";

        try{
            
            String encPasswd = CryptUtil.encryptString(orgPasswd);

            System.out.println("Generate Encrypt Passwd : ["+encPasswd+"]");

        }catch(Exception e){
            e.printStackTrace();
        }

    }

}
