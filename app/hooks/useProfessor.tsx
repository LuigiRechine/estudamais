'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

export function useProfessor() {
  const router = useRouter();
  const { login, logout: logoutContext } = useAuth();   // ← Pegando também o logout

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  function entrar(evento: React.FormEvent) {
    evento.preventDefault();

    const dadosLogin = { email, password };

    api.post('/professores/auth', dadosLogin)
      .then((resposta) => {
        const professorData = resposta.data;

        // ✅ Salvar no contexto
        login({
          id: professorData.id,
          nome: professorData.nome || professorData.name,   // aceita os dois formatos
          email: professorData.email,
        });

        // Cookies (mantendo compatibilidade com outras partes do sistema)
        Cookies.set('logged', 'true', { expires: 1 });
        Cookies.set('email', professorData.email, { expires: 1 });

        router.push('/dashboard/professor');
      })
      .catch((erro) => {
        console.error(erro);
        alert('Erro: Email ou senha incorretos!');
      });
  }

  function cadastrar(evento: React.FormEvent) {
    evento.preventDefault();

    const dadosCadastro = { name, email, cpf, password };

    api.post('/professores/', dadosCadastro)
      .then(() => {
        alert('Cadastro realizado com sucesso!!');
        window.location.href = '/loginProfessor';
      })
      .catch(() => {
        alert('Não foi possível finalizar o cadastro!');
      });
  }

  function logout() {
    Cookies.remove('logged');
    Cookies.remove('email');
    
    logoutContext();           // ← Agora chama o logout do contexto também
    router.push('/loginProfessor');
  }

  return {
    email, setEmail,
    password, setPassword,
    name, setName,
    cpf, setCpf,
    entrar,
    cadastrar,
    logout
  };
}