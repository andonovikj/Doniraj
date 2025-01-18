package com.example.doniraj.service.impl;

import com.example.doniraj.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final MailSender mailSender;

    @Autowired
    public EmailServiceImpl(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void SendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
