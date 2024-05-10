package com.password_manager.password_saver.Services;

import com.password_manager.password_saver.Entity.Credentials;
import com.password_manager.password_saver.Exception.InternalServerException;
import com.password_manager.password_saver.Exception.ResourceNotFoundException;
import com.password_manager.password_saver.Repository.CredentialsRepo;
import com.password_manager.password_saver.dto.CredentialsDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CredentialsService {

  @Autowired
  private CredentialsRepo credentialsRepo; // reference variable

  public CredentialsDTO savePassword(CredentialsDTO credentialsDTO) {
    if (credentialsDTO == null) {
      throw new ResourceNotFoundException("Data not found");
    } else {
      try {
        Credentials creds = new Credentials(); // creating object of the entity class
        creds = CredentialsDTO.dTOtoEntity(credentialsDTO); // mapping dto to entity
        credentialsRepo.save(creds); // saving data in database
        return CredentialsDTO.entityToDTO(creds);
      } catch (Exception e) {
        throw new InternalServerException(e.getMessage());
      }
    }
  }

  // public CredentialsDTO editPassword (Long id , CredentialsDTO credentialsDTO)
  // {
  // credentialsRepo.findById(id); //checking whether this id is present or not
  // Credentials credentials = credentialsRepo.findById(id).get();

  // }
  public CredentialsDTO editPassword(Long id, CredentialsDTO credentialsDTO) {
    Optional<Credentials> optionalCredentials = credentialsRepo.findById(id);
    if (optionalCredentials.isPresent()) {
      Credentials credentials = optionalCredentials.get();
      if (credentialsDTO.getUsername() != null) {
        credentials.setUsername(credentialsDTO.getUsername());
      }
      if (credentialsDTO.getPassword() != null) {
        credentials.setPassword(credentialsDTO.getPassword());
      }
      if (credentialsDTO.getWebsiteUrl() != null) {
        credentials.setWebsiteUrl(credentialsDTO.getWebsiteUrl());
      }

      credentialsRepo.save(credentials);

      return CredentialsDTO.entityToDTO(credentials);
    } else {
      // Handle the case where 'id' is not found
      throw new ResourceNotFoundException(
        "Credentials with id " + id + " not found"
      );
    }
  }

  public void deletePassword(Long id) {
    Optional<Credentials> optionalCredentials = credentialsRepo.findById(id);
    if (optionalCredentials.isPresent()) {
      credentialsRepo.deleteById(id);
    } else {
      throw new ResourceNotFoundException(
        "The password with id " + id + " does not exist."
      );
    }
  }

  public List<CredentialsDTO> getAllPassword() {
    List<Credentials> credentialsList = credentialsRepo.findAll();
    List<CredentialsDTO> credentialDTOS = new ArrayList<>();
    for (Credentials c : credentialsList) {
      credentialDTOS.add(CredentialsDTO.entityToDTO(c));
    }
    System.out.println("Data---->" + credentialDTOS);
    return credentialDTOS;
  }
}
