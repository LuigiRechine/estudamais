'use client';

import NavbarProfessor from "../../../components/NavbarProfessor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "../../../css/professorDashboard.css"; // Reutilizando seus estilos

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  imagem?: string;
}

export default function MeusCursos() {
  const { professor } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  const professorId = professor?.id;

  useEffect(() => {
    if (!professorId) {
      setLoading(false);
      return;
    }

    const fetchCursos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/cursos/professor/${professorId}`);
        
        if (response.ok) {
          const data = await response.json();
          setCursos(data);
        }
      } catch (error) {
        console.error("Erro ao carregar os cursos do professor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [professorId]);

  if (!professor) {
    return <p>Faça login para acessar seus cursos.</p>;
  }

  return (
    <div className="dash meus-cursos">
      <NavbarProfessor />

      <div className="dashboard-container">
        {/* Cabeçalho da Página */}
        <div className="dashboard-header">
          <h1>Meus Cursos</h1>
          <p>Gerencie todos os cursos que você publicou na plataforma</p>
        </div>

        {/* Barra de Ações Supreior */}
        <div className="quick-actions" style={{ marginBottom: '2rem' }}>
          <Link href="/dashboard/professor" className="btn-cancel" style={{ marginRight: '1rem', textDecoration: 'none' }}>
            ← Voltar ao Dashboard
          </Link>
          <Link href="/dashboard/professor/cursos/novo" className="btn-criar-curso">
             Criar Novo Curso
          </Link>
        </div>

        {/* Listagem Completa de Cursos */}
        <div className="recent-courses-section">
          <h2>Todos os Cursos ({cursos.length})</h2>
          
          <div className="recent-courses">
            {loading ? (
              <p>Carregando seus cursos...</p>
            ) : cursos.length > 0 ? (
              // Sem o .slice(), listando absolutamente todos do professor
              cursos.map((curso) => (
                <div key={curso.id} className="recent-course-card">
                  <img
                    src={curso.imagem || "/placeholder.jpg"}
                    alt={curso.titulo}
                    className="course-image"
                  />
                  <div className="course-info">
                    <h4>{curso.titulo}</h4>
                    <p>{curso.descricao?.substring(0, 120)}...</p>
                    <Link
                      href={`/dashboard/professor/cursos/${curso.id}`}
                      className="btn-ver-curso"
                    >
                      Ver Curso →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Você ainda não possui nenhum curso cadastrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}