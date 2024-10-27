package edu.bth.se.pa2577.tracker_api.service;
import com.google.gson.Gson;
import edu.bth.se.pa2577.tracker_api.entity.Transaction;
import edu.bth.se.pa2577.tracker_api.entity.User;
import edu.bth.se.pa2577.tracker_api.exception.TransactionNotFoundException;
import edu.bth.se.pa2577.tracker_api.exception.UserNotFoundException;
import edu.bth.se.pa2577.tracker_api.repository.UserRepository;
import edu.bth.se.pa2577.tracker_api.utls.GsonConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class UserTransactionsService {

  private final UserRepository userRepository;
  private final Gson gson;

  public UserTransactionsService(UserRepository userRepository) {
    this.userRepository = userRepository;
    this.gson = GsonConfig.getGson();
  }

  // Add a transaction to a user
  public User addTransaction(String userId, Transaction transaction) {
    log.info("Adding a new transaction {} for userId {}", gson.toJson(transaction), userId);
    User user = userRepository.findById(userId)
      .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

    transaction.setId(UUID.randomUUID().toString());

    // Add the reference of the transaction to the user
    if(Objects.isNull(user.getTransactions())) {
      user.setTransactions(Collections.singletonList(transaction));
    } else {
      user.getTransactions().add(transaction);
    }

    log.info("Transaction added successfully with trxId {}", transaction.getId());
    log.info("User with Id {} has total {} transactions", userId, user.getTransactions().size());

    return userRepository.save(user);
  }


  // Delete a transaction for a specific user
  public User deleteTransaction(String userId, String transactionId) {
    User user = userRepository.findById(userId)
      .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

    user.getTransactions().stream().
      filter(t -> t.getId().equals(transactionId)).findFirst()
      .orElseThrow(() -> new TransactionNotFoundException("Transaction with ID " + transactionId + " not found"));

    // Remove the transaction reference from the user
    user.getTransactions().removeIf(t -> t.getId().equals(transactionId));  // Remove the transaction by its ID

    List<Transaction> transactions = user.getTransactions();
    if(user.getTransactions().removeIf(t -> t.getId().equals(transactionId))) {
      log.info("Transaction with Id {} has been deleted fot user with Id {}", transactionId, userId);
    } else {
      throw new TransactionNotFoundException("User with ID " + userId + " does not have transaction with ID " + transactionId);
    }

    return user;
  }

  // Display all transactions for a specific user
  public List<Transaction> displayAllTransactions(String userId) {
    log.info("Displaying all transactions for userId {}", userId);

    User user = userRepository.findById(userId)
      .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

    if(Objects.nonNull(user.getTransactions()) && !user.getTransactions().isEmpty()) {
      log.info("Found total {} transactions for userId {}", user.getTransactions().size(), userId);
      return user.getTransactions();
    } else {
      log.info("No transactions found for userId {}", userId);
      return new ArrayList<>();
    }
  }
}
