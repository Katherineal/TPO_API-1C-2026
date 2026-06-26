package com.uade.tpo.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uade.tpo.e_commerce.dto.CarritoDto;
import com.uade.tpo.e_commerce.dto.PedidoDto;
import com.uade.tpo.e_commerce.service.CarritoService;

// Profe: Controlador REST para manejar todo lo relacionado con el carrito de compras.
// Expone los endpoints en "/api/carrito".
@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    // Profe: Obtiene el carrito completo del usuario validando permisos
    @GetMapping("/{usuarioId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> obtenerCarrito(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.obtenerCarrito(usuarioId));
    }

    // Profe: Agrega un nuevo item (producto) al carrito del usuario
    @PostMapping("/{usuarioId}/agregar")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> agregarAlCarrito(
            @PathVariable Long usuarioId,
            @RequestParam Long productoId,
            @RequestParam Integer cantidad) {
        return new ResponseEntity<>(
                carritoService.agregarAlCarrito(usuarioId, productoId, cantidad),
                HttpStatus.CREATED);
    }

    // Profe: Modifica la cantidad de un item ya existente en el carrito
    @PutMapping("/{usuarioId}/items/{itemId}/cantidad")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> actualizarCantidad(
            @PathVariable Long usuarioId,
            @PathVariable Long itemId,
            @RequestParam Integer nuevaCantidad) {
        return ResponseEntity.ok(
                carritoService.actualizarCantidad(usuarioId, itemId, nuevaCantidad));
    }

    // Profe: Quita un item específico del carrito
    @DeleteMapping("/{usuarioId}/items/{itemId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> eliminarDelCarrito(
            @PathVariable Long usuarioId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(carritoService.eliminarDelCarrito(usuarioId, itemId));
    }

    // Profe: Vacía el carrito por completo eliminando todos sus items
    @DeleteMapping("/{usuarioId}/vaciar")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> vaciarCarrito(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.vaciarCarrito(usuarioId));
    }

    // Profe: Transforma el carrito actual en un nuevo pedido (checkout) y vacía el carrito
    @PostMapping("/{usuarioId}/checkout")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<PedidoDto> checkout(@PathVariable Long usuarioId) {
        return new ResponseEntity<>(
                carritoService.checkout(usuarioId),
                HttpStatus.CREATED);
    }
}
