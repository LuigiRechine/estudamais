"use client";
import { useState } from "react";
import "@/app/css/esqueciSenha.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function EsqueciSenha() {

  const [mostrarPopup, setMostrarPopup] = useState(false);


  return (
    <main className="esqueciSenha-page">
      {mostrarPopup && (
        <div className="popup">
          <a
            className="fechar"
            onClick={() => setMostrarPopup(false)}
            href="/loginProfessor"
          >
            ×
          </a>

          <p>Verifique sua caixa de entrada!</p>
        </div>
      )}
      <div className="container1">
        <div className="container2">
          <div className="card">
            <div className="logo">
              <img src="/logo.png" alt="Logo Estuda+" />
            </div>

            <form className="form">
              <p>Digite seu número de CPF ou e-mail<br />para a recuperação de sua conta</p>
              <Input label="" type="text" placeholder="CPF (somente numeros) ou E-mail" />

            </form>

            <div className="btns">
              <Button
                text="CONTINUAR"
                variant="type1"
                onClick={() => setMostrarPopup(true)}
              />
              <Button text="CANCELAR" variant="type3" link="/loginProfessor" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}