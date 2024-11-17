package com.project.chessclubmanager.repository;

import com.project.chessclubmanager.domain.Club;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findByEmail(String email);
}
