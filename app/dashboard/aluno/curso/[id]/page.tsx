'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavbarAluno from '../../../../components/NavbarAluno';
import api from '../../../../lib/api';

export default function CursoDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [curso, setCurso] = useState<any>(null);
  const [aulas, setAulas] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/cursos/${id}`).then(res => setCurso(res.data));
    api.get(`/aulas/curso/${id}`).then(res => setAulas(res.data));
  }, [id]);

  const matricular = () => {
    const alunoId = 1; // TODO: pegar do auth
    api.post(`/inscricoes/matricular?alunoId=${alunoId}&cursoId=${id}`)
      .then(() => {
        alert("Matriculado com sucesso!");
        router.push(`/dashboard/aluno/curso/${id}`);
      });
  };

  return (
    <>
      <NavbarAluno />
      <div style={{ padding: '40px' }}>
        {curso && (
          <>
            <img src={curso.imagem} alt={curso.titulo} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }} />
            <h1>{curso.titulo}</h1>
            <p>{curso.descricao}</p>
            
            <button onClick={matricular} style={{ background: '#5b0ba8', color: 'white', padding: '15px 40px', borderRadius: '30px', fontSize: '20px' }}>
              Matricular-me
            </button>

            <h2 style={{ marginTop: '40px' }}>Aulas</h2>
            <div>
              {aulas.map(aula => (
                <div key={aula.id} style={{ padding: '15px', background: 'white', marginBottom: '10px', borderRadius: '8px', cursor: 'pointer' }}
                     onClick={() => router.push(`/dashboard/aluno/curso/${id}/aula/${aula.id}`)}>
                  {aula.titulo} {aula.duracao && `(${aula.duracao})`}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}