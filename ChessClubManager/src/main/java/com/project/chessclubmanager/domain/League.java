package com.project.chessclubmanager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "LEAGUE")
public class League {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Lob
    private String leagueText;

    private String resultsUrl;

    private String gamesUrl;

    private String leagueImage;

}
