package com.project.chessclubmanager.service.impl;

import com.project.chessclubmanager.domain.Player;
import com.project.chessclubmanager.dto.ArticleDto;
import com.project.chessclubmanager.dto.PlayerDto;
import com.project.chessclubmanager.repository.PlayerRepository;
import com.project.chessclubmanager.service.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    PlayerRepository playerRepository;

    @Override
    public List<PlayerDto> findAllPlayers() {
        return playerRepository.findAll()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<PlayerDto> findById(Long id) {
        return Optional.of(mapToDto(playerRepository.findById(id).get()));
    }

    @Override
    public Optional<PlayerDto> save(PlayerDto playerDto) {
        return Optional.of(mapToDto(playerRepository.save(mapToPlayer(playerDto))));
    }

    @Override
    public PlayerDto updatePlayer(Long playerId, PlayerDto playerDto) {
        Player player = playerRepository.findById(playerId).orElseThrow();

        player.setTitle(playerDto.getTitle());
        player.setName(playerDto.getName());
        player.setRating(playerDto.getRating());
        player.setPhoto(playerDto.getPhoto());
        player.setGamesPlayed(playerDto.getGamesPlayed());
        player.setPointsScored(playerDto.getPointsScored());
        player.setTeam(playerDto.getTeam());
        player.setFideUrl(playerDto.getFideUrl());

        Player updatedPlayer = playerRepository.save(player);

        return mapToDto(updatedPlayer);
    }

    @Override
    public boolean deleteById(Long id) {
        if (playerRepository.existsById(id)) {
            playerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private PlayerDto mapToDto(Player player) {

        PlayerDto playerDto = new PlayerDto();
        playerDto.setId(player.getId());
        playerDto.setName(player.getName());
        playerDto.setTitle(player.getTitle());
        playerDto.setRating(player.getRating());
        playerDto.setPhoto(player.getPhoto());
        playerDto.setGamesPlayed(player.getGamesPlayed());
        playerDto.setFideUrl(player.getFideUrl());
        playerDto.setPointsScored(player.getPointsScored());
        playerDto.setTeam(player.getTeam());

        return playerDto;
    }

    private Player mapToPlayer(PlayerDto playerDto) {

        Player player = new Player();
        player.setId(playerDto.getId());
        player.setTitle(playerDto.getTitle());
        player.setName(playerDto.getName());
        player.setRating(playerDto.getRating());
        player.setPhoto(playerDto.getPhoto());
        player.setFideUrl(playerDto.getFideUrl());
        player.setTeam(playerDto.getTeam());
        player.setPointsScored(playerDto.getPointsScored());
        player.setGamesPlayed(playerDto.getGamesPlayed());

        return player;
    }
}
