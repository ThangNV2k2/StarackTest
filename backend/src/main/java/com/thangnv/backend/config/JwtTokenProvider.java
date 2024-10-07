package com.thangnv.backend.config;

import com.thangnv.backend.exception.AppException;
import com.thangnv.backend.exception.ErrorCode;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String JWT_SECRET;

    @Value("${jwt.valid-duration}")
    private long VALID_DURATION;

    @Value("${jwt.refreshable-duration}")
    private long REFRESHABLE_DURATION;

    private Key key;

    private Key getSigningKey() {
        if (key == null) {
            byte[] keyBytes = Base64.getDecoder().decode(JWT_SECRET);
            key = Keys.hmacShaKeyFor(keyBytes);
        }
        return key;
    }

    public String generateAccessToken(UserDetails userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + VALID_DURATION * 1000);
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", userDetails.getAuthorities())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    public Date getExpiryDate(UserDetails userDetails) {
        Date now = new Date();
        return new Date(now.getTime() + VALID_DURATION * 1000);
    }

    public Date getRefreshableExpiryDate(Date issuedAt) {
        return new Date(issuedAt.getTime() + REFRESHABLE_DURATION * 1000);
    }

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) throws AppException {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            Date now = new Date();
            Date issuedAt = ex.getClaims() != null ? ex.getClaims().getIssuedAt() : null;
            if (issuedAt != null && now.before(getRefreshableExpiryDate(issuedAt))) {
                return true;
            } else {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        } catch (JwtException | IllegalArgumentException e) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}