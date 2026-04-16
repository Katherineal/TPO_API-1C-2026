package com.uade.tpo.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.UsuarioDto;
import com.uade.tpo.e_commerce.model.Usuario;
import com.uade.tpo.e_commerce.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<UsuarioDto> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public UsuarioDto mapToDto(Usuario usuario) {
        if (usuario == null) return null;
        return UsuarioDto.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .email(usuario.getEmail())
                .role(usuario.getRole())
                .build();
    }

    public Usuario mapToEntity(UsuarioDto usuarioDto) {
        if (usuarioDto == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(usuarioDto.getId());
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setRole(usuarioDto.getRole());
        return usuario;
    }
}
