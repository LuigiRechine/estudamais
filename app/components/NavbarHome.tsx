"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../css/navbar.css";

type Curso = {
  id: number;
  titulo: string;
  categoria?: string;
  imagem?: string;
};

export default function Navbar() {
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState<Curso[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Busca em tempo real
  useEffect(() => {
    if (busca.trim().length < 2) {
      setSugestoes([]);
      setMostrarSugestoes(false);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`http://localhost:8080/cursos/buscar?termo=${encodeURIComponent(busca)}`)
        .then((res) => res.json())
        .then((data: Curso[]) => {
          setSugestoes(data.slice(0, 8)); // limita a 8 sugestões
          setMostrarSugestoes(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 300); // debounce de 300ms

    return () => clearTimeout(timeout);
  }, [busca]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busca.trim()) {
      router.push(`/cursos?search=${encodeURIComponent(busca)}`);
      setMostrarSugestoes(false);
    }
  };

  const selecionarCurso = (curso: Curso) => {
    setBusca(curso.titulo);
    setMostrarSugestoes(false);
    router.push(`/curso/${curso.id}`); // ou o link que você preferir
  };

  return (
    <nav className="navbar" id="nav">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Estuda+" />
      </div>

      <div className="navbar-links">
        <a href="/loginProfessor">SOU PROFESSOR</a>
        <a href="/cadastro/aluno">INSCREVA-SE</a>
      </div>

      <div className="navbar-search-container">
        <form className="navbar-search" onSubmit={handleSubmit}>
          <span className="search-icon">🔎︎</span>
          <input
            type="text"
            placeholder="Buscar curso"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onFocus={() => busca.length >= 2 && setMostrarSugestoes(true)}
          />
        </form>

        {/* Lista de Sugestões */}
        {mostrarSugestoes && (
          <div className="search-suggestions">
            {loading && <p className="suggestion-loading">Buscando...</p>}

            {!loading && sugestoes.length === 0 && (
              <p className="suggestion-empty">Nenhum curso encontrado</p>
            )}

            {sugestoes.map((curso) => (
              <div
                key={curso.id}
                className="suggestion-item"
                onClick={() => selecionarCurso(curso)}
              >
                <img 
                  src={curso.imagem || "/placeholder-course.jpg"} 
                  alt={curso.titulo}
                  className="suggestion-img"
                />
                <div>
                  <p className="suggestion-title">{curso.titulo}</p>
                  {curso.categoria && (
                    <p className="suggestion-category">{curso.categoria}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <a href="/loginAluno" className="navbar-btn">
        MEUS CURSOS
      </a>
    </nav>
  );
}