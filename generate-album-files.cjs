const fs = require('fs');
const path = require('path');

const albumsFilePath = path.join(__dirname, 'src', 'data', 'albums.ts');
const outputDir = path.join(__dirname, 'src', 'data', 'albums');

let content = fs.readFileSync(albumsFilePath, 'utf8');

const arrayStart = content.indexOf('export const albums: Album[] = [');
const arrayEnd = content.lastIndexOf('];\n\nexport const getAlbumById');

let arrayContent = content.slice(arrayStart + 'export const albums: Album[] = ['.length, arrayEnd);

arrayContent = arrayContent.trim();

const albums = [];
let depth = 0;
let currentAlbum = '';
let inString = false;
let stringChar = '';

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];

  if (!inString && (char === '"' || char === "'")) {
    inString = true;
    stringChar = char;
    currentAlbum += char;
  } else if (inString && char === stringChar && arrayContent[i - 1] !== '\\') {
    inString = false;
    currentAlbum += char;
  } else if (!inString && char === '{') {
    depth++;
    currentAlbum += char;
  } else if (!inString && char === '}') {
    depth--;
    currentAlbum += char;
    if (depth === 0) {
      albums.push(currentAlbum.trim());
      currentAlbum = '';
    }
  } else if (depth > 0) {
    currentAlbum += char;
  }
}

console.log(`Found ${albums.length} albums`);

albums.forEach((albumData, index) => {
  const idMatch = albumData.match(/id:\s*['"]([^'"]+)['"]/);
  if (!idMatch) {
    console.log(`Skipping album ${index + 1}, no id found`);
    return;
  }

  const albumId = idMatch[1];
  const filePath = path.join(outputDir, `${albumId}.ts`);

  const fileContent = `import type { Album } from './types';

export const albumDetail: Album = ${albumData};
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Created: ${albumId}.ts`);
});

console.log(`\nTotal ${albums.length} album detail files created.`);
