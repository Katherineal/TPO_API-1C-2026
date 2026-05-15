package com.uade.tpo.e_commerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tpo.e_commerce.model.Carrito;
import com.uade.tpo.e_commerce.model.Usuario;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    /**
     * Busca el carrito de un usuario específico
     * @param usuario el usuario propietario del carrito
     * @return Optional con el carrito si existe
     */
    Optional<Carrito> findByUsuario(Usuario usuario);
}
