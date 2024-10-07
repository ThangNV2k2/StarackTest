package com.thangnv.backend.dto.response;

import com.thangnv.backend.common.AccountTypeEnum;
import com.thangnv.backend.common.RoleEnum;
import com.thangnv.backend.common.StatusEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {

    String userId;
    String email;
    String fullName;
    Set<RoleEnum> roles;
    AccountTypeEnum accountType;

    String phone;

    String avatarLink;

    String nationality;

    StatusEnum status;

    String language;

    LocalDateTime createdDate;

    LocalDateTime updatedDate;
}
