# 🚚 Logistics Dashboard (Concept Project)

A **conceptual logistics and transport management dashboard** built with **Next.js 15**, **Drizzle ORM**, **Neon PostgreSQL**, **Clerk authentication**, and **ShadCN UI**.  
This project represents an **early-stage prototype** designed to explore architecture, data modeling, and UI/UX for a real-world logistics platform.

---

## 🧭 Overview

The **Logistics Dashboard Concept** demonstrates how modern web technologies can streamline logistics operations and data visualization.  
Although not a production system, it provides a **solid foundation** that can be further developed into a complete logistics management tool.

This version focuses on:
- Managing **shipments** and **transports**
- Tracking shipment statuses (`pending`, `in_transit`, `delayed`, `delivered`)
- Role-based access for team members and leaders
- Real-time-like dashboards with tables and charts

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | [Next.js 15](https://nextjs.org/) |
| **UI Components** | [ShadCN UI](https://ui.shadcn.com/) + Tailwind CSS |
| **Database** | [Neon PostgreSQL](https://neon.tech/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Auth** | [Clerk](https://clerk.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Deployment** | Vercel / Neon Cloud |

---

## 🚀 Concept Goals

✅ **Demonstrate modern full-stack architecture**  
✅ **Show how logistics data can be visualized interactively**  
✅ **Explore KPI card design and real-time analytics**  
✅ **Prototype user roles (Admin / Team Leader / Employee)**  
✅ **Build a scalable foundation for future product development**

---

## 🧩 Project Structure
/app
/dashboard
/components
/charts
/api
/shipments
/transports
/lib
/drizzle
/hooks
/services


---
## 🧠 Getting Started (Local Development)

### 1️⃣ Clone the repository
git clone https://github.com/<your-username>/logistics-dashboard.git
cd logistics-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables
Create a .env.local file:
NEXT_PUBLIC_URL=http://localhost:3000
DATABASE_URL=your_neon_postgres_connection_url
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

4️⃣ Run database migrations
npx drizzle-kit push

5️⃣ Start the development server
npm run dev

📊 Dashboard Features (Concept Stage)

Shipments tracking by status and creation date
Transports management with assigned shipments
KPI cards summarizing total, delayed, and active shipments
Interactive charts showing revenue and transport performance
Role-based views for admins, team leaders, and employees

📈 Visualization

The dashboard concept includes:
  Bar charts for revenue vs. expenses trends
  Line charts for monthly shipment performance
  Pie charts for shipment status distribution
  Data tables with sorting and filters

🛠 Future Development

This project is a proof of concept (PoC) and can be expanded to include:

🔁 Real-time updates via WebSockets
📱 Mobile-friendly views
📬 Notifications for delayed shipments
💾 Historical analytics with caching
🌍 Integration with third-party APIs (DHL, FedEx, etc.)
🧠 AI-powered route or cost optimization
📜 License

This project is licensed under the MIT License.
You’re free to use, modify, and build upon it.

🌍 Author
Developed by: Kiril Zyapkov
📧 Contact: appdeveloperjs47@gmail.com
💼 GitHub: github.com/KirilSZyapkov
