"use client";

import { useState } from "react";
import FAQItem from "./FAQItem";
import "../css/facSection.css"

const perguntas = [
    {
        pergunta: "Onde está localizado o certificado?",
        resposta:
            "Após fazer login na plataforma, clique no ícone de perfil no canto superior da tela. Uma barra lateral será aberta e nela você encontrará a opção 'Certificados', onde poderá visualizar e gerar seus certificados disponíveis."
    },
    {
        pergunta: "Como realizar a matrícula nos cursos?",
        resposta:
            "Caso ainda não possua uma conta, faça seu cadastro gratuitamente. Em seguida, escolha o curso que mais combina com seus objetivos e clique para iniciar seus estudos."
    },
    {
        pergunta: "Ao finalizar um curso, recebo um certificado?",
        resposta:
            "Sim! Após concluir o curso e alcançar aproveitamento igual ou superior a 70% na avaliação final, você poderá emitir seu Certificado de Conclusão. Em cursos que não possuem avaliação final, será disponibilizado um Certificado de Participação."
    },
    {
        pergunta: "Os cursos possuem prazo para conclusão?",
        resposta:
            "Não. Você pode estudar no seu próprio ritmo e acessar o conteúdo quando desejar durante o período de disponibilidade do curso."
    },
    {
        pergunta: "Os cursos são realmente gratuitos?",
        resposta:
            "Sim! Todos os cursos disponíveis na Estuda+ podem ser acessados gratuitamente, sem mensalidades ou taxas de matrícula."
    }
];

export default function FAQSection() {
    const [aberto, setAberto] = useState<number | null>(null);
    const [mostrarTudo, setMostrarTudo] = useState(false);

    const perguntasVisiveis = mostrarTudo
        ? perguntas
        : perguntas.slice(0, 3);

    return (
        <section className="faq-section" id="faq">

            <div className="faq-left">

                <h2>Perguntas Frequentes</h2>

                {perguntasVisiveis.map((item, index) => (
                    <FAQItem
                        key={index}
                        pergunta={item.pergunta}
                        resposta={item.resposta}
                        aberto={aberto === index}
                        onClick={() =>
                            setAberto(aberto === index ? null : index)
                        }
                    />
                ))}

                {!mostrarTudo && (
                    <button
                        className="mostrar-todas"
                        onClick={() => setMostrarTudo(true)}
                    >
                        Mostrar todas as perguntas →
                    </button>
                )}

            </div>

            <div className="faq-right">
                <h3>
                    Quer iniciar a sua
                    <br />
                    jornada de conhecimento?
                </h3>

                <strong>É grátis!</strong>

                <a href="/cadastro/aluno">
                    Começar agora
                </a>
            </div>

        </section>
    );
}