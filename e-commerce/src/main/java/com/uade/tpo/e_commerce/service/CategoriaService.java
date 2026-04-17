package com.uade.tpo.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.CategoriaDto;
import com.uade.tpo.e_commerce.model.Categoria;
import com.uade.tpo.e_commerce.repository.CategoriaRepository;

import jakarta.transaction.Transactional;

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
}
