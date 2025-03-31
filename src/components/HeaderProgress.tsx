"use client";

import React from "react";
import styled from "styled-components";
import { useProgress } from "@/contexts/ProgressContext";

const HeaderProgress: React.FC = () => {
  const { progress } = useProgress(); // Obtém o progresso do contexto

  // Calcula o passo atual com base no progresso
  const currentStep = Math.min(3, Math.max(1, Math.ceil(progress / 33)));

  return (
    <HeaderContainer>
      <Logo src="/logo.png" alt="Logo Apostou" />
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <StepText>{`Passo ${currentStep} de 3`}</StepText>
    </HeaderContainer>
  );
};

export default HeaderProgress;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #111111;
  padding: 1rem 0 0rem 0;

  @media (min-width: 340px) {
    padding: 3rem 0 1rem 0;
  }

  @media (min-width: 390px) {
    padding: 4rem 0 4rem 0;
  }

  @media (min-width: 760px) {
    padding: 4rem 0 5rem 0;
  }
`;

const Logo = styled.img`
  width: 160px;
  margin-bottom: 2rem;
`;

const ProgressBarContainer = styled.div`
  width: 85%;
  height: 8px;
  background-color: #1f2937;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;

  @media (min-width: 760px) {
    width: 80%;
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #ff6300;
  transition: width 0.3s ease;
`;

const StepText = styled.p`
  color: #f06310;
  font-size: 10px;
  font-weight: 200;
  align-self: flex-end;
  margin-right: 10%;
`;