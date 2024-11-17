package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.ArticleDto;

import java.util.List;
import java.util.Optional;

public interface ArticleService {

    List<ArticleDto> findAllArticles();

    Optional<ArticleDto> findByTitle(String title);

    Optional<ArticleDto> save(ArticleDto articleDto);

    ArticleDto updateArticle(Long articleId, ArticleDto articleDto);


}
