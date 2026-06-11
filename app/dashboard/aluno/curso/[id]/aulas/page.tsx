'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavbarAluno from '@/app/components/NavbarAluno';
import api from '@/app/lib/api';
import { useAluno } from '@/app/hooks/useAluno';
import "@/app/css/aulas.css"

export default function CursoAulas() {
  const { id } = useParams();
  const router = useRouter();
  const { aluno } = useAluno();

  const [curso, setCurso] = useState<any>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api.get(`/cursos/${id}`)
      .then(res => setCurso(res.data))
      .catch(err => console.error("Erro ao carregar curso:", err));

    api.get(`/aulas/curso/${id}`)
      .then(res => setAulas(res.data))
      .catch(err => console.error("Erro ao carregar aulas:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <NavbarAluno />
        <div className='loading'>Carregando aulas...</div>
      </>
    );
  }

  return (
    <>
      <NavbarAluno />
      <div className='page'>
        {curso && (
          <div className='curso'>
            <div className='header'>
              <img 
                src={curso.imagem || '/placeholder.jpg'} 
                alt={curso.titulo}
              />
              <div className='txts'>
                <h1>{curso.titulo}</h1>
                <p>{curso.descricao}</p>
              </div>
            </div>

            <h2>
              Aulas Disponíveis ({aulas.length})
            </h2>

            <div className='btn'>
              {aulas.length > 0 ? (
                aulas.map((aula: any, index: number) => (
                  <div
                    className='infos'
                    key={aula.id}
                    onClick={() => router.push(`/dashboard/aluno/curso/${id}/aula/${aula.id}`)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div className='div-info'>
                      <div className='div'>
                        {index + 1}
                      </div>
                      <div className='diferente'>
                        <strong>{aula.titulo}</strong>
                        {aula.descricao && <p>{aula.descricao}</p>}
                      </div>
                    </div>

                    <div className='assistir'>
                      ▶ Assistir
                    </div>
                  </div>
                ))
              ) : (
                <p>Este curso ainda não possui aulas cadastradas.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}