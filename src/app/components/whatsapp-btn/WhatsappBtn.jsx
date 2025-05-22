import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsappBtn.css';

const WhatsAppBtn = () => {
  return (
    <a
      href="https://wa.me/"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppBtn;
