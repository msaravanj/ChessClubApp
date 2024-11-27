package com.project.chessclubmanager.controller;

import com.project.chessclubmanager.domain.Club;
import com.project.chessclubmanager.dto.ClubDto;
import com.project.chessclubmanager.dto.PlayerDto;
import com.project.chessclubmanager.repository.ClubRepository;
import com.project.chessclubmanager.service.ClubService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("club")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ClubController {

    ClubService clubService;
    ClubRepository clubRepository;


    @GetMapping("all")
    public List<ClubDto> getAllClubs() {
        return clubService.findAllClubs();
    }

    @GetMapping("/")
    public ResponseEntity<ClubDto> getClubById(@RequestParam Long id) {
        return clubService.findById(id)
                .map(
                        club -> ResponseEntity.status(HttpStatus.OK).body(club)
                ).orElseGet(
                        () -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }

    @PutMapping("/updateClub/{clubId}")
    public ResponseEntity<Club> updateClub(@PathVariable(value = "clubId") Long clubId,
                                            @RequestBody ClubDto clubDto) {

        Optional<Club> existingClubOpt = clubRepository.findById(clubId);

        if (existingClubOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Club existingClub = existingClubOpt.get();

        if (clubDto.getName() != null) {
            existingClub.setName(clubDto.getName());
        }
        if (clubDto.getAddress() != null) {
            existingClub.setAddress(clubDto.getAddress());
        }
        if (clubDto.getLatitude() != null) {
            existingClub.setLatitude(clubDto.getLatitude());
        }
        if (clubDto.getLongitude() != null) {
            existingClub.setLongitude(clubDto.getLongitude());
        }
        if (clubDto.getEmail() != null) {
            existingClub.setEmail(clubDto.getEmail());
        }
        if (clubDto.getChessSchoolText() != null) {
            existingClub.setChessSchoolText(clubDto.getChessSchoolText());
        }
        if (clubDto.getChessSchoolImage() != null) {
            existingClub.setChessSchoolImage(clubDto.getChessSchoolImage());
        }
        if (clubDto.getAboutUsText() != null) {
            existingClub.setAboutUsText(clubDto.getAboutUsText());
        }
        if (clubDto.getAboutUsImage() != null) {
            existingClub.setAboutUsImage(clubDto.getAboutUsImage());
        }

        // Spremi ažurirani klub u bazu
        Club updatedClub = clubRepository.save(existingClub);

       return ResponseEntity.ok(updatedClub);

    }

}
