package com.korigin.tobe.ias.model;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Users {
    private String usrSeq;
    private String usrId;
    private String passwd;
    private String usrName;
    private String role;
    private int apprLvl;
    private String useYn;
    private String deptCd;
    private int totVac;
    private double restVac;
    private LocalDateTime finalLoginDate;
    private String regUsrId;
    private LocalDateTime regDtm;
    private String modiUsrId;
    private LocalDateTime modiDtm;
}