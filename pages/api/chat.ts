// pages/api/chat.js
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const dataFilePath = path.join(process.cwd(), 'data', 'data.json');

async function getWellData() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, it means no data has been uploaded yet.
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { query, well } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Query is required.' });
  }

  try {
    const wellData = await getWellData();
    let context = `You are "Drill AI", an expert assistant for oil drilling analysis.`;

    if (well) {
        context += ` The user is currently analyzing "${well.name}" which has a depth of ${well.depth} ft.`
    }

    if (wellData) {
      // Provide a summary of the data instead of the whole file to save tokens
      const dataSummary = `The available data contains ${wellData.length} depth records. The columns are: ${Object.keys(wellData[0]).join(', ')}. The depth ranges from ${wellData[0]['DEPTH']} to ${wellData[wellData.length - 1]['DEPTH']}.`;
      context += `\n\nHere is a summary of the uploaded well data:\n${dataSummary}\n\nAnswer the user's question based on this context. If the question is about specific values at a certain depth, you can refer to the data. For example, you can say "At depth X, the GR value is Y".`;
    } else {
      context += `\n\nNo well data has been uploaded yet. Answer the user's question based on general knowledge or ask them to upload a file.`;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: query },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ message: 'Error communicating with AI.', error: error.message });
  }
}
