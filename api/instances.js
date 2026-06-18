import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    // Erlaubt dem Launcher den Zugriff (CORS-Header)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Falls es eine Vorabanfrage (OPTIONS) vom Launcher ist
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Liest die verschobene instances-Datei aus dem Hauptverzeichnis
        const filePath = path.join(process.cwd(), 'instances');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Sendet die Daten als echte JSON zurück, egal ob GET oder POST
        return res.status(200).json(JSON.parse(fileContent));
    } catch (error) {
        return res.status(500).json({ error: "Fehler beim Laden der Instanzen" });
    }
}
