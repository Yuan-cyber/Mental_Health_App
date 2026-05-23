# Moodwave - Mental Health Support App

<img width="600" alt="frontend-page4 (1)" src="https://github.com/user-attachments/assets/2703f4b5-8a91-4ef4-956c-f15ef5c95304" />

A full-stack mental health application built with **Spring Boot**, **React + TypeScript**, and **MySQL**, featuring a gamified module powered by **Phaser**.

---

## Project Overview

Moodwave is a final-year dissertation project that implements evidence-based mental health support through:
- **Mood tracking** (self-monitoring via CBT)
- **Gamified emotional engagement** (reward activation)
- **Community interaction** (low-pressure social connection)

Grounded in CBT research and validated through usability testing (UEQ score: Dependability 5.0/5.0).

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
- **Real-time updates** via REST polling or WebSocket (architecture supports both)
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
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
```

### Mood Management
```
GET    /api/moods                    # Fetch user's mood logs
POST   /api/moods                    # Create mood entry
GET    /api/moods/:id                # Get mood detail
PUT    /api/moods/:id                # Update mood entry
DELETE /api/moods/:id                # Delete mood entry
```

### Community
```
GET    /api/community/feed           # Fetch anonymous feed
POST   /api/moods/:id/drift          # Share mood to community
POST   /api/community/:id/reply      # Reply to community entry
```

### Game
```
GET    /api/game/scores              # Fetch user's game scores
POST   /api/game/scores              # Save game session
```

---

## Security

- **JWT Authentication**: Token-based stateless auth with refresh token rotation
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

### Unit & Integration Tests
- Backend: JUnit + Mockito for service layer
- Frontend: React Testing Library for component behavior
- Game: Phaser physics validation

### Usability Testing
**5 participants** completed UEQ (User Experience Questionnaire):
| Dimension | Score | Variance |
|-----------|-------|----------|
| Attractiveness | 4.2 | 0.56 |
| Perspicuity | 4.0 | 0.40 |
| Efficiency | 4.6 | 0.24 |
| **Dependability** | **5.0** | **0.00** ✓ |
| Aesthetics | 4.6 | 0.24 |

Issues surfaced and resolved:
- Mood board widget visual density → Fixed with enlarged helper text
- Game onboarding clarity → Added contextual instructions

---

## Development Setup

### Prerequisites
- Java 17+
- Node.js 16+ & npm
- MySQL 8.0+

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Game Module
```bash
cd frontend/src/game
npm run build
```

---

## Research Foundation

Design decisions are grounded in **Cognitive Behavioral Therapy (CBT)**:

| CBT Technique | Feature | Implementation |
|---------------|---------|-----------------|
| Self-monitoring | Mood Tracking | Emotion tagging with temporal patterns |
| Behavioral Activation | Gamified Module | Reward activation via game mechanics |
| Graduated Social Exposure | Community Feed | Anonymous, low-pressure interaction |

**Target Demographic**: Users scoring low on extraversion and high on neuroticism (Big Five model) — underserved by community-first mental health apps.

---

## Performance Considerations

- **Frontend**: Code splitting, lazy loading of game module
- **Backend**: Database indexing on mood timestamps, API response caching
- **Game**: Canvas optimization, sprite pooling to prevent memory leaks
- **Database**: Indexed queries for mood retrieval by date range and emotion tag

---

## Known Limitations & Future Work

- Mood logging UI could be further refined (market has raised baseline)
- Real-time community feed currently uses REST polling — consider WebSocket for lower latency
- Game randomization algorithm could be enhanced with difficulty scaling
- Mobile responsiveness could benefit from dedicated mobile UI optimizations

---

## License

This project is part of an academic dissertation and is provided as-is for educational and portfolio purposes.

---

## Contact

For technical inquiries or to discuss the architecture: [Portfolio](https://yingshuo.co.uk)
