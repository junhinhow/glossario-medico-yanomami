const fs = require('fs');
const path = require('path');

const baseTxtPath = path.join(__dirname, 'Organizados', 'BASE.txt');
const audiosPath = path.join(__dirname, 'Para Organizar', 'Audios', 'Nomeados');

// Função para sanitizar nomes de arquivos
function sanitizeFilename(name) {
  // Remove caracteres inválidos e limita o comprimento
  return name
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 100);
}

try {
  // 1. Ler e processar o arquivo BASE.txt
  const baseContent = fs.readFileSync(baseTxtPath, 'utf8');
  const lines = baseContent.split(/\r?\n/);
  const translationMap = new Map();

  const lineRegex = /^\*\s*\*\*(.+?)\*\*:\s*(.+)$/;

  lines.forEach(line => {
    const match = line.match(lineRegex);
    if (match) {
      let portugues = match[1].trim();
      const yanomami = match[2].trim().replace(/[?]$/, '').trim();

      // Remove quotes if they exist around the portuguese term
      if (portugues.startsWith('"') && portugues.endsWith('"')) {
        portugues = portugues.slice(1, -1);
      }
      
      if (yanomami && portugues) {
        // Store with a case-insensitive key
        translationMap.set(yanomami.toLowerCase(), portugues);
      }
    }
  });

  console.log(`Mapa de tradução criado com ${translationMap.size} entradas.`);

  // 2. Ler e renomear os arquivos de áudio
  const audioFiles = fs.readdirSync(audiosPath);
  let renamedCount = 0;

  audioFiles.forEach(file => {
    if (path.extname(file).toLowerCase() === '.wav') {
      const yanomamiFilename = path.basename(file, '.wav');
      const lowerYanomamiFilename = yanomamiFilename.toLowerCase();
      
      // Encontra a tradução correspondente no mapa (case-insensitive)
      if (translationMap.has(lowerYanomamiFilename)) {
        const portuguesTranslation = translationMap.get(lowerYanomamiFilename);
        const newFilename = sanitizeFilename(portuguesTranslation) + '.wav';
        const oldPath = path.join(audiosPath, file);
        const newPath = path.join(audiosPath, newFilename);

        // Renomeia o arquivo
        try {
          fs.renameSync(oldPath, newPath);
          console.log(`Renomeado: "${file}" -> "${newFilename}"`);
          renamedCount++;
        } catch (renameError) {
          console.error(`Erro ao renomear "${file}":`, renameError.message);
        }
      } else {
        console.warn(`Aviso: Tradução não encontrada para "${yanomamiFilename}"`);
      }
    }
  });

  console.log(`\nProcesso concluído. ${renamedCount} de ${audioFiles.length} arquivos foram renomeados.`);

} catch (error) {
  console.error('Ocorreu um erro durante a execução do script:', error.message);
}
