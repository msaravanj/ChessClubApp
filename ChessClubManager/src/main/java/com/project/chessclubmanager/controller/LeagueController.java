package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.dto.LeagueDto;
import com.project.chessclubmanager.service.LeagueService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class LeagueController {

    LeagueService leagueService;

    @GetMapping("all")
    public List<LeagueDto> getAllLeagues() {
        return leagueService.findAllLeagues();
    }


    @PostMapping("/create")
    public ResponseEntity<LeagueDto> saveLeague(@RequestBody LeagueDto leagueDto) {
        return leagueService.save(leagueDto)
                .map(
                        league -> ResponseEntity.status(HttpStatus.CREATED).body(league)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.CONFLICT).build()
                );
    }

    @PutMapping("/updateLeague/{leagueId}")
    public LeagueDto updateLeague(@PathVariable(value = "leagueId") Long leagueId,
                                  @RequestBody LeagueDto leagueDto) {

        return leagueService.updateLeague(leagueId, leagueDto);

    }
}
