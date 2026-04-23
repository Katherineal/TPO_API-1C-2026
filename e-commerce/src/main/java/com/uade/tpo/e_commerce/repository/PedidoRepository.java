package com.uade.tpo.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uade.tpo.e_commerce.model.Pedido;
import com.uade.tpo.e_commerce.model.Usuario;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    //findAll() ya está implementado por JpaRepository, no es necesario definirlo aquí
    List<Pedido> findByUsuario(Usuario usuario);
}