# Tech Challenge 4 - Mobile Blog App

Aplicativo mobile desenvolvido como continuidade do Tech Challenge 3, com foco em gerenciamento de posts educacionais. Desenvolvido com **React Native**, **Expo**, **TypeScript** e arquitetura baseada em *feature modules*.

---

## Integrantes

- Alexandre Baaklini Gomes Coelho – abaaklini@gmail.com  
- Eveline Carla Arruda Falcão – falcao.eveline@gmail.com  
- Felipe Galobart Jora – felipe@mitsuwa.com.br  
- Victor Hugo Salomão Padrão – victor_hugo287@hotmail.com  
- Jeferson Lemos dos Santos – jefersonlemosdossantos@gmail.com

---

## Tecnologias Utilizadas

- React Native + Expo
- Expo Router (navegação file-based)
- React Navigation
- expo-secure-store, expo-constants
- Font Awesome + Expo Vector Icons

---

## Pré-requisitos

- Node.js 20+
- Docker + Docker Compose
- Internet ativa
- Variáveis de ambiente configuradas

### Execução local

```bash
git clone https://github.com/evefalcao/techchallenge4
cd techchallenge4
```

1. Configure as variáveis de ambiente:

```bash
export MONGO_INITDB_ROOT_USERNAME=<usuario>
export MONGO_INITDB_ROOT_PASSWORD=<senha>
export MONGO_HOST=mongodb
export MONGO_PORT=27017
export MONGO_USER=<usuario>
export MONGO_PASS=<senha>
export API_URL="http://localhost:3000"
```

2. Suba o backend com Docker:

```bash
docker-compose up -d
```

3. Inicie o app:

```bash
npm install
npx expo start
```

Backend: `http://localhost:3000`  
API Docs: `http://localhost:3000/api-docs`  
App: `http://localhost:8081`  

---

### Execução no celular

1. Instale o app Expo Go  
2. Descubra o IP da sua máquina (ex: `192.168.0.101`) e configure a variável:

```bash
export API_URL="http://192.168.0.101:3000"
```

3. Inicie o app com tunnel:

```bash
npx expo start --tunnel
```

4. Escaneie o QR code com o Expo Go e use as credenciais padrão:

```txt
Usuário: admin@admin.com  
Senha: senha123
```

---

## Arquitetura do Projeto

Organizado por módulos de funcionalidade e navegação baseada em arquivos com Expo Router.

### Estrutura de Pastas (UI)

```
app/
├── _layout.tsx
├── index.tsx
├── (auth)/login.tsx
├── (modals)/
│   ├── create.tsx
│   ├── createUser.tsx
│   ├── post/[id].tsx
│   └── users/[id].tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── admin.tsx
    └── userInfo.tsx
```

### Lógica de Negócio (`core/`)
- `auth/`, `posts/`, `users/` com chamadas REST via `fetch`

### Componentes (`components/`)
- `Header.tsx`, `AdminCrud.tsx`, `RoundedButton.tsx` etc.

---

## Funcionalidades

### Autenticação
- JWT + roles (professor/aluno)
- Proteção de rotas via Context API

### Posts
- Visualização, busca, criação (professor) e exclusão

### Usuários
- CRUD completo (apenas professores)

### Interface
- Navegação por abas
- Layout responsivo
- Componentes reutilizáveis com feedback visual

---

## Integração com a API

- Todas as requisições centralizadas em `core/auth/api.ts`
- Tokens gerenciados via `session-storage.ts`
- Headers de autenticação automáticos

---

## Experiência do Usuário

- Modo retrato otimizado
- Compatível com iOS, Android e Web
- Interface adaptativa e responsiva
- Splash screen, ícones adaptativos e layout edge-to-edge

---

## CI/CD

Não há pipeline automatizada, mas utilizamos feature branches com merge manual via Pull Requests em um fluxo simplificado estilo trunk-based.

---

## Desafios Enfrentados

- Adaptação do CSS para mobile
- Layouts responsivos em múltiplas plataformas

---

## Melhorias Futuras

- Troca de senha pelo usuário
- Autenticação por e-mail
- Notificações push (posts, tarefas, eventos)
- Upload de imagens, vídeos, PDFs
- Comentários, curtidas e favoritos
- Cache offline, sincronização automática, compressão de imagens
- Suporte a leitores de tela e acessibilidade aprimorada
- Integração com Google Classroom, Moodle e outras plataformas educacionais

---

## Links Úteis
- [Repositório Fase 3 (Front End Web)](https://github.com/evefalcao/techchallenge3)
- [Repositório Fase 2 (API)](https://github.com/evefalcao/techchallenge2)
- [Protótipo Figma (Fase 3)](https://figma.com/...)
- [Notion do Grupo](https://notion.so/...)