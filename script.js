/**
 * Sports Fixture Hub - Frontend (localStorage demo)
 * Cleaned/repaired: single consistent implementation for index.html.
 */

// ========== GLOBAL STATE & DATA ==========
let appState = {
  isDarkMode: true,
  currentUser: null,
  isLoggedIn: false,
  showNotifications: 0,
  fixtures: [],
  teams: [],
  competitions: [],
  notifications: [],
};

// Initialize with sample data
const SAMPLE_DATA = {
  teams: [
    {
      id: 1,
      name: "Arsenal",
      sport: "Football",
      coach: "Mikel Arteta",
      logo: "⚪",
    },
    {
      id: 2,
      name: "Chelsea",
      sport: "Football",
      coach: "Maurizio Sarri",
      logo: "🔵",
    },
    {
      id: 3,
      name: "Manchester City",
      sport: "Football",
      coach: "Pep Guardiola",
      logo: "🔷",
    },
    {
      id: 4,
      name: "Liverpool",
      sport: "Football",
      coach: "Jurgen Klopp",
      logo: "❤️",
    },
    {
      id: 5,
      name: "Lakers",
      sport: "Basketball",
      coach: "Darvin Ham",
      logo: "🟣",
    },
    {
      id: 6,
      name: "Warriors",
      sport: "Basketball",
      coach: "Steve Kerr",
      logo: "🔵",
    },
    {
      id: 7,
      name: "Miami Heat",
      sport: "Basketball",
      coach: "Eric Spoelstra",
      logo: "🔴",
    },
    {
      id: 8,
      name: "Boston Celtics",
      sport: "Basketball",
      coach: "Joe Mazzulla",
      logo: "💚",
    },
  ],

  competitions: [
    {
      id: 1,
      name: "Premier League",
      sport: "Football",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
    },
    {
      id: 2,
      name: "FA Cup",
      sport: "Football",
      startDate: "2026-02-01",
      endDate: "2026-05-31",
    },
    {
      id: 3,
      name: "NBA Season 2026",
      sport: "Basketball",
      startDate: "2026-01-01",
      endDate: "2026-06-30",
    },
    {
      id: 4,
      name: "Summer Tournament",
      sport: "Football",
      startDate: "2026-06-01",
      endDate: "2026-08-31",
    },
  ],

  categories: [
    {
      id: 1,
      name: "Volleyball",
      icon: "🏐",
      image: "",

      description: "Dynamic beach and indoor volleyball action.",
    },
    {
      id: 2,
      name: "Basketball",
      icon: "🏀",
      image: "",

      description: "Fast-paced basketball match management.",
    },
    {
      id: 3,
      name: "Rugby",
      icon: "🏉",
      image: "",

      description: "Rugby fixtures and tournament tracking.",
    },
    {
      id: 4,
      name: "Football",
      icon: "⚽",
      image: "",

      description: "Professional football league management.",
    },
    {
      id: 5,
      name: "Tennis",
      icon: "🎾",
      image: "",

      description: "Serve up tournament brackets and scores.",
    },
    {
      id: 6,
      name: "Cricket",
      icon: "🏏",
      image: "",
      description: "Cricket fixtures with live score support.",
    },
    {
      id: 7,
      name: "Handball",
      icon: "🤾",
      image: "",
      description: "Track handball leagues and match stats.",
    },
    {
      id: 8,
      name: "Other Sports",
      icon: "🌐",
      image: "",
      description: "Support for emerging sporting events and custom leagues.",
    },
  ],

  fixtures: [
    {
      id: 1,
      team1: "Arsenal",
      team2: "Chelsea",
      date: "2026-06-15",
      time: "15:00",
      venue: "Emirates Stadium",
      competition: "Premier League",
      status: "Upcoming",
      score: null,
      team1Logo: "⚪",
      team2Logo: "🔵",
    },
    {
      id: 2,
      team1: "Manchester City",
      team2: "Liverpool",
      date: "2026-06-15",
      time: "17:30",
      venue: "Etihad Stadium",
      competition: "Premier League",
      status: "Upcoming",
      score: null,
      team1Logo: "🔷",
      team2Logo: "❤️",
    },
    {
      id: 3,
      team1: "Lakers",
      team2: "Warriors",
      date: "2026-06-14",
      time: "20:00",
      venue: "Crypto.com Arena",
      competition: "NBA Season 2026",
      status: "Upcoming",
      score: null,
      team1Logo: "🟣",
      team2Logo: "🔵",
    },
    {
      id: 4,
      team1: "Arsenal",
      team2: "Liverpool",
      date: "2026-06-01",
      time: "14:00",
      venue: "Emirates Stadium",
      competition: "Premier League",
      status: "Finished",
      score: "2-1",
      team1Logo: "⚪",
      team2Logo: "❤️",
    },
    {
      id: 5,
      team1: "Miami Heat",
      team2: "Boston Celtics",
      date: "2026-06-10",
      time: "19:00",
      venue: "FTX Arena",
      competition: "NBA Season 2026",
      status: "Upcoming",
      score: null,
      team1Logo: "🔴",
      team2Logo: "💚",
    },
    {
      id: 6,
      team1: "Lakers",
      team2: "Miami Heat",
      date: "2026-06-18",
      time: "20:30",
      venue: "Crypto.com Arena",
      competition: "NBA Season 2026",
      status: "Upcoming",
      score: null,
      team1Logo: "🟣",
      team2Logo: "🔴",
    },
    {
      id: 7,
      team1: "Boston Celtics",
      team2: "Warriors",
      date: "2026-06-12",
      time: "19:30",
      venue: "TD Garden",
      competition: "NBA Season 2026",
      status: "Upcoming",
      score: null,
      team1Logo: "💚",
      team2Logo: "🔵",
    },
    {
      id: 8,
      team1: "Warriors",
      team2: "Miami Heat",
      date: "2026-06-20",
      time: "21:00",
      venue: "Chase Center",
      competition: "NBA Season 2026",
      status: "Upcoming",
      score: null,
      team1Logo: "🔵",
      team2Logo: "🔴",
    },
  ],
};

