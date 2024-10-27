package edu.bth.se.pa2577.tracker_api.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class Transaction {

  private String id;
  private TransactionType type;
  private double amount;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd", timezone = "UTC")
  private LocalDate date;

  public Transaction() {}

  public Transaction(String userId, TransactionType type, double amount, LocalDate date) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  // Getters and Setters

  public void setId(String id) {
    this.id = id;
  }

  public void setType(TransactionType type) {
    this.type = type;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

}
