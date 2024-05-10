package com.password_manager.password_saver.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.password_manager.password_saver.Services.CredentialsService;
import com.password_manager.password_saver.dto.CredentialsDTO;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin(origins = "http://localhost:5173/" )
public class CredentialsController {
   
    @Autowired
    private CredentialsService credentialsService;
    @PostMapping("/save")
    public ResponseEntity<?> saveCredentials(@RequestBody CredentialsDTO credentialsDTO){
        return new ResponseEntity<>(credentialsService.savePassword(credentialsDTO), HttpStatus.OK) ;
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editCredentials(@PathVariable Long id , @RequestBody CredentialsDTO credentialsDTO){
        return new ResponseEntity<>(credentialsService.editPassword(id, credentialsDTO), HttpStatus.OK) ;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCredentials(@PathVariable Long id ){
        credentialsService.deletePassword(id);
        return new ResponseEntity<>( "Deleted Successfully",HttpStatus.OK) ;
    }

    @GetMapping("/fetch")
    public ResponseEntity<?> getAllPassword(){
        return new ResponseEntity<>(credentialsService.getAllPassword(), HttpStatus.OK) ;
    }
    

    
}
