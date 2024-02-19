package com.condocam.condomanager.infra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.condocam.condomanager.domain.entities.MoradorEntity;
import com.condocam.condomanager.domain.repositories.MoradorRepository;

import java.util.List;

@Service
public class MoradorService {
    
    @Autowired
    private MoradorRepository moradorRepository;
    
    public List<MoradorEntity> listarTodas() {
        return moradorRepository.findAll();
    }
    
    public MoradorEntity buscarPorId(Long id) {
        return moradorRepository.findById(id).orElse(null);
    }
    
    public MoradorEntity salvar(MoradorEntity pessoa) {
        return moradorRepository.save(pessoa);
    }
    
    public void deletar(Long id) {
        moradorRepository.deleteById(id);
    }
}
