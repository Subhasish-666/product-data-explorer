# Product Data Explorer

A full-stack web application that scrapes real product data from **World of Books** and displays it through a modern web interface.

Built as a learning + assignment project using modern technologies and clean architecture.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- Playwright (Web Scraping)
- Prisma
- MongoDB

---

## Features

- Category-style product sections inside Products page  
- Product grid displaying real scraped products  
- Product detail page including:
  - Title  
  - Description  
  - Ratings  
  - Recommendations  
- Product search with rich filters:
  - Price range  
  - Author  
  - Rating  
- Pagination / limit support  
- Responsive UI (Mobile + Desktop)  
- Clean project structure using Next.js App Router  

---

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-data-explorer.git
```
```
cd product-data-explorer
```
## Start the Server
```
npm install
npm run start
```
## Start Mongo DB Server
```
mongod --dbpath backend/src/db
mongosh
```
## And start redis server
```
sudo service redis-server start
sudo service redis-server status
```
---
## Notes

- `node_modules` is intentionally excluded from GitHub
- Always run `npm install` after cloning
- Scraping depends on the external website structure and may break if `World of Books` changes
---

- Paste into `README.md`
- Push to GitHub
- It will render perfectly on your repo homepage
