package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.domain.Article;
import com.project.chessclubmanager.domain.Club;
import com.project.chessclubmanager.dto.ArticleDto;
import com.project.chessclubmanager.repository.ArticleRepository;
import com.project.chessclubmanager.service.ArticleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("article")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ArticleController {

    ArticleService articleService;
    ArticleRepository articleRepository;

    @GetMapping("all")
    public List<ArticleDto> getAllArticles() {
        return articleService.findAllArticles();
    }

    @GetMapping("/")
    public ResponseEntity<ArticleDto> getArticleById(@RequestParam Long id) {
        return articleService.findById(id)
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
    public ResponseEntity<Article> updateArticle(@PathVariable(value = "articleId") Long articleId,
                           @RequestBody ArticleDto articleDto) {

        Optional<Article> existingArticleOpt = articleRepository.findById(articleId);

        if (existingArticleOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Article existingArticle = existingArticleOpt.get();

        if (articleDto.getTitle() != null) {
            existingArticle.setTitle(articleDto.getTitle());
        }
        if (articleDto.getContent() != null) {
            existingArticle.setContent(articleDto.getContent());
        }

        if (articleDto.getPhoto() != null) {
            existingArticle.setPhoto(articleDto.getPhoto());
        }
        if (articleDto.getDate() != null) {
            existingArticle.setDate(articleDto.getDate());
        }

        Article updatedArticle = articleRepository.save(existingArticle);

        return ResponseEntity.ok(updatedArticle);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        if (articleService.deleteById(id)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