const BACKGROUND_IMAGES = [
  // Emojis-only theme: no local background images.
];

let currentBackgroundIndex = 0;

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  loadAppState();
  applyTheme();
  initializeBackgrounds();
  loadInitialData();
  populateFilters();
  render();
  setupEventListeners();
  window.addEventListener("scroll", updateBackgroundParallax);
});

function loadAppState() {
  const saved = localStorage.getItem("appState");
  if (saved) {
    try {
      appState = JSON.parse(saved);
      return;
    } catch {
      // fallthrough
    }
  }

  appState = {
    isDarkMode: true,
    currentUser: null,
    isLoggedIn: false,
    showNotifications: 0,
    fixtures: JSON.parse(JSON.stringify(SAMPLE_DATA.fixtures)),
    teams: JSON.parse(JSON.stringify(SAMPLE_DATA.teams)),
    competitions: JSON.parse(JSON.stringify(SAMPLE_DATA.competitions)),
    categories: JSON.parse(JSON.stringify(SAMPLE_DATA.categories)),
    notifications: [],
  };
  saveAppState();
}

function saveAppState() {
  localStorage.setItem("appState", JSON.stringify(appState));
}

function loadInitialData() {
  if (!appState.fixtures || appState.fixtures.length === 0) {
    appState.fixtures = JSON.parse(JSON.stringify(SAMPLE_DATA.fixtures));
  }
  if (!appState.teams || appState.teams.length === 0) {
    appState.teams = JSON.parse(JSON.stringify(SAMPLE_DATA.teams));
  }
  if (!appState.competitions || appState.competitions.length === 0) {
    appState.competitions = JSON.parse(
      JSON.stringify(SAMPLE_DATA.competitions),
    );
  }
  if (!appState.categories || appState.categories.length === 0) {
    appState.categories = JSON.parse(JSON.stringify(SAMPLE_DATA.categories));
  }
  saveAppState();
}

function setupEventListeners() {
  const elSearch = document.getElementById("search");
  if (elSearch) elSearch.addEventListener("input", handleSearch);

  const ids = [
    "sportFilter",
    "teamFilter",
    "competitionFilter",
    "statusFilter",
    "dateFilter",
  ];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", handleFilter);
  });
}

function initializeBackgrounds() {
  const layer = document.getElementById("backgroundLayer");
  if (!layer) return;

  // No images: keep the overlay purely gradient-based.
  requestAnimationFrame(() => layer.classList.add("visible"));
}

function setBackgroundImage(index) {
  // Images removed.
}

function updateBackgroundParallax() {
  const layer = document.getElementById("backgroundLayer");
  if (!layer) return;
  const scrollY = window.scrollY * 0.15;
  layer.style.transform = `translate3d(0, ${scrollY}px, 0) scale(1.05)`;
}

// ========== THEME SYSTEM ==========
function toggleTheme() {
  appState.isDarkMode = !appState.isDarkMode;
  applyTheme();
  saveAppState();
}

function applyTheme() {
  const body = document.body;
  if (appState.isDarkMode) body.classList.remove("light-theme");
  else body.classList.add("light-theme");
}

// ========== RENDER FUNCTIONS ==========
function render() {
  renderCategories();
  renderFixtures();
  renderStandings();
  updateHeroStats();
  updateStandingsSummary();
  // Featured section may not exist if you changed layout.
  if (document.getElementById("featuredFixtures")) renderFeaturedFixtures();

  populateAdminSelects();
  renderAdminTables();
}

function updateStandingsSummary() {
  const compEl = document.getElementById("summaryCompetitions");
  const finEl = document.getElementById("summaryFinishedMatches");
  const teamsEl = document.getElementById("summaryTeams");

  if (compEl) compEl.textContent = appState.competitions?.length || 0;
  if (finEl)
    finEl.textContent =
      appState.fixtures?.filter((f) => f.status === "Finished").length || 0;
  if (teamsEl) teamsEl.textContent = appState.teams?.length || 0;
}

function updateHeroStats() {
  animateCounter("heroTotalFixtures", appState.fixtures.length);
  animateCounter("heroTeamsCount", appState.teams.length);
  animateCounter(
    "heroLiveMatches",
    appState.fixtures.filter((f) => f.status === "Live").length,
  );
}

function animateCounter(id, target) {
  const element = document.getElementById(id);
  if (!element) return;

  const startValue = Number(element.textContent) || 0;
  const endValue = Number(target);
  if (startValue === endValue) {
    element.textContent = endValue;
    return;
  }

  const duration = 700;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(startValue + (endValue - startValue) * progress);
    element.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

function renderFeaturedFixtures() {
  const container = document.getElementById("featuredFixtures");
  if (!container) return;

  container.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];
  const todayFixtures = appState.fixtures.filter(
    (f) => f.date === today && (f.status === "Upcoming" || f.status === "Live"),
  );

  if (todayFixtures.length === 0) {
    container.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matches today</p>';
    return;
  }

  todayFixtures.forEach((fixture) => {
    container.appendChild(createFixtureCard(fixture));
  });
}

