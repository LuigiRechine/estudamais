import Navbar from "./components/NavbarHome";
import CursoCard from "./components/CursoCardHome";
import BeneficioCard from "./components/BeneficioCard";

import "./css/home.css"

export default function Home() {
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
            A Estuda+ ajuda você a desenvolver
            habilidades em alta com rapidez e avançar
            na sua carreira em um mercado de trabalho
            dinâmico
          </p>
        </div>

        <div className="cards">
          <CursoCard
            titulo="Especialista em IA"
            imagem="/ia.png"
            link="/curso/ia"
          />

          <CursoCard
            titulo="Ciência de Dados"
            imagem="/ciencia-dados.png"
            link="/curso/ciencia-dados"
          />

          <CursoCard
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
    </>
  );
}