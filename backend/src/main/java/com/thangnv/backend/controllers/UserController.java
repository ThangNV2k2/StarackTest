package com.thangnv.backend.controllers;

import com.thangnv.backend.dto.response.ApiResponse;
import com.thangnv.backend.dto.response.LogUserResponse;
import com.thangnv.backend.dto.response.UserResponse;
import com.thangnv.backend.services.LogService;
import com.thangnv.backend.services.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;
    LogService logService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<UserResponse> usersPage = userService.getAllUsers(page, size);

        return ApiResponse.<Page<UserResponse>>builder()
                .result(usersPage)
                .build();
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<UserResponse> getUserById(@PathVariable String userId) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserById(userId))
                .build();
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<String> deleteUser(@PathVariable String userId) {
        userService.deleteUserById(userId);
        return ApiResponse.<String>builder()
                .result("Delete user successfully")
                .build();
    }

    @GetMapping("/log")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<LogUserResponse>> getLogsUserByUserId(@RequestParam String userId) {
        return ApiResponse.<List<LogUserResponse>>builder()
                .result(logService.getLogsByUserId(userId))
                .build();
    }


}
