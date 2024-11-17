package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.ClubDto;

import java.util.Optional;

public interface ClubService {

    Optional<ClubDto> findByEmail(String email);

    ClubDto updateClub(Long clubId, ClubDto clubDto);
}
