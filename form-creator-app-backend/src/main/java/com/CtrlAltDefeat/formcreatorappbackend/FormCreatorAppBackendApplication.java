package com.CtrlAltDefeat.formcreatorappbackend;

import com.CtrlAltDefeat.formcreatorappbackend.model.DefaultFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.repository.DefaultElementsRepository;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FormCreatorAppBackendApplication {//implements CommandLineRunner {

	public static void main(String[] args) {SpringApplication.run(FormCreatorAppBackendApplication.class, args);}
		@Autowired
		private DefaultElementsRepository defaultElementsRepository;

		@Autowired
		private UserElementsRepository userElementsRepository;

		/*@Override
		public void run(String... args) throws Exception{
			Populate default elements table with sample data
			DefaultFormElement checkbox = new DefaultFormElement();
			checkbox.setTitle("Title");
			checkbox.setType("Checkbox");
			checkbox.setKey("Key");
			checkbox.setRequired("Required");
			defaultElementsRepository.save(checkbox);

			DefaultFormElement textField = new DefaultFormElement();
			textField.setTitle("Title");
			textField.setType("Text Field");
			textField.setKey("Key");
			textField.setRequired("Required");
			defaultElementsRepository.save(textField);

			DefaultFormElement textArea = new DefaultFormElement();
			textArea.setTitle("Title");
			textArea.setType("Text Area");
			textArea.setKey("Key");
			textArea.setRequired("Required");
			defaultElementsRepository.save(textArea);

			DefaultFormElement hidden = new DefaultFormElement();
			hidden.setTitle("Title");
			hidden.setType("Hidden");
			hidden.setKey("Key");
			hidden.setRequired("Required");
			defaultElementsRepository.save(hidden);

			//Populate User form with sample data
			UserFormElement checkbox1 = new UserFormElement();
			checkbox1.setTitle("Student");
			checkbox1.setType("Checkbox");
			checkbox1.setKey("student");
			checkbox1.setRequired("Yes");
			userElementsRepository.save(checkbox1);

			UserFormElement message = new UserFormElement();
			message.setTitle("College Experience");
			message.setType("Text Area");
			message.setKey("college_experience");
			message.setRequired("Yes");
			userElementsRepository.save(message);

			UserFormElement emailAddress = new UserFormElement();
			emailAddress.setTitle("School Email Address");
			emailAddress.setType("Text Field");
			emailAddress.setKey("school_email_address");
			emailAddress.setRequired("No");
			userElementsRepository.save(emailAddress);*/
		
	}
