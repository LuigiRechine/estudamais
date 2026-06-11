# EstudaMais - Frontend

Plataforma moderna de **cursos online** gratuitos.

## Sobre o Projeto

**EstudaMais** é uma plataforma de cursos online onde **professores** podem cadastrar e gerenciar seus cursos, e **alunos** podem se inscrever gratuitamente. 

O objetivo é democratizar o acesso ao conhecimento, oferecendo uma experiência simples, moderna e eficiente tanto para quem ensina quanto para quem aprende.

Este repositório contém o **frontend** da aplicação.

### Principais Funcionalidades

- Autenticação separada para **Alunos** e **Professores**
- Professores podem cadastrar, editar e gerenciar cursos
- Alunos podem navegar, se inscrever e acompanhar cursos gratuitamente
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
