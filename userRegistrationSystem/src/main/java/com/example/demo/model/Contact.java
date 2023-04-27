package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "contact_details")
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int contactId;

	@Pattern(regexp = "^\\d{10}$", message = "enter valid number!")
	private String number;

	public int getContactId() {
		return contactId;
	}

	public void setContactId(int contactId) {
		this.contactId = contactId;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Contact() {
	}

	public Contact(String number) {
		this.number = number;
	}

	@Override
	public String toString() {
		return "Contact [contactId=" + contactId + ", number=" + number + "]";
	}

}
