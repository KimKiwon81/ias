package com.korigin.tobe.ias.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.korigin.tobe.ias.dto.UserDTO;
import com.korigin.tobe.ias.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserMapper userMapper;

    //생성자 주입
    public CustomUserDetailsService(UserMapper userMapper){
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        UserDTO user = userMapper.selectUserById(userId);

        log.info("userDTO :[{}],[{}],[{}]", user.getUsrSeq(), user.getUsrId(), user.getUsrName());

        if(user  == null){
            throw new UsernameNotFoundException("사용자 정보를 찾을 수 없습니다. ["+userId+"]");
        }

        return new org.springframework.security.core.userdetails.User(
            user.getUsrId(),
            user.getPasswd(),
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+user.getRole()))
        );
    }
}
