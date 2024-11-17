package com.project.chessclubmanager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "PLAYERS")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Integer rating;

    private String title;

    private String photo;

    private BigDecimal pointsScored;

    private Integer gamesPlayed;

    @Column(unique = true)
    private String fideUrl;

    @ElementCollection
    private List<Integer> teams;


}
