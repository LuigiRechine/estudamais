import "../css/cursoCard.css";

type CursoCardProps = {
  imagem: string;
  categoria: string;
  titulo: string;
  duracao: string;
  link: string;
};

export default function CursoCard({
  imagem,
  categoria,
  titulo,
  duracao,
  link,
}: CursoCardProps) {
  return (
    <a href={link} className="curso-card">
      <img src={imagem} alt={titulo} />

      <div className="curso-card-content">
        <p className="curso-categoria">
          Curso online/<span>{categoria}</span>
        </p>

        <h3>{titulo}</h3>

        <div className="curso-footer">
          <span>◷ Duração {duracao}</span>
          <span className="gratuito">Gratuito</span>
        </div>
      </div>
    </a>
  );
}