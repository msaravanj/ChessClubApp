package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.ClubDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface ClubService {

    Optional<ClubDto> findByEmail(String email);

    ClubDto updateClub(Long clubId, ClubDto clubDto);
}
