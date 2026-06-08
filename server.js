/**
 * Sports Fixture Hub - Express Server
 * Backend for Match Fixture Management
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== MOCK DATABASE (without actual MongoDB for simplicity) ==========
/**
 * NOTE: For production, replace with actual MongoDB using Mongoose
 * Uncomment and configure mongodb connection below if you have MongoDB installed
 */

// Uncomment for MongoDB integration:
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).catch(err => console.error('MongoDB connection error:', err));

// ========== IN-MEMORY DATA STORAGE (for demo) ==========
let administrators = [
  {
    id: 1,
    username: 'admin',
    password: 'password', // In production, use bcryptjs
    email: 'admin@sportshub.com'
  }
];

let teams = [
  { id: 1, name: 'Arsenal', sport: 'Football', coach: 'Mikel Arteta', logo: '⚪' },
  { id: 2, name: 'Chelsea', sport: 'Football', coach: 'Maurizio Sarri', logo: '🔵' },
  { id: 3, name: 'Manchester City', sport: 'Football', coach: 'Pep Guardiola', logo: '🔷' },
  { id: 4, name: 'Liverpool', sport: 'Football', coach: 'Jurgen Klopp', logo: '❤️' },
  { id: 5, name: 'Lakers', sport: 'Basketball', coach: 'Darvin Ham', logo: '🟣' },
  { id: 6, name: 'Warriors', sport: 'Basketball', coach: 'Steve Kerr', logo: '🔵' },
];

let competitions = [
  { id: 1, name: 'Premier League', sport: 'Football', startDate: '2026-01-01', endDate: '2026-12-31' },
  { id: 2, name: 'FA Cup', sport: 'Football', startDate: '2026-02-01', endDate: '2026-05-31' },
  { id: 3, name: 'NBA Season 2026', sport: 'Basketball', startDate: '2026-01-01', endDate: '2026-06-30' },
];

let fixtures = [
  {
    id: 1,
    team1: 'Arsenal',
    team2: 'Chelsea',
    date: '2026-06-15',
    time: '15:00',
    venue: 'Emirates Stadium',
    competition: 'Premier League',
    status: 'Upcoming',
    score: null,
    team1Logo: '⚪',
    team2Logo: '🔵'
  },
  {
    id: 2,
    team1: 'Manchester City',
    team2: 'Liverpool',
    date: '2026-06-15',
    time: '17:30',
    venue: 'Etihad Stadium',
    competition: 'Premier League',
    status: 'Upcoming',
    score: null,
    team1Logo: '🔷',
    team2Logo: '❤️'
  },
  {
    id: 3,
    team1: 'Arsenal',
    team2: 'Liverpool',
    date: '2026-06-01',
    time: '14:00',
    venue: 'Emirates Stadium',
    competition: 'Premier League',
    status: 'Finished',
    score: '2-1',
    team1Logo: '⚪',
    team2Logo: '❤️'
  }
];

let notifications = [];

