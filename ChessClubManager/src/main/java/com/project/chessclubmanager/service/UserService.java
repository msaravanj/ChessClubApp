package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    List<UserDto> findAllUsers();

    Optional<UserDto> findByEmail(String email);

    Optional<UserDto> save(UserDto userDto);
}
