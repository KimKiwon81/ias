package com.korigin.tobe.ias.mapper;

import com.korigin.tobe.ias.dto.CodeDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CodeMapper {
    List<CodeDTO> selectCodeListByGrpCode(@Param("grpCode") String grpCode);
}
