'use client';

import NavbarProfessor from "../../../../components/NavbarProfessor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import "@/app/css/professorDashboard.css"

export default function NovoCurso() {
    const { professor } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        titulo: "",
        categoria: "",
        descricao: "",
        duracaoHoras: "",
        imagem: "",
        link: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!professor) return;

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/cursos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    titulo: formData.titulo,
                    categoria: formData.categoria,
                    descricao: formData.descricao,
                    duracaoHoras: parseInt(formData.duracaoHoras),
                    imagem: formData.imagem,
                    link: `/cursos/${formData.titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
                    ativo: true,
                    acessos: 0,
                    professor: {
                        id: professor.id
                    }
                }),
            });

            if (response.ok) {
                setMessage("✅ Curso criado com sucesso!");
                setFormData({
                    titulo: "", categoria: "", descricao: "", duracaoHoras: "", imagem: "", link: ""
                });

                setTimeout(() => {
                    router.push("/dashboard/professor");
                }, 1800);
            } else {
                const errorText = await response.text();
                setMessage(`❌ Erro: ${errorText || "Não foi possível criar o curso"}`);
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ Erro de conexão com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dash">
            <NavbarProfessor />

            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Criar Novo Curso</h1>
                    <p>Preencha as informações do seu novo curso</p>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit} className="curso-form">

                        <div className="form-group">
                            <label>Título do Curso *</label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                                placeholder="Ex: Finanças Pessoais para Iniciantes"
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoria *</label>
                            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
                                <option value="">Selecione uma categoria</option>
                                <option value="Finanças">Finanças</option>
                                <option value="Programação">Programação</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Design">Design</option>
                                <option value="Idiomas">Idiomas</option>
                                <option value="Desenvolvimento Pessoal">Desenvolvimento Pessoal</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Descrição *</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Descreva detalhadamente o que o aluno vai aprender..."
                            />
                        </div>
                        
                            <div className="form-group">
                                <label>Duração (em horas) *</label>
                                <input
                                    type="number"
                                    name="duracaoHoras"
                                    value={formData.duracaoHoras}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="Ex: 12"
                                />
                            </div>

                        <div className="form-group">
                            <label>URL da Imagem (Capa) *</label>
                            <input
                                type="url"
                                name="imagem"
                                value={formData.imagem}
                                onChange={handleChange}
                                required
                                placeholder="https://exemplo.com/capa-curso.jpg"
                            />
                        </div>

                        {message && (
                            <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
                                {message}
                            </div>
                        )}

                        <div className="form-buttons">
                            <button type="button" onClick={() => router.back()} className="btn-cancel">
                                Cancelar
                            </button>
                            <button type="submit" className="btn-criar-curso" disabled={loading}>
                                {loading ? "Criando Curso..." : " Criar Curso"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}