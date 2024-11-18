package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.dto.ClubDto;
import com.project.chessclubmanager.dto.UserDto;
import com.project.chessclubmanager.service.ClubService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("club")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ClubController {

    ClubService clubService;

    @GetMapping("/")
    public ResponseEntity<ClubDto> getClubByEmail(@RequestParam String email) {
        return clubService.findByEmail(email)
                .map(
                        club -> ResponseEntity.status(HttpStatus.OK).body(club)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }

    @PutMapping("/updateClub/{clubId}")
    public ClubDto updateClub(@PathVariable(value = "clubId") Long clubId,
                              @RequestBody ClubDto clubDto) {

        return clubService.updateClub(clubId, clubDto);

    }
}
