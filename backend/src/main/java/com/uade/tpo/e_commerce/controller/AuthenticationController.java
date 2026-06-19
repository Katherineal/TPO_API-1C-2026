package com.uade.tpo.e_commerce.controller;

import com.uade.tpo.e_commerce.dto.AuthenticationRequest;
import com.uade.tpo.e_commerce.dto.AuthenticationResponse;
import com.uade.tpo.e_commerce.dto.RegisterRequest;
import com.uade.tpo.e_commerce.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        // Profe, acá llamamos al servicio para registrar al nuevo usuario.
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request,
            jakarta.servlet.http.HttpServletResponse response 
    ) {
        // Ejecutamos el login normal
        AuthenticationResponse authResponse = service.authenticate(request);
        String jwtToken = authResponse.getToken();

        // Creamos la Cookie HttpOnly
        org.springframework.http.ResponseCookie cookie = org.springframework.http.ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(false) 
                .path("/")
                .maxAge(15 * 60) 
                .sameSite("Strict")
                .build();

        
        response.addHeader(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString());

    
        authResponse.setToken(null);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(jakarta.servlet.http.HttpServletResponse response) {
        // Creamos una cookie idéntica pero con maxAge = 0 para que el navegador la borre
        org.springframework.http.ResponseCookie cookie = org.springframework.http.ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false) // Igual que en el login, falso para localhost
                .path("/")
                .maxAge(0) // Destruye la cookie inmediatamente
                .sameSite("Strict")
                .build();

        response.addHeader(org.springframework.http.HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }
}
