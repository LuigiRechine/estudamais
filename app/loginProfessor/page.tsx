import "../css/login.css";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  return (
    <main className="login-page">
      <div className="container1">
        <div className="container2">
          <div className="card">
            <div className="left">
              <div className="logo">
                <img src="/logo.png" alt="Logo Estuda+" />
              </div>

              <div className="text">
                <h1>
                  Já trabalha com
                  <br />a gente?
                </h1>
                <p>Faça seu login e boa aula!</p>
              </div>

              <form className="form">
                <Input label="E-mail" type="email" placeholder="Seu E-mail" />

                <Input label="Senha" type="password" placeholder="********" />

                <Button text="ENTRAR" variant="type1" link="/" />

                <a href="/esqueciSenha/professor" className="forgot-password">
                  Esqueci minha senha
                </a>
              </form>
            </div>

            <div className="right">
              <div className="content-right">
                <Button text="SOU ALUNO" variant="type1" link="/loginAluno"/>

                <div className="register-box">
                  <h2>
                    AINDA NÃO TRABALHA
                    <br />
                    COM A GENTE?
                  </h2>

                  <Button text="FAZER MATRÍCULA" variant="type2" link="/cadastro/professor"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
