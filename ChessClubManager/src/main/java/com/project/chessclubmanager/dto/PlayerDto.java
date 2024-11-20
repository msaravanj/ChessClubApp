package com.project.chessclubmanager.dto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerDto {

    private Long id;

    private String name;

    private Integer rating;

    private String title;

    private String photo;

    private BigDecimal pointsScored;

    private Integer gamesPlayed;

    private String fideUrl;

    private Integer team;
}
