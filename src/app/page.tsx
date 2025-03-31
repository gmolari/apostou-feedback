"use client";

import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProgress } from "@/contexts/ProgressContext";
import "../styles/globals.css";

const registrationSchema = z.object({
  name: z.string().min(3, "O nome é obrigatório."),
  email: z.string().email("Digite um email válido."),
  phone: z
    .string()
    .min(10, "O número deve ter pelo menos 10 dígitos.")
    .max(15, "O número deve ter no máximo 15 dígitos.")
    .regex(/^\d{10,15}$/, "O número deve conter apenas dígitos."),
    
    });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const StyledContainer = styled.div`
  width: 85%;
  padding: 1.5rem;
  background-color: #1a1a1a;
  border-radius: 0.5rem;
  border: 1px solid #ff562222;
  box-shadow: 0 0 6px #ff562226;
  z-index: 10;

  @media (min-width: 760px) {
    width: 80%;
  }
`;

const StyledParagraph = styled.p`
  text-align: center;
  color: #bdbdbd;
  margin-bottom: 2rem;
  margin-top: 1rem;
  font-size: 12px;
  font-weight: 200;

  @media (min-width: 376px) {
    font-size: 14px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const StyledLabel = styled.label`
  color: #bdbdbd;
  font-size: 12px;
  font-weight: 200;
  margin-bottom: 0.2rem;
  margin-top: 0.8rem;
  display: block;

  @media (min-width: 376px) {
    font-size: 14px;
  }

  @media (min-width: 760px) {
    font-size: 18px;
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border: 1px solid #1f2937;
  border-radius: 0.375rem;
  padding: 0.5rem;
  color: #737373;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  &:focus-within {
    border-color: #ff6300;
    box-shadow: 0 0 6px #ff6300;
  }

  input {
    flex: 1;
    background-color: transparent;
    border: none;
    outline: none;
    color: #737373;
    font-size: 11px;

    @media (min-width: 376px) {
      font-size: 13px;
    }

    @media (min-width: 760px) {
      font-size: 18px;
    }
  }
`;

const StyledError = styled.p`
  color: #ff4d4d;
  font-size: 7px;
  margin-top: 0rem;
  font-weight: 200;
  text-align: left;
  font-style: italic;

  @media (min-width: 375px) {
    font-size: 8px;
  }

  @media (min-width: 760px) {
    font-size: 16px;
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
  /* margin-top: 0; */

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

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const { setProgress } = useProgress();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      console.log("Dados enviados:", data);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message || "Erro ao enviar os dados."
        );
      }

      const result = await response.json();
      console.log("Usuário criado com sucesso:", result);

      setProgress(33);
      window.location.href = "/questions";
    } catch (error: any) {
      console.error("Erro ao enviar os dados:", error.message);
      alert(
        error.message || "Ocorreu um erro ao enviar os dados. Tente novamente."
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#111111]">
      <StyledContainer>
        <h1 className="text-3xl font-regular text-center text-[#F06310]">
          Bem vindo!
        </h1>
        <StyledParagraph>
          Por favor, forneça suas informações para iniciar nossa pesquisa
        </StyledParagraph>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <StyledLabel htmlFor="name">Como devemos te chamar?</StyledLabel>
            <StyledInputWrapper>
              <img src="/icons/user.png" alt="Ícone de usuário" />
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Digite seu nome e sobrenome"
              />
            </StyledInputWrapper>
            {errors.name && (
              <StyledError>{errors.name.message}</StyledError>
            )}
          </div>

          <div>
            <StyledLabel htmlFor="phone">Número</StyledLabel>
            <StyledInputWrapper>
              <img src="/icons/phone.png" alt="phone" />
              <input
                id="phone"
                type="text"
                {...register("phone")}
                placeholder="Digite seu número"
              />
            </StyledInputWrapper>
            {errors.phone && (
              <StyledError>
                {errors.phone.message}
              </StyledError>
            )}
          </div>

          <div>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInputWrapper>
              <img src="/icons/mail.png" alt="mail" />
              <input
                id="email"
                type="text"
                {...register("email")}
                placeholder="jhon@example.com"
              />
            </StyledInputWrapper>
            {errors.email && (
              <StyledError>
                {errors.email.message}
              </StyledError>
            )}
          </div>

          {/* Botão de Enviar */}
          <StyledButton type="submit">Prosseguir</StyledButton>
        </form>
      </StyledContainer>
    </div>
  );
};

export default Registration;
