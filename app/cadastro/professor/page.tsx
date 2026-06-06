import "../../css/cadastro.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Cadastro() {
  return (
    <main className="cadastro-page">
      <div className="container1">
        <div className="container2">
          <div className="card">
            <div className="logo">
              <img src="/logo.png" alt="Logo Estuda+" />
            </div>

            <form className="form">
              <Input label="Nome" type="text" placeholder="Seu nome" />

              <Input label="CPF" type="text" placeholder="Seu CPF" />

              <Input label="E-mail" type="email" placeholder="Seu E-mail" />

              <Input label="Senha" type="password" placeholder="********" />

            </form>

            <div className="btns">
                <Button text="CONTINUAR" variant="type1" link="/loginProfessor" />
                <Button text="CANCELAR" variant="type3" link="/loginProfessor" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
