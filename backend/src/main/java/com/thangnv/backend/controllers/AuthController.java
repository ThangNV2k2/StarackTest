package com.thangnv.backend.controllers;

import com.thangnv.backend.dto.request.CreateUser;
import com.thangnv.backend.dto.request.LoginUser;
import com.thangnv.backend.dto.response.ApiResponse;
import com.thangnv.backend.dto.response.LoginResponse;
import com.thangnv.backend.dto.response.UserResponse;
import com.thangnv.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    UserService userService;

    @PostMapping("/register")
    ApiResponse<UserResponse> register(@RequestBody @Valid CreateUser createUser) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(createUser))
                .build();
    }

    @PostMapping("/login")
    ApiResponse<LoginResponse> login(@RequestBody @Valid LoginUser loginUser) {
        return ApiResponse.<LoginResponse>builder()
                .result(userService.login(loginUser.getEmail(), loginUser.getPassword()))
                .build();
    }

    @GetMapping("/getUserInfo")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<UserResponse> getUserInfo() {

        UserResponse userResponse = userService.getCurrentUserInfo();
        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .build();
    }

}
