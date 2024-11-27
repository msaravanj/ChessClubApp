package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.domain.League;
import com.project.chessclubmanager.dto.LeagueDto;
import com.project.chessclubmanager.dto.PlayerDto;
import com.project.chessclubmanager.repository.LeagueRepository;
import com.project.chessclubmanager.service.LeagueService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("league")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class LeagueController {

    LeagueService leagueService;
    LeagueRepository leagueRepository;

    @GetMapping("all")
    public List<LeagueDto> getAllLeagues() {
        return leagueService.findAllLeagues();
    }

    @GetMapping("/")
    public ResponseEntity<LeagueDto> getLeagueById(@RequestParam Long id) {
        return leagueService.findById(id)
                .map(
                        league -> ResponseEntity.status(HttpStatus.OK).body(league)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
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
    public ResponseEntity<League> updateLeague(@PathVariable(value = "leagueId") Long leagueId,
                                               @RequestBody LeagueDto leagueDto) {

        Optional<League> existingLeagueOpt = leagueRepository.findById(leagueId);

        if (existingLeagueOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        League existingLeague = existingLeagueOpt.get();

        if (leagueDto.getName() != null) {
            existingLeague.setName(leagueDto.getName());
        }
        if (leagueDto.getGamesUrl() != null) {
            existingLeague.setGamesUrl(leagueDto.getGamesUrl());
        }

        if (leagueDto.getLeagueImage() != null) {
            existingLeague.setLeagueImage(leagueDto.getLeagueImage());
        }
        if (leagueDto.getLeagueText() != null) {
            existingLeague.setLeagueText(leagueDto.getLeagueText());
        }

        if (leagueDto.getResultsUrl() != null) {
            existingLeague.setResultsUrl(leagueDto.getResultsUrl());
        }

        League updatedLeague = leagueRepository.save(existingLeague);

        return ResponseEntity.ok(updatedLeague);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLeague(@PathVariable Long id) {
        if (leagueService.deleteById(id)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