function renderFixtures() {
  const container = document.getElementById("fixturesList");
  if (!container) return;

  let fixtures = appState.fixtures;

  const sportFilter = document.getElementById("sportFilter")?.value || "";
  const teamFilter = document.getElementById("teamFilter")?.value || "";
  const competitionFilter =
    document.getElementById("competitionFilter")?.value || "";
  const statusFilter = document.getElementById("statusFilter")?.value || "";
  const dateFilter = document.getElementById("dateFilter")?.value || "";

  if (sportFilter) {
    fixtures = fixtures.filter((f) => {
      const team = appState.teams.find(
        (t) => t.name === f.team1 || t.name === f.team2,
      );
      return team?.sport === sportFilter;
    });
  }
  if (teamFilter)
    fixtures = fixtures.filter(
      (f) => f.team1 === teamFilter || f.team2 === teamFilter,
    );
  if (competitionFilter)
    fixtures = fixtures.filter((f) => f.competition === competitionFilter);
  if (statusFilter)
    fixtures = fixtures.filter((f) => f.status === statusFilter);

  if (dateFilter) {
    const target = new Date(dateFilter + "T00:00:00");
    const min = new Date(target);
    min.setDate(min.getDate() - 3);
    const max = new Date(target);
    max.setDate(max.getDate() + 3);

    fixtures = fixtures.filter((f) => {
      const d = new Date(f.date + "T00:00:00");
      return d >= min && d <= max;
    });
  }

  fixtures.sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),
  );

  if (fixtures.length === 0) {
    container.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No fixtures found</p>';
    return;
  }

  container.innerHTML = "";
  fixtures.forEach((fixture) =>
    container.appendChild(createFixtureCard(fixture, true)),
  );
}

function createFixtureCard(fixture, clickable = false) {
  const card = document.createElement("div");
  card.className = "fixture-card";

  const statusClass = `status-${(fixture.status || "Upcoming").toLowerCase()}`;
  const statusEmoji = { Upcoming: "🔵", Live: "🔴", Finished: "✅" };
  const timeLeft = calculateTimeLeft(`${fixture.date}T${fixture.time}`);

  card.innerHTML = `
    <div class="fixture-card-status ${statusClass}">${statusEmoji[fixture.status]} ${fixture.status}</div>
    <div class="teams-matchup">
      <div class="team-info">
        <div class="team-logo">${fixture.team1Logo || "⚪"}</div>
        <div class="team-name">${fixture.team1}</div>
      </div>
      <div class="vs-badge">VS</div>
      <div class="team-info">
        <div class="team-logo">${fixture.team2Logo || "⚪"}</div>
        <div class="team-name">${fixture.team2}</div>
      </div>
    </div>
    ${fixture.status === "Finished" && fixture.score ? `<div class="score-display">${fixture.score}</div>` : `<div class="countdown">${timeLeft}</div>`}
    <div class="fixture-meta">
      <div class="meta-item">📅 ${formatDate(fixture.date)}</div>
      <div class="meta-item">⏰ ${fixture.time}</div>
      <div class="meta-item">📍 ${fixture.venue}</div>
      <div class="meta-item">🏆 ${fixture.competition}</div>
    </div>
  `;

  if (clickable) {
    card.style.cursor = "pointer";
    card.onclick = () => showFixtureDetail(fixture);
  }

  // Countdown updates
  const countdownEl = card.querySelector(".countdown");
  if (countdownEl && fixture.status !== "Finished") {
    startCountdown(`${fixture.date}T${fixture.time}`, countdownEl);
  }

  return card;
}

function renderStandings() {
  const container = document.getElementById("standingsList");
  if (!container) return;

  container.innerHTML = "";

  appState.competitions.forEach((comp) => {
    const standings = calculateStandings(comp.id);
    const card = document.createElement("div");
    card.className = "standing-card";

    let html = `<h4>${comp.name} 🏆</h4>`;
    if (standings.length === 0)
      html += '<p style="color: var(--text-muted);">No matches yet</p>';
    else {
      html += '<div style="font-size: 13px;">';
      standings.forEach((team, idx) => {
        html += `
          <div class="standing-row">
            <div class="position">${idx + 1}</div>
            <div class="team-standing">${team.name}</div>
            <div class="standing-stats">
              <span title="Wins">${team.wins}W</span>
              <span title="Losses">${team.losses}L</span>
              <span title="Points">${team.points}pt</span>
            </div>
          </div>
        `;
      });
      html += "</div>";
    }

    card.innerHTML = html;
    container.appendChild(card);
  });
}

function calculateStandings(competitionId) {
  const compFixtures = appState.fixtures.filter((f) => {
    const comp = appState.competitions.find((c) => c.name === f.competition);
    return (
      comp &&
      comp.id === competitionId &&
      f.status === "Finished" &&
      typeof f.score === "string" &&
      f.score.includes("-")
    );
  });

  const standings = {};

  compFixtures.forEach((fixture) => {
    if (!standings[fixture.team1])
      standings[fixture.team1] = {
        name: fixture.team1,
        wins: 0,
        losses: 0,
        points: 0,
      };
    if (!standings[fixture.team2])
      standings[fixture.team2] = {
        name: fixture.team2,
        wins: 0,
        losses: 0,
        points: 0,
      };

    const [score1, score2] = fixture.score.split("-").map(Number);
    if (Number.isNaN(score1) || Number.isNaN(score2)) return;

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

  return Object.values(standings).sort((a, b) => b.points - a.points);
}

function renderCategories() {
  const container = document.getElementById("sportsCategories");
  if (!container) return;

  container.innerHTML = "";
  appState.categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card glass-card";
    card.setAttribute("role", "button");
    card.tabIndex = 0;
    card.style.cursor = "pointer";
    card.setAttribute("aria-label", `View ${category.name} matches`);

    card.innerHTML = `
      <div class="category-image" aria-hidden="true"></div>
      <div class="category-body">
        <div class="category-label">
          <span class="category-icon">${category.icon}</span>
          <span class="category-name">${category.name}</span>
        </div>
        <p class="category-description">${category.description}</p>
      </div>
    `;

    card.addEventListener("click", () => showMatchesForCategory(category.name));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showMatchesForCategory(category.name);
      }
    });

    container.appendChild(card);
  });
}

