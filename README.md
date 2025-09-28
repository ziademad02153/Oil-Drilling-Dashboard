Author: ziad emad allam

# Oil Drilling Dashboard

A web dashboard for visualizing oil-well drilling data and interacting with an AI assistant. The app supports uploading well data (Excel), viewing depth-based visualizations, and querying the data via a chatbot.

## Quick start (local)

1. Clone the repository:

    ```bash
    git clone https://github.com/ziademad02153/Oil-Drilling-Dashboard.git
    cd Oil-Drilling-Dashboard
    ```

2. Install dependencies and run the dev server (on a machine with network access to npm registries):

    ```bash
    npm install
    npm run dev
    ```

3. Create a `.env.local` file with your OpenAI key if you want chatbot integration:

    ```
    OPENAI_API_KEY=sk-...your key...
    ```

Open http://localhost:3000 in your browser.

## Notes

- `node_modules` is excluded from the repository. If you have unreliable network access, consider deploying to Vercel or using an online IDE (CodeSandbox / StackBlitz) which will install dependencies on their servers.
- The `pages/api` endpoints handle file upload and chatbot proxying. Uploaded data is stored in `data/data.json` during development.

---

If you'd like a different README format or additional sections (design doc, architecture, demo link), tell me which parts to include and I'll add them.
