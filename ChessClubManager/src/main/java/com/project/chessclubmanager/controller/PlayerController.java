package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.dto.PlayerDto;
import com.project.chessclubmanager.service.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class PlayerController {

    PlayerService playerService;

    @GetMapping("all")
    public List<PlayerDto> getAllPlayers() {
        return playerService.findAllPlayers();
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
    public PlayerDto updatePlayer(@PathVariable(value = "playerId") Long playerId,
                                    @RequestBody PlayerDto playerDto) {

        return playerService.updatePlayer(playerId, playerDto);

    }
}
