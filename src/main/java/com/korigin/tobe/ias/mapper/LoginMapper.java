package com.korigin.tobe.ias.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.korigin.tobe.ias.model.Login;


@Mapper
@Repository
public interface LoginMapper {
    
    Login getLoginUser(Login login);

}
