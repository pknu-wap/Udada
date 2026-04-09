package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}