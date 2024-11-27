package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.domain.Article;
import com.project.chessclubmanager.domain.Player;
import com.project.chessclubmanager.dto.ArticleDto;
import com.project.chessclubmanager.dto.PlayerDto;
import com.project.chessclubmanager.repository.PlayerRepository;
import com.project.chessclubmanager.service.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("player")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class PlayerController {

    PlayerService playerService;
    PlayerRepository playerRepository;

    @GetMapping("all")
    public List<PlayerDto> getAllPlayers() {
        return playerService.findAllPlayers();
    }

    @GetMapping("/")
    public ResponseEntity<PlayerDto> getPlayerById(@RequestParam Long id) {
        return playerService.findById(id)
                .map(
                        article -> ResponseEntity.status(HttpStatus.OK).body(article)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }



    @PostMapping("/create")
    public ResponseEntity<PlayerDto> savePlayer(@RequestBody PlayerDto playerDto) {
        return playerService.save(playerDto)
                .map(
                        player -> ResponseEntity.status(HttpStatus.CREATED).body(player)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.CONFLICT).build()
                );
    }

    @PutMapping("/updatePlayer/{playerId}")
    public ResponseEntity<Player> updatePlayer(@PathVariable(value = "playerId") Long playerId,
                                               @RequestBody PlayerDto playerDto) {

        Optional<Player> existingPlayerOpt = playerRepository.findById(playerId);

        if (existingPlayerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Player existingPlayer = existingPlayerOpt.get();

        if (playerDto.getName() != null) {
            existingPlayer.setName(playerDto.getName());
        }
        if (playerDto.getTitle() != null) {
            existingPlayer.setTitle(playerDto.getTitle());
        }

        if (playerDto.getPhoto() != null) {
            existingPlayer.setPhoto(playerDto.getPhoto());
        }
        if (playerDto.getRating() != null) {
            existingPlayer.setRating(playerDto.getRating());
        }

        if (playerDto.getFideUrl() != null) {
            existingPlayer.setFideUrl(playerDto.getFideUrl());
        }

        if (playerDto.getGamesPlayed() != null) {
            existingPlayer.setGamesPlayed(playerDto.getGamesPlayed());
        }

        if (playerDto.getPointsScored() != null) {
            existingPlayer.setPointsScored(playerDto.getPointsScored());
        }

        if (playerDto.getTeam() != null) {
            existingPlayer.setTeam(playerDto.getTeam());
        }

        Player updatedPlayer = playerRepository.save(existingPlayer);

        return ResponseEntity.ok(updatedPlayer);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        if (playerService.deleteById(id)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
