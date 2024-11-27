package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.ArticleDto;
import com.project.chessclubmanager.dto.ClubDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ClubService {

    List<ClubDto> findAllClubs();

    Optional<ClubDto> findById(Long id);

    ClubDto updateClub(Long clubId, ClubDto clubDto);
}
