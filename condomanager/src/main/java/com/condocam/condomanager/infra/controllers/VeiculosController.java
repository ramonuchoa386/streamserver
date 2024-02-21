package com.condocam.condomanager.infra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.condocam.condomanager.domain.dto.VeiculoDTO;
import com.condocam.condomanager.domain.entities.ErrorResponseEntity;
import com.condocam.condomanager.domain.entities.MoradorEntity;
import com.condocam.condomanager.domain.entities.VeiculoEntity;
import com.condocam.condomanager.infra.services.MoradorService;
import com.condocam.condomanager.infra.services.VeiculoService;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculosController {
    @Autowired
    private VeiculoService veiculoService;
    @Autowired
    private MoradorService moradorService;
    
    @GetMapping
    public List<VeiculoEntity> listarVeiculos() {
        return veiculoService.listarTodos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VeiculoEntity> buscarVeiculoPorId(@PathVariable Long id) {
        VeiculoEntity veiculo = veiculoService.buscarPorId(id);
        return ResponseEntity.ok().body(veiculo);
    }
    
    @PostMapping
    public ResponseEntity<Object> salvarVeiculo(@RequestBody VeiculoDTO veiculo) {
        String apartamento_proprietario = veiculo.getApartamento_proprietario();

        List<MoradorEntity> proprietarios = moradorService.findByApartamento(apartamento_proprietario);

        if (proprietarios.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponseEntity("Proprietário não existe."));
        };

        MoradorEntity morador = proprietarios.get(0);
        
        VeiculoEntity novoVeiculo = new VeiculoEntity();
        novoVeiculo.setMarca(veiculo.getMarca());
        novoVeiculo.setModelo(veiculo.getModelo());
        novoVeiculo.setPlaca(veiculo.getPlaca());
        novoVeiculo.setProprietario(morador);
        
        veiculoService.salvar(novoVeiculo);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoVeiculo);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVeiculo(@PathVariable Long id) {
        veiculoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

