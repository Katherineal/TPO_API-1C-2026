package com.uade.tpo.e_commerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.FavoritoDto;
import com.uade.tpo.e_commerce.exceptions.ResourceNotFoundException;
import com.uade.tpo.e_commerce.model.Favorito;
import com.uade.tpo.e_commerce.model.Producto;
import com.uade.tpo.e_commerce.model.Usuario;
import com.uade.tpo.e_commerce.repository.FavoritoRepository;
import com.uade.tpo.e_commerce.repository.ProductoRepository;
import com.uade.tpo.e_commerce.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<FavoritoDto> getFavoritosByUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public FavoritoDto agregarFavorito(Long usuarioId, Long productoId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + productoId));

        if (favoritoRepository.existsByUsuarioIdAndProductoId(usuarioId, productoId)) {
            throw new RuntimeException("El producto ya está en favoritos");
        }

        Favorito favorito = new Favorito();
        favorito.setUsuario(usuario);
        favorito.setProducto(producto);
        return mapToDto(favoritoRepository.save(favorito));
    }

    public void eliminarFavorito(Long usuarioId, Long productoId) {
        favoritoRepository.deleteByUsuarioIdAndProductoId(usuarioId, productoId);
    }

    public FavoritoDto mapToDto(Favorito favorito) {
        if (favorito == null) return null;
        return FavoritoDto.builder()
                .id(favorito.getId())
                .usuarioId(favorito.getUsuario().getId())
                .productoId(favorito.getProducto().getId())
                .productoNombre(favorito.getProducto().getNombre())
                .productoPrecio(favorito.getProducto().getPrecio())
                .build();
    }
}