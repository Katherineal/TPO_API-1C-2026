package com.uade.tpo.e_commerce.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration(proxyBeanMethods = false)
@EnableWebSecurity
@EnableMethodSecurity // Profe, esta anotación habilita el uso de @PreAuthorize en los controllers para control de acceso por rol a nivel de método.
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Integración de CORS en el filtro de seguridad
            .csrf(csrf -> csrf.disable()) // Profe, acá desactivamos CSRF porque JWT es seguro contra esto.
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Profe, acá permitimos que cualquiera se registre o loguee.
                .requestMatchers("/h2-console/**").permitAll() // Permitimos el acceso a la consola de H2
                
                // Profe, acá configuramos las reglas de acceso por roles (Role-Based Access Control).
                .requestMatchers(HttpMethod.GET, "/api/productos/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/productos/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.PUT, "/api/productos/**").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasAnyRole("ADMIN", "USER")

                .requestMatchers(HttpMethod.GET, "/api/categorias/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/categorias/**").hasRole("ADMIN")

                // Profe, los pedidos, favoritos y usuarios requieren autenticación.
                // El control fino por rol se maneja con @PreAuthorize en cada controller.
                .requestMatchers("/api/pedidos/**").authenticated()
                .requestMatchers("/api/favoritos/**").authenticated()
                .requestMatchers("/api/usuarios/**").authenticated()

                .anyRequest().authenticated() // Profe, acá bloqueamos todo el resto si no hay token.
            )
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // Permitimos iframes para que H2 console funcione correctamente
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuración de CORS para permitir peticiones seguras desde el Frontend (React).
     * Evita bloqueos de recursos de origen cruzado en los navegadores.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permitimos los orígenes comunes de desarrollo frontend (Vite y CRA) tanto con localhost como con 127.0.0.1
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"));
        // Habilitamos los métodos HTTP requeridos para REST
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Permitimos el paso de cualquier header
        configuration.setAllowedHeaders(List.of("*"));
        // Permitimos el envío de credenciales si fuesen necesarias (cookies, auth headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicamos esta política de CORS a todos nuestros endpoints /api/**
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}