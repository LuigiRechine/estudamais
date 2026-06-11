'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Cookies from 'js-cookie';

export function useAluno() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const [aluno, setAluno] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alunoId = Cookies.get('alunoId');
    const nomeCookie = Cookies.get('nomeAluno') || Cookies.get('email');

    if (alunoId) {
      setAluno({
        id: Number(alunoId),
        nome: nomeCookie || 'Aluno'
      });
    }
    setLoading(false);
  }, []);

  function entrar(evento: React.FormEvent) {
    evento.preventDefault();

    const dadosLogin = { email, password };

    api.post('/alunos/auth', dadosLogin)
      .then((resposta) => {
        const alunoData = resposta.data;

        Cookies.set('logged', 'true', { expires: 1 });
        Cookies.set('alunoId', alunoData.id.toString(), { expires: 1 });
        Cookies.set('nomeAluno', alunoData.name || alunoData.nome, { expires: 1 });
        Cookies.set('email', alunoData.email, { expires: 1 });

        setAluno({
          id: alunoData.id,
          nome: alunoData.name || alunoData.nome
        });

        router.push('/dashboard/aluno');
      })
      .catch(() => {
        alert('Email ou senha incorretos!');
      });
  }

  function cadastrar(evento: React.FormEvent) {
    evento.preventDefault();

    const dadosCadastro = { name, email, cpf, password };

    api.post('/alunos/', dadosCadastro)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/loginAluno';
      })
      .catch(() => {
        alert('Não foi possível realizar o cadastro!');
      });
  }

  function logout() {
    Cookies.remove('logged');
    Cookies.remove('alunoId');
    Cookies.remove('nomeAluno');
    Cookies.remove('email');
    Cookies.remove('password');

    setAluno(null);
    router.push('/loginAluno');
  }

  return {
    name, setName,
    email, setEmail,
    cpf, setCpf,
    password, setPassword,

    aluno,
    loading,

    entrar,
    cadastrar,
    logout
  };
}