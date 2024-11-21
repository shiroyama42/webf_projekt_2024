package hu.unideb.inf.company.data.dto;

public class UserDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String role;
    private String emailAddress;
    private String departmentName; // This field holds the department name

    public UserDTO(int id, String firstName, String lastName, String role, String emailAddress, String departmentName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.emailAddress = emailAddress;
        this.departmentName = departmentName;
    }

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getEmailAddress() { return emailAddress; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
}