function populateFilters() {
  const sportFilter = document.getElementById("sportFilter");
  const teamFilter = document.getElementById("teamFilter");

  const upTeam1 = document.getElementById("upTeam1");
  const upTeam2 = document.getElementById("upTeam2");
  if (upTeam1 && upTeam2) {
    upTeam1.innerHTML =
      '<option value="">Select Team</option>' +
      appState.teams
        .map((t) => `<option value="${t.name}">${t.name}</option>`)
        .join("");
    upTeam2.innerHTML =
      '<option value="">Select Team</option>' +
      appState.teams
        .map((t) => `<option value="${t.name}">${t.name}</option>`)
        .join("");
  }

  if (sportFilter) {
    sportFilter.innerHTML =
      '<option value="">All Sports</option>' +
      appState.categories
        .map((cat) => `<option value="${cat.name}">${cat.name}</option>`)
        .join("");
  }

  if (teamFilter) {
    teamFilter.innerHTML =
      '<option value="">All Teams</option>' +
      appState.teams
        .map((team) => `<option value="${team.name}">${team.name}</option>`)
        .join("");
  }
}

// ========== SEARCH & FILTER ==========
function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  runSearchInternal(query);
}

function runSearch() {
  const input = document.getElementById("search");
  const query = (input?.value || "").toLowerCase();
  runSearchInternal(query);
}

function runSearchInternal(query) {
  let fixtures = appState.fixtures;

  const sportFilter = document.getElementById("sportFilter")?.value || "";
  const teamFilter = document.getElementById("teamFilter")?.value || "";
  const competitionFilter =
    document.getElementById("competitionFilter")?.value || "";
  const statusFilter = document.getElementById("statusFilter")?.value || "";
  const dateFilter = document.getElementById("dateFilter")?.value || "";

  if (sportFilter) {
    fixtures = fixtures.filter((f) => {
      const team = appState.teams.find(
        (t) => t.name === f.team1 || t.name === f.team2,
      );
      return team?.sport === sportFilter;
    });
  }
  if (teamFilter)
    fixtures = fixtures.filter(
      (f) => f.team1 === teamFilter || f.team2 === teamFilter,
    );
  if (competitionFilter)
    fixtures = fixtures.filter((f) => f.competition === competitionFilter);
  if (statusFilter)
    fixtures = fixtures.filter((f) => f.status === statusFilter);

  if (dateFilter) {
    const target = new Date(dateFilter + "T00:00:00");
    const min = new Date(target);
    min.setDate(min.getDate() - 3);
    const max = new Date(target);
    max.setDate(max.getDate() + 3);

    fixtures = fixtures.filter((f) => {
      const d = new Date(f.date + "T00:00:00");
      return d >= min && d <= max;
    });
  }

  if (query) {
    fixtures = fixtures.filter(
      (f) =>
        f.team1.toLowerCase().includes(query) ||
        f.team2.toLowerCase().includes(query) ||
        f.competition.toLowerCase().includes(query) ||
        f.venue.toLowerCase().includes(query),
    );
  }

  fixtures.sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),
  );

  const container = document.getElementById("fixturesList");
  if (!container) return;

  container.innerHTML = "";

  if (!query) {
    renderFixtures();
    return;
  }

  if (fixtures.length === 0) {
    container.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matching results for your search</p>';
    return;
  }

  fixtures.forEach((fixture) =>
    container.appendChild(createFixtureCard(fixture, true)),
  );
}

function handleFilter() {
  renderFixtures();
}

function submitUpcomingMatch() {
  const team1 = document.getElementById("upTeam1")?.value || "";
  const team2 = document.getElementById("upTeam2")?.value || "";
  const competition = document.getElementById("upCompetition")?.value || "";
  const date = document.getElementById("upMatchDate")?.value || "";
  const time = document.getElementById("upMatchTime")?.value || "";
  const venue = document.getElementById("upVenue")?.value || "";

  if (!team1 || !team2 || !competition || !date || !time || !venue) {
    alert("❌ Please fill all upcoming match fields");
    return;
  }

  if (team1 === team2) {
    alert("❌ Team 1 and Team 2 cannot be the same");
    return;
  }

  const team1Data = appState.teams.find((t) => t.name === team1);
  const team2Data = appState.teams.find((t) => t.name === team2);

  const fixture = {
    id: Math.max(...appState.fixtures.map((f) => f.id), 0) + 1,
    team1,
    team2,
    date,
    time,
    venue,
    competition,
    status: "Upcoming",
    score: null,
    team1Logo: team1Data?.logo || "⚪",
    team2Logo: team2Data?.logo || "⚪",
  };

  appState.fixtures.push(fixture);
  saveAppState();

  document.getElementById("upTeam1").value = "";
  document.getElementById("upTeam2").value = "";
  document.getElementById("upCompetition").value = "";
  document.getElementById("upMatchDate").value = "";
  document.getElementById("upMatchTime").value = "";
  document.getElementById("upVenue").value = "";

  addNotification("✅ Upcoming match submitted", "new");
  render();
}

