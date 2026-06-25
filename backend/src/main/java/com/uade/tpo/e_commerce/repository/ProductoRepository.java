package com.uade.tpo.e_commerce.repository;
import org.springframework.data.jpa.repository.Modifying;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    
    @Modifying
    @Query(value = "DELETE FROM productos_categorias WHERE producto_id = :productoId", nativeQuery = true)
    void deleteCategoriasByProductoId(@Param("productoId") Long productoId);
}
