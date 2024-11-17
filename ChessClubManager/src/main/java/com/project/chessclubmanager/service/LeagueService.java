package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.LeagueDto;
import java.util.List;
import java.util.Optional;

public interface LeagueService {

    List<LeagueDto> findAllLeagues();

    Optional<LeagueDto> save(LeagueDto leagueDto);

    LeagueDto updateLeague(Long leagueId, LeagueDto leagueDto);
}
