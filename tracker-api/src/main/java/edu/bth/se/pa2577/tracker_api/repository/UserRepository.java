package edu.bth.se.pa2577.tracker_api.repository;

import edu.bth.se.pa2577.tracker_api.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

  User findByUserName(String username);  // Find user by username
  User findByEmail(String email);  // Find user by username
}
