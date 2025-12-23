package com.korigin.tobe.ias.model;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Alias(value = "login")
public class Login {

    private String usrSeq;
    private String usrId;
    private String passwd;
    private String usrName;
    private String role;
    private int apprLvl;
    private String useYn;
    private String deptCd;
    private String deptNm;
    private int totVac;
    private int restVac;

    private String modiUsrId;

}
