package com.uade.tpo.e_commerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
	}

	@Bean
	CommandLineRunner updateSchema(JdbcTemplate jdbcTemplate) {
		return args -> {
			try {
				jdbcTemplate.execute("ALTER TABLE productos MODIFY COLUMN imagen_url VARCHAR(2048)");
				System.out.println("Schema updated: imagen_url length changed to 2048");
			} catch (Exception e) {
				System.out.println("Could not update schema: " + e.getMessage());
			}
		};
	}

}
