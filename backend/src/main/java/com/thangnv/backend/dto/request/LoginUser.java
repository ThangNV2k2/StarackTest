package com.thangnv.backend.dto.request;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.validation.annotation.Validated;

@Validated
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@Builder
public class LoginUser {

    @Email
    @NotEmpty
    String email;

    @NotEmpty
    String password;
}
