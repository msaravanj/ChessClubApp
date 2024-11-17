package com.project.chessclubmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeagueDto {

    private Long id;

    private String name;

    private String leagueText;

    private String resultsUrl;

    private String gamesUrl;

    private String leagueImage;
}
