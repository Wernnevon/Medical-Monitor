# Monitor Médico

Aplicação de gestão de pacientes, exames e prescrições. Funciona inteiramente
offline: não há backend, e todos os dados ficam no IndexedDB do navegador.

Está em migração de React + Electron para **Angular 22 + PWA**. O app React
original segue em [`legacy/`](legacy/) como referência executável até a
paridade ser atingida.

## Rodando

Requer Node 22.22.3+ (o `.nvmrc` fixa a versão usada no projeto).

```bash
nvm use
npm install
npm start          # http://localhost:4200
```

```bash
npm run build      # build de produção em dist/app/browser
npm test           # testes unitários
```

Para conferir a PWA (service worker só roda no build de produção):

```bash
npm run build
npx http-server dist/app/browser
```

O app React de referência:

```bash
cd legacy && npm install && npm start
```

## Arquitetura

Clean Architecture, com a regra de dependência apontando para dentro: `domain`
não conhece ninguém, e `app` (a camada de apresentação) conhece só os
contratos.

```
src/
├── domain/          # entidades e contratos — TypeScript puro, sem Angular
│   ├── entities/
│   ├── use-cases/   # contratos genéricos (Add, Delete, ListPagination...)
│   └── tokens/      # classes abstratas que servem de token de DI
├── data/            # implementações dos casos de uso
├── infra/           # IndexedDB, repositórios e client local
├── core/            # providers de DI e utilidades compartilhadas
└── app/             # Angular: componentes, páginas, serviços, rotas
```

Imports entre camadas usam aliases: `@domain`, `@data`, `@infra`, `@core`,
`@app`.

### Injeção de dependências

Os contratos em `domain/use-cases` são genéricos e reaproveitados pelas três
entidades, então não servem como token — um mesmo `Add` teria três
implementações concorrentes. `domain/tokens` resolve isso com uma classe
abstrata por entidade e operação.

São classes abstratas, e não `InjectionToken`, para que o domínio continue sem
importar `@angular/core`. O custo em bundle é um construtor vazio, e a
implementação concreta só é retida onde for provida.

[`core/providers.ts`](src/core/providers.ts) liga cada contrato à sua
implementação. É o único arquivo a mudar para trocar a persistência — plugar um
BaaS é um `useClass` diferente, sem tocar em caso de uso nem em tela.

### Reatividade

Os contratos do domínio devolvem `Promise`. A reatividade vive na camada de
apresentação: as fachadas (ex.
[`PatientsFacade`](src/app/services/patients-facade.ts)) envolvem os casos de
uso em `resource()` e expõem signals prontos, e as páginas só consomem.

### Por que PWA e não SSR

`@angular/ssr` é maduro, mas todo o estado vive em IndexedDB — uma API
exclusiva do browser — e não há backend. Renderizar no servidor entregaria uma
casca vazia até a hidratação, em troca de complexidade de build e atrito com o
service worker. O deploy é hospedagem estática pura.

## Estado da migração

Portado e verificado:

- Camadas `domain`, `data` e `infra` completas
- Lista de pacientes: busca, filtros, paginação e exclusão em cascata
- Componentes compartilhados, menu lateral, toasts e popup
- PWA instalável com service worker

Pendente (as rotas existem e mostram uma tela informativa):

- Cadastro de paciente multi-step — com Signal Forms
- Detalhes do paciente, exames, prescrições e atestados
- Backup em JSON, com lembrete periódico ao usuário
- Sincronização remota

### Nota sobre os dados

Os dados do app Electron vivem na origem `file://`; a PWA é outra origem e não
os enxerga. A migração vai depender do export/import JSON, ainda pendente.
Enquanto isso não existe, o IndexedDB do navegador é a única cópia — e pode ser
apagado ao limpar os dados do site.
