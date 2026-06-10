'use client';

import { useState, useEffect } from 'react';
import NavbarAluno from '../../components/NavbarAluno';
import CursoCard from '../../components/CursoCard';
import api from '../../lib/api';
import { useAluno } from '../../hooks/useAluno';

export default function DashboardAluno() {
  const { aluno, loading: alunoLoading } = useAluno();
  const [cursosEmAndamento, setCursosEmAndamento] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!aluno?.id) return;

    api.get(`/inscricoes/aluno/${aluno.id}`)
      .then(res => {
        // Cada inscrição tem o objeto "curso"
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
      <div style={{ padding: '40px', background: '#f8f4ff', minHeight: '100vh' }}>
        <h1 style={{ color: '#3d1268', fontSize: '42px' }}>
          Olá, {aluno?.nome?.split(" ")[0]}! 👋
        </h1>

        <h2 style={{ marginTop: '40px', color: '#5b0ba8' }}>Cursos em Andamento</h2>

        {loading ? (
          <p>Carregando seus cursos...</p>
        ) : cursosEmAndamento.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '20px' }}>
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