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
public class PedidoDto {
    private Long id;
    private Long usuarioId;
    private String estado;
    private Double total;
    private LocalDateTime fecha;
    private List<DetallePedidoDto> detalles;
}