function sortFixtures(sortBy) {
  if (sortBy !== "date" && sortBy !== "time") return;

  const fixtures = [...appState.fixtures];
  if (sortBy === "date")
    fixtures.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortBy === "time")
    fixtures.sort((a, b) => a.time.replace(":", "") - b.time.replace(":", ""));

  const container = document.getElementById("fixturesList");
  if (!container) return;
  container.innerHTML = "";
  fixtures.forEach((fixture) =>
    container.appendChild(createFixtureCard(fixture, true)),
  );
}

// ========== COUNTDOWN TIMER ==========
function calculateTimeLeft(dateTimeString) {
  const now = new Date();
  const target = new Date(dateTimeString);
  const diff = target - now;

  if (diff < 0) return "⏳ Match started/finished";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  if (days > 0) return `⏳ ${days}d ${hours}h left`;
  if (hours > 0) return `⏳ ${hours}h ${minutes}m left`;
  return `⏳ ${minutes}m left`;
}

function startCountdown(dateTimeString, element) {
  if (!element) return;
  const update = () => {
    element.textContent = calculateTimeLeft(dateTimeString);
  };
  update();
  setInterval(update, 60000);
}

// ========== ADMIN FUNCTIONS ==========
function openAdminDashboard() {
  const adminView = document.getElementById("adminView");
  const homeView = document.getElementById("homeView");
  if (homeView) homeView.classList.remove("active");
  if (adminView) adminView.classList.add("active");
}

function closeAdminDashboard() {
  const adminView = document.getElementById("adminView");
  const homeView = document.getElementById("homeView");
  if (adminView) adminView.classList.remove("active");
  if (homeView) homeView.classList.add("active");

  document.getElementById("loginSection")?.classList.remove("hidden");
  document.getElementById("adminPanel")?.classList.add("hidden");
}

function loginAdmin() {
  const username = document.getElementById("adminUsername")?.value || "";
  const password = document.getElementById("adminPassword")?.value || "";

  // Demo credentials: admin / password
  if (username === "admin" && password === "password") {
    appState.isLoggedIn = true;
    appState.currentUser = username;

    document.getElementById("loginSection")?.classList.add("hidden");
    document.getElementById("adminPanel")?.classList.remove("hidden");

    populateAdminSelects();
    renderAdminTables();
    addNotification("🎉 Logged in successfully", "new");
    saveAppState();
  } else {
    alert("❌ Invalid credentials. Try admin / password");
  }
}

function logoutAdmin() {
  appState.isLoggedIn = false;
  appState.currentUser = null;

  document.getElementById("loginSection")?.classList.remove("hidden");
  document.getElementById("adminPanel")?.classList.add("hidden");

  if (document.getElementById("adminUsername"))
    document.getElementById("adminUsername").value = "";
  if (document.getElementById("adminPassword"))
    document.getElementById("adminPassword").value = "";

  closeAdminDashboard();
  saveAppState();
}

function switchAdminTab(tab) {
  const tabs = document.querySelectorAll(".admin-tab");
  const buttons = document.querySelectorAll(".tab-btn");

  tabs.forEach((t) => t.classList.remove("active"));
  buttons.forEach((b) => b.classList.remove("active"));

  document.getElementById(tab + "Tab")?.classList.add("active");
  // event.target may exist when called from inline onclick.
  if (typeof event !== "undefined" && event?.target?.classList)
    event.target.classList.add("active");
}

function populateAdminSelects() {
  const team1Select = document.getElementById("team1Select");
  const team2Select = document.getElementById("team2Select");
  const teamsList2 = document.getElementById("teamsList2");
  const generatorCompetition = document.getElementById("generatorCompetition");

  if (team1Select && team2Select) {
    [team1Select, team2Select].forEach((select) => {
      select.innerHTML = '<option value="">Select Team</option>';
      appState.teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team.name;
        option.textContent = team.name;
        select.appendChild(option);
      });
    });
  }

  if (teamsList2) {
    teamsList2.innerHTML = "";
    appState.teams.forEach((team) => {
      const label = document.createElement("label");
      label.className = "checkbox-item";
      label.innerHTML = `
        <input type="checkbox" value="${team.name}">
        <span>${team.name}</span>
      `;
      teamsList2.appendChild(label);
    });
  }

  const competitionSelect = document.getElementById("competitionSelect");
  if (competitionSelect) {
    competitionSelect.innerHTML =
      '<option value="">Select Competition</option>';
    appState.competitions.forEach((comp) => {
      const option = document.createElement("option");
      option.value = comp.name;
      option.textContent = comp.name;
      competitionSelect.appendChild(option);
    });
  }

  if (generatorCompetition) {
    generatorCompetition.innerHTML = "";
    appState.competitions.forEach((comp) => {
      const option = document.createElement("option");
      option.value = comp.name;
      option.textContent = comp.name;
      generatorCompetition.appendChild(option);
    });
  }
}

function addFixture() {
  const team1 = document.getElementById("team1Select")?.value || "";
  const team2 = document.getElementById("team2Select")?.value || "";
  const date = document.getElementById("matchDate")?.value || "";
  const time = document.getElementById("matchTime")?.value || "";
  const venue = document.getElementById("venue")?.value || "";
  const competition = document.getElementById("competitionSelect")?.value || "";
  const status = document.getElementById("fixtureStatus")?.value || "Upcoming";
  const score = document.getElementById("score")?.value || "";

  if (!team1 || !team2 || !date || !time || !venue || !competition) {
    alert("❌ Please fill all required fields");
    return;
  }

  if (team1 === team2) {
    alert("❌ Teams cannot be the same");
    return;
  }

  const team1Data = appState.teams.find((t) => t.name === team1);
  const team2Data = appState.teams.find((t) => t.name === team2);

  const fixture = {
    id: Math.max(...appState.fixtures.map((f) => f.id), 0) + 1,
    team1,
    team2,
    date,
    time,
    venue,
    competition,
    status,
    score: status === "Finished" && score ? score : null,
    team1Logo: team1Data?.logo || "⚪",
    team2Logo: team2Data?.logo || "⚪",
  };

  appState.fixtures.push(fixture);
  saveAppState();

  // Clear form
  document.getElementById("team1Select").value = "";
  document.getElementById("team2Select").value = "";
  document.getElementById("matchDate").value = "";
  document.getElementById("matchTime").value = "";
  document.getElementById("venue").value = "";
  document.getElementById("competitionSelect").value = "";
  document.getElementById("score").value = "";

  addNotification(`✅ Fixture added: ${team1} vs ${team2}`, "new");
  renderAdminTables();
  render();
}

