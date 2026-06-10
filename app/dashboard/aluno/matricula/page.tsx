'use client';

import { useState, useEffect } from 'react';
import NavbarAluno from '../../../components/NavbarAluno';
import CursoCard from '../../../components/CursoCard';
import api from '../../../lib/api';
import { useAluno } from '../../../hooks/useAluno';

export default function MatriculaPage() {
  const { aluno } = useAluno();
  const [cursos, setCursos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get('/cursos/ativos')
      .then(res => {
        setCursos(res.data);
        
        // Extrai categorias únicas
        const cats = Array.from(new Set(res.data.map((c: any) => c.categoria)));
        setCategorias(cats as string[]);
      })
      .catch(err => console.error(err));
  }, []);

  const cursosFiltrados = cursos.filter(c => {
    const matchCategoria = !filtroCategoria || c.categoria === filtroCategoria;
    const matchSearch = c.titulo.toLowerCase().includes(search.toLowerCase());
    return matchCategoria && matchSearch;
  });

  return (
    <>
      <NavbarAluno />
      <div style={{ padding: '40px', background: '#f8f4ff', minHeight: '100vh' }}>
        <h1>Todos os Cursos Disponíveis</h1>

        <div style={{ margin: '25px 0', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '30px', border: '2px solid #5b0ba8', width: '320px' }}
          />

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: '30px', border: '2px solid #5b0ba8' }}
          >
            <option value="">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {cursosFiltrados.map((curso) => (
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
      </div>
    </>
  );
}