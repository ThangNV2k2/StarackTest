package com.thangnv.backend.services;

import com.thangnv.backend.config.JwtTokenProvider;
import com.thangnv.backend.dto.request.CreateUser;
import com.thangnv.backend.dto.response.LoginResponse;
import com.thangnv.backend.dto.response.UserResponse;
import com.thangnv.backend.entity.User;
import com.thangnv.backend.exception.AppException;
import com.thangnv.backend.exception.ErrorCode;
import com.thangnv.backend.mapper.UserMapper;
import com.thangnv.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
@Service
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    public UserResponse createUser(CreateUser createUser) {
        User user = userMapper.toUser(createUser);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedDate(LocalDateTime.now());

        if(userRepository.existsByEmail(user.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public LoginResponse login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String accessToken = jwtTokenProvider.generateAccessToken(userDetails);
        Date expireAt = jwtTokenProvider.getExpiryDate(userDetails);

        UserResponse user = userMapper.toUserResponse(userRepository.findByEmail(email).get());

        LoginResponse loginResponse = LoginResponse.builder()
                .accessToken(accessToken)
                .expiredAt(expireAt)
                .userResponse(user)
                .build();
        return loginResponse;
    }

    public Page<UserResponse> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userRepository.findAllBy(pageable);
        return usersPage.map(userMapper::toUserResponse);
    }

    public UserResponse getUserById(String userId) {
        return userMapper.toUserResponse(userRepository.findByUserId(userId).get());
    }

    public UserResponse getCurrentUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            return userMapper.toUserResponse(
                    userRepository.findByEmail(userDetails.getUsername())
                            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED))
            );
        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }

}
