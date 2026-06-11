'use client';

import { useState, useEffect } from 'react';
import NavbarAluno from '../../components/NavbarAluno';
import CursoCard from '../../components/CursoCard';
import api from '../../lib/api';
import { useAluno } from '../../hooks/useAluno';
import "@/app/css/alunoDashboard.css"

export default function DashboardAluno() {
  const { aluno, loading: alunoLoading } = useAluno();
  const [cursosEmAndamento, setCursosEmAndamento] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!aluno?.id) return;

    api.get(`/inscricoes/aluno/${aluno.id}`)
      .then(res => {
        const cursos = res.data
          .filter((i: any) => i.ativo)
          .map((i: any) => i.curso);
        setCursosEmAndamento(cursos);
      })
      .catch(err => console.error("Erro ao carregar cursos em andamento:", err))
      .finally(() => setLoading(false));
  }, [aluno?.id]);

  if (alunoLoading) return <div>Carregando...</div>;

  return (
    <>
      <NavbarAluno />
      <div className='body'>
        <h1>
          Olá, {aluno?.nome?.split(" ")[0]}! 👋
        </h1>

        <h2>Cursos em Andamento</h2>

        {loading ? (
          <p>Carregando seus cursos...</p>
        ) : cursosEmAndamento.length > 0 ? (
          <div className='cards'>
            {cursosEmAndamento.map((curso) => (
              <CursoCard
                key={curso.id}
                imagem={curso.imagem}
                categoria={curso.categoria}
                titulo={curso.titulo}
                duracao={`${curso.duracaoHoras}h`}
                link={`/dashboard/aluno/curso/${curso.id}`}
              />
            ))}
          </div>
        ) : (
          <p>Você ainda não está matriculado em nenhum curso.</p>
        )}
      </div>
    </>
  );
}