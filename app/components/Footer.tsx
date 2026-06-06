import "../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
        <p className="footer-ajuda">Precisa de ajuda?</p>

        <a href="#faq" className="footer-item">
          <span className="icone">?</span>
          <span>Perguntas frequentes</span>
        </a>

        <a href="/validar-certificado" className="footer-item">
          <span className="icone"><img src="/diploma.png" alt="" /></span>
          <span>Validação de Certificado</span>
        </a>

        <a href="/chatbot" className="footer-item">
          <span className="icone"><img src="/curriculo.png" alt="" /></span>
          <span>Cursos disponíveis</span>
        </a>
      </div>

      <div className="footer-right">

        <div className="footer-links">
          <a href="/privacidade">Direitos de Privacidade</a>

          <a href="/termos">
            Termos e Condições de Uso da Estuda+
          </a>

          <a href="/sobre">Sobre</a>
        </div>

        <div className="footer-logo">
            <a href="#nav"><img src="/logoBranca.png" alt="Estuda+" /></a>
        </div>

      </div>

    </footer>
  );
}