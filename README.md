# 🎁 Amigo Oculto

Sorteio de Amigo Oculto para a família: o organizador cria o sorteio e envia **um link privado a cada pessoa**. Cada um abre o seu link e descobre quem lhe calhou. Sem contas, sem backend, sem base de dados.

## Funcionalidades

- Sorteio válido: ninguém tira a si próprio, e todos dão e recebem exatamente uma vez
- Um link privado por pessoa, com botões para copiar e enviar por WhatsApp
- O mesmo sorteio em qualquer dispositivo, sem servidor
- Cartão de revelação com confetes (respeita `prefers-reduced-motion`)
- Lista de participantes guardada no browser do organizador
- Lógica de sorteio coberta por testes unitários

## Como funciona

1. O organizador abre a app, escolhe o nome do evento e adiciona os participantes (mínimo 3).
2. Clica em **Sortear e gerar links**, e é gerado um sorteio válido.
3. Copia o link de cada pessoa (ou envia por WhatsApp) e manda-o **só a essa pessoa**.
4. Cada pessoa abre o link, toca no cartão e vê o seu Amigo Oculto. Pode voltar a abrir o link sempre que quiser.

O resultado vai codificado no próprio link, no fragmento `#`, que nunca é enviado a nenhum servidor. Por isso o sorteio é o mesmo em qualquer telemóvel, sem precisar de backend.

> **Importante:** cada link é construído com o endereço de onde o sorteio foi feito. Faz sempre o sorteio na versão **publicada** da app, nunca em `localhost`: um link `localhost` só funciona no computador do organizador.

### Limitações (assumidas)

- O resultado está em Base64, **não encriptado**: quem tiver o link de alguém vê o resultado dessa pessoa. Para um sorteio de família é o comportamento pretendido, mas não serve para cenários onde os participantes sejam adversários.
- O organizador gera todos os links, mas cada link só mostra o resultado quando é aberto. Pode por isso participar sem ver os pares dos outros, desde que não os abra.
- Depois do sorteio a lista fica bloqueada, porque mudar participantes invalidaria links já enviados. Para alterar é preciso reiniciar.
- Os dados do organizador ficam no `localStorage` do browser e do endereço onde a app foi aberta.

## Stack

React 18 · Vite · Tailwind CSS · Vitest · ESLint · Prettier · GitHub Actions + Pages

## Arquitetura

```
src/
├── components/        UI reutilizável e sem lógica de negócio
│   ├── Card.jsx, Layout.jsx, Confetti.jsx
│   ├── RevealCard.jsx      cartão de revelação
│   ├── ParticipantList.jsx lista + formulário de participantes
│   └── LinkList.jsx        links por pessoa (copiar / WhatsApp)
├── hooks/             estado e efeitos
│   ├── useLocalStorage.js
│   ├── useHashRoute.js
│   └── useOrganizer.js     ações do organizador
├── lib/               lógica pura (sem React) e testada
│   ├── draw.js             Fisher-Yates + derangement
│   ├── share.js            codificar/descodificar o link
│   ├── route.js, participants.js
├── pages/             composição de ecrãs
│   ├── OrganizerPage.jsx
│   └── RevealPage.jsx
├── App.jsx            routing por hash (#/r/<token>)
└── main.jsx
```

Decisões principais:

- **Lógica pura separada da UI** (`lib/`): testável com Vitest sem tocar em React.
- **Routing por hash**: funciona em GitHub Pages sem configuração de servidor.
- **Sorteio uniforme**: Fisher-Yates com repetição até obter um derangement válido; o gerador aleatório é injetável para testes determinísticos.

## Desenvolvimento

Requer Node.js 18 ou superior.

```bash
npm install
npm run dev        # servidor local
npm test           # testes unitários
npm run lint       # ESLint
npm run build      # build de produção em dist/
```

## Publicar no GitHub Pages

1. Cria um repositório no GitHub e faz push para a branch `main`.
2. Em **Settings → Pages**, escolhe **Source: GitHub Actions**.
3. O workflow em `.github/workflows/deploy.yml` corre lint, testes e build, e publica automaticamente.
4. Se o primeiro deploy falhar por o Pages ainda não estar ativo, volta a correr o workflow no separador **Actions**.

## Ideias para evoluir

- Restrições (ex.: casais não se tiram um ao outro).
- Encriptação real com palavra-passe por pessoa.
- Backend opcional (Supabase/Firebase) para o organizador gerir vários sorteios.
- Testes de componentes com Testing Library.

## Licença

MIT