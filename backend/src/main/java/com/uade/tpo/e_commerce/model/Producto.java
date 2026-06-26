package com.uade.tpo.e_commerce.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false)
    private Integer stock;

    // Profe: Usamos JsonProperty para que Jackson pueda mapear el campo "imagen_url" del frontend
    // a la variable "imagenUrl" de Java, solucionando el problema de que no se guardaban las fotos.
    @com.fasterxml.jackson.annotation.JsonProperty("imagen_url")
    @Column(length = 2048)
    private String imagenUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "productos_categorias",
        joinColumns = @JoinColumn(name = "producto_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<Categoria> categorias = new ArrayList<>();

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles = new ArrayList<>();

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<ItemCarrito> itemsCarrito = new ArrayList<>();

    // Profe: Agregamos CascadeType.ALL acá para que al eliminar un producto,
    // se eliminen automáticamente todos los registros asociados en la tabla de favoritos.
    // Esto evita el error de violación de Foreign Key (DataIntegrityViolationException).
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<Favorito> favoritos = new ArrayList<>();
}
