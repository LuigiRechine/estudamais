'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Cookies from 'js-cookie';

export function useProfessor() {
  const router = useRouter();

  // Estados simples e separados, iguais aos do cadastro de produtos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  // Função disparada ao clicar no botão Entrar
  function entrar(evento: React.FormEvent) {
    evento.preventDefault(); // Evita que a página recarregue

    // Montamos o objeto que vai para a API
    const dadosLogin = {
      email: email,
      password: password
    };

    api.post('/professores/auth', dadosLogin)
      .then((resposta) => {
        Cookies.set('logged', 'true', { expires: 1 }); // Expira as credenciais de login em 1 dia
        Cookies.set('email', resposta.data.name, { expires: 1 }); // Expira o nome em 1 dia

        // Vai para a página principal (Dashboard)
        router.push('/dashboard/professor');
      })
      .catch(() => {
        // Mostra o erro simples se a senha estiver errada
        alert('Erro: Email ou senha incorretos!');
      });
  }

  function cadastrar(evento: React.FormEvent) {
    evento.preventDefault(); // Evita que a página recarregue

    // Montamos o objeto que vai para a API
    const dadosCadastro = {
      name: name,
      email: email,
      cpf: cpf,
      password: password
    };

    api.post('/professores/', dadosCadastro)
      .then((resposta) => {
        alert('Cadastro realizado com sucesso!!')

        // Vai para a página principal (Dashboard)
        window.location.href = '/loginProfessor';
      })
      .catch(() => {
        // Mostra o erro simples se a senha estiver errada
        alert('Não foi possível finalizar o cadastro!');
      });
  }

  function logout() {
  Cookies.remove('logged');
  Cookies.remove('email');   
  Cookies.remove('password');      

  router.push('/loginProfessor');   
}

  // Exportamos tudo que a tela vai precisar
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