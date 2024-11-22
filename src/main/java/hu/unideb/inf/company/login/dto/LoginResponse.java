package hu.unideb.inf.company.login.dto;

public class LoginResponse {
    private int id;
    private String role;

    public LoginResponse(int id, String role) {
        this.id = id;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public String getRole() {
        return role;
    }
}
