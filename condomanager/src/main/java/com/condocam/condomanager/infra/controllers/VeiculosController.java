package com.condocam.condomanager.infra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.condocam.condomanager.domain.entities.VeiculoEntity;
import com.condocam.condomanager.infra.services.VeiculoService;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculosController {
    @Autowired
    private VeiculoService veiculoService;
    
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
    public ResponseEntity<VeiculoEntity> salvarVeiculo(@RequestBody VeiculoEntity veiculo) {
        VeiculoEntity novoVeiculo = veiculoService.salvar(veiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoVeiculo);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVeiculo(@PathVariable Long id) {
        veiculoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

