package com.project.chessclubmanager.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

    private String name;

    private String lastName;

    private String password;

    private String email;

    private Integer role;
}
