package com.CtrlAltDefeat.formcreatorappbackend;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.model.DefaultFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.repository.DefaultElementsRepository;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FormCreatorAppBackendApplication {//implements CommandLineRunner {

	public static void main(String[] args) {SpringApplication.run(FormCreatorAppBackendApplication.class, args);}
		@Autowired
		private DefaultElementsRepository defaultElementsRepository;

		@Autowired
		private UserElementsRepository userElementsRepository;

		@Autowired
		private UserFormsRepository userFormsRepository;

		/*
		@Override
		public void run(String... args) throws Exception{
			UserForm form = new UserForm();
			form.setTitle("Contact Form");
			form.setDescription("Customer Contact Information");
			userFormsRepository.save(form);
			
			userElementsRepository.save(new UserFormElement("First Name", "Text Field", "first_name", "Yes", form));

	}*/
}
