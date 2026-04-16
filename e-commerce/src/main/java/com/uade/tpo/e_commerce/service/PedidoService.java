package com.uade.tpo.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.PedidoDto;
import com.uade.tpo.e_commerce.model.Pedido;
import com.uade.tpo.e_commerce.repository.PedidoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    
    public List<PedidoDto> getAllPedidos() {
        return pedidoRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PedidoDto savePedido(PedidoDto pedidoDto) {
        Pedido pedido = mapToEntity(pedidoDto);
        return mapToDto(pedidoRepository.save(pedido));
    }

    public PedidoDto mapToDto(Pedido pedido) {
        if (pedido == null) return null;
        return PedidoDto.builder()
                .id(pedido.getId())
                .nombre(pedido.getNombre())
                .descripcion(pedido.getDescripcion())
                .build();
    }

    public Pedido mapToEntity(PedidoDto pedidoDto) {
        if (pedidoDto == null) return null;
        Pedido pedido = new Pedido();
        if (pedidoDto.getId() != null) {
            pedido.setId(pedidoDto.getId());
        }
        pedido.setNombre(pedidoDto.getNombre());
        pedido.setDescripcion(pedidoDto.getDescripcion());
        return pedido;
    }
}
