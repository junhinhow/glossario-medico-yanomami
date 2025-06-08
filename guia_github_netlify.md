# Guia de Deploy: GitHub e Netlify

Este guia detalha o processo de como subir seu projeto para o GitHub e, em seguida, como configurá-lo para deploy automático no Netlify.

## Parte 1: Subindo o Projeto para o GitHub

Para que o Netlify possa acessar seu código, ele precisa estar em um repositório Git. O GitHub é uma excelente opção para isso.

### 1. Crie um Novo Repositório no GitHub

1.  Acesse [github.com](https://github.com/) e faça login na sua conta.
2.  No canto superior direito, clique no sinal de `+` e selecione `New repository`.
3.  **Nome do Repositório:** Dê um nome significativo ao seu repositório (ex: `glossario-medico-yanomami`).
4.  **Visibilidade:** Escolha `Public` (Público) ou `Private` (Privado). Para o Netlify, ambos funcionam, mas `Public` é mais simples se você não tiver requisitos de privacidade.
5.  **Inicialização:** **Não** marque as opções `Add a README file`, `Add .gitignore` ou `Choose a license` neste momento. Faremos isso manualmente para garantir que tudo esteja configurado corretamente.
6.  Clique em `Create repository`.

Após a criação, o GitHub mostrará uma página com instruções para configurar seu repositório local. Mantenha esta página aberta, pois você precisará do URL do repositório.

### 2. Prepare seu Projeto Localmente para o Git

1.  **Abra o Terminal:** Navegue até a pasta raiz do seu projeto (`/home/ubuntu/` no ambiente Manus, ou a pasta onde você extraiu o `glossario-yanomami-completo.tar.gz` na sua máquina local).
    ```bash
    cd /home/ubuntu/glossario-yanomami
    ```
2.  **Inicialize o Git:**
    ```bash
    git init
    ```
3.  **Crie um arquivo `.gitignore`:** Este arquivo informa ao Git quais arquivos e pastas ele deve ignorar (não enviar para o repositório). Isso é crucial para não subir arquivos desnecessários ou sensíveis.
    ```bash
    echo "node_modules/" > .gitignore
    echo "dist/" >> .gitignore
    echo ".env" >> .gitignore
    echo "pnpm-lock.yaml" >> .gitignore
    echo "npm-debug.log" >> .gitignore
    echo "yarn-error.log" >> .gitignore
    echo "package-lock.json" >> .gitignore
    ```
4.  **Adicione os arquivos ao Git:**
    ```bash
    git add .
    ```
5.  **Faça o primeiro commit:**
    ```bash
    git commit -m "Initial commit: Glossario Medico Yanomami project"
    ```
6.  **Adicione o repositório remoto:** Conecte seu repositório local ao repositório que você criou no GitHub. Substitua `<URL_DO_SEU_REPOSITORIO_GITHUB>` pelo URL que o GitHub forneceu (ex: `https://github.com/seu-usuario/glossario-medico-yanomami.git`).
    ```bash
    git remote add origin <URL_DO_SEU_REPOSITORIO_GITHUB>
    ```
7.  **Renomeie a branch principal (opcional, mas recomendado):**
    ```bash
    git branch -M main
    ```
8.  **Envie os arquivos para o GitHub:**
    ```bash
    git push -u origin main
    ```
    *   Você será solicitado a inserir seu nome de usuário e senha do GitHub. Se você tiver a autenticação de dois fatores (2FA) ativada, precisará usar um **Personal Access Token (PAT) do GitHub** em vez da sua senha. Se precisar de ajuda para gerar um PAT do GitHub, pesquise por 


"How to create a Personal Access Token GitHub" ou me peça para gerar um para você (se o ambiente permitir).

Após este passo, seu projeto estará visível no seu repositório GitHub.

## Parte 2: Deploy no Netlify

Com seu código no GitHub, o Netlify pode ser configurado para fazer o deploy automaticamente a cada nova alteração.

### 1. Conecte o Netlify ao seu Repositório GitHub

1.  Acesse [app.netlify.com](https://app.netlify.com/) e faça login na sua conta Netlify.
2.  Na dashboard, clique em `Add new site` (Adicionar novo site) e selecione `Import an existing project` (Importar um projeto existente).
3.  Escolha `Deploy with GitHub` (Implantar com GitHub).
4.  O Netlify pedirá autorização para acessar seus repositórios GitHub. Conceda a permissão. Você pode escolher `Only select repositories` (Apenas repositórios selecionados) e selecionar o repositório do seu Glossário Médico Yanomami (`glossario-medico-yanomami`).
5.  Após a autorização, o Netlify listará seus repositórios. Selecione o repositório `glossario-medico-yanomami`.

### 2. Configure as Opções de Deploy

Na próxima tela, o Netlify tentará detectar automaticamente as configurações do seu projeto. Para um aplicativo React criado com Vite, as configurações padrão geralmente funcionam, mas vamos confirmá-las:

-   **Owner:** Seu nome de usuário do GitHub.
-   **Repository:** `glossario-medico-yanomami` (ou o nome que você deu ao seu repositório).
-   **Branch to deploy:** `main` (ou a branch que você usou para o `git push`).
-   **Base directory:** Deixe em branco, a menos que seu projeto React esteja em uma subpasta do repositório.
-   **Build command:** `npm run build` ou `pnpm run build` (dependendo do gerenciador de pacotes que você usou).
-   **Publish directory:** `dist` (esta é a pasta onde o Vite coloca os arquivos de build).

### 3. Inicie o Deploy

1.  Clique em `Deploy site` (Implantar site).
2.  O Netlify começará o processo de build e deploy. Você verá o status em tempo real na dashboard do Netlify.
3.  Uma vez que o deploy estiver completo, o Netlify fornecerá um URL público para o seu site (ex: `https://nome-aleatorio.netlify.app`). Você pode personalizar este domínio mais tarde nas configurações do site no Netlify.

## Atualizando o Aplicativo

Uma das grandes vantagens de usar o Netlify com o GitHub é o deploy contínuo. Sempre que você fizer alterações no seu código, fizer um `git add .`, `git commit -m "sua mensagem"` e `git push origin main` para o seu repositório GitHub, o Netlify detectará automaticamente a alteração, reconstruirá seu site e fará o deploy da nova versão.

## Considerações Finais

-   **Domínio Personalizado:** Você pode configurar um domínio personalizado (ex: `glossario.meudominio.com`) para o seu site no Netlify, se desejar.
-   **Variáveis de Ambiente:** Se o seu aplicativo precisar de variáveis de ambiente (chaves de API, etc.), você pode configurá-las nas `Site settings` > `Build & deploy` > `Environment` no Netlify.

Com este passo a passo, você terá seu Glossário Médico Yanomami rodando online de forma eficiente e com deploy automatizado! Me avise se tiver qualquer dúvida durante o processo. Boa sorte!

