package com.condocam.condomanager.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.condocam.condomanager.domain.entities.VeiculoEntity;

@Repository
public interface VeiculosRepository extends JpaRepository<VeiculoEntity, Long> {
    
}