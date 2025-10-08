🛡️ Secure Network Topology Design – Segmented Virtual Network
📖 Project Overview

This project is a web-based tool designed to help visualize and manage a secure, segmented virtual network topology.
Users can create and manage network segments (LAN, DMZ, Management), define firewall rules between them, visualize the topology, and export configurations in JSON or YAML format.

This application demonstrates how segmentation improves network security by isolating systems and controlling communication between zones.

🚀 Features

🧩 Create & Manage Network Segments (Name, CIDR, Role)

🔒 Define Firewall Rules (Source, Destination, Protocol, Port, Action)

🌐 Interactive Topology Visualization using React & SVG

📦 Export Network Configuration as JSON/YAML

💡 Lightweight & No Login Required

🐳 Docker-Ready for easy deployment

DEMO link :- https://secure-network-topology-design-tool.vercel.app/

🧰 Tech Stack
Layer	Technology
Frontend	React, Tailwind CSS, Framer Motion
Backend	Node.js, Express.js
Database	SQLite / PostgreSQL
Visualization	D3.js / SVG Topology Canvas
Deployment	Docker, GitHub
📂 Project Structure
Secure-Network-Topology-Design/
│
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/     # UI components (segments, topology, forms)
│   │   └── App.jsx         # Main dashboard
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── routes/             # API routes (segments, rules, export)
│   ├── models/             # DB schema
│   └── server.js           # Express app entry
│
├── docker-compose.yml      # For running frontend + backend containers
├── README.md
└── network-config.json     # Example exported configuration

⚙️ Installation & Setup
🪟 Prerequisites

Node.js
 (v18 or later)

npm (comes with Node.js)

(Optional) Docker Desktop

🧩 Clone the repository
git clone https://github.com/cherukushravani3-commits/Secure-Network-Topology-Design-tool.git
cd Secure-Network-Topology-Design-tool

🖥️ Frontend Setup
cd frontend
npm install
npm run dev


Then open the app in your browser at
👉 http://localhost:5173

⚙️ Backend Setup
cd backend
npm install
node server.js


The backend will start at
👉 http://localhost:5000

🐳 Run with Docker (optional)
docker-compose up --build


This will spin up both frontend and backend services automatically.

🧱 API Endpoints
Method	Endpoint	Description
GET	/api/segments	List all network segments
POST	/api/segments	Create a new segment
DELETE	/api/segments/:id	Delete a segment
GET	/api/rules	List firewall rules
POST	/api/rules	Create a new rule
POST	/api/export	Export network configuration
🔒 Security Features

Uses network segmentation for isolation between zones.

Input validation and structured rule creation.

Follows least-privilege design for services.

Can be extended to integrate with firewalls, routers, or cloud orchestration scripts.

🧠 Future Enhancements

Drag-and-drop topology builder

Real-time traffic simulation between segments

Integration with AWS / Azure virtual networks

Export to Terraform or Ansible format

Multi-user collaboration (optional in future)

🧑‍💻 Author

Cheruku Shravani
💼 GitHub: @cherukushravani3-commits

📧 shravani@example.com

📜 License

This project is licensed under the MIT License – free to use, modify, and share.
