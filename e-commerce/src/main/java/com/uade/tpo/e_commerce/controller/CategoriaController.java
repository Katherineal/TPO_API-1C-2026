package com.uade.tpo.e_commerce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.e_commerce.dto.CategoriaDto;
import com.uade.tpo.e_commerce.service.CategoriaService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
// para acceder a este controlador, la URL base será /api/categorias
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaDto> getAllCategorias() {
        return categoriaService.getAllCategorias();
    }
    
    
}
