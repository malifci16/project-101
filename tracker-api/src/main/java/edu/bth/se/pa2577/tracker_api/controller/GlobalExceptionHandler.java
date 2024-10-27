package edu.bth.se.pa2577.tracker_api.controller;

import edu.bth.se.pa2577.tracker_api.dto.ErrorResponse;
import edu.bth.se.pa2577.tracker_api.exception.InvalidCredentialsException;
import edu.bth.se.pa2577.tracker_api.exception.TransactionNotFoundException;
import edu.bth.se.pa2577.tracker_api.exception.UserAlreadyExistsException;
import edu.bth.se.pa2577.tracker_api.exception.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  // Handle UserAlreadyExistsException
  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest request) {
    log.error("Error while handling request {}", ex.getMessage(), ex);
    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.CONFLICT.value(),
      ex.getMessage(),
      request.getDescription(false)
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
  }

  // Handle InvalidCredentialsException
  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException ex, WebRequest request) {
    log.error("Error while handling request {}", ex.getMessage(), ex);
    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.UNAUTHORIZED.value(),
      ex.getMessage(),
      request.getDescription(false)
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
  }

  // Handle UserNotFoundException
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
    log.error("Error while handling request {}", ex.getMessage(), ex);
    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.NOT_FOUND.value(),
      ex.getMessage(),
      request.getDescription(false)
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  // Handle TransactionNotFoundException
  @ExceptionHandler(TransactionNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleTransactionNotFoundException(TransactionNotFoundException ex, WebRequest request) {
    log.error("Error while handling request {}", ex.getMessage(), ex);
    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.NOT_FOUND.value(),
      ex.getMessage(),
      request.getDescription(false)
    );
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  // Handle generic exceptions
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
    log.error("Error while handling request {}", ex.getMessage(), ex);
    ErrorResponse errorResponse = new ErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      "An unexpected error occurred.",
      request.getDescription(false)
    );
    errorResponse.setDetails(ex.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

