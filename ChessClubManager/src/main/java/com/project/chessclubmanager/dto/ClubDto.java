package com.project.chessclubmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubDto {

    private Long id;

    private String name;

    private String address;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String email;

    private String ChessSchoolText;

    private String ChessSchoolImage;

    private String aboutUsText;

    private String aboutUsImage;
}
