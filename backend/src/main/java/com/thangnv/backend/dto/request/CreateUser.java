package com.thangnv.backend.dto.request;

import com.thangnv.backend.common.AccountTypeEnum;
import com.thangnv.backend.common.RoleEnum;
import com.thangnv.backend.common.StatusEnum;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.validation.annotation.Validated;

import java.util.Set;

@Validated
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Data
public class CreateUser {

    @NotNull(message = "Email is required")
    String email;

    @NotEmpty
    @Size(min = 5, max = 50)
    String fullName;

    @NotNull(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,16}$", message = "Password must be contain a UPPERCASE, a lowercase, a number, a special character and at least 8 letter")
    String password;

    @NotNull(message = "Status is required")
    StatusEnum status;

    @NotNull(message = "Account Type type is required")
    AccountTypeEnum accountType;

    @NotNull(message = "Role is required")
    Set<RoleEnum> roles;
}
