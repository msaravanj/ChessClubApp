package com.project.chessclubmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDto {
    
    private Long id;

    private String title;

    private String content;

    private LocalDate date;

    private String photo;
    
}
