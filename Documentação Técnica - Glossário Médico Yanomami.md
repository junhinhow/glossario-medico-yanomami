# Documentação Técnica - Glossário Médico Yanomami

## Arquitetura do Sistema

### Tecnologias Utilizadas
- **Frontend:** React 18 com JavaScript
- **Estilização:** Tailwind CSS
- **Componentes:** shadcn/ui
- **Ícones:** Lucide React
- **Build Tool:** Vite
- **Gerenciador de Pacotes:** pnpm

### Estrutura do Projeto
```
glossario-yanomami/
├── public/
│   ├── audio/                 # Arquivos de áudio (.wav)
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ui/               # Componentes shadcn/ui
│   ├── data/
│   │   └── glossario.js      # Dados do glossário
│   ├── App.jsx               # Componente principal
│   ├── App.css               # Estilos globais
│   ├── index.css             # Estilos base
│   └── main.jsx              # Ponto de entrada
├── dist/                     # Build de produção
├── package.json
└── vite.config.js
```

## Componentes Principais

### App.jsx
Componente principal que gerencia:
- Estado da aplicação (busca, filtros, favoritos)
- Lógica de filtragem de termos
- Reprodução de áudio
- Interface do usuário

### Dados (glossario.js)
Estrutura dos dados:
```javascript
{
  id: "string",           // Identificador único
  portugues: "string",    // Termo em português
  yanomami: "string",     // Tradução em yanomami
  categoria: "string",    // Categoria do termo
  audioUrl: "string",     // Caminho para o arquivo de áudio
  descricao: "string",    // Descrição do termo
  contexto: "string"      // Contexto de uso
}
```

## Funcionalidades Implementadas

### 1. Sistema de Busca
- Busca em tempo real nos campos `portugues` e `yanomami`
- Filtro case-insensitive
- Combinação com filtros de categoria e favoritos

### 2. Reprodução de Áudio
```javascript
const playAudio = (audioUrl) => {
  try {
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Erro ao reproduzir áudio:', error);
    });
  } catch (error) {
    console.error('Erro ao criar objeto de áudio:', error);
  }
};
```

### 3. Sistema de Favoritos
- Armazenamento em estado local (Set)
- Persistência durante a sessão
- Interface visual com estrelas

### 4. Filtros por Categoria
- Filtro dinâmico baseado na propriedade `categoria`
- Interface com botões coloridos
- Combinação com busca textual

## Responsividade

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Adaptações Mobile
- Menu hambúrguer para navegação
- Botões otimizados para toque
- Layout em coluna única
- Tipografia ajustada

## Performance

### Otimizações Implementadas
- Componentes funcionais com hooks
- Filtragem eficiente com JavaScript nativo
- Lazy loading implícito do Vite
- Compressão de assets no build

### Métricas de Build
- **CSS:** 85.36 kB (13.76 kB gzipped)
- **JavaScript:** 231.23 kB (72.72 kB gzipped)
- **HTML:** 0.51 kB (0.35 kB gzipped)

## Arquivos de Áudio

### Formato e Qualidade
- **Formato:** WAV
- **Qualidade:** Enhanced v2
- **Tamanho médio:** ~1MB por arquivo
- **Total:** 10 arquivos de áudio

### Integração
- Arquivos servidos estaticamente da pasta `/public/audio/`
- Carregamento sob demanda via Web Audio API
- Tratamento de erros para arquivos indisponíveis

## Deployment

### Build de Produção
```bash
npm run build
```

### Estrutura do Dist
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── audio/
    └── *.wav
```

### Requisitos do Servidor
- Servidor web estático (Apache, Nginx, etc.)
- Suporte a MIME types para arquivos WAV
- HTTPS recomendado para reprodução de áudio

## Manutenção e Extensibilidade

### Adicionar Novos Termos
1. Editar `src/data/glossario.js`
2. Adicionar arquivo de áudio em `public/audio/`
3. Rebuild da aplicação

### Adicionar Novas Categorias
1. Atualizar array `categorias` em `glossario.js`
2. Adicionar termos com a nova categoria
3. Testar filtros

### Modificar Interface
- Componentes em `src/components/ui/`
- Estilos em `src/App.css`
- Configuração Tailwind em `tailwind.config.js`

## Segurança

### Considerações
- Sanitização automática do React para XSS
- Validação de tipos de arquivo de áudio
- Tratamento de erros para URLs malformadas

### Recomendações
- Servir via HTTPS em produção
- Implementar CSP (Content Security Policy)
- Validar uploads de áudio (se implementado)

## Monitoramento

### Logs Implementados
- Erros de reprodução de áudio no console
- Falhas de carregamento de componentes

### Métricas Sugeridas
- Taxa de uso por categoria
- Termos mais buscados
- Erros de reprodução de áudio
- Tempo de carregamento da página

## Limitações Conhecidas

1. **Armazenamento de Favoritos:** Apenas durante a sessão
2. **Offline:** Não funciona sem conexão
3. **Áudio:** Dependente de conexão para carregar
4. **Escalabilidade:** Dados hardcoded no frontend

## Roadmap Futuro

### Melhorias Sugeridas
1. **Backend:** API para gerenciar termos dinamicamente
2. **Persistência:** Salvar favoritos no localStorage
3. **Offline:** Service Worker para cache
4. **Analytics:** Tracking de uso
5. **Admin:** Interface para adicionar/editar termos
6. **Multilíngue:** Suporte a outras línguas indígenas

## Contato Técnico

Para questões técnicas sobre implementação, arquitetura ou deployment, consulte a documentação do projeto PIT/Ebserh ou entre em contato com a equipe de desenvolvimento.

