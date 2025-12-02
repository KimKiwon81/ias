package com.korigin.tobe.ias.dto;

import lombok.Data;

@Data
public class CodeDTO {
    private String grpCode;
    private String codeValue;
    private String codeName;
    private String codeDesc;
    private Integer sortOrder;
    private String useYn;
}
