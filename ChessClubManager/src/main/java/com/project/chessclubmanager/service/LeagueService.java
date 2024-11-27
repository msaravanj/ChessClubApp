package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.LeagueDto;
import com.project.chessclubmanager.dto.PlayerDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface LeagueService {

    List<LeagueDto> findAllLeagues();

    Optional<LeagueDto> findById(Long id);

    Optional<LeagueDto> save(LeagueDto leagueDto);

    LeagueDto updateLeague(Long leagueId, LeagueDto leagueDto);

    boolean deleteById(Long id);
}
