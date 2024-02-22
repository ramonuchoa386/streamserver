package com.condocam.condomanager.infra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.condocam.condomanager.domain.entities.VeiculoEntity;
import com.condocam.condomanager.domain.repositories.VeiculosRepository;

import java.util.List;

@Service
public class VeiculoService {
    @Autowired
    private VeiculosRepository veiculoRepository;
    
    public List<VeiculoEntity> listarTodos() {
        return veiculoRepository.findAll();
    }
    
    public VeiculoEntity buscarPorId(Long id) {
        return veiculoRepository.findById(id).orElse(null);
    }

    public VeiculoEntity buscarPorPlaca(String placa) {
        return veiculoRepository.findByPlaca(placa);
    }
    
    public VeiculoEntity salvar(VeiculoEntity veiculo) {
        System.out.println(veiculo.getProprietario());
        return veiculoRepository.save(veiculo);
    }
    
    public void deletar(Long id) {
        veiculoRepository.deleteById(id);
    }
}
