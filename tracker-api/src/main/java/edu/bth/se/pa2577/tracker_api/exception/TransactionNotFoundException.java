package edu.bth.se.pa2577.tracker_api.exception;

public class TransactionNotFoundException extends RuntimeException {
  public TransactionNotFoundException(String message) {
    super(message);
  }
}
