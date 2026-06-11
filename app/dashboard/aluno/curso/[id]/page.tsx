'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavbarAluno from '../../../../components/NavbarAluno';
import api from '../../../../lib/api';
import { useAluno } from '../../../../hooks/useAluno';
import "@/app/css/cursoId.css"

export default function CursoDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { aluno } = useAluno();

  const [curso, setCurso] = useState<any>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [jaMatriculado, setJaMatriculado] = useState(false);

  useEffect(() => {
    if (!id) return;

    api.get(`/cursos/${id}`)
      .then(res => setCurso(res.data))
      .catch(err => console.error(err));

    api.get(`/aulas/curso/${id}`)
      .then(res => setAulas(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    if (aluno?.id) {
      api.get(`/inscricoes/aluno/${aluno.id}`)
        .then(res => {
          const matriculado = res.data.some((i: any) => i.curso?.id === Number(id));
          setJaMatriculado(matriculado);
        });
    }
  }, [id, aluno?.id]);

  const matricular = () => {
    if (!aluno?.id) {
      alert("Você precisa estar logado!");
      return;
    }

    const payload = {
      alunoId: aluno.id,
      cursoId: Number(id)
    };

    api.post('/inscricoes/matricular', payload)
      .then(() => {
        alert("Matrícula realizada com sucesso! 🎉");
        setJaMatriculado(true);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response?.data || err);

        api.post(`/inscricoes/matricular?alunoId=${aluno.id}&cursoId=${id}`)
          .then(() => {
            alert("Matrícula realizada com sucesso! 🎉");
            setJaMatriculado(true);
          })
          .catch((err2) => {
            console.error(err2);
            alert("Erro ao matricular. Verifique o console (F12) e me mande o erro completo.");
          });
      });
  };

  if (loading) return <div className='carregando'><NavbarAluno /><p>Carregando curso...</p></div>;

  return (
    <>
      <NavbarAluno />
      <div className='page'>
        {curso && (
          <div className='card'>
            <img
              src={curso.imagem || '/placeholder.jpg'}
              alt={curso.titulo}
            />

            <div className='card-infos'>
              <div className='txts'>
                <h1>{curso.titulo}</h1>
                <p>{curso.descricao}</p>
              </div>

              <div className='btn'>
                {jaMatriculado ? (
                  <button
                    onClick={() => router.push(`/dashboard/aluno/curso/${id}/aulas`)}>
                    Acessar Curso →
                  </button>
                ) : (
                  <button
                    onClick={matricular}>
                    Matricular-me
                  </button>
                )}
              </div>
            </div>

            <h2>Aulas do Curso</h2>
            <div className='titulo'>
              {aulas.length > 0 ? (
                aulas.map((aula: any) => (
                  <div className='botao' key={aula.id} style={{ cursor: jaMatriculado ? 'pointer' : 'default' }} onClick={() => jaMatriculado && router.push(`/dashboard/aluno/curso/${id}/aula/${aula.id}`)}>
                    <strong>{aula.titulo}</strong>
                    {aula.duracao && <span>• {aula.duracao}</span>}
                  </div>
                ))
              ) : (
                <p>Este curso ainda não tem aulas cadastradas.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}