package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.ArticleDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ArticleService {

    List<ArticleDto> findAllArticles();

    Optional<ArticleDto> findByTitle(String title);

    Optional<ArticleDto> save(ArticleDto articleDto);

    ArticleDto updateArticle(Long articleId, ArticleDto articleDto);


}
