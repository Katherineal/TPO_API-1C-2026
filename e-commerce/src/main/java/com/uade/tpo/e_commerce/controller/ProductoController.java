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





@RestController
// para acceder a este controlador, la URL base será /api/productos
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    //http://localhost:8080/api/productos -> devuelve la lista de productos
    @GetMapping
    public ResponseEntity<List<ProductoDto>> getAllProductos() {
        return ResponseEntity.ok(productoService.getAllProductos());
    }

    //http://localhost:8080/api/productos/1 -> devuelve el producto con id 1
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDto> getProductoById(@PathVariable Long id) {
        ProductoDto producto = productoService.getProductoById(id);
        return producto != null ? ResponseEntity.ok(producto) : ResponseEntity.notFound().build();
    }

    // del http://localhost:8080/api/productos/1 -> elimina el producto con id 1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductoById(@PathVariable Long id) {
        productoService.deleteProductoById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<ProductoDto> saveProducto(@RequestBody ProductoDto productoDto) {
        return new ResponseEntity<>(productoService.saveProducto(productoDto), HttpStatus.CREATED);

    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDto> udpateProducto(@PathVariable Long id, @RequestBody ProductoDto productoDto) {
        return ResponseEntity.ok(productoService.updateProducto(id, productoDto));
    }
    
    
}
