package com.project.chessclubmanager.service;

import com.project.chessclubmanager.dto.PlayerDto;
import java.util.List;
import java.util.Optional;

public interface PlayerService {

    List<PlayerDto> findAllPlayers();

    Optional<PlayerDto> save(PlayerDto playerDto);

    PlayerDto updatePlayer(Long playerId, PlayerDto playerDto);
}
