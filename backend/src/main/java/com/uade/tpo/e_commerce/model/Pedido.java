package com.uade.tpo.e_commerce.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

// ORM para mapear la clase Usuario a una tabla en la base de datos, con campos como id, nombre, apellido, email, password, role, y una relación OneToMany con pedidos. Implementa UserDetails para integración con Spring Security.
// relaciones con cardinalidad (one to many, many to one, many to many )
@Data
@Entity
@Table(name = "pedidos")
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    private String estado; // "PENDIENTE", "CONFIRMADO", "CANCELADO"

    private LocalDateTime fecha;
}