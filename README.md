Author: ziad emad allam

# Oil Drilling Dashboard & AI Chatbot

This repository contains the source code and documentation for the Senior Frontend Engineer 24-hour Coding Homework. The project is an AI SaaS platform for a well drilling company, featuring data visualization and a chatbot assistant.

## 1. Design Document

### 1.1. Problem Statement

The goal is to build a web-based dashboard for an oil drilling company. The platform must allow users to view a list of wells, select a well, upload drilling data from an Excel file, and visualize this data through various charts. Additionally, the platform should include an AI-powered chatbot that can answer questions about the uploaded data. The entire application needs to be responsive, deployed, and well-documented.

### 1.2. Requirements

#### Functional Requirements:

1.  **Well List Panel:** A sidebar displaying a list of wells with names and depths. Selecting a well should update the main dashboard view.
2.  **File Upload:** An upload button to accept `.xlsx` files containing well drilling data.
3.  **Data Persistence:** The uploaded file data must be stored on the server.
4.  **Data Visualization:** Display the uploaded data in three specific charts against depth:
    *   Rock Composition (Stacked Bar Chart)
    *   DT (Sonic Transit Time - Line Chart)
    *   GR (Gamma Ray - Line Chart)
5.  **Chatbot UI:** A chat interface for users to interact with an AI assistant.
6.  **Chatbot Integration:** The chatbot must be connected to a backend API (e.g., OpenAI, AWS Bedrock) and be able to interpret and answer questions based on the context of the uploaded Excel data.
7.  **Responsive Design:** The UI must be fully functional and visually appealing on desktop, tablet, and mobile devices.

#### Non-Functional Requirements:

1.  **Deployment:** The frontend should be deployed to a public URL (e.g., AWS, Vercel, GitHub Pages).
2.  **CI/CD:** A write-up on configuring a CI/CD pipeline using GitHub Actions or AWS CodePipeline.
3.  **Code Repository:** All code must be in a private GitHub repository with specific collaborators invited.
4.  **Documentation:** A detailed `README.md` file is required.
5.  **Demo:** A 5-minute demo video showcasing the application.

### 1.3. Proposed Architecture

The application will be built as a monolithic application using **Next.js**. This choice simplifies development and deployment by allowing both the frontend and backend API to coexist in a single project.

*   **Frontend:**
    *   **Framework:** React (via Next.js).
    *   **Styling:** Tailwind CSS for a utility-first, responsive design.
    *   **State Management:** React Context API or Zustand for managing global state like the selected well and chat history.
    *   **Charting Library:** `react-plotly.js` for creating the specialized scientific charts.
    *   **HTTP Client:** `fetch` API for communication with the backend.

*   **Backend (Next.js API Routes):**
    *   **Runtime:** Node.js.
    *   **API Endpoints:**
        *   `/api/upload`: Handles `multipart/form-data` for Excel file uploads. It uses the `xlsx` library to parse the file and stores the data as a JSON file on the server's file system for persistence.
        *   `/api/welldata`: Retrieves the parsed well data for visualization on the frontend.
        *   `/api/chat`: Receives user queries, reads the relevant well data from the stored JSON file, injects it as context into a prompt, and communicates with a third-party LLM (e.g., OpenAI API) to get an intelligent response.

*   **Database:**
    *   For this exercise, a simple file-based persistence mechanism will be used. The uploaded Excel file will be parsed and stored as a `data.json` file on the server. This approach is straightforward and meets the "persistence" requirement without the overhead of setting up a full-fledged database. For a production environment, this would be replaced by a scalable database like **AWS DynamoDB** or **MongoDB Atlas**.

### 1.4. Architecture Diagram

```mermaid
graph TD
    subgraph Browser
        A[React Frontend]
    end

    subgraph Server (Next.js)
        B[API Route: /api/upload]
        C[API Route: /api/welldata]
        D[API Route: /api/chat]
    end

    subgraph Storage
        E[File System: data.json]
    end

    subgraph External Services
        F[OpenAI API]
    end

    A -- HTTP Request (Upload Excel) --> B
    B -- Parse & Save --> E
    A -- HTTP Request (Get Data) --> C
    C -- Read Data --> E
    C -- JSON Response --> A
    A -- HTTP Request (Send Message) --> D
    D -- Read Context --> E
    D -- API Call with Context --> F
    F -- AI Response --> D
    D -- JSON Response --> A
```

### 1.5. Deployment, Maintenance, and Monitoring

*   **Deployment:**
    *   **Frontend:** The Next.js application can be seamlessly deployed to **Vercel**. Vercel offers a git-integrated workflow that automatically builds and deploys the application on every push to the `main` branch. It also handles serverless functions for API routes out-of-the-box.
    *   **Backend:** The Next.js API routes are deployed as serverless functions alongside the frontend on Vercel.
    *   **Storage:** The file system storage for `data.json` will work on Vercel's serverless environment, but it's not shared across all instances. For a more robust solution, **AWS S3** would be used to store the uploaded files and parsed data.

*   **CI/CD Pipeline (GitHub Actions):**
    A CI/CD pipeline ensures that every change is automatically tested and deployed, improving reliability and development speed.

    **Workflow Steps:**
    1.  **Trigger:** On push or merge to the `main` branch.
    2.  **Checkout:** The workflow checks out the repository's code.
    3.  **Setup Node.js:** Sets up the correct Node.js environment.
    4.  **Install Dependencies:** Runs `npm install` to get all project dependencies.
    5.  **Lint & Test:** Runs linting checks (`npm run lint`) and automated tests (`npm run test`) to ensure code quality.
    6.  **Build:** Runs `npm run build` to create a production-ready build of the Next.js application.
    7.  **Deploy:** If all previous steps pass, the code is deployed. If using Vercel, this step is handled automatically by the Vercel for GitHub integration. For AWS, this step would involve using the AWS CLI to sync the build output to an S3 bucket and invalidate the CloudFront cache.

    **Sample GitHub Actions Workflow (`.github/workflows/ci-cd.yml`):**
    ```yaml
    name: CI/CD Pipeline

    on:
      push:
        branches: [ main ]
      pull_request:
        branches: [ main ]

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout Repository
            uses: actions/checkout@v3

          - name: Setup Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '18'

          - name: Install Dependencies
            run: npm install

          - name: Run Linter
            run: npm run lint

          # - name: Run Tests
          #   run: npm run test # Add tests in the future

          - name: Build Project
            run: npm run build
    
    # Deployment is handled by Vercel's GitHub integration.
    # For a manual deploy to AWS S3, you would add a step here.
    # - name: Deploy to AWS S3
    #   uses: jakejarvis/s3-sync-action@master
    #   with:
    #     args: --acl public-read --follow-symlinks --delete
    #   env:
    #     AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
    #     AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    #     AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    #     AWS_REGION: 'us-west-2'
    #     SOURCE_DIR: 'out'
    ```

*   **Maintenance:**
    *   **Dependency Management:** Regularly update dependencies to patch security vulnerabilities using tools like `npm audit` or GitHub's Dependabot.
    *   **Data Backup:** For a production database, regular backups would be scheduled (e.g., using AWS Backup for DynamoDB).

*   **Monitoring:**
    *   **Application Performance:** Vercel Analytics provides out-of-the-box performance monitoring. For a more in-depth analysis, tools like **Sentry** for error tracking or **Logtail** for log management can be integrated.
    *   **Uptime:** Uptime monitoring services like **UptimeRobot** can be configured to ping the deployed application URL and alert the team in case of an outage.

## 2. Setup and Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ziademad02153/Oil-Drilling-Dashboard.git
    cd Oil-Drilling-Dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_secret_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
