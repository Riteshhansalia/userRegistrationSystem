package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.User;


public interface UserRepository extends JpaRepository<User, Integer>{

//	For get users by joining date Asc order
	List<User> findAllByIsDeletedFalseOrderByJoiningDateAsc();
	
//	for get married user
	List<User> findByMarriedTrueAndIsDeletedFalseOrderByJoiningDateAsc();
	
//	for get unMarried user
	List<User> findByMarriedFalseAndIsDeletedFalseOrderByJoiningDateAsc();
}
