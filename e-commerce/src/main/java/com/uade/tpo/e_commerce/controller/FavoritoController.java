package com.uade.tpo.e_commerce.controller;

import com.uade.tpo.e_commerce.model.Favorito;
import com.uade.tpo.e_commerce.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    @GetMapping("/usuario/{usuarioId}")
    public List<Favorito> getFavoritosByUsuario(@PathVariable Long usuarioId) {
        return favoritoService.getFavoritosByUsuario(usuarioId);
    }

    @PostMapping("/usuario/{usuarioId}/producto/{productoId}")
    public ResponseEntity<Favorito> agregarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long productoId) {
        return ResponseEntity.ok(favoritoService.agregarFavorito(usuarioId, productoId));
    }

    @DeleteMapping("/usuario/{usuarioId}/producto/{productoId}")
    public ResponseEntity<Void> eliminarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long productoId) {
        favoritoService.eliminarFavorito(usuarioId, productoId);
        return ResponseEntity.noContent().build();
    }
}