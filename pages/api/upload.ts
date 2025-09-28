// pages/api/upload.js
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import * as XLSX from 'xlsx';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const dataDir = path.join(process.cwd(), 'data');
  const dataFilePath = path.join(dataDir, 'data.json');

  try {
    await fs.mkdir(dataDir, { recursive: true });

    const form = new IncomingForm();
    const [fields, files] = await form.parse(req);
    
    const file = files.file[0];

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const workbook = XLSX.readFile(file.filepath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Basic validation to ensure essential columns exist
    if (jsonData.length > 0) {
        const firstRow = jsonData[0];
        const requiredColumns = ['DEPTH', 'GR', 'DT', 'SH', 'SS'];
        const hasRequiredColumns = requiredColumns.every(col => col in firstRow);
        if (!hasRequiredColumns) {
            return res.status(400).json({ message: 'Invalid file format. Missing required columns.' });
        }
    } else {
        return res.status(400).json({ message: 'The uploaded file is empty.' });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({ message: 'File uploaded and processed successfully.', data: jsonData });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error processing file.', error: error.message });
  }
}
