# Moodwave - Mental Health Support App

<img width="600" alt="frontend-page4 (1)" src="https://github.com/user-attachments/assets/2703f4b5-8a91-4ef4-956c-f15ef5c95304" />

A full-stack mental health application built with **Spring Boot**, **React + TypeScript**, and **MySQL**, featuring a gamified module powered by **Phaser**.

---

## Project Overview

Moodwave is a final-year dissertation project that implements evidence-based mental health support through:
- **Mood tracking** (self-monitoring via CBT)
- **Gamified emotional engagement** (reward activation)
- **Community interaction** (low-pressure social connection)

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Backend** | Spring Boot, MySQL, JWT, RESTful API |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Ant Design |
| **Game Module** | Phaser 3, Webpack, Canvas API |
| **Testing** | Selenium, JUnit, React Testing Library |

**Language Composition**:
- TypeScript: 45.9%
- Java: 39.3%
- CSS: 12.7%
- HTML: 1.1%
- Other: 1%

---

## Architecture

### Separation of Concerns

```
Moodwave/
├── Backend (Spring Boot)
│   ├── JWT Authentication
│   ├── REST API Endpoints
│   └── MySQL Database Layer
├── Frontend (React + TypeScript)
│   ├── Component Architecture (Functional Components + Hooks)
│   ├── State Management
│   └── Responsive UI (Tailwind + Ant Design)
└── Game Module (Phaser 3)
    ├── Canvas Rendering
    ├── Physics Engine
    └── Webpack Bundle (Embedded in Frontend)
```

**Key Design**: Backend and frontend are decoupled — authentication, business logic, and persistence live server-side. The game runs as a standalone module with independent rendering.

---

## Core Features

### 1. Mood Tracking (MoodPack Dashboard)
- **Emotion tagging**: Happiness, Anxiety, Depression, Peace
- **Date-based browsing** with emotion filtering
- **RESTful endpoints** for CRUD operations on mood logs
- **Database schema**: Optimized for time-series mood data retrieval

### 2. Community Feed (MoodPack Ocean)
- **Anonymous public feed** for mood entries
- **Low-pressure interaction**: Users can "drift" entries and reply
- **Real-time updates** via REST polling
- **Privacy**: User identifiers anonymized in public view

### 3. Gamified Module
- **Phaser 3 physics engine** for platformer mechanics
- **Randomized level generation** to prevent repetitive play
- **Sprite rendering**: Custom assets + sourced from itch.io/Dotown
- **Emotion representation**: Each emotion type has distinct visual/mechanical feedback
- **Scoring system**: Dynamic point calculation based on emotion type

---

## API Endpoints

### Authentication
```
POST   /login                      # User login
POST   /create                     # User registration
```

### Mood Management
```
POST   /moodpacks/add              # Create mood entry
GET    /moodpacks/{id}             # Get mood detail
GET    /moodpacks/tag              # Get moods by emotion tag (params: tag, userId)
```

### Community
```
GET    /moodpacks/public           # Fetch public feed
POST   /moodpacks/{id}/publish     # Share mood to community
```

### Comments
```
POST   /comment/addcomment         # Reply to mood entry
GET    /comment/{id}               # Get comments for mood (params: id)
```

---

## Security

- **JWT Authentication**: Token-based stateless auth
- **Input Validation**: Server-side validation on all endpoints
- **SQL Injection Prevention**: Parameterized queries via JPA/Hibernate
- **CORS Configuration**: Restricted to trusted origins
- **Password Hashing**: BCrypt with configurable rounds

---

## Testing

### End-to-End Testing (Selenium)
- Critical user journeys automated before usability sessions
- Browser compatibility testing (Chrome, Firefox, Safari)
- Form submission and navigation flows

---

## Development Setup

### Prerequisites
- Java 17+
- Node.js 16+ & npm
- MySQL 8.0+

### Backend
```bash
cd mental-health-app-backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd mental-health-app
npm install
npm start
```

---

## Known Limitations & Future Work

- Mood logging UI could be further refined (market has raised baseline)
- Real-time community feed currently uses REST polling — consider WebSocket for lower latency
- Game randomization algorithm could be enhanced with difficulty scaling
- Mobile responsiveness could benefit from dedicated mobile UI optimizations
