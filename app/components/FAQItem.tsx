type FAQItemProps = {
  pergunta: string;
  resposta: string;
  aberto: boolean;
  onClick: () => void;
};

export default function FAQItem({
  pergunta,
  resposta,
  aberto,
  onClick,
}: FAQItemProps) {
  return (
    <div className="faq-item">
      <button className="faq-pergunta" onClick={onClick}>
        <span>{pergunta}</span>
        <span>{aberto ? "⌄" : "›"}</span>
      </button>

      {aberto && (
        <div className="faq-resposta">
          {resposta}
        </div>
      )}
    </div>
  );
}