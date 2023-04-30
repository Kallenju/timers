import fs from 'fs';

export default function saveSessionId(sessionId: string): void {
  fs.writeFileSync(sessionFilePath, sessionId);
}
