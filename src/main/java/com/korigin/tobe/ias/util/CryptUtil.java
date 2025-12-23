package com.korigin.tobe.ias.util;

import java.io.File;
import java.security.MessageDigest;
import java.util.Base64;

/***
 * @author kwkim  yecaits
 * @since 2023.09.14
 * @version 1.0
 * @see 각종 암복호화 지원 유틸
 */

public class CryptUtil {

    //파일 구분자
    static final char FILE_SEPARATOR = File.separatorChar;

    //버퍼 사이즈
    static final int BUFFER_SIZE = 1024;

    /**
     * 비밀번호 암호화 기능(SHA-256 단방향 암호화 적용)
     * @param String passwd 암호화할 비밀번호
     * @return String encPasswd 암오화된 비밀번호
     * @exception Exception
     */
    public static String encryptString(String passwd) throws Exception{

        if(passwd == null){
            return "";
        }

        byte[] plainText = null;
        byte[] hashValue = null;

        plainText = passwd.getBytes();

        MessageDigest md = MessageDigest.getInstance("SHA-256");

        hashValue = md.digest(plainText);

        return Base64.getEncoder().encodeToString(hashValue);

    }
    
}
