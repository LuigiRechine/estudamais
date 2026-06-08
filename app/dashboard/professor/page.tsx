'use client';

import NavbarProfessor from "../../components/NavbarProfessor";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../css/professorDashboard.css"

export default function DashboardProfessor() {
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
                <p className="stat-number">12</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <h3>Alunos Ativos</h3>
                <p className="stat-number">248</p>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🔥</span>
                <h3>Acessos este mês</h3>
                <p className="stat-number">1.847</p>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="quick-actions">
              <h2>Ações Rápidas</h2>
              <Link href="/professor/curso/novo" className="btn-criar-curso">
                ➕ Criar Novo Curso
              </Link>
              <Link href="/professor/meus-cursos" className="btn-secundario">
                📋 Ver Todos os Meus Cursos
              </Link>
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="dashboard-right">
            <h2>Últimos Cursos Criados</h2>
            <div className="recent-courses">
              <p>Você ainda não tem cursos cadastrados.</p>
              {/* Aqui vamos listar os cursos depois */}
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