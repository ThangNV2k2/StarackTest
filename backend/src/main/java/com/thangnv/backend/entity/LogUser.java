package com.thangnv.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Document(collection = "log_users")
public class LogUser {
    @Id
    String logId = UUID.randomUUID().toString();
    String userId;
    String modifiedBy;
    LocalDateTime timestamp;
    String changeType;
    String action;
}