function addTeam() {
  const name = document.getElementById("teamName")?.value || "";
  const sport = document.getElementById("teamSport")?.value || "";
  const coach = document.getElementById("teamCoach")?.value || "";
  const logo = document.getElementById("teamLogo")?.value || "";

  if (!name || !sport || !coach) {
    alert("❌ Please fill all required fields");
    return;
  }

  const team = {
    id: Math.max(...appState.teams.map((t) => t.id), 0) + 1,
    name,
    sport,
    coach,
    logo: logo || "⚪",
  };

  appState.teams.push(team);
  saveAppState();

  document.getElementById("teamName").value = "";
  document.getElementById("teamCoach").value = "";
  document.getElementById("teamLogo").value = "";

  addNotification(`✅ Team added: ${name}`, "new");
  populateAdminSelects();
  renderAdminTables();
  render();
}

function addCompetition() {
  const name = document.getElementById("competitionName")?.value || "";
  const sport = document.getElementById("competitionSport")?.value || "";
  const startDate = document.getElementById("competitionStart")?.value || "";
  const endDate = document.getElementById("competitionEnd")?.value || "";

  if (!name || !sport || !startDate || !endDate) {
    alert("❌ Please fill all required fields");
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    alert("❌ Start date must be before end date");
    return;
  }

  const competition = {
    id: Math.max(...appState.competitions.map((c) => c.id), 0) + 1,
    name,
    sport,
    startDate,
    endDate,
  };

  appState.competitions.push(competition);
  saveAppState();

  document.getElementById("competitionName").value = "";
  document.getElementById("competitionStart").value = "";
  document.getElementById("competitionEnd").value = "";

  addNotification(`✅ Competition added: ${name}`, "new");
  populateAdminSelects();
  renderAdminTables();
  render();
}

function renderAdminTables() {
  renderFixturesTable();
  renderTeamsTable();
  renderCompetitionsTable();
}

function renderFixturesTable() {
  const container = document.getElementById("fixturesTable");
  if (!container) return;
  container.innerHTML = "";

  if (appState.fixtures.length === 0) {
    container.innerHTML = "<p>No fixtures yet</p>";
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Team 1</th>
          <th>Team 2</th>
          <th>Date</th>
          <th>Time</th>
          <th>Venue</th>
          <th>Competition</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  `;

  appState.fixtures.forEach((fixture) => {
    html += `
      <tr>
        <td>${fixture.team1}</td>
        <td>${fixture.team2}</td>
        <td>${formatDate(fixture.date)}</td>
        <td>${fixture.time}</td>
        <td>${fixture.venue}</td>
        <td>${fixture.competition}</td>
        <td>${fixture.status}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editFixture(${fixture.id})">Edit</button>
            <button class="btn-delete" onclick="deleteFixture(${fixture.id})">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });

  html += "</tbody></table>";
  container.innerHTML = html;
}

