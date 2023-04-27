package com.example.demo.services;

import java.util.List;

import com.example.demo.model.User;

public interface UserService {
	
//	get All User
	List<User> getAllUser(String type);
	
//	add User
	User addUser(User user);
	
//	update User
	void updateUser(User user,int id);
	
//	delete User(soft Delete)
	void deleteUser(int id);

}
