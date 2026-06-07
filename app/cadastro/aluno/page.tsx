import "../../css/cadastro.css";
import Input from "../../components/Input";
import Button from "../../components/Button"
import { useAluno } from '../../hooks/useAluno';

export default function Cadastro() {
  const { 
    email, setEmail, 
    password, setPassword, 
    name, setName,
    cpf, setCpf,
    cadastrar 
  } = useAluno();

  return (
    <main className="cadastro-page">
      <div className="container1">
        <div className="container2">
          <div className="card">
            <div className="logo">
              <img src="/logo.png" alt="Logo Estuda+" />
            </div>

            <form className="form" onSubmit={cadastrar}>
              <Input label="Nome" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)}/>

              <Input label="CPF" type="text" placeholder="Seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}/>

              <Input label="E-mail" type="email" placeholder="Seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>

              <Input label="Senha" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}/>

              <div className="btns">
                <Button text="CONTINUAR" variant="type1" link="/loginAluno" type="submit"/>
                <Button text="CANCELAR" variant="type3" link="/loginAluno" />
            </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
