'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavbarAluno from '@/app/components/NavbarAluno';
import api from '@/app/lib/api';
import { useAluno } from '@/app/hooks/useAluno';
import "@/app/css/aulaId.css"

export default function AulaPage() {
  const { id: cursoId, aulaId } = useParams();
  const router = useRouter();
  const { aluno } = useAluno();

  const [aula, setAula] = useState<any>(null);
  const [aulas, setAulas] = useState<any[]>([]);
  const [curso, setCurso] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cursoId || !aulaId) return;

    Promise.all([
      api.get(`/aulas/${aulaId}`),
      api.get(`/aulas/curso/${cursoId}`),
      api.get(`/cursos/${cursoId}`)
    ])
      .then(([aulaRes, aulasRes, cursoRes]) => {
        console.log("📌 Aula carregada:", aulaRes.data);
        setAula(aulaRes.data);
        setAulas(aulasRes.data);
        setCurso(cursoRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [cursoId, aulaId]);

  const aulaAtualIndex = aulas.findIndex(a => a.id === Number(aulaId));
  const proximaAula = aulas[aulaAtualIndex + 1];
  const aulaAnterior = aulas[aulaAtualIndex - 1];

  const irParaAula = (novoAulaId: number) => {
    router.push(`/dashboard/aluno/curso/${cursoId}/aula/${novoAulaId}`);
  };

  // Extrai ID do YouTube
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = aula ? getYoutubeId(aula.videoUrl) : null;

  if (loading || !aula) {
    return <><NavbarAluno /><div className='carregando'>Carregando aula...</div></>;
  }

  return (
    <>
      <NavbarAluno />
      <div className='ifCarregado'>
        <div className='page'>
          <h1 className='page-h1'>{curso?.titulo}</h1>
          <p className='page-p'>
            Aula {aulaAtualIndex + 1} de {aulas.length}
          </p>

          <div className='content'>

            <div className='player'>
              <div className='iframe'>
                {youtubeId ? (
                  <iframe
                    width="100%"
                    height="620"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={aula.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className='nenhumVideo'>
                    <p>🚫 Nenhum vídeo configurado para esta aula.</p>
                  </div>
                )}
              </div>

              <div className='descricao'>
                <h2>{aula.titulo}</h2>
                {aula.descricao && (
                  <p>
                    {aula.descricao}
                  </p>
                )}
              </div>
            </div>

            <div className='sidebar'>
              <h3>Aulas do Curso</h3>

              <div className='aulaAtiva'>
                {aulas.map((a, index) => {
                  const isActive = a.id === Number(aulaId);
                  return (
                    <div className='btnAula'
                      key={a.id}
                      onClick={() => irParaAula(a.id)}
                      style={{
                        background: isActive ? '#5b0ba820' : '#f9f9f9',
                        border: isActive ? '2px solid #5b0ba8' : '1px solid #eee'
                      }}
                    >
                      <div className='div-title'>
                        <div className='title' style={{
                          background: isActive ? '#5b0ba8' : '#ccc',
                        }}>
                          {index + 1}
                        </div>
                        <div className='flex'>
                          <strong style={{ color: isActive ? '#5b0ba8' : '#333' }}>{a.titulo}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='navegacao'>
                <button className='btn1'
                  onClick={() => aulaAnterior && irParaAula(aulaAnterior.id)}
                  disabled={!aulaAnterior}
                  style={{
                    cursor: aulaAnterior ? 'pointer' : 'not-allowed',
                    opacity: aulaAnterior ? 1 : 0.5
                  }}
                >
                  ← Anterior
                </button>

                <button className='btn2'
                  onClick={() => proximaAula && irParaAula(proximaAula.id)}
                  disabled={!proximaAula}
                  style={{
                    cursor: proximaAula ? 'pointer' : 'not-allowed'
                  }}
                >
                  Próxima →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}