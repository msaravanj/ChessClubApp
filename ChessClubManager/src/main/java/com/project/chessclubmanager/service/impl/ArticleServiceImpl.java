package com.project.chessclubmanager.service.impl;

import com.project.chessclubmanager.domain.Article;
import com.project.chessclubmanager.dto.ArticleDto;
import com.project.chessclubmanager.repository.ArticleRepository;
import com.project.chessclubmanager.service.ArticleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    ArticleRepository articleRepository;

    @Override
    public List<ArticleDto> findAllArticles() {
        return articleRepository.findAll()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<ArticleDto> findByTitle(String title) {
        return Optional.of(mapToDto(articleRepository.findByTitle(title).get()));
    }

    @Override
    public Optional<ArticleDto> save(ArticleDto articleDto) {
        return Optional.of(mapToDto(articleRepository.save(mapToArticle(articleDto))));
    }

    @Override
    public ArticleDto updateArticle(Long articleId, ArticleDto articleDto) {
        Article article = articleRepository.findById(articleId).orElseThrow();

        article.setTitle(articleDto.getTitle());
        article.setContent(articleDto.getContent());
        article.setDate(articleDto.getDate());
        article.setPhoto(articleDto.getPhoto());

        Article updatedArticle = articleRepository.save(article);

        return mapToDto(updatedArticle);
    }



    private ArticleDto mapToDto(Article article) {
        ArticleDto userDto = new ArticleDto();
        userDto.setId(article.getId());
        userDto.setTitle(article.getTitle());
        userDto.setContent(article.getContent());
        userDto.setDate(article.getDate());
        userDto.setPhoto(article.getPhoto());

        return userDto;
    }

    private Article mapToArticle(ArticleDto articleDto) {
        Article article = new Article();
        article.setId(articleDto.getId());
        article.setTitle(articleDto.getTitle());
        article.setContent(articleDto.getContent());
        article.setDate(articleDto.getDate());
        article.setPhoto(articleDto.getPhoto());

        return article;
    }
}
