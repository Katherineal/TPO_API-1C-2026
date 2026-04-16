package com.uade.tpo.e_commerce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.e_commerce.dto.PedidoDto;
import com.uade.tpo.e_commerce.service.PedidoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
// para acceder a este controlador, la URL base será /api/pedidos
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<PedidoDto> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }
    
    
}
