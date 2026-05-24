package com.pknuwap.udada.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // 스웨거 authorization 추가 로지지직
    @Bean
    public OpenAPI openAPI() {
        String jwtSchemeName = "JWT TOKEN";
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);

        Components components = new Components()
                .addSecuritySchemes(
                        jwtSchemeName,
                        new SecurityScheme()
                                .name("Authorization")
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .type(SecurityScheme.Type.HTTP)
                                .description("Bearer {{access_token} 형태로 입력해주세요!! 꼭 앞에 Bearer 붙이기!!!")
                );

        return new OpenAPI()
                .info(new Info().title("Udada API").version("1.0.0"))
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
