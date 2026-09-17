package com.example.governmentaicopilot.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${app.jwt.secret:government-ai-copilot-secret-key}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username, String roleName) {
        Instant now = Instant.now();
        return Jwts.builder()
            .subject(username)
            .claim("role", roleName)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plusSeconds(86400)))
            .signWith(secretKey)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }
}
