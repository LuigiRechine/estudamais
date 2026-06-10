'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavbarAluno from '../../../../../../components/NavbarAluno';
import api from '../../../../../../lib/api';

export default function AulaPage() {
  const { id: cursoId, aulaId } = useParams();
  const [aula, setAula] = useState<any>(null);

  useEffect(() => {
    api.get(`/aulas/${aulaId}`).then(res => setAula(res.data));
  }, [aulaId]);

  return (
    <>
      <NavbarAluno />
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {aula && (
          <>
            <h1>{aula.titulo}</h1>
            {aula.videoUrl && (
              <video controls style={{ width: '100%', borderRadius: '12px' }} src={aula.videoUrl} />
            )}
            <div dangerouslySetInnerHTML={{ __html: aula.conteudo || '' }} />
          </>
        )}
      </div>
    </>
  );
}