package com.password_manager.password_saver.dto;

import com.password_manager.password_saver.Entity.Credentials;

public class CredentialsDTO {

    private Long id;
    private String websiteUrl;
    private String username;
    private String password;

    public CredentialsDTO() {
    }

    public CredentialsDTO(Long id, String websiteUrl, String username, String password) {
        this.websiteUrl = websiteUrl;
        this.username = username;
        this.password = password;
        this.id=id;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
 public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public static Credentials dTOtoEntity(CredentialsDTO credentialsDTO) {

        Credentials creds = new Credentials();
        creds.setWebsiteUrl(credentialsDTO.getWebsiteUrl());
        creds.setUsername(credentialsDTO.getUsername());
        creds.setPassword(credentialsDTO.getPassword());
        creds.setId(credentialsDTO.getId());

        return creds;
    }

   

    public static  CredentialsDTO entityToDTO(Credentials creds){
        CredentialsDTO credentialDTO=new CredentialsDTO();
        credentialDTO.setWebsiteUrl(creds.getWebsiteUrl());
        credentialDTO.setUsername(creds.getUsername());
        credentialDTO.setPassword(creds.getPassword());
        credentialDTO.setId(creds.getId());
        return credentialDTO;
    }
}
