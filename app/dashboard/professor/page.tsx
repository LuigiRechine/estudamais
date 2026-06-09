'use client';

import NavbarProfessor from "../../components/NavbarProfessor";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../css/professorDashboard.css";

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  imagem?: string;
  acessos?: number;
}

export default function DashboardProfessor() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCursos, setTotalCursos] = useState(0);
  
  // TODO: Depois vamos pegar isso do login/context
  const professorId = 3;   // ← Mude para o ID real do professor logado

  // Buscar cursos do professor
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cursos/professor/${professorId}`);
        if (response.ok) {
          const data = await response.json();
          setCursos(data);
          setTotalCursos(data.length);
        }
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [professorId]);

  // Pegar apenas os 3 últimos cursos
  const ultimosCursos = cursos.slice(0, 3);

  return (
    <>
      <NavbarProfessor />

      <div className="dashboard-container">
        
        {/* Cabeçalho */}
        <div className="dashboard-header">
          <h1>Bem-vindo de volta, Professor!</h1>
          <p>Gerencie seus cursos e acompanhe seu desempenho</p>
        </div>

        <div className="dashboard-content">
          
          {/* Coluna Esquerda */}
          <div className="dashboard-left">
            {/* Estatísticas */}
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📚</span>
                <h3>Total de Cursos</h3>
                <p className="stat-number">{totalCursos}</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <h3>Alunos Ativos</h3>
                <p className="stat-number">248</p> {/* Vamos melhorar depois */}
              </div>
              <div className="stat-card">
                <span className="stat-icon">🔥</span>
                <h3>Acessos este mês</h3>
                <p className="stat-number">1.847</p> {/* Placeholder por enquanto */}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="quick-actions">
              <h2>Ações Rápidas</h2>
              <Link href="/dashboard/professor/cursos/novo" className="btn-criar-curso">
                ➕ Criar Novo Curso
              </Link>
              <Link href="/dashboard/professor/meus-cursos" className="btn-secundario">
                📋 Ver Todos os Meus Cursos
              </Link>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="dashboard-right">
            <h2>Últimos Cursos Criados</h2>
            <div className="recent-courses">
              {loading ? (
                <p>Carregando cursos...</p>
              ) : ultimosCursos.length > 0 ? (
                ultimosCursos.map((curso) => (
                  <div key={curso.id} className="recent-course-card">
                    <img 
                      src={curso.imagem || "/placeholder.jpg"} 
                      alt={curso.titulo}
                      className="course-image"
                    />
                    <div className="course-info">
                      <h4>{curso.titulo}</h4>
                      <p>{curso.descricao?.substring(0, 80)}...</p>
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
                <p>Você ainda não tem cursos cadastrados.</p>
              )}
            </div>

            <div className="tips-box">
              <h3>Dica do dia</h3>
              <p>Adicione aulas com vídeos curtos (5-15 minutos). Isso aumenta muito a taxa de conclusão dos alunos.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}