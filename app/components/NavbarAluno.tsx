'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../css/navbar.css"; // mesmo css do professor
import { useAluno } from '../hooks/useAluno';
import Cookies from "js-cookie";

export default function NavbarAluno() {
    const { logout } = useAluno();
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const nomeCookie = Cookies.get("email") || Cookies.get("name"); // mesmo padrão do professor

        if (nomeCookie) {
            setName(nomeCookie);
        } else {
            router.push("/loginAluno");
        }
    }, [router]);

    const inicial = name 
        ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) 
        : "A";

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link href="/dashboard/aluno">
                    <img src="/logo.png" alt="Estuda+" />
                </Link>
            </div>

            <div className="navbar-links">
                <Link href="/dashboard/aluno" className="nav-link">
                    MEUS CURSOS
                </Link>
                <Link href="/dashboard/aluno/matricula" className="nav-link">
                    TODOS OS CURSOS
                </Link>
            </div>

            {/* Área do Usuário - igual ao professor */}
            <div className="navbar-user-area">
                <div className="user-avatar">
                    <span>{inicial}</span>
                </div>

                <div className="user-name">
                    {name || "Aluno"}
                </div>

                <button onClick={logout} className="btn-sair">
                    SAIR
                </button>
            </div>
        </nav>
    );
}