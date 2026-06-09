"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../css/navbar.css";
import { useProfessor } from '../hooks/useProfessor';
import Cookies from "js-cookie";

export default function NavbarProfessor() {
    const { logout } = useProfessor();
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const nomeCookie = Cookies.get("name") || Cookies.get("email"); // tenta os dois

        if (nomeCookie) {
            setName(nomeCookie);
        } else {
            router.push("/loginProfessor"); // volta pro login se não tiver cookie
        }
    }, [router]);

    // Calcula a inicial só depois de ter o nome
    const inicial = name 
        ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) 
        : "P";

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link href="/dashboard/professor">
                    <img src="/logo.png" alt="Estuda+" />
                </Link>
            </div>

            <div className="navbar-links">
                <Link href="/dashboard/professor/cursos" className="nav-link">
                    MEUS CURSOS
                </Link>
            </div>

            {/* Área do Usuário */}
            <div className="navbar-user-area">
                {/* Bolinha do Professor */}
                <div className="user-avatar">
                    <span>{inicial}</span>
                </div>

                {/* Nome do Professor */}
                <div className="user-name">
                    {name || "Professor"}
                </div>

                {/* Botão Sair */}
                <button onClick={logout} className="btn-sair">
                    SAIR
                </button>
            </div>
        </nav>
    );
}