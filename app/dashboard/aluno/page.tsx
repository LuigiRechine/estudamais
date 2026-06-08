'use client';

import { useRouter } from 'next/navigation';   // ← Adicione esta linha
import { useAluno } from '../../hooks/useAluno';

export default function Dashboard() {
  const router = useRouter();           // ← Crie o router aqui
  const { logout } = useAluno();

  return (
    <div>
      <h1>Bem-vindo ao Dashboard!</h1>
      <p>Você está logado 🎉</p>

      <button 
        onClick={logout} 
        style={{ padding: '10px 20px', marginTop: '20px', marginRight: '10px' }}
      >
        Sair (Logout)
      </button>

      <button 
        onClick={() => router.push('/loginAluno')}
        style={{ padding: '10px 20px', marginTop: '20px' }}
      >
        Voltar para Login
      </button>
    </div>
  );
}