package com.uade.tpo.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.e_commerce.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    //findAll() ya está implementado por JpaRepository, no es necesario definirlo aquí
    // select * from productos

    //save, delete, findById, findAll, update etc. también están implementados por JpaRepository

    /**
     * Busca todos los productos ordenados alfabéticamente por nombre (ascendente)
     * @return lista de productos ordenada por nombre
     */
    List<Producto> findAllByOrderByNombreAsc();

    //query methods personalizados pueden ser definidos aquí, por ejemplo:
    //findByNombre(String nombre); 
    //findByPrecioBetween(Double minPrecio, Double maxPrecio);
}
