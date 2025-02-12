# Trybe Futebol Club ⚽

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  
  [![GitHub Issues](https://img.shields.io/github/issues/EmersonMarinho/project_trybe_futebol_club)](https://github.com/EmersonMarinho/project_trybe_futebol_club/issues)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
</div>

O **Trybe Futebol Club** é uma aplicação full-stack desenvolvida para gerenciar partidas e classificações de um campeonato de futebol. O projeto possui um backend robusto em **Node.js** com **TypeScript**, um frontend em **React** e um banco de dados **MySQL** para armazenamento de dados. A aplicação permite que usuários autenticados visualizem partidas, acompanhem a classificação dos times e gerenciem resultados.

---

## ✨ Funcionalidades Principais

### 🏆 Classificação
- **Tabela de Classificação**: Visualize a classificação dos times ordenados por pontos, vitórias, saldo de gols e outros critérios.
- **Filtros**: Classificação separada por partidas em casa, fora ou total.

### ⚽ Partidas
- **Criação de Partidas**: Crie novas partidas com times, data e local.
- **Atualização de Placar**: Atualize o placar das partidas em tempo real.
- **Finalização de Partidas**: Finalize partidas para que os resultados sejam contabilizados na classificação.

### 👤 Usuários
- **Autenticação**: Login e registro de usuários com validação de e-mail e senha.
- **Níveis de Acesso**: Diferentes níveis de acesso (admin e usuário comum).
  - **Admin**: Pode criar, editar e finalizar partidas.
  - **Usuário Comum**: Pode apenas visualizar partidas e a classificação.

### 📊 Estatísticas
- **Histórico de Partidas**: Visualize o histórico completo de partidas.
- **Desempenho dos Times**: Acompanhe o desempenho dos times (vitórias, derrotas, empates).

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16 ou superior)
- MySQL (v8.0 ou superior)
- Docker (opcional, para rodar o banco de dados)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/EmersonMarinho/project_trybe_futebol_club.git
cd project_trybe_futebol_club
