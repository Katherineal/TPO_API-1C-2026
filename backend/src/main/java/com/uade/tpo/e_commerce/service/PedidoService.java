package com.uade.tpo.e_commerce.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.DetallePedidoDto;
import com.uade.tpo.e_commerce.dto.PedidoDto;
import com.uade.tpo.e_commerce.exceptions.ResourceNotFoundException;
import com.uade.tpo.e_commerce.model.DetallePedido;
import com.uade.tpo.e_commerce.model.Pedido;
import com.uade.tpo.e_commerce.model.Producto;
import com.uade.tpo.e_commerce.model.Usuario;
import com.uade.tpo.e_commerce.repository.PedidoRepository;
import com.uade.tpo.e_commerce.repository.ProductoRepository;
import com.uade.tpo.e_commerce.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<PedidoDto> getAllPedidos() {
        return pedidoRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PedidoDto getPedidoById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con id: " + id));
        return mapToDto(pedido);
    }

    public List<PedidoDto> getPedidosByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));
        return pedidoRepository.findByUsuario(usuario).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public PedidoDto savePedido(PedidoDto pedidoDto) {
        Usuario usuario = usuarioRepository.findById(pedidoDto.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + pedidoDto.getUsuarioId()));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setEstado("PENDIENTE");
        pedido.setFecha(LocalDateTime.now());

        // Construir detalles y calcular total
        List<DetallePedido> detalles = pedidoDto.getDetalles().stream().map(dto -> {
            Producto producto = productoRepository.findById(dto.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + dto.getProductoId()));

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setProducto(producto);
            detalle.setCantidad(dto.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio()); // precio actual del producto
            return detalle;
        }).collect(Collectors.toList());

        pedido.setDetalles(detalles);
        pedido.setTotal(detalles.stream()
                .mapToDouble(d -> d.getPrecioUnitario() * d.getCantidad())
                .sum());

        return mapToDto(pedidoRepository.save(pedido));
    }

    public PedidoDto cambiarEstado(Long id, String estado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido no encontrado con id: " + id));
        pedido.setEstado(estado);
        return mapToDto(pedidoRepository.save(pedido));
    }

    public void deletePedido(Long id) {
        if (!pedidoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pedido no encontrado con id: " + id);
        }
        pedidoRepository.deleteById(id);
    }

    public PedidoDto mapToDto(Pedido pedido) {
        if (pedido == null) return null;
        List<DetallePedidoDto> detallesDto = pedido.getDetalles().stream()
                .map(this::mapDetalleToDto)
                .collect(Collectors.toList());

        return PedidoDto.builder()
                .id(pedido.getId())
                .usuarioId(pedido.getUsuario().getId())
                .estado(pedido.getEstado())
                .total(pedido.getTotal())
                .fecha(pedido.getFecha())
                .detalles(detallesDto)
                .build();
    }

    private DetallePedidoDto mapDetalleToDto(DetallePedido detalle) {
        return DetallePedidoDto.builder()
                .id(detalle.getId())
                .productoId(detalle.getProducto().getId())
                .productoNombre(detalle.getProducto().getNombre())
                .cantidad(detalle.getCantidad())
                .precioUnitario(detalle.getPrecioUnitario())
                .subtotal(detalle.getCantidad() * detalle.getPrecioUnitario())
                .build();
    }
}