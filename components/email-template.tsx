import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, phone, email, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>New Message from Contact Form</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Message:</strong></p>
      <p>{message}</p>
    </div>
  );
}