# EstudaMais - Frontend

Plataforma moderna de **gestão de ensino e aprendizagem** (LMS) para instituições de ensino.

## Sobre o Projeto

**EstudaMais** é uma aplicação completa para gerenciamento educacional, desenvolvida para facilitar o ensino híbrido e EAD. Este repositório contém o **frontend** da aplicação.

### Principais Funcionalidades

- Autenticação separada para **Alunos** e **Professores**
- Dashboard personalizado por tipo de usuário
- Sistema de cadastro de usuários
- Recuperação de senha
- Interface moderna, intuitiva e totalmente responsiva
- Consumo de API integrada com o backend

## Tecnologias Utilizadas

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Axios** (para requisições HTTP)
- **SweetAlert2** (alertas e notificações)
- **js-cookie** (gerenciamento de autenticação)

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Backend rodando localmente (`estudamais-backend`)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/LuigiRechine/estudamais.git
cd estudamais

# 2. Instale as dependências
npm install

# 3. Execute o projeto
npm run dev
