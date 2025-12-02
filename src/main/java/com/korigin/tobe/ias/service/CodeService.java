package com.korigin.tobe.ias.service;

import com.korigin.tobe.ias.dto.CodeDTO;
import com.korigin.tobe.ias.mapper.CodeMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CodeService {

    private final CodeMapper codeMapper;

    public CodeService(CodeMapper codeMapper) {
        this.codeMapper = codeMapper;
    }

    @Transactional(readOnly = true)
    public List<CodeDTO> getCodeListByGrpCode(String grpCode) {
        return codeMapper.selectCodeListByGrpCode(grpCode);
    }
}