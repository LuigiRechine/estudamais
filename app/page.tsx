'use client';

import { useEffect, useState } from "react";
import Navbar from "./components/NavbarHome";
import CursoCardHome from "./components/CursoCardHome";
import BeneficioCard from "./components/BeneficioCard";
import CursoCard from "./components/CursoCard";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

import "./css/home.css";

type Curso = {
  id: number;
  titulo: string;
  categoria: string;
  duracaoHoras: number;
  imagem: string;
  link?: string;
  professor?: {
    nome?: string;
  };
};

export default function Home() {
  const [cursosDestaques, setCursosDestaques] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/cursos/destaques")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar cursos");
        return res.json();
      })
      .then((data: Curso[]) => {
        setCursosDestaques(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar os cursos no momento.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-text">
          <h1>
            Aprenda habilidades
            <br />
            <em>essenciais</em> para sua
            <br />
            carreira e vida
          </h1>

          <p>
            A Estuda+ ajuda você a desenvolver habilidades em alta com rapidez e
            avançar na sua carreira em um mercado de trabalho dinâmico
          </p>
        </div>

        {/* Mantive os cards do Hero como está (ou podemos mudar depois) */}
        <div className="cards">
          <CursoCardHome
            titulo="Especialista em IA"
            imagem="/ia.png"
            link="/curso/ia"
          />
          <CursoCardHome
            titulo="Ciência de Dados"
            imagem="/ciencia-dados.png"
            link="/curso/ciencia-dados"
          />
          <CursoCardHome
            titulo="Machine Learning"
            imagem="/machine-learning.png"
            link="/curso/machine-learning"
          />
        </div>
      </section>

      <section className="beneficios-section">
        <h2>Benefícios que você vai querer.</h2>
        <div className="beneficios-container">
          <BeneficioCard
            icone="/gratis.png"
            titulo="Estude de graça"
            descricao="Você não paga nada para fazer os cursos. É só se matricular e começar a estudar de qualquer lugar que tenha conexão com a Internet."
          />
          <BeneficioCard
            icone="/curriculo.png"
            titulo="Turbine seu currículo"
            descricao="São mais de 90 cursos para você estudar, enriquecer seu currículo e aumentar suas chances de ingresso no mercado de trabalho."
          />
          <BeneficioCard
            icone="/certificado.png"
            titulo="Conquiste o certificado"
            descricao="Ao ser aprovado nos cursos, você mesmo imprime o seu certificado."
          />
        </div>
      </section>

      {/* ====================== CURSOS MAIS ACESSADOS ====================== */}
      <section className="cursos-section">
        <h2>Cursos mais acessados</h2>

        {loading && <p>Carregando cursos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="cursos-grid">
            {cursosDestaques.map((curso) => (
              <CursoCard
                key={curso.id}
                imagem={curso.imagem}
                categoria={curso.categoria}
                titulo={curso.titulo}
                duracao={`${curso.duracaoHoras}h`}
                link={curso.link || `/curso/${curso.id}`}
              />
            ))}

            {/* Se não tiver nenhum curso cadastrado ainda */}
            {cursosDestaques.length === 0 && (
              <p>Nenhum curso disponível no momento.</p>
            )}
          </div>
        )}
      </section>

      <FAQSection />
      <Footer />
    </>
  );
}