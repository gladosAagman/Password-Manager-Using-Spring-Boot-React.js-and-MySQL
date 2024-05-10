package com.password_manager.password_saver.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.password_manager.password_saver.Entity.Credentials;

@Repository
public interface  CredentialsRepo extends JpaRepository <Credentials, Long> {

    
}
