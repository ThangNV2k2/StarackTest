package com.thangnv.backend.repository;

import com.thangnv.backend.entity.LogUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogUserRepository extends MongoRepository<LogUser, String> {
    List<LogUser> findByUserId(String userId);
}
