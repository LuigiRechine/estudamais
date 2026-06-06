"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../css/navbar.css";

export default function Navbar() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  const pesquisar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!busca.trim()) return;

    router.push(`/cursos?search=${encodeURIComponent(busca)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Estuda+" />
      </div>

      <div className="navbar-links">
        <a href="/loginProfessor">SOU PROFESSOR</a>
        <a href="/cadastro/aluno">INSCREVA-SE</a>
      </div>

      <form className="navbar-search" onSubmit={pesquisar}>
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Buscar curso"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </form>

      <a href="/loginAluno" className="navbar-btn">
        MEUS CURSOS
      </a>
    </nav>
  );
}