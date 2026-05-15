package com.uade.tpo.e_commerce.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uade.tpo.e_commerce.dto.CarritoDto;
import com.uade.tpo.e_commerce.dto.ItemCarritoDto;
import com.uade.tpo.e_commerce.exceptions.ResourceNotFoundException;
import com.uade.tpo.e_commerce.model.Carrito;
import com.uade.tpo.e_commerce.model.ItemCarrito;
import com.uade.tpo.e_commerce.model.Producto;
import com.uade.tpo.e_commerce.model.Usuario;
import com.uade.tpo.e_commerce.repository.CarritoRepository;
import com.uade.tpo.e_commerce.repository.ProductoRepository;
import com.uade.tpo.e_commerce.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private PedidoService pedidoService;

    /**
     * Obtiene o crea el carrito de un usuario
     */
    public CarritoDto obtenerCarrito(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseGet(() -> crearCarritoNuevo(usuario));

        return mapToDto(carrito);
    }

    /**
     * Crea un carrito nuevo para un usuario
     */
    private Carrito crearCarritoNuevo(Usuario usuario) {
        Carrito carrito = Carrito.builder()
                .usuario(usuario)
                .total(0.0)
                .build();
        return carritoRepository.save(carrito);
    }

    /**
     * Agrega un producto al carrito (o incrementa cantidad si ya existe)
     */
    public CarritoDto agregarAlCarrito(Long usuarioId, Long productoId, Integer cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + productoId));

        // Validar stock
        if (producto.getStock() < cantidad) {
            throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getNombre());
        }

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseGet(() -> crearCarritoNuevo(usuario));

        // Buscar si el producto ya está en el carrito
        ItemCarrito itemExistente = carrito.getItems().stream()
                .filter(item -> item.getProducto().getId().equals(productoId))
                .findFirst()
                .orElse(null);

        if (itemExistente != null) {
            // Validar que el nuevo total no exceda el stock
            int nuevoTotal = itemExistente.getCantidad() + cantidad;
            if (producto.getStock() < nuevoTotal) {
                throw new IllegalArgumentException("Stock insuficiente para el producto: " + producto.getNombre());
            }
            itemExistente.setCantidad(nuevoTotal);
        } else {
            // Crear nuevo item
            ItemCarrito nuevoItem = ItemCarrito.builder()
                    .carrito(carrito)
                    .producto(producto)
                    .cantidad(cantidad)
                    .precioUnitario(producto.getPrecio())
                    .build();
            carrito.getItems().add(nuevoItem);
        }

        carrito.calcularTotal();
        carritoRepository.save(carrito);

        return mapToDto(carrito);
    }

    /**
     * Elimina un producto del carrito
     */
    public CarritoDto eliminarDelCarrito(Long usuarioId, Long itemId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado para el usuario"));

        ItemCarrito item = carrito.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item no encontrado en el carrito"));

        carrito.getItems().remove(item);
        carrito.calcularTotal();
        carritoRepository.save(carrito);

        return mapToDto(carrito);
    }

    /**
     * Actualiza la cantidad de un item en el carrito
     */
    public CarritoDto actualizarCantidad(Long usuarioId, Long itemId, Integer nuevaCantidad) {
        if (nuevaCantidad <= 0) {
            throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado para el usuario"));

        ItemCarrito item = carrito.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item no encontrado en el carrito"));

        // Validar stock
        if (item.getProducto().getStock() < nuevaCantidad) {
            throw new IllegalArgumentException("Stock insuficiente para el producto: " + item.getProducto().getNombre());
        }

        item.setCantidad(nuevaCantidad);
        carrito.calcularTotal();
        carritoRepository.save(carrito);

        return mapToDto(carrito);
    }

    /**
     * Vacía completamente el carrito
     */
    public CarritoDto vaciarCarrito(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado para el usuario"));

        carrito.getItems().clear();
        carrito.setTotal(0.0);
        carritoRepository.save(carrito);

        return mapToDto(carrito);
    }

    /**
     * Realiza el checkout: crea un pedido a partir del carrito y lo vacía
     */
    public com.uade.tpo.e_commerce.dto.PedidoDto checkout(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + usuarioId));

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado para el usuario"));

        if (carrito.getItems().isEmpty()) {
            throw new IllegalArgumentException("No se puede hacer checkout con un carrito vacío");
        }

        // Crear PedidoDto a partir del carrito
        com.uade.tpo.e_commerce.dto.PedidoDto pedidoDto = com.uade.tpo.e_commerce.dto.PedidoDto.builder()
                .usuarioId(usuarioId)
                .detalles(carrito.getItems().stream()
                        .map(item -> com.uade.tpo.e_commerce.dto.DetallePedidoDto.builder()
                                .productoId(item.getProducto().getId())
                                .productoNombre(item.getProducto().getNombre())
                                .cantidad(item.getCantidad())
                                .precioUnitario(item.getPrecioUnitario())
                                .subtotal(item.getSubtotal())
                                .build())
                        .collect(Collectors.toList()))
                .build();

        // Crear el pedido
        com.uade.tpo.e_commerce.dto.PedidoDto pedidoGuardado = pedidoService.savePedido(pedidoDto);

        // Vaciar el carrito
        vaciarCarrito(usuarioId);

        return pedidoGuardado;
    }

    /**
     * Mapea una entidad Carrito a CarritoDto
     */
    public CarritoDto mapToDto(Carrito carrito) {
        if (carrito == null) return null;

        return CarritoDto.builder()
                .id(carrito.getId())
                .usuarioId(carrito.getUsuario().getId())
                .items(carrito.getItems().stream()
                        .map(this::mapItemToDto)
                        .collect(Collectors.toList()))
                .total(carrito.getTotal())
                .fechaCreacion(carrito.getFechaCreacion())
                .fechaActualizacion(carrito.getFechaActualizacion())
                .build();
    }

    /**
     * Mapea un ItemCarrito a ItemCarritoDto
     */
    private ItemCarritoDto mapItemToDto(ItemCarrito item) {
        return ItemCarritoDto.builder()
                .id(item.getId())
                .productoId(item.getProducto().getId())
                .productoNombre(item.getProducto().getNombre())
                .cantidad(item.getCantidad())
                .precioUnitario(item.getPrecioUnitario())
                .subtotal(item.getSubtotal())
                .build();
    }
}
