import "../css/cursoCardHome.css";

type CursoCardProps = {
  titulo: string;
  imagem: string;
  link: string;
};

export default function CursoCard({
  titulo,
  imagem,
  link,
}: CursoCardProps) {
  return (
    <a href={link} className="curso-card">
      <img src={imagem} alt={titulo} />

      <div className="curso-info">
        <span>{titulo}</span>
        <span className="seta">→</span>
      </div>
    </a>
  );
}