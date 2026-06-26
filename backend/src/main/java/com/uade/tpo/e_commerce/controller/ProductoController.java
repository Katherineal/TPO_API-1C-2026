package com.uade.tpo.e_commerce.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.uade.tpo.e_commerce.dto.ProductoDto;
import com.uade.tpo.e_commerce.service.ProductoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




// Profe: Este es el controlador REST principal para la gestión de productos.
// Expone los endpoints bajo la ruta "/api/productos".
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Profe: Endpoint GET abierto a todos. Llama al servicio para obtener todos los productos.
    @GetMapping
    public ResponseEntity<List<ProductoDto>> getAllProductos() {
        return ResponseEntity.ok(productoService.getAllProductos());
    }

    // Profe: Endpoint GET para obtener el detalle de un solo producto según su ID.
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDto> getProductoById(@PathVariable Long id) {
        ProductoDto producto = productoService.getProductoById(id);
        return producto != null ? ResponseEntity.ok(producto) : ResponseEntity.notFound().build();
    }

    // Profe: Endpoint DELETE protegido (sólo Admin) que elimina un producto específico.
    // Usamos el id pasado como variable de ruta.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductoById(@PathVariable Long id) {
        productoService.deleteProductoById(id);
        return ResponseEntity.noContent().build();
    }

    // Profe: Endpoint POST protegido para la creación de un nuevo producto.
    // Recibe el ProductoDto desde el cuerpo (body) de la petición HTTP.
    @PostMapping
    public ResponseEntity<ProductoDto> saveProducto(@RequestBody ProductoDto productoDto) {
        System.out.println("========== POST /api/productos CATCHED ==========");
        System.out.println("Payload recibido: " + productoDto);
        return new ResponseEntity<>(productoService.saveProducto(productoDto), HttpStatus.CREATED);
    }
    
    // Profe: Endpoint PUT protegido para actualizar un producto existente.
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDto> udpateProducto(@PathVariable Long id, @RequestBody ProductoDto productoDto) {
        return ResponseEntity.ok(productoService.updateProducto(id, productoDto));
    }
}
