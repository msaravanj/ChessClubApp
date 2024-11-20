package com.project.chessclubmanager.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Primjenjuje se na sve rute
                .allowedOrigins("http://localhost:3000") // Dopuštena domena
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dopuštene metode
                .allowedHeaders("*") // Dopušteni zaglavlja
                .allowCredentials(true); // Ako su potrebni kolačići
    }
}