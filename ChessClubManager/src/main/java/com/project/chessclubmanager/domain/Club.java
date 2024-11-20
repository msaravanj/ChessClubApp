package com.project.chessclubmanager.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "CLUB")
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String address;

    private BigDecimal latitude;

    private BigDecimal longitude;

    @Column(unique = true)
    private String email;

    @Lob
    private String ChessSchoolText;

    private String ChessSchoolImage;

    @Lob
    private String aboutUsText;

    private String aboutUsImage;


}
