package com.uade.tpo.e_commerce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.uade.tpo.e_commerce.dto.PedidoDto;
import com.uade.tpo.e_commerce.service.PedidoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<PedidoDto>> getAllPedidos() {
        return ResponseEntity.ok(pedidoService.getAllPedidos());
    }
    
    @PostMapping
    public ResponseEntity<PedidoDto> savePedido(@RequestBody PedidoDto pedidoDto) {
        return new ResponseEntity<>(pedidoService.savePedido(pedidoDto), HttpStatus.CREATED);
    }
}
