package com.uade.tpo.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.uade.tpo.e_commerce.dto.CarritoDto;
import com.uade.tpo.e_commerce.dto.PedidoDto;
import com.uade.tpo.e_commerce.service.CarritoService;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    /**
     * GET /api/carrito/{usuarioId}
     * Obtiene el carrito del usuario autenticado
     */
    @GetMapping("/{usuarioId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> obtenerCarrito(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.obtenerCarrito(usuarioId));
    }

    /**
     * POST /api/carrito/{usuarioId}/agregar
     * Agrega un producto al carrito
     * Body: { "productoId": 1, "cantidad": 2 }
     */
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

    /**
     * PUT /api/carrito/{usuarioId}/items/{itemId}/cantidad
     * Actualiza la cantidad de un item en el carrito
     * Body: { "nuevaCantidad": 5 }
     */
    @PutMapping("/{usuarioId}/items/{itemId}/cantidad")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> actualizarCantidad(
            @PathVariable Long usuarioId,
            @PathVariable Long itemId,
            @RequestParam Integer nuevaCantidad) {
        return ResponseEntity.ok(
                carritoService.actualizarCantidad(usuarioId, itemId, nuevaCantidad));
    }

    /**
     * DELETE /api/carrito/{usuarioId}/items/{itemId}
     * Elimina un item del carrito
     */
    @DeleteMapping("/{usuarioId}/items/{itemId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> eliminarDelCarrito(
            @PathVariable Long usuarioId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(carritoService.eliminarDelCarrito(usuarioId, itemId));
    }

    /**
     * DELETE /api/carrito/{usuarioId}/vaciar
     * Vacía completamente el carrito
     */
    @DeleteMapping("/{usuarioId}/vaciar")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<CarritoDto> vaciarCarrito(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(carritoService.vaciarCarrito(usuarioId));
    }

    /**
     * POST /api/carrito/{usuarioId}/checkout
     * Realiza el checkout: crea un pedido y vacía el carrito
     */
    @PostMapping("/{usuarioId}/checkout")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<PedidoDto> checkout(@PathVariable Long usuarioId) {
        return new ResponseEntity<>(
                carritoService.checkout(usuarioId),
                HttpStatus.CREATED);
    }
}
