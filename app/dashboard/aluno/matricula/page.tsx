'use client';

import { useState, useEffect } from 'react';
import NavbarAluno from '../../../components/NavbarAluno';
import CursoCard from '../../../components/CursoCard';
import api from '../../../lib/api';
import { useAluno } from '../../../hooks/useAluno';
import "@/app/css/matricula.css"

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
      <div className='geral'>
        <h1>Todos os Cursos Disponíveis</h1>

        <div className='inp'>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='cards'>
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