package com.condocam.condomanager.domain.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.condocam.condomanager.domain.entities.MoradorEntity;

@Repository
public interface MoradorRepository extends JpaRepository<MoradorEntity, Long> {
    List<MoradorEntity> findByApartamento(String apartamento);
}