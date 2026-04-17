package com.uade.tpo.e_commerce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.uade.tpo.e_commerce.dto.CategoriaDto;
import com.uade.tpo.e_commerce.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<CategoriaDto>> getAllCategorias() {
        return ResponseEntity.ok(categoriaService.getAllCategorias());
    }
    
    @PostMapping
    public ResponseEntity<CategoriaDto> saveCategoria(@RequestBody CategoriaDto categoriaDto) {
        return new ResponseEntity<>(categoriaService.saveCategoria(categoriaDto), HttpStatus.CREATED);
    }
}
