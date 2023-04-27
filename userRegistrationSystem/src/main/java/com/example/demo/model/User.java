package com.example.demo.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

@Entity
@Table(name = "user_details")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userId;

	@NotBlank(message = "First name can't be empty")
	private String firstName;

	@NotBlank(message = "Last name can't be empty")
	private String lastName;

	@NotNull(message = "date must be selected!")
	@PastOrPresent(message = "Joining Date Must be past or present")
	private Date joiningDate;

	@NotNull(message = "Age can't be null")
	@Min(value = 18)
	private int age;

	private boolean married;

	@NotBlank(message = "Address can't be empty")
	private String address;

	private boolean isDeleted;

	@Enumerated(EnumType.ORDINAL)
	@Column(nullable = false)
	private Position position;

	@OneToMany(cascade = CascadeType.ALL)
	@NotEmpty(message = "Contact can't be empty")
	@JoinColumn(name = "user_id")
	private List<Contact> contacts;

	public void markAsDeleted() {
		this.isDeleted = true;
	}

	public User() {
	}

	public User(String firstName, String lastName, Date joiningDate, int age, boolean married, String address,
			boolean isDeleted, Position position, List<Contact> contacts) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.joiningDate = joiningDate;
		this.age = age;
		this.married = married;
		this.address = address;
		this.isDeleted = isDeleted;
		this.position = position;
		this.contacts = contacts;
	}

	public List<Contact> getContacts() {
		return contacts;
	}

	public void setContacts(List<Contact> contacts) {
		this.contacts = contacts;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public boolean isMarried() {
		return married;
	}

	public void setMarried(boolean married) {
		this.married = married;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Position getPosition() {
		return position;
	}

	public void setPosition(Position position) {
		this.position = position;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", joiningDate="
				+ joiningDate + ", age=" + age + ", married=" + married + ", address=" + address + ", isDeleted="
				+ isDeleted + ", position=" + position + ", contactList=" + "]";
	}
}
