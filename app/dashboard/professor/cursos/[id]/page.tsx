'use client';

import NavbarProfessor from "@/app/components/NavbarProfessor";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import "@/app/css/detalhesCurso.css";

interface Aula {
  id?: number;
  titulo: string;
  descricao: string;
  videoUrl: string;
  duracaoMinutos: number;
  ordem: number;
  ativo: boolean;
}

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetalhesCurso({ params }: PageProps) {
  const resolvedParams = use(params);
  const cursoId = resolvedParams.id;

  const [curso, setCurso] = useState<Curso | null>(null);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    videoUrl: "",
    duracaoMinutos: "",
    ordem: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const cursoRes = await fetch(`http://localhost:8080/cursos/${cursoId}`);
        if (cursoRes.ok) {
          const cursoData = await cursoRes.json();
          setCurso(cursoData);
        }

        const aulasRes = await fetch(`http://localhost:8080/aulas/curso/${cursoId}`);
        if (aulasRes.ok) {
          const aulasData = await aulasRes.json();
          setAulas(aulasData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cursoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingForm(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:8080/aulas/curso/${cursoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          videoUrl: formData.videoUrl,
          duracaoMinutos: parseInt(formData.duracaoMinutos),
          ordem: parseInt(formData.ordem) || aulas.length + 1,
          ativo: true
        }),
      });

      if (response.ok) {
        const novaAula = await response.json();
        setMessage("✅ Aula adicionada com sucesso!");
        setAulas(prev => [...prev, novaAula]);
        setFormData({ titulo: "", descricao: "", videoUrl: "", duracaoMinutos: "", ordem: "" });
      } else {
        setMessage("❌ Erro ao salvar a aula.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro de conexão.");
    } finally {
      setLoadingForm(false);
    }
  };

  if (loading) {
    return <p className="loading-text">Carregando informações do curso...</p>;
  }

  return (
    <div className="dash">
      <NavbarProfessor />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <Link href="/dashboard/professor" className="back-link">
            ← Voltar para o Dashboard
          </Link>
          <h1 className="curso-main-titulo">{curso?.titulo || "Gerenciar Curso"}</h1>
          <p className="curso-main-descricao">{curso?.descricao}</p>
        </div>

        <div className="detalhes-layout-split">
          
          <div className="aulas-lista-section">
            <h2>Aulas Cadastradas ({aulas.length})</h2>
            
            <div className="aulas-stack">
              {aulas.length > 0 ? (
                aulas
                  .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
                  .map((aula) => (
                    <div key={aula.id} className="aula-item-card">
                      <div className="aula-meta-info">
                        <h4>{aula.ordem}. {aula.titulo}</h4>
                        <p>{aula.duracaoMinutos} min • {aula.videoUrl}</p>
                      </div>
                      <span className="badge-ativa">Ativa</span>
                    </div>
                  ))
              ) : (
                <p className="empty-state">Nenhuma aula cadastrada para este curso ainda.</p>
              )}
            </div>
          </div>

          <div className="form-aula-section">
            <h2>Adicionar Nova Aula</h2>
            
            <form onSubmit={handleSubmit} className="curso-form">
              <div className="form-group">
                <label>Título da Aula *</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Introdução ao Módulo"
                />
              </div>

              <div className="form-group">
                <label>URL do Vídeo *</label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  required
                  placeholder="Ex: https://youtube.com/..."
                />
              </div>

              <div className="form-row-duplo">
                <div className="form-group">
                  <label>Duração (min) *</label>
                  <input
                    type="number"
                    name="duracaoMinutos"
                    value={formData.duracaoMinutos}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="Ex: 15"
                  />
                </div>

                <div className="form-group">
                  <label>Ordem/Posição</label>
                  <input
                    type="number"
                    name="ordem"
                    value={formData.ordem}
                    onChange={handleChange}
                    min="1"
                    placeholder="Ex: 1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descrição da Aula</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={3}
                  placeholder="O que será abordado nesta aula..."
                />
              </div>

              {message && (
                <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
                  {message}
                </div>
              )}

              <button type="submit" className="btn-criar-curso btn-block" disabled={loadingForm}>
                {loadingForm ? "Salvando Aula..." : "Adicionar Aula"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}