// ========== AUTHENTICATION ROUTES ==========
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const admin = administrators.find(a => a.username === username);

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In production, create JWT token
    res.json({
      success: true,
      admin: { id: admin.id, username: admin.username, email: admin.email },
      token: 'demo-token-' + admin.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== FIXTURES ROUTES ==========
app.get('/api/fixtures', (req, res) => {
  try {
    const { competition, status, search } = req.query;

    let filtered = fixtures;

    if (competition) {
      filtered = filtered.filter(f => f.competition === competition);
    }
    if (status) {
      filtered = filtered.filter(f => f.status === status);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(f =>
        f.team1.toLowerCase().includes(searchLower) ||
        f.team2.toLowerCase().includes(searchLower) ||
        f.venue.toLowerCase().includes(searchLower)
      );
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/fixtures/:id', (req, res) => {
  try {
    const fixture = fixtures.find(f => f.id === parseInt(req.params.id));
    if (!fixture) {
      return res.status(404).json({ error: 'Fixture not found' });
    }
    res.json(fixture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/fixtures', (req, res) => {
  try {
    const { team1, team2, date, time, venue, competition, status, score } = req.body;

    if (!team1 || !team2 || !date || !time || !venue || !competition) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (team1 === team2) {
      return res.status(400).json({ error: 'Teams cannot be the same' });
    }

    const team1Data = teams.find(t => t.name === team1);
    const team2Data = teams.find(t => t.name === team2);

    const newFixture = {
      id: Math.max(...fixtures.map(f => f.id), 0) + 1,
      team1,
      team2,
      date,
      time,
      venue,
      competition,
      status: status || 'Upcoming',
      score: status === 'Finished' && score ? score : null,
      team1Logo: team1Data?.logo || '⚪',
      team2Logo: team2Data?.logo || '⚪'
    };

    fixtures.push(newFixture);
    createNotification(`New fixture added: ${team1} vs ${team2}`);

    res.status(201).json(newFixture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/fixtures/:id', (req, res) => {
  try {
    const fixture = fixtures.find(f => f.id === parseInt(req.params.id));
    if (!fixture) {
      return res.status(404).json({ error: 'Fixture not found' });
    }

    const { team1, team2, date, time, venue, competition, status, score } = req.body;

    Object.assign(fixture, {
      team1: team1 || fixture.team1,
      team2: team2 || fixture.team2,
      date: date || fixture.date,
      time: time || fixture.time,
      venue: venue || fixture.venue,
      competition: competition || fixture.competition,
      status: status || fixture.status,
      score: status === 'Finished' && score ? score : fixture.score
    });

    res.json(fixture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/fixtures/:id', (req, res) => {
  try {
    const index = fixtures.findIndex(f => f.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Fixture not found' });
    }

    const deleted = fixtures.splice(index, 1)[0];
    res.json({ message: 'Fixture deleted', fixture: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TEAMS ROUTES ==========
app.get('/api/teams', (req, res) => {
  try {
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/teams', (req, res) => {
  try {
    const { name, sport, coach, logo } = req.body;

    if (!name || !sport || !coach) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTeam = {
      id: Math.max(...teams.map(t => t.id), 0) + 1,
      name,
      sport,
      coach,
      logo: logo || '⚪'
    };

    teams.push(newTeam);
    createNotification(`New team added: ${name}`);

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/teams/:id', (req, res) => {
  try {
    const index = teams.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const deleted = teams.splice(index, 1)[0];
    res.json({ message: 'Team deleted', team: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== COMPETITIONS ROUTES ==========
app.get('/api/competitions', (req, res) => {
  try {
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/competitions', (req, res) => {
  try {
    const { name, sport, startDate, endDate } = req.body;

    if (!name || !sport || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCompetition = {
      id: Math.max(...competitions.map(c => c.id), 0) + 1,
      name,
      sport,
      startDate,
      endDate
    };

    competitions.push(newCompetition);
    createNotification(`New competition added: ${name}`);

    res.status(201).json(newCompetition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/competitions/:id', (req, res) => {
  try {
    const index = competitions.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Competition not found' });
    }

    const deleted = competitions.splice(index, 1)[0];
    res.json({ message: 'Competition deleted', competition: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TOURNAMENT GENERATOR ==========
app.post('/api/tournaments/generate', (req, res) => {
  try {
    const { teams: teamNames, type, competition, startDate } = req.body;

    if (!teamNames || teamNames.length < 2 || !type || !competition || !startDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let generatedFixtures = [];

    if (type === 'roundrobin') {
      generatedFixtures = generateRoundRobin(teamNames, competition, startDate);
    } else if (type === 'knockout') {
      generatedFixtures = generateKnockout(teamNames, competition, startDate);
    }

    fixtures.push(...generatedFixtures);
    createNotification(`Generated ${generatedFixtures.length} fixtures for tournament`);

    res.status(201).json({
      count: generatedFixtures.length,
      fixtures: generatedFixtures
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateRoundRobin(teamNames, competition, startDate) {
  const generatedFixtures = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < teamNames.length; i++) {
    for (let j = i + 1; j < teamNames.length; j++) {
      const team1 = teamNames[i];
      const team2 = teamNames[j];
      const team1Data = teams.find(t => t.name === team1);
      const team2Data = teams.find(t => t.name === team2);

      generatedFixtures.push({
        id: Math.max(...fixtures.map(f => f.id), 0) + generatedFixtures.length + 1,
        team1,
        team2,
        date: currentDate.toISOString().split('T')[0],
        time: '15:00',
        venue: 'Tournament Venue',
        competition,
        status: 'Upcoming',
        score: null,
        team1Logo: team1Data?.logo || '⚪',
        team2Logo: team2Data?.logo || '⚪'
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return generatedFixtures;
}

function generateKnockout(teamNames, competition, startDate) {
  const generatedFixtures = [];
  let currentDate = new Date(startDate);
  let [activeTeams, rounds] = [teamNames, Math.ceil(Math.log2(teamNames.length))];

  for (let r = 0; r < rounds; r++) {
    const nextRoundTeams = [];

    for (let i = 0; i < activeTeams.length; i += 2) {
      if (i + 1 < activeTeams.length) {
        const team1 = activeTeams[i];
        const team2 = activeTeams[i + 1];
        const team1Data = teams.find(t => t.name === team1);
        const team2Data = teams.find(t => t.name === team2);

        generatedFixtures.push({
          id: Math.max(...fixtures.map(f => f.id), 0) + generatedFixtures.length + 1,
          team1,
          team2,
          date: currentDate.toISOString().split('T')[0],
          time: '15:00',
          venue: 'Tournament Venue',
          competition: `${competition} - Round ${r + 1}`,
          status: 'Upcoming',
          score: null,
          team1Logo: team1Data?.logo || '⚪',
          team2Logo: team2Data?.logo || '⚪'
        });

        nextRoundTeams.push(team1); // Placeholder for winner
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    activeTeams = nextRoundTeams;
  }

  return generatedFixtures;
}

// ========== STANDINGS ROUTES ==========
app.get('/api/standings/:competition', (req, res) => {
  try {
    const { competition } = req.params;
    const compFixtures = fixtures.filter(f => f.competition === competition && f.status === 'Finished');

    const standings = {};

    compFixtures.forEach(fixture => {
      if (!standings[fixture.team1]) {
        standings[fixture.team1] = { name: fixture.team1, wins: 0, losses: 0, points: 0 };
      }
      if (!standings[fixture.team2]) {
        standings[fixture.team2] = { name: fixture.team2, wins: 0, losses: 0, points: 0 };
      }

      const [score1, score2] = fixture.score.split('-').map(Number);

      if (score1 > score2) {
        standings[fixture.team1].wins++;
        standings[fixture.team1].points += 3;
        standings[fixture.team2].losses++;
      } else if (score2 > score1) {
        standings[fixture.team2].wins++;
        standings[fixture.team2].points += 3;
        standings[fixture.team1].losses++;
      }
    });

    const result = Object.values(standings).sort((a, b) => b.points - a.points);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== NOTIFICATIONS ROUTES ==========
app.get('/api/notifications', (req, res) => {
  try {
    res.json(notifications.reverse().slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function createNotification(message) {
  notifications.push({
    id: Date.now(),
    message,
    timestamp: new Date().toISOString(),
    read: false
  });
}

// ========== HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ========== 404 HANDLER ==========
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Sports Fixture Hub server running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation:`);
  console.log(`  GET  /api/fixtures - Get all fixtures`);
  console.log(`  POST /api/fixtures - Create fixture`);
  console.log(`  PUT  /api/fixtures/:id - Update fixture`);
  console.log(`  DELETE /api/fixtures/:id - Delete fixture`);
  console.log(`  GET  /api/teams - Get all teams`);
  console.log(`  POST /api/teams - Create team`);
  console.log(`  GET  /api/competitions - Get all competitions`);
  console.log(`  POST /api/competitions - Create competition`);
  console.log(`  POST /api/tournaments/generate - Generate tournament fixtures`);
  console.log(`  GET  /api/standings/:competition - Get standings`);
  console.log(`\n💻 Admin credentials: admin / password`);
});