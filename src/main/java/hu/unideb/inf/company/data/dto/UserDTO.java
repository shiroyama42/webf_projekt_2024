package hu.unideb.inf.company.data.entity;

public class UserDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String role;
    private String emailAddress;
    private String depName; // Department name

    public UserDTO(int id, String firstName, String lastName, String role, String emailAddress, String depName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.emailAddress = emailAddress;
        this.depName = depName;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getRole() {
        return role;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getDepName() {
        return depName;
    }
}
