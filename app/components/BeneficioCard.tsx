import "../css/beneficioCard.css";

type BeneficioCardProps = {
  icone: string;
  titulo: string;
  descricao: string;
};

export default function BeneficioCard({
  icone,
  titulo,
  descricao,
}: BeneficioCardProps) {
  return (
    <div className="beneficio-card">
      <img src={icone} alt={titulo} />

      <h3>{titulo}</h3>

      <p>{descricao}</p>
    </div>
  );
}