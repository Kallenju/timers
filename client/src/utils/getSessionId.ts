import fs from 'fs';

export default function getSessionId(): string {
  const fileExists = fs.existsSync(sessionFilePath);

  return fileExists ? fs.readFileSync(sessionFilePath, 'utf8') : '';
}
