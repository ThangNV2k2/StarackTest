package com.thangnv.backend.services;

import com.thangnv.backend.dto.response.LogUserResponse;
import com.thangnv.backend.mapper.LogUserMapper;
import com.thangnv.backend.repository.LogUserRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
@Service
public class LogService {
    LogUserRepository logUserRepository;
    LogUserMapper logUserMapper;

    public List<LogUserResponse> getLogsByUserId(String userId) {
        return logUserMapper.toLogUserResponseList(logUserRepository.findByUserId(userId));
    }
}
