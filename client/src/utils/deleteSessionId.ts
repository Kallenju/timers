import fs from 'fs';

export default function deleteSessionId(): void {
  if (fs.existsSync(sessionFilePath)) {
    fs.rmSync(sessionFilePath);
  }
}
