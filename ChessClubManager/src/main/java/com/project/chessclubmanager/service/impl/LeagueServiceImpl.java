package com.project.chessclubmanager.service.impl;

import com.project.chessclubmanager.domain.League;
import com.project.chessclubmanager.domain.Player;
import com.project.chessclubmanager.domain.User;
import com.project.chessclubmanager.dto.LeagueDto;
import com.project.chessclubmanager.dto.UserDto;
import com.project.chessclubmanager.repository.LeagueRepository;
import com.project.chessclubmanager.service.LeagueService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class LeagueServiceImpl implements LeagueService{

    LeagueRepository leagueRepository;

    @Override
    public List<LeagueDto> findAllLeagues() {
        return leagueRepository.findAll()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<LeagueDto> save(LeagueDto leagueDto) {
        return Optional.of(mapToDto(leagueRepository.save(mapToLeague(leagueDto))));
    }

    @Override
    public LeagueDto updateLeague(Long leagueId, LeagueDto leagueDto) {
        League league = leagueRepository.findById(leagueId).orElseThrow();

        league.setName(leagueDto.getName());
        league.setGamesUrl(leagueDto.getGamesUrl());
        league.setResultsUrl(leagueDto.getResultsUrl());
        league.setLeagueImage(leagueDto.getLeagueImage());
        league.setLeagueText(leagueDto.getLeagueText());

        League updatedLeague = leagueRepository.save(league);

        return mapToDto(updatedLeague);
    }

    private LeagueDto mapToDto(League league) {
        LeagueDto leagueDto = new LeagueDto();
        leagueDto.setId(league.getId());
        leagueDto.setName(league.getName());
        leagueDto.setLeagueText(league.getLeagueText());
        leagueDto.setLeagueImage(league.getLeagueImage());
        leagueDto.setResultsUrl(league.getResultsUrl());
        leagueDto.setGamesUrl(league.getGamesUrl());

        return leagueDto;
    }

    private League mapToLeague(LeagueDto leagueDto) {
        League league = new League();
        league.setId(leagueDto.getId());
        league.setName(leagueDto.getName());
        league.setResultsUrl(leagueDto.getResultsUrl());
        league.setGamesUrl(leagueDto.getGamesUrl());
        league.setLeagueImage(leagueDto.getLeagueImage());
        league.setLeagueText(leagueDto.getLeagueText());

        return league;
    }
}
