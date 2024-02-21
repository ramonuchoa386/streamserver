package com.condocam.condomanager.domain.dto;

import com.condocam.condomanager.domain.entities.VeiculoEntity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VeiculoDTO {
    private String marca;
    private String modelo;
    private String placa;
    private String apartamento_proprietario;

    public VeiculoDTO(VeiculoEntity veiculoEntity) {
        this.marca = veiculoEntity.getMarca();
        this.modelo = veiculoEntity.getModelo();
        this.placa = veiculoEntity.getPlaca();
        this.apartamento_proprietario = veiculoEntity.getProprietario().getApartamento();
    }
}

