package com.condocam.condomanager.infra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.condocam.condomanager.domain.entities.MoradorEntity;
import com.condocam.condomanager.infra.services.MoradorService;

import java.util.List;

@RestController
@RequestMapping("/api/moradores")
public class MoradorController {
    @Autowired
    private MoradorService pessoaService;
    
    @GetMapping
    public List<MoradorEntity> listarPessoas() {
        return pessoaService.listarTodas();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MoradorEntity> buscarPessoaPorId(@PathVariable Long id) {
        MoradorEntity pessoa = pessoaService.buscarPorId(id);
        return ResponseEntity.ok().body(pessoa);
    }
    
    @PostMapping
    public ResponseEntity<MoradorEntity> salvarPessoa(@RequestBody MoradorEntity pessoa) {
        MoradorEntity novaPessoa = pessoaService.salvar(pessoa);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable Long id) {
        pessoaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

