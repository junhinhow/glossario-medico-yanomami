# Instruções de Instalação e Deployment - Glossário Médico Yanomami

## Pré-requisitos

### Software Necessário
- **Node.js:** Versão 18 ou superior
- **npm ou pnpm:** Gerenciador de pacotes
- **Git:** Para controle de versão (opcional)

### Verificar Instalações
```bash
node --version    # Deve retornar v18.x.x ou superior
npm --version     # Deve retornar versão do npm
pnpm --version    # Deve retornar versão do pnpm (se instalado)
```

## Instalação Local

### 1. Obter o Código
```bash
# Se usando Git
git clone [repositório]
cd glossario-yanomami

# Ou extrair o arquivo ZIP fornecido
unzip glossario-yanomami.zip
cd glossario-yanomami
```

### 2. Instalar Dependências
```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install
```

### 3. Verificar Arquivos de Áudio
Certifique-se de que os arquivos de áudio estão na pasta correta:
```
public/audio/
├── 001-enhanced-v2.wav
├── 002-enhanced-v2.wav
├── 003-enhanced-v2.wav
├── 004-enhanced-v2.wav
├── 005-enhanced-v2.wav
├── 006-enhanced-v2.wav
├── 007-enhanced-v2.wav
├── 008-enhanced-v2.wav
├── 009-enhanced-v2.wav
└── 010-enhanced-v2.wav
```

### 4. Executar em Desenvolvimento
```bash
# Usando pnpm
pnpm run dev

# Ou usando npm
npm run dev
```

O aplicativo estará disponível em: `http://localhost:5173`

## Build para Produção

### 1. Gerar Build
```bash
# Usando pnpm
pnpm run build

# Ou usando npm
npm run build
```

### 2. Verificar Build
```bash
# Testar build localmente
pnpm run preview
# ou
npm run preview
```

### 3. Arquivos Gerados
O build será criado na pasta `dist/` com a seguinte estrutura:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── audio/
    └── *.wav
```

## Deployment em Servidor Web

### Opção 1: Servidor Apache

#### 1. Configuração do Virtual Host
```apache
<VirtualHost *:80>
    ServerName glossario-yanomami.local
    DocumentRoot /var/www/glossario-yanomami
    
    <Directory /var/www/glossario-yanomami>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Configuração para arquivos de áudio
    <FilesMatch "\.(wav|mp3|ogg)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
</VirtualHost>
```

#### 2. Arquivo .htaccess
Criar `.htaccess` na pasta raiz:
```apache
# Rewrite para SPA
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Configuração de MIME types
AddType audio/wav .wav
AddType audio/mpeg .mp3
AddType audio/ogg .ogg

# Compressão
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### 3. Upload dos Arquivos
```bash
# Copiar arquivos do build para o servidor
scp -r dist/* usuario@servidor:/var/www/glossario-yanomami/
```

### Opção 2: Servidor Nginx

#### 1. Configuração do Site
```nginx
server {
    listen 80;
    server_name glossario-yanomami.local;
    root /var/www/glossario-yanomami;
    index index.html;

    # Configuração para SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para arquivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache para arquivos de áudio
    location ~* \.(wav|mp3|ogg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compressão
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

#### 2. Upload dos Arquivos
```bash
# Copiar arquivos do build para o servidor
scp -r dist/* usuario@servidor:/var/www/glossario-yanomami/
```

### Opção 3: Serviços de Hosting

#### Netlify
1. Fazer upload da pasta `dist/` via interface web
2. Ou conectar repositório Git
3. Configurar build command: `npm run build`
4. Configurar publish directory: `dist`

#### Vercel
1. Instalar Vercel CLI: `npm i -g vercel`
2. Na pasta do projeto: `vercel`
3. Seguir instruções do CLI

#### GitHub Pages
1. Instalar gh-pages: `npm install --save-dev gh-pages`
2. Adicionar script no package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```
3. Executar: `npm run deploy`

## Configuração de HTTPS

### Certificado SSL
```bash
# Usando Certbot (Let's Encrypt)
sudo certbot --apache -d glossario-yanomami.local
# ou
sudo certbot --nginx -d glossario-yanomami.local
```

### Redirecionamento HTTP para HTTPS
```apache
# Apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

```nginx
# Nginx
server {
    listen 80;
    server_name glossario-yanomami.local;
    return 301 https://$server_name$request_uri;
}
```

## Monitoramento e Logs

### Logs do Servidor Web
```bash
# Apache
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log

# Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Monitoramento de Performance
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## Backup e Manutenção

### Backup dos Arquivos
```bash
# Backup completo
tar -czf glossario-backup-$(date +%Y%m%d).tar.gz /var/www/glossario-yanomami/

# Backup apenas dos áudios
tar -czf audio-backup-$(date +%Y%m%d).tar.gz /var/www/glossario-yanomami/audio/
```

### Atualizações
1. Fazer backup dos arquivos atuais
2. Gerar novo build
3. Substituir arquivos no servidor
4. Testar funcionalidade
5. Verificar logs de erro

## Solução de Problemas

### Áudios não carregam
1. Verificar permissões dos arquivos: `chmod 644 audio/*.wav`
2. Verificar MIME types no servidor
3. Verificar logs de erro do servidor

### Página em branco
1. Verificar console do navegador
2. Verificar se index.html está acessível
3. Verificar configuração de rewrite/try_files

### Performance lenta
1. Verificar compressão gzip
2. Verificar cache headers
3. Otimizar arquivos de áudio (se necessário)

## Contato para Suporte

Para problemas de deployment ou configuração, consulte:
- Documentação técnica do projeto
- Logs do servidor web
- Console do navegador para erros JavaScript

## Checklist de Deployment

- [ ] Node.js e npm/pnpm instalados
- [ ] Dependências instaladas com sucesso
- [ ] Arquivos de áudio na pasta correta
- [ ] Build gerado sem erros
- [ ] Servidor web configurado
- [ ] MIME types para áudio configurados
- [ ] Rewrite rules para SPA configuradas
- [ ] HTTPS configurado (recomendado)
- [ ] Backup dos arquivos realizado
- [ ] Testes de funcionalidade realizados
- [ ] Monitoramento configurado

