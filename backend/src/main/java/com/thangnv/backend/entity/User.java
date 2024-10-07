package com.thangnv.backend.entity;

import com.mongodb.lang.Nullable;
import com.thangnv.backend.common.AccountTypeEnum;
import com.thangnv.backend.common.RoleEnum;
import com.thangnv.backend.common.StatusEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Document(collection = "users")
public class User {

    @Id
    String userId = UUID.randomUUID().toString();
    String email;
    String fullName;
    Set<RoleEnum> roles;
    String password;
    AccountTypeEnum accountType;

    @Nullable
    String avatarLink;

    @Nullable
    String phone;

    @Nullable
    String nationality;

    @Nullable
    StatusEnum status;

    @Nullable
    private String language;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updatedDate;
}