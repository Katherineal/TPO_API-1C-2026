package com.uade.tpo.e_commerce.service;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.CategoriaDto;
import com.uade.tpo.e_commerce.dto.ProductoDto;
import com.uade.tpo.e_commerce.model.Categoria;
import com.uade.tpo.e_commerce.model.Producto;
import com.uade.tpo.e_commerce.repository.ProductoRepository;
import com.uade.tpo.e_commerce.exceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductoService {
 
    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaService categoriaService;
    
    public List<ProductoDto> getAllProductos() {
        return productoRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProductoDto getProductoById(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con el id: " + id));
        return mapToDto(producto);
    }

    public void deleteProductoById(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado con el id: " + id);
        }
        productoRepository.deleteById(id);
    }

    public ProductoDto saveProducto(ProductoDto productoDto) {
        Producto producto = mapToEntity(productoDto);
        Producto saved = productoRepository.save(producto);
        return mapToDto(saved);
    }

    public ProductoDto updateProducto(Long id, ProductoDto productoDto) {
        Producto existingProducto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con el id: " + id));
        
        existingProducto.setNombre(productoDto.getNombre());
        existingProducto.setDescripcion(productoDto.getDescripcion());
        existingProducto.setPrecio(productoDto.getPrecio());
        existingProducto.setStock(productoDto.getStock());
        
        if (productoDto.getCategorias() != null) {
            List<Categoria> categorias = productoDto.getCategorias().stream()
                .map(categoriaService::mapToEntity)
                .collect(Collectors.toList());
            existingProducto.setCategorias(categorias);
        }
        
        Producto updated = productoRepository.save(existingProducto);
        return mapToDto(updated);
    }

    public ProductoDto mapToDto(Producto producto) {
        if (producto == null) return null;
        List<CategoriaDto> categoriasDto = new ArrayList<>();
        if (producto.getCategorias() != null) {
            categoriasDto = producto.getCategorias().stream()
                .map(categoriaService::mapToDto)
                .collect(Collectors.toList());
        }
        
        return ProductoDto.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .stock(producto.getStock())
                .categorias(categoriasDto)
                .build();
    }

    public Producto mapToEntity(ProductoDto productoDto) {
        if (productoDto == null) return null;
        Producto producto = new Producto();
        producto.setId(productoDto.getId());
        producto.setNombre(productoDto.getNombre());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setPrecio(productoDto.getPrecio());
        producto.setStock(productoDto.getStock());
        
        if (productoDto.getCategorias() != null) {
            List<Categoria> categorias = productoDto.getCategorias().stream()
                .map(categoriaService::mapToEntity)
                .collect(Collectors.toList());
            producto.setCategorias(categorias);
        }
        return producto;
    }
}
