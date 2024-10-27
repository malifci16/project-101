package edu.bth.se.pa2577.tracker_api.controller;

import edu.bth.se.pa2577.tracker_api.service.UserTransactionsService;
import edu.bth.se.pa2577.tracker_api.entity.Transaction;
import edu.bth.se.pa2577.tracker_api.entity.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:4200", "http://budget-tracker-web-service:30002", "http://localhost:30002"})
public class UserTransactionsController {

  private final UserTransactionsService userTransactionsService;

  public UserTransactionsController(UserTransactionsService userTransactionsService) {
    this.userTransactionsService = userTransactionsService;
  }

  // Add a transaction to a user
  @PostMapping("/{userId}/transactions")
  public User addTransaction(@PathVariable String userId, @RequestBody Transaction transaction) {
    return userTransactionsService.addTransaction(userId, transaction);
  }

  // Delete a transaction for a specific user
  @DeleteMapping("/{userId}/transactions/{transactionId}")
  public User deleteTransaction(@PathVariable String userId, @PathVariable String transactionId) {
    return userTransactionsService.deleteTransaction(userId, transactionId);
  }

  // Display all transactions for a specific user
  @GetMapping("/{userId}/transactions")
  public List<Transaction> displayAllTransactions(@PathVariable String userId) {
    return userTransactionsService.displayAllTransactions(userId);
  }
}
