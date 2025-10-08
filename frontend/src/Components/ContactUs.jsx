import React from 'react'
import './ContactUs.css'

const ContactUs = () => {
  return (
   <div className="contact-container">
      <form className="contact-form">
        <h2>Contact Us</h2>

        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Subject
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"

            placeholder="Enter your message"
            rows="5"
            required
          />
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default ContactUs
