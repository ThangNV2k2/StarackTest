package com.thangnv.backend.repository;

import com.thangnv.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserId(String userId);
    Page<User> findAllBy(Pageable pageable);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    void deleteByUserId(String userId);
}
