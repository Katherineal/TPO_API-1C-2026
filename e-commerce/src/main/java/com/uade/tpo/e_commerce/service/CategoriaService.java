package com.uade.tpo.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.CategoriaDto;
import com.uade.tpo.e_commerce.model.Categoria;
import com.uade.tpo.e_commerce.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<CategoriaDto> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CategoriaDto saveCategoria(CategoriaDto categoriaDto) {
        Categoria categoria = mapToEntity(categoriaDto);
        return mapToDto(categoriaRepository.save(categoria));
    }

    public CategoriaDto mapToDto(Categoria categoria) {
        if (categoria == null) return null;
        return CategoriaDto.builder()
                .id(categoria.getId())
                .nombre(categoria.getNombre())
                .build();
    }

    public Categoria mapToEntity(CategoriaDto categoriaDto) {
        if (categoriaDto == null) return null;
        Categoria categoria = new Categoria();
        if (categoriaDto.getId() != null) {
            categoria.setId(categoriaDto.getId());
        }
        categoria.setNombre(categoriaDto.getNombre());
        return categoria;
    }

    public Categoria createCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria updateCategoria(Long id, Categoria categoriaActualizada) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        categoria.setNombre(categoriaActualizada.getNombre());
        return categoriaRepository.save(categoria);
    }

    public void deleteCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}