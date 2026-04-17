# AI Search Backend

It supports
- structured filter search
- AI-assisted search using natural language
- unified search logic for both flows
- pagination and total count
- CSV export
- validation and error handling
- test cases

## Setup

# 1. Install dependencies

```bash
npm install
```

# 2. Add environment file

Create `.env` using `.env.example`.

Example:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ai_prospect_search
```

# 3. Start MongoDB

Make sure MongoDB is running locally.

# 4. Seed data

```bash
npm run seed
```

# 5. Start development server

```bash
npm run dev
```

Server will start on:

```text
http://localhost:3000
```

## API's
# 1.Health
  `GET /health`

# 2. Structured search

 `GET /api/v1/company/search`

 Query params
 - sector
- subSector
- location
- tags
- page
- limit

Example:

```bash
curl "http://localhost:3000/api/v1/companies/search?sector=Fintech&subSector=Payments&location=London&page=1&limit=10"
```

# 3. AI search

`POST /api/v1/companies/ai-search`

Request body:

```json
{
  "prompt": "Fintech companies in London doing payments"
}
```

# 4. Export CSV

`GET /api/v1/companies/export`

Example:

```bash
curl "http://localhost:3000/api/v1/companies/export?sector=Fintech&location=London" -o companies.csv
```

# 5. AI search export

`POST /api/v1/companies/ai-search/export`

Request body:

```json
{
  "prompt": "Fintech companies in London doing payments"
}
```

## Run tests

```bash
npm test
```

## Validation strategy

# Structured filters
- validates page and limit
- validates only supported sector, subSector, location, and tags
- trims and sanitizes values

# AI prompt
- validates prompt length
- extracts only supported fields
- validates parsed output before database query
- does not trust AI output blindly

## Performance notes

Even though the sample dataset is 200 to 1000 records, this implementation is designed with scale in mind:
- indexes on filterable fields
- pagination support
- total count support
- cursor-based CSV export instead of loading all records in memory



