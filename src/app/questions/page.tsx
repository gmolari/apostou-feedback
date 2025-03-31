"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "@/contexts/ProgressContext";

const StyledContainer = styled.div`
  width: 85%;
  padding: 1.5rem;
  background-color: #1a1a1a;
  border-radius: 0.5rem;
  border: 1px solid #ff562222;
  box-shadow: 0 0 6px #ff562226;
  z-index: 1;

  @media (min-width: 760px) {
    width: 80%;
  }
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #f06310;
  font-size: 22px;
  font-weight: 400;

  @media (min-width: 376px) {
    font-size: 28px;
  }

  @media (min-width: 760px) {
    font-size: 32px;
  }
`;

const StyledParagraph = styled.p`
  text-align: center;
  color: #bdbdbd;
  margin-bottom: 2rem;
  margin-top: 0.3rem;
  font-size: 10px;
  font-weight: 200;

  @media (min-width: 376px) {
    font-size: 14px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
`;

const QuestionTitle = styled.div`
  width: 85%;
  color: #eeeeeec7;
  font-size: 10px;
  font-weight: 200;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 376px) {
    font-size: 12px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;

  @media (min-width: 376px) {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 760px) {
    width: 24px;
    height: 24px;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Slider = styled.input.attrs({
  type: "range",
})<{ value: number }>`
  flex: 1;
  appearance: none;
  height: 6px;
  background: linear-gradient(
    to right,
    #f06310 ${(props) => (props.value - 1) * 25}%,
    #1f2937 ${(props) => (props.value - 1) * 25}%
  );
  border-radius: 3px;
  outline: none;
  transition: background 0.3s;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #f06310;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const SliderValue = styled.span`
  color: #eab308;
  font-size: 12px;
  font-weight: 200;

  @media (min-width: 376px) {
    font-size: 15px;
  }

  @media (min-width: 760px) {
    font-size: 20px;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: #ff6300;
  color: white;
  font-weight: 400;
  border-radius: 0.3rem;
  padding: 0.3rem 0rem;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e55a00;
  }

  @media (min-width: 376px) {
    font-size: 14px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const questions = [
  { id: 1, title: "Quão provável é que você recomende nossa empresa?", icon: "/icons/star.png" },
  { id: 2, title: "Como você avalia a sua experiência?", icon: "/icons/health.png" },
  { id: 3, title: "Quão satisfeito(a) você está com nosso atendimento ao cliente?", icon: "/icons/like.png" },
  { id: 4, title: "Quão provável é o seu retorno à nossa casa?", icon: "/icons/desktop.png" },
];

const Feedback: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const { setProgress } = useProgress(); 

  useEffect(() => {
    setProgress(66);
  }, [setProgress]);

  const handleSliderChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("Respostas enviadas:", answers);

    setProgress(100);
    alert("Feedback enviado com sucesso!");
    window.location.href = "/completed";
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#111111]">
      <StyledContainer>
        <StyledTitle>Seu Feedback</StyledTitle>
        <StyledParagraph>
          Por favor, avalie sua experiência com nossos serviços.
        </StyledParagraph>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {questions.map((question, index) => (
            <QuestionWrapper key={question.id}>
              <QuestionTitle>
                <Icon src={question.icon} alt={`Ícone da pergunta ${index + 1}`} />
                {question.title}
              </QuestionTitle>
              <SliderWrapper>
                <Slider
                  min="1"
                  max="5"
                  value={answers[question.id] || 3}
                  onChange={(e) =>
                    handleSliderChange(question.id, Number(e.target.value))
                  }
                />
                <SliderValue>{answers[question.id] || 3}</SliderValue>
              </SliderWrapper>
            </QuestionWrapper>
          ))}
          <StyledButton type="button" onClick={handleSubmit}>
            Enviar Feedback
          </StyledButton>
        </form>
      </StyledContainer>
    </div>
  );
};

export default Feedback;