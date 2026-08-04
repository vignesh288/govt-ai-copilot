package com.example.governmentaicopilot.service;

import com.example.governmentaicopilot.dto.AuthRequest;
import com.example.governmentaicopilot.dto.AuthResponse;
import com.example.governmentaicopilot.entity.Role;
import com.example.governmentaicopilot.entity.User;
import com.example.governmentaicopilot.exception.ApiException;
import com.example.governmentaicopilot.repository.RoleRepository;
import com.example.governmentaicopilot.repository.UserRepository;
import com.example.governmentaicopilot.util.JwtUtil;
import java.util.Set;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new ApiException("Username already exists");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException("Email already exists");
        }

        Role role = roleRepository.findByName(request.roleName() != null ? request.roleName() : "CITIZEN")
            .orElseGet(() -> roleRepository.save(new Role("CITIZEN")));

        User user = new User(
            request.username(),
            passwordEncoder.encode(request.password()),
            request.fullName(),
            request.email(),
            role.getName()
        );
        user.setRoles(Set.of(role));
        userRepository.save(user);
        return new AuthResponse(jwtUtil.generateToken(user.getUsername(), role.getName()), user.getUsername(), role.getName(), user.getFullName());
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.username())
            .orElseThrow(() -> new ApiException("Invalid credentials"));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ApiException("Invalid credentials");
        }
        return new AuthResponse(jwtUtil.generateToken(user.getUsername(), user.getRoleName()), user.getUsername(), user.getRoleName(), user.getFullName());
    }
}
