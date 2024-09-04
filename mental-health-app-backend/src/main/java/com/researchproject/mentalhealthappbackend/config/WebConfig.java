 package com.researchproject.mentalhealthappbackend.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("http://localhost:5173")  // Allow domain to access
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
                .allowedHeaders("*")  // Allow all header information
                .allowCredentials(false)
                .maxAge(3600);  // Cache time for pre-check requests (seconds)
    }

   @Bean
   public OncePerRequestFilter jwtAuthenticationFilter() {
      return new JwtAuthenticationFilter();}
}

//@Configuration
//public class MyDataRestConfig implements RepositoryRestConfigurer {
//
//    private String theAllowedOrigins = "http://localhost:5173";
//
//    @Override
//    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
//                                                     CorsRegistry cors) {
//        HttpMethod[] theUnsupportedActions = {
//                HttpMethod.POST,
//                HttpMethod.PATCH,
//                HttpMethod.DELETE,
//                HttpMethod.PUT};
//
//        config.exposeIdsFor(User.class);
//
//
//        disableHttpMethods(User.class, config, theUnsupportedActions);
//
//        /* Configure CORS Mapping */
//        cors.addMapping(config.getBasePath() + "/**")
//                .allowedOrigins(theAllowedOrigins);
//    }
//
//    private void disableHttpMethods(Class theClass,
//                                    RepositoryRestConfiguration config,
//                                    HttpMethod[] theUnsupportedActions) {
//        config.getExposureConfiguration()
//                .forDomainType(theClass)
//                .withItemExposure((metdata, httpMethods) ->
//                        httpMethods.disable(theUnsupportedActions))
//                .withCollectionExposure((metdata, httpMethods) ->
//                        httpMethods.disable(theUnsupportedActions));
//    }
//}