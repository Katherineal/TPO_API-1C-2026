package com.uade.tpo.e_commerce.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarritoDto {
    private Long id;
    private Long usuarioId;
    private List<ItemCarritoDto> items;
    private Double total;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}