function renderTeamsTable() {
  const container = document.getElementById("teamsList");
  if (!container) return;
  container.innerHTML = "";

  appState.teams.forEach((team) => {
    const card = document.createElement("div");
    card.style.cssText =
      "background: var(--dark-border); padding: 15px; border-radius: 8px; text-align: center;";
    card.innerHTML = `
      <div style="font-size: 32px; margin-bottom: 10px;">${team.logo}</div>
      <div style="font-weight: 600; margin-bottom: 5px;">${team.name}</div>
      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 5px;">⚽ ${team.sport}</div>
      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Coach: ${team.coach}</div>
      <button class="btn-delete" style="width: 100%; padding: 8px;" onclick="deleteTeam(${team.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function renderCompetitionsTable() {
  const container = document.getElementById("competitionsList");
  if (!container) return;
  container.innerHTML = "";

  appState.competitions.forEach((comp) => {
    const card = document.createElement("div");
    card.style.cssText =
      "background: var(--dark-border); padding: 15px; border-radius: 8px;";
    card.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 10px;">🏆 ${comp.name}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Sport: ${comp.sport}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 5px;">Start: ${formatDate(comp.startDate)}</div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">End: ${formatDate(comp.endDate)}</div>
      <button class="btn-delete" style="width: 100%; padding: 8px;" onclick="deleteCompetition(${comp.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function deleteFixture(id) {
  if (!confirm("Are you sure you want to delete this fixture?")) return;
  appState.fixtures = appState.fixtures.filter((f) => f.id !== id);
  saveAppState();
  addNotification("✅ Fixture deleted", "new");
  renderAdminTables();
  render();
}

function deleteTeam(id) {
  if (!confirm("Are you sure you want to delete this team?")) return;
  appState.teams = appState.teams.filter((t) => t.id !== id);
  saveAppState();
  addNotification("✅ Team deleted", "new");
  populateAdminSelects();
  renderAdminTables();
  render();
}

function deleteCompetition(id) {
  if (!confirm("Are you sure you want to delete this competition?")) return;
  appState.competitions = appState.competitions.filter((c) => c.id !== id);
  saveAppState();
  addNotification("✅ Competition deleted", "new");
  populateAdminSelects();
  renderAdminTables();
  render();
}

function editFixture(id) {
  alert("Edit functionality not implemented in this repaired build.");
}

// ========== FIXTURE DETAIL MODAL ==========
function showFixtureDetail(fixture) {
  const modal = document.getElementById("fixtureDetailModal");
  if (!modal) return;

  const title = document.getElementById("fixtureDetailTitle");
  if (title) title.textContent = `${fixture.team1} vs ${fixture.team2}`;

  const detailBody = document.getElementById("fixtureDetailBody");
  if (!detailBody) return;

  const html = `
    <div class="fixture-detail-header">
      <div style="font-size: 14px; color: var(--text-muted);">🏆 ${fixture.competition}</div>
    </div>

    <div class="detail-teams">
      <div class="detail-team">
        <div class="detail-logo">${fixture.team1Logo || "⚪"}</div>
        <div class="detail-name">${fixture.team1}</div>
      </div>
      <div style="text-align: center;">
        <div class="detail-vs">VS</div>
        ${fixture.status === "Finished" && fixture.score ? `<div class="detail-score">${fixture.score}</div>` : ""}
      </div>
      <div class="detail-team">
        <div class="detail-logo">${fixture.team2Logo || "⚪"}</div>
        <div class="detail-name">${fixture.team2}</div>
      </div>
    </div>

    <div class="detail-info">
      <div class="info-row">
        <span class="info-label">📅 Date</span>
        <span class="info-value">${formatDate(fixture.date)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">⏰ Time</span>
        <span class="info-value">${fixture.time}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📍 Venue</span>
        <span class="info-value">${fixture.venue}</span>
      </div>
      <div class="info-row">
        <span class="info-label">🏆 Competition</span>
        <span class="info-value">${fixture.competition}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📊 Status</span>
        <span class="info-value">${fixture.status}</span>
      </div>
    </div>
  `;

  detailBody.innerHTML = html;
  modal.classList.remove("hidden");
}

function closeFixtureDetail() {
  document.getElementById("fixtureDetailModal")?.classList.add("hidden");
}

// Close modals on background click
document.addEventListener("click", (e) => {
  if (e.target?.id === "fixtureDetailModal") closeFixtureDetail();
  if (e.target?.id === "notificationsModal") closeNotifications();
});

// ========== SOCIAL SHARING ==========
function shareFixture(platform) {
  const fixture = getCurrentFixture();
  if (!fixture) return;

  const text = `Check out this match: ${fixture.team1} vs ${fixture.team2} on ${formatDate(fixture.date)}!`;
  const url = window.location.href;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(text)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
  };

  window.open(shareUrls[platform], "_blank", "width=600,height=400");
}

function getCurrentFixture() {
  return appState.fixtures[0] || null;
}

// ========== NOTIFICATIONS ==========
function addNotification(message, type = "info") {
  const notification = {
    id: Date.now(),
    message,
    type,
    timestamp: new Date().toLocaleTimeString(),
  };

  appState.notifications.unshift(notification);
  if (appState.notifications.length > 10) appState.notifications.pop();

  appState.showNotifications = appState.notifications.length;
  updateNotificationBell();
  saveAppState();
}

function updateNotificationBell() {
  const bell = document.getElementById("notifBell");
  if (!bell) return;
  bell.textContent =
    appState.showNotifications > 0 ? `🔔${appState.showNotifications}` : "🔔";
}

function showLiveAlerts() {
  const modal = document.getElementById("notificationsModal");
  const list = document.getElementById("notificationsList");
  if (!modal || !list) return;

  const { live, upcoming } = getUpcomingAndLiveFixtures();
  list.innerHTML = "";

  const makeSection = (title, items) => {
    const header = document.createElement("div");
    header.style.cssText =
      "font-weight:800; margin-top:12px; color: var(--primary-color);";
    header.textContent = title;
    list.appendChild(header);

    if (!items.length) {
      const empty = document.createElement("p");
      empty.style.cssText = "text-align:center; color: var(--text-muted);";
      empty.textContent = `No ${title.toLowerCase()} fixtures`;
      list.appendChild(empty);
      return;
    }

    items.forEach((f) => {
      const div = document.createElement("div");
      div.className = "notification-item";
      div.innerHTML = `
        <div style="font-weight:700;">${f.team1} vs ${f.team2}</div>
        <div class="notification-time">📅 ${formatDate(f.date)} • ⏰ ${f.time}<br/>🏆 ${f.competition}</div>
      `;
      div.style.cursor = "pointer";
      div.addEventListener("click", () => showFixtureDetail(f));
      list.appendChild(div);
    });
  };

  makeSection("🔴 Live Matches", live);
  makeSection("🔵 Upcoming Matches", upcoming);
  modal.classList.remove("hidden");
}

function getUpcomingAndLiveFixtures() {
  const now = new Date();
  const toDateTime = (f) => new Date(`${f.date}T${f.time}`);

  const live = appState.fixtures.filter((f) => f.status === "Live");
  const upcoming = appState.fixtures.filter((f) => {
    if (f.status !== "Upcoming") return false;
    return toDateTime(f).getTime() >= now.setHours(0, 0, 0, 0);
  });

  const sortByDateTime = (a, b) => toDateTime(a) - toDateTime(b);
  live.sort(sortByDateTime);
  upcoming.sort(sortByDateTime);
  return { live, upcoming };
}

function showNotifications() {
  const modal = document.getElementById("notificationsModal");
  const list = document.getElementById("notificationsList");
  if (!modal || !list) return;

  list.innerHTML = "";
  if (appState.notifications.length === 0) {
    list.innerHTML =
      '<p style="text-align: center; color: var(--text-muted);">No notifications</p>';
  } else {
    appState.notifications.forEach((notif) => {
      const div = document.createElement("div");
      div.className = `notification-item ${notif.type}`;
      div.innerHTML = `<div>${notif.message}</div><div class="notification-time">${notif.timestamp}</div>`;
      list.appendChild(div);
    });

    appState.showNotifications = 0;
    updateNotificationBell();
  }

  modal.classList.remove("hidden");
}

function closeNotifications() {
  document.getElementById("notificationsModal")?.classList.add("hidden");
}

// ========== ROUND-ROBIN TOURNAMENT GENERATOR ==========
function generateFixtures() {
  const type = document.getElementById("tournamentType")?.value || "roundrobin";
  const competition =
    document.getElementById("generatorCompetition")?.value || "";
  const startDate = document.getElementById("generatorStartDate")?.value || "";

  const selectedTeams = [];
  document
    .querySelectorAll('#teamsList2 input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      selectedTeams.push(checkbox.value);
    });

  if (selectedTeams.length < 2) {
    alert("❌ Please select at least 2 teams");
    return;
  }
  if (!competition || !startDate) {
    alert("❌ Please fill all fields");
    return;
  }

  let newFixtures = [];
  if (type === "roundrobin")
    newFixtures = generateRoundRobin(selectedTeams, competition, startDate);
  else if (type === "knockout")
    newFixtures = generateKnockout(selectedTeams, competition, startDate);

  appState.fixtures.push(...newFixtures);
  saveAppState();

  const output = document.getElementById("generatorOutput");
  if (output) {
    output.innerHTML = `
      <div style="background: var(--secondary-color); color: white; padding: 15px; border-radius: 8px;">
        ✅ Generated ${newFixtures.length} fixtures for ${selectedTeams.length} teams!
      </div>
    `;
  }

  addNotification(`✅ Generated ${newFixtures.length} fixtures`, "new");
  renderAdminTables();
  render();
}

function generateRoundRobin(teams, competition, startDate) {
  const fixtures = [];
  let fixtureDate = new Date(startDate);

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const team1 = teams[i];
      const team2 = teams[j];
      const team1Data = appState.teams.find((t) => t.name === team1);
      const team2Data = appState.teams.find((t) => t.name === team2);

      fixtures.push({
        id:
          Math.max(...appState.fixtures.map((f) => f.id), 0) +
          fixtures.length +
          1,
        team1,
        team2,
        date: fixtureDate.toISOString().split("T")[0],
        time: "15:00",
        venue: "Tournament Venue",
        competition,
        status: "Upcoming",
        score: null,
        team1Logo: team1Data?.logo || "⚪",
        team2Logo: team2Data?.logo || "⚪",
      });

      fixtureDate.setDate(fixtureDate.getDate() + 1);
    }
  }

  return fixtures;
}

function generateKnockout(teams, competition, startDate) {
  const fixtures = [];
  const rounds = Math.ceil(Math.log2(teams.length));
  let currentRound = teams;
  let fixtureDate = new Date(startDate);

  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < currentRound.length; i += 2) {
      if (i + 1 < currentRound.length) {
        const team1 = currentRound[i];
        const team2 = currentRound[i + 1];
        const team1Data = appState.teams.find((t) => t.name === team1);
        const team2Data = appState.teams.find((t) => t.name === team2);

        fixtures.push({
          id:
            Math.max(...appState.fixtures.map((f) => f.id), 0) +
            fixtures.length +
            1,
          team1,
          team2,
          date: fixtureDate.toISOString().split("T")[0],
          time: "15:00",
          venue: "Tournament Venue",
          competition: `${competition} - Round ${r + 1}`,
          status: "Upcoming",
          score: null,
          team1Logo: team1Data?.logo || "⚪",
          team2Logo: team2Data?.logo || "⚪",
        });

        fixtureDate.setDate(fixtureDate.getDate() + 1);
      }
    }

    currentRound = teams.slice(0, Math.ceil(teams.length / Math.pow(2, r + 1)));
  }

  return fixtures;
}

// ========== UTILITY FUNCTIONS ==========
function formatDate(dateString) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString + "T00:00:00").toLocaleDateString(
    "en-US",
    options,
  );
}

function getFixturesForSport(sportName) {
  const matches = appState.fixtures.filter((f) => {
    const t1 = appState.teams.find((t) => t.name === f.team1);
    const t2 = appState.teams.find((t) => t.name === f.team2);
    return t1?.sport === sportName || t2?.sport === sportName;
  });

  matches.sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),
  );

  return matches;
}

function showMatchesForCategory(sportName) {
  const modal = document.getElementById("categoryMatchesModal");
  const body = document.getElementById("categoryMatchesBody");
  const titleEl = document.getElementById("categoryMatchesTitle");
  if (!modal || !body || !titleEl) return;

  titleEl.textContent = `${sportName} Matches`;

  const matches = getFixturesForSport(sportName);
  body.innerHTML = "";

  if (!matches.length) {
    body.innerHTML = `
      <div style="text-align:center; color: var(--text-muted); padding: 18px; font-weight:600;">
        No matches yet
      </div>
    `;
  } else {
    const grid = document.createElement("div");
    grid.className = "matches-grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(260px, 1fr))";

    matches.forEach((f) => {
      const card = createFixtureCard(f, false);
      card.style.cursor = "pointer";
      card.onclick = () => showFixtureDetail(f);
      grid.appendChild(card);
    });

    body.appendChild(grid);
  }

  modal.classList.remove("hidden");
}

function closeCategoryMatches() {
  document.getElementById("categoryMatchesModal")?.classList.add("hidden");
}
