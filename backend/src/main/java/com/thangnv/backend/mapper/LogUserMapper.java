package com.thangnv.backend.mapper;

import com.thangnv.backend.dto.response.LogUserResponse;
import com.thangnv.backend.entity.LogUser;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LogUserMapper {
    LogUserResponse toLogUserResponse(LogUser logUser);
    List<LogUserResponse> toLogUserResponseList(List<LogUser> logUsers);
}
