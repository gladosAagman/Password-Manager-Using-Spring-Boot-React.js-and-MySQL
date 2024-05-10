package com.password_manager.password_saver.Exception;

import java.util.Map;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InternalServerException.class)
    public ResponseEntity<?> internalServerException(InternalServerException e) {
        Map<String, String> responce = new HashMap<>();
        responce.put("Message", e.getLocalizedMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responce);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> resourceNotFoundException(ResourceNotFoundException e) {
        Map<String, String> responce = new HashMap<>();
        responce.put("Message", e.getLocalizedMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responce);
    }

}
