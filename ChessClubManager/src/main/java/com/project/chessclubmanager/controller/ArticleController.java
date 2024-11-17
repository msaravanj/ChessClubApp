package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.dto.ArticleDto;
import com.project.chessclubmanager.service.ArticleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ArticleController {

    ArticleService articleService;

    @GetMapping("all")
    public List<ArticleDto> getAllArticles() {
        return articleService.findAllArticles();
    }

    @GetMapping("/")
    public ResponseEntity<ArticleDto> getArticleByTitle(@RequestParam String title) {
        return articleService.findByTitle(title)
                .map(
                        article -> ResponseEntity.status(HttpStatus.OK).body(article)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }

    @PostMapping("/create")
    public ResponseEntity<ArticleDto> saveArticle(@RequestBody ArticleDto articleDto) {
        return articleService.save(articleDto)
                .map(
                        article -> ResponseEntity.status(HttpStatus.CREATED).body(article)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.CONFLICT).build()
                );
    }

    @PutMapping("/updateArticle/{articleId}")
    public ArticleDto updateArticle(@PathVariable(value = "articleId") Long articleId,
                           @RequestBody ArticleDto articleDto) {

        return articleService.updateArticle(articleId, articleDto);

    }


}
