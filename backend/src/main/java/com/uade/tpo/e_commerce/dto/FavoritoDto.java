package com.uade.tpo.e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoritoDto {
    private Long id;
    private Long usuarioId;
    private Long productoId;
    private String productoNombre;
    private String productoDescripcion;
    private Double productoPrecio;
    private Integer productoStock;
    private String productoImagenUrl;
}