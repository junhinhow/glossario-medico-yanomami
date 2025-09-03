const fs = require('fs');
const path = require('path');

const sourceDirs = [
  path.join(__dirname, 'Para Organizar', 'Audios', 'Nomeados'),
  path.join(__dirname, 'Para Organizar', 'Audios', 'Processados', 'Yanomami')
];
const destDir = path.join(__dirname, 'glossario-yanomami', 'public', 'audio');

// Garante que o diretório de destino exista
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function copyFiles(sourceDir) {
  try {
    const items = fs.readdirSync(sourceDir, { withFileTypes: true });
    let copiedCount = 0;

    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item.name);
      const destPath = path.join(destDir, item.name);

      if (item.isDirectory()) {
        // Se for um diretório, chama a função recursivamente
        copiedCount += copyFiles(sourcePath);
      } else if (path.extname(item.name).toLowerCase() === '.wav') {
        // Se for um arquivo .wav, copia para o destino
        try {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copiado: "${sourcePath}" -> "${destPath}"`);
          copiedCount++;
        } catch (copyError) {
          console.error(`Erro ao copiar "${item.name}":`, copyError.message);
        }
      }
    });
    return copiedCount;
  } catch (error) {
    console.error(`Erro ao ler o diretório "${sourceDir}":`, error.message);
    return 0;
  }
}

let totalCopied = 0;
sourceDirs.forEach(dir => {
  console.log(`\nCopiando arquivos de "${dir}"...`);
  totalCopied += copyFiles(dir);
});

console.log(`\nProcesso concluído. ${totalCopied} arquivos de áudio foram copiados.`);
