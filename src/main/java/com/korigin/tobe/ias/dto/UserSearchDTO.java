// src/main/java/com/korigin/tobe/ias/dto/UserSearchDTO.java
package com.korigin.tobe.ias.dto;

import lombok.Data;

@Data
public class UserSearchDTO {
    private String searchUserId;
    private String searchUserName;
    private String searchDeptCd;
    private String searchRole;
    private String searchUseYn;
}