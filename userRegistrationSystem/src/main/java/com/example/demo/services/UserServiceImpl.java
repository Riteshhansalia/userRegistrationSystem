package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.UserRepository;
import com.example.demo.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

//	get All User
	@Override
	public List<User> getAllUser(String type) {
		if (type.contains("married")) {
			return userRepository.findByMarriedTrueAndIsDeletedFalseOrderByJoiningDateAsc();

		} else if (type.contains("unMarried")) {
			return userRepository.findByMarriedFalseAndIsDeletedFalseOrderByJoiningDateAsc();
		} else {
			return userRepository.findAllByIsDeletedFalseOrderByJoiningDateAsc();
		}
	}

//	add User
	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

//	update User
	@SuppressWarnings("deprecation")
	@Override
	public void updateUser(User user, int id) {
		User updateUser = userRepository.getById(id);
		updateUser.setFirstName(user.getFirstName());
		updateUser.setLastName(user.getLastName());
		updateUser.setAge(user.getAge());
		updateUser.setJoiningDate(user.getJoiningDate());
		updateUser.setMarried(user.isMarried());
		updateUser.setAddress(user.getAddress());
		updateUser.setDeleted(user.isDeleted());
		updateUser.setPosition(user.getPosition());
		updateUser.setContacts(user.getContacts());
		userRepository.save(updateUser);

	}

//	delete User(soft Delete)
	@SuppressWarnings("deprecation")
	@Override
	public void deleteUser(int id) {
		User user = userRepository.getById(id);
		user.markAsDeleted();
		userRepository.save(user);
	}

}
