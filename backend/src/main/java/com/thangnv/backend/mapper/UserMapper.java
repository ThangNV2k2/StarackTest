package com.thangnv.backend.mapper;

import com.thangnv.backend.dto.request.CreateUser;
import com.thangnv.backend.dto.response.UserResponse;
import com.thangnv.backend.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(CreateUser createUser);
    UserResponse toUserResponse(User user);
    List<UserResponse> toUserResponseList(List<User> users);
}
