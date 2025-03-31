"use client";

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a1a1a;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-weight: 200;
  font-size: 12px;
  border-top: 1px solid #ff562218; /* Linha superior para separar o footer */
  position: fixed; /* Fixa o footer na parte inferior da tela */
  bottom: 0; /* Alinha o footer na parte inferior */
  left: 0; /* Garante que ele fique alinhado à esquerda */
  z-index: 10; /* Garante que o footer fique acima de outros elementos */
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Espaçamento entre o ícone e o texto */
  font-size: 8px;
`;

const FooterIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>
        <FooterIcon src="/icons/secutiry.png" alt="Ícone de segurança" />
        Apostas seguras e regulamentadas
      </FooterText>
      <FooterText>© 2025 Apostou. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
