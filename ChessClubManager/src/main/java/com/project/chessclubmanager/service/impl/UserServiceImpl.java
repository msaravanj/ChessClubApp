package com.project.chessclubmanager.service.impl;

import com.project.chessclubmanager.domain.User;
import com.project.chessclubmanager.dto.UserDto;
import com.project.chessclubmanager.repository.UserRepository;
import com.project.chessclubmanager.service.UserService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    @Override
    public List<UserDto> findAllUsers() {
        return userRepository.findAll()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<UserDto> findByEmail(String email) {
        return Optional.of(mapToDto(userRepository.findByEmail(email).get()));

    }

    @Override
    public Optional<UserDto> save(UserDto userDto) {
        return Optional.of(mapToDto(userRepository.save(mapToUser(userDto))));

    }

    private UserDto mapToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setRole(user.getRole());

        return userDto;
    }

    private User mapToUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());

        return user;
    }
}
