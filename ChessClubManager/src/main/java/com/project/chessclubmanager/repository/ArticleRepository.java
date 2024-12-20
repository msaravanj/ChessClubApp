package com.project.chessclubmanager.repository;

import com.project.chessclubmanager.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findById(Long id);
}
