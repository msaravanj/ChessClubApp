package com.project.chessclubmanager.repository;

import com.project.chessclubmanager.domain.League;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueRepository extends JpaRepository<League, Long> {
}
