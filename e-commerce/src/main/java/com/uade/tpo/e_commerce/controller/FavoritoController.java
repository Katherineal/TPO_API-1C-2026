package com.uade.tpo.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.e_commerce.dto.FavoritoDto;
import com.uade.tpo.e_commerce.service.FavoritoService;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    // Un usuario ve sus propios favoritos
    @GetMapping("/usuario/{usuarioId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<FavoritoDto>> getFavoritosByUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(favoritoService.getFavoritosByUsuario(usuarioId));
    }

    // Agregar producto a favoritos
    @PostMapping("/usuario/{usuarioId}/producto/{productoId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<FavoritoDto> agregarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long productoId) {
        return new ResponseEntity<>(favoritoService.agregarFavorito(usuarioId, productoId), HttpStatus.CREATED);
    }

    // Eliminar producto de favoritos
    @DeleteMapping("/usuario/{usuarioId}/producto/{productoId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> eliminarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long productoId) {
        favoritoService.eliminarFavorito(usuarioId, productoId);
        return ResponseEntity.noContent().build();
    }
}