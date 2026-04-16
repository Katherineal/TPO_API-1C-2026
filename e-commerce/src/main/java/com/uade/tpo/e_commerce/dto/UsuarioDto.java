package com.uade.tpo.e_commerce.dto;

import com.uade.tpo.e_commerce.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {
    private Long id;
    private String nombre;
    private String email;
    private Role role;
}
