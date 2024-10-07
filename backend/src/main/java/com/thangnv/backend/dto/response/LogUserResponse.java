package com.thangnv.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LogUserResponse {
    String logId;
    String userId;
    String modifiedBy;
    LocalDateTime timestamp;
    String changeType;
    String action;
}
