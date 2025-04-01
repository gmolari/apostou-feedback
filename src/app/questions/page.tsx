"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "@/contexts/ProgressContext";
import { useUser } from "@/contexts/UserContext";

const StyledContainer = styled.div`
  width: 85%;
  max-width: 500px;
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

  @media (min-width: 1024px) {
    font-size: 30px;
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

const Feedback: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]); // Estado para armazenar as questões
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const { user, loading } = useUser();
  const { setProgress } = useProgress();

  useEffect(() => {
    // Busca as questões do backend
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://apostou-feedback.vercel.app/api/questions"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar questões");
        }
        const data = await response.json();
        setQuestions(data); // Atualiza o estado com as questões
      } catch (error) {
        console.error("Erro ao buscar questões:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log("Usuário no localStorage:", localStorage.getItem("user"));
    setProgress(66);

    if (!loading && !user) {
      alert("Erro: Usuário não autenticado.");
      window.location.href = "/";
    }
  }, [setProgress, user, loading]);

  const handleSliderChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Erro: Usuário não autenticado.");
      return;
    }

    const payload = Object.entries(answers).map(([question_id, answer]) => ({
      answer: String(answer),
      user_id: user.id,
      question_id: Number(question_id),
    }));

    console.log("Payload enviado:", payload);

    try {
      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message || "Erro ao enviar o feedback."
        );
      }

      const result = await response.json();
      console.log("Feedback enviado com sucesso:", result);

      setProgress(100);
      alert(`Obrigado pelo feedback, ${user.name}!`);
      window.location.href = "/completed";
    } catch (error: any) {
      console.error("Erro ao enviar o feedback:", error.message);
      alert(error.message || "Erro ao enviar o feedback. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-[#111111]">
        <StyledContainer>
          <StyledTitle>Carregando...</StyledTitle>
        </StyledContainer>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-[#111111]">
        <StyledContainer>
          <StyledTitle>Erro: Usuário não autenticado.</StyledTitle>
        </StyledContainer>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#111111]">
      <StyledContainer>
        <StyledTitle>Seu Feedback</StyledTitle>
        <StyledParagraph>
          {user &&
            `Bem-vindo, ${user.name}! Por favor, avalie sua experiência.`}
        </StyledParagraph>
        {questions.length === 0 ? (
          <StyledTitle>Carregando questões...</StyledTitle>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {questions.map((question) => (
              <QuestionWrapper key={question.id}>
                <QuestionTitle>
                  <Icon
                    src={question.icon || "/icons/default.png"}
                    alt={`Ícone da pergunta`}
                  />
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
        )}
      </StyledContainer>
    </div>
  );
};

export default Feedback;
