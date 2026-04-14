package com.uade.tpo.e_commerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {
    
    @GetMapping
    public String getAllFavoritos() {
        return new String("Lista de favoritos");
    }

    @GetMapping("/{id}")
    public String getFavoritoById(@PathVariable String id) {
        return new String("Favorito con ID " + id);
    }   
}
