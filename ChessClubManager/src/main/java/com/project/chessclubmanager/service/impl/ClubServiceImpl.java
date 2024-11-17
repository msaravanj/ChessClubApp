package com.project.chessclubmanager.service.impl;

import com.project.chessclubmanager.domain.Club;
import com.project.chessclubmanager.dto.ClubDto;
import com.project.chessclubmanager.repository.ClubRepository;
import com.project.chessclubmanager.service.ClubService;

import java.util.Optional;

public class ClubServiceImpl implements ClubService {

    ClubRepository clubRepository;

    @Override
    public Optional<ClubDto> findByEmail(String email) {
        return Optional.of(mapToDto(clubRepository.findByEmail(email).get()));
    }

    @Override
    public ClubDto updateClub(Long clubId, ClubDto clubDto) {
        Club club = clubRepository.findById(clubId).orElseThrow();

        club.setName(clubDto.getName());
        club.setEmail(clubDto.getEmail());
        club.setLongitude(clubDto.getLongitude());
        club.setLatitude(clubDto.getLatitude());
        club.setAboutUsText(clubDto.getAboutUsText());
        club.setAboutUsImage(clubDto.getAboutUsImage());
        club.setChessSchoolText(clubDto.getChessSchoolText());
        club.setChessSchoolImage(clubDto.getChessSchoolImage());

        Club updatedClub = clubRepository.save(club);

        return mapToDto(updatedClub);
    }

    private ClubDto mapToDto(Club club) {
        ClubDto clubDto = new ClubDto();

        clubDto.setId(club.getId());

        clubDto.setName(club.getName());
        clubDto.setAddress(club.getAddress());
        clubDto.setEmail(club.getEmail());
        clubDto.setLatitude(club.getLatitude());
        clubDto.setLongitude(club.getLongitude());
        clubDto.setAboutUsText(club.getAboutUsText());
        clubDto.setAboutUsImage(club.getAboutUsImage());
        clubDto.setChessSchoolText(club.getChessSchoolText());
        clubDto.setChessSchoolImage(club.getChessSchoolImage());

        return clubDto;
    }

    private Club mapToClub(ClubDto clubDto) {
        Club club = new Club();

        club.setId(clubDto.getId());
        club.setName(clubDto.getName());
        club.setAddress(clubDto.getAddress());
        club.setEmail(clubDto.getEmail());
        club.setLatitude(clubDto.getLatitude());
        club.setLongitude(clubDto.getLongitude());
        club.setAboutUsText(clubDto.getAboutUsText());
        club.setAboutUsImage(clubDto.getAboutUsImage());
        club.setChessSchoolText(clubDto.getChessSchoolText());
        club.setChessSchoolImage(clubDto.getChessSchoolImage());

        return club;
    }
}
