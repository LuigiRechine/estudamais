'use client';

import NavbarProfessor from "../../components/NavbarProfessor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../css/professorDashboard.css";

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  imagem?: string;
}

interface Stats {
  totalCursos: number;
  alunosAtivos: number;
}

export default function DashboardProfessor() {
  const { professor } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [stats, setStats] = useState<Stats>({ totalCursos: 0, alunosAtivos: 0 });
  const [loading, setLoading] = useState(true);

  const professorId = professor?.id;

  useEffect(() => {
    if (!professorId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [cursosRes, alunosRes] = await Promise.all([
          fetch(`http://localhost:8080/cursos/professor/${professorId}`),
          fetch(`http://localhost:8080/inscricoes/professor/${professorId}/alunos-ativos`)
        ]);

        let cursosData: Curso[] = [];

        if (cursosRes.ok) {
          cursosData = await cursosRes.json();
          setCursos(cursosData);
        }

        if (alunosRes.ok) {
          const alunosData = await alunosRes.json();
          setStats({
            totalCursos: cursosData.length,
            alunosAtivos: alunosData.totalAlunosAtivos || 0,
          });
        } else {
          setStats({ totalCursos: cursosData.length, alunosAtivos: 0 });
        }
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [professorId]);

  if (!professor) {
    return <p>Faça login para acessar o dashboard.</p>;
  }

  return (
    <div className="dash">
      <NavbarProfessor />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Bem-vindo de volta, {professor.nome}!</h1>
          <p>Gerencie seus cursos e acompanhe seu desempenho</p>
        </div>

        {/* Estatísticas */}
        <div className="stats-grid">
          <div className="stat-card">
            <img className="icon" src="/iconCurso.png" alt="" />
            <h3>Total de Cursos</h3>
            <p className="stat-number">{stats.totalCursos}</p>
          </div>
          <div className="stat-card">
            <img className="icon" src="/iconAlunos.png" alt="" />
            <h3>Alunos Ativos</h3>
            <p className="stat-number">{stats.alunosAtivos}</p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="quick-actions">
          <h2>Ações Rápidas</h2>
          <Link href="/dashboard/professor/cursos/novo" className="btn-criar-curso">
            Criar Novo Curso
          </Link>
        </div>

        {/* Últimos Cursos - Full Width */}
        <div className="recent-courses-section">
          <h2>Últimos Cursos Criados</h2>
          <div className="recent-courses">
            {loading ? (
              <p>Carregando cursos...</p>
            ) : cursos.length > 0 ? (
              cursos.slice(0, 5).map((curso) => (   // aumentei para 4
                <div key={curso.id} className="recent-course-card">
                  <img
                    src={curso.imagem || "/placeholder.jpg"}
                    alt={curso.titulo}
                    className="course-image"
                  />
                  <div className="course-info">
                    <h4>{curso.titulo}</h4>
                    <p>{curso.descricao?.substring(0, 100)}...</p>
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
              <p>Você ainda não tem cursos cadastrados. Crie seu primeiro curso!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}