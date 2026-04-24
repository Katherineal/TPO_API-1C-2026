package com.uade.tpo.e_commerce.repository;

import com.uade.tpo.e_commerce.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    boolean existsByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
    void deleteByUsuarioIdAndProductoId(Long usuarioId, Long productoId);
}