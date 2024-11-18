package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.PlayerDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PlayerService {

    List<PlayerDto> findAllPlayers();

    Optional<PlayerDto> save(PlayerDto playerDto);

    PlayerDto updatePlayer(Long playerId, PlayerDto playerDto);
}
