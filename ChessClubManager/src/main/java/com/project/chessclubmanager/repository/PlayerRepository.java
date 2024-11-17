package com.project.chessclubmanager.repository;

import com.project.chessclubmanager.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
