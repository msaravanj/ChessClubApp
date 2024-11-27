package com.project.chessclubmanager.service.impl;

import com.project.chessclubmanager.domain.Club;
import com.project.chessclubmanager.dto.ClubDto;
import com.project.chessclubmanager.repository.ClubRepository;
import com.project.chessclubmanager.service.ClubService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClubServiceImpl implements ClubService {

    ClubRepository clubRepository;

    @Override
    public List<ClubDto> findAllClubs() {
        return clubRepository.findAll()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<ClubDto> findById(Long id) {
        return Optional.of(mapToDto(clubRepository.findById(id).get()));
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
