export interface Tournament {
  name: string;
  date: string;
  location: string;
  state: string;
  rol: string;
  classification: string;
  description: string;
  slug: string;
  image: any;
  organizer: string;
}

export interface Team {
  id: string;
  name: string;
  captainId: string;
  players: string[];

  points: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesDrawn: number;
  matchesLost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  tournamentSlug: string;
}

export interface TeamRegistration {
  id: string;
  teamId: string;
  tournamentSlug: string;
  status: "Pendiente" | "Aceptado" | "Rechazado";
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  goals: number;
  tournamentSlug: string;
}

export interface MatchEvent {
  minute: number;
  type: "Gol" | "Tarjeta Amarilla" | "Tarjeta Roja" | "Sustitución";
  player: string;
  team: string;
  detail?: string;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  result: string;
  tournamentSlug: string;
  status: "Pendiente" | "Finalizado";
  events?: MatchEvent[];
}

export interface User {
  id: string;
  name: string;
  role: "Usuario" | "Capitan" | "Admin";
}

let tournaments: Tournament[] = [
  {
    name: "Liga CAI UC",
    date: "2024-06-15",
    location: "Santiago, Chile",
    state: "Disponible",
    rol: "Participante",
    classification: "Universitario",
    description: "Torneo Universitario Ingeniería UC",
    slug: "liga-cai-uc",
    image: require("../../assets/liga_cai.png"),
    organizer: "Diego Astudillo",
  },
  {
    name: "UltraFutbol",
    date: "2024-12-01",
    location: "Santiago, Chile",
    state: "Disponible",
    rol: "Participante",
    classification: "Amateur",
    description: "Torneo corporativo CCU",
    slug: "ultrapadel",
    image: require("../../assets/ultrapadel.jpg"),
    organizer: "Francisco Campos",
  },
];

let teams: Team[] = [
  {
    id: "team1",
    name: "Ingeniería",
    captainId: "user2",
    players: ["user2", "user3", "user4"],
    points: 9,
    matchesPlayed: 3,
    matchesWon: 3,
    matchesDrawn: 0,
    matchesLost: 0,
    goalsFor: 8,
    goalsAgainst: 2,
    goalDifference: 6,
    tournamentSlug: "liga-cai-uc",
  },
  {
    id: "team2",
    name: "Medicina",
    captainId: "user5",
    players: ["user5", "user6", "user7"],
    points: 6,
    matchesPlayed: 3,
    matchesWon: 2,
    matchesDrawn: 0,
    matchesLost: 1,
    goalsFor: 5,
    goalsAgainst: 3,
    goalDifference: 2,
    tournamentSlug: "liga-cai-uc",
  },
  {
    id: "team3",
    name: "Derecho",
    captainId: "user8",
    players: ["user8", "user9", "user10"],
    points: 4,
    matchesPlayed: 3,
    matchesWon: 1,
    matchesDrawn: 1,
    matchesLost: 1,
    goalsFor: 3,
    goalsAgainst: 4,
    goalDifference: -1,
    tournamentSlug: "liga-cai-uc",
  },
  {
    id: "team4",
    name: "Arquitectura",
    captainId: "user11",
    players: ["user11", "user12", "user13"],
    points: 1,
    matchesPlayed: 3,
    matchesWon: 0,
    matchesDrawn: 1,
    matchesLost: 2,
    goalsFor: 2,
    goalsAgainst: 6,
    goalDifference: -4,
    tournamentSlug: "liga-cai-uc",
  },
];

let teamRegistrations: TeamRegistration[] = [
  {
    id: "reg1",
    teamId: "team1",
    tournamentSlug: "liga-cai-uc",
    status: "Aceptado",
  },
  {
    id: "reg2",
    teamId: "team2",
    tournamentSlug: "liga-cai-uc",
    status: "Aceptado",
  },
  {
    id: "reg3",
    teamId: "team3",
    tournamentSlug: "liga-cai-uc",
    status: "Aceptado",
  },
  {
    id: "reg4",
    teamId: "team4",
    tournamentSlug: "liga-cai-uc",
    status: "Aceptado",
  },
];

let matches: Match[] = [
  {
    id: "1",
    date: "2024-06-16",
    time: "16:00",
    team1: "Ingeniería",
    team2: "Medicina",
    result: "2-1",
    tournamentSlug: "liga-cai-uc",
    status: "Finalizado",
    events: [
      { minute: 10, type: "Gol", player: "Juan Pérez", team: "Ingeniería FC" },
      {
        minute: 45,
        type: "Gol",
        player: "Carlos López",
        team: "Medicina United",
      },
      {
        minute: 70,
        type: "Gol",
        player: "Miguel Torres",
        team: "Ingeniería FC",
      },
    ],
  },
  {
    id: "2",
    date: "2024-06-18",
    time: "18:00",
    team1: "Derecho",
    team2: "Arquitectura",
    result: "1-1",
    tournamentSlug: "liga-cai-uc",
    status: "Finalizado",
    events: [
      { minute: 30, type: "Gol", player: "Andrés Silva", team: "Derecho Club" },
      {
        minute: 60,
        type: "Gol",
        player: "Luis Gómez",
        team: "Arquitectura SC",
      },
    ],
  },
  // Partidos Pendientes
  {
    id: "3",
    date: "2024-07-20",
    time: "15:00",
    team1: "Ingeniería",
    team2: "Arquitectura",
    result: "",
    tournamentSlug: "liga-cai-uc",
    status: "Pendiente",
  },
  {
    id: "4",
    date: "2024-07-22",
    time: "17:00",
    team1: "Medicina",
    team2: "Derecho",
    result: "",
    tournamentSlug: "liga-cai-uc",
    status: "Pendiente",
  },
];

let players: Player[] = [
  {
    id: "player1",
    name: "LA GACELA CAMPOS",
    teamId: "team1",
    teamName: "Ingeniería",
    goals: 5,
    tournamentSlug: "liga-cai-uc",
  },
  {
    id: "player2",
    name: "Carlos López",
    teamId: "team2",
    teamName: "Medicina",
    goals: 4,
    tournamentSlug: "liga-cai-uc",
  },
  {
    id: "player3",
    name: "Andrés Silva",
    teamId: "team3",
    teamName: "Derecho",
    goals: 3,
    tournamentSlug: "liga-cai-uc",
  },
];
//cambiar el rol para ir intercalando entre las vistas, los roles son Capitan, Usuario y Admin
let currentUser: User = {
  id: "user2",
  name: "Diego Astudillo",
  role: "Admin",
};

export async function getTournaments(): Promise<Tournament[]> {
  return tournaments;
}

export async function getTournamentBySlug(
  slug: string,
): Promise<Tournament | undefined> {
  return tournaments.find((tournament) => tournament.slug === slug);
}

export async function getMatchesByTournament(slug: string): Promise<Match[]> {
  return matches.filter((match) => match.tournamentSlug === slug);
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  return matches.find((match) => match.id === id);
}

export async function getStandingsByTournament(slug: string): Promise<Team[]> {
  return teams.filter((team) => team.tournamentSlug === slug);
}

export async function getTopScorersByTournament(
  slug: string,
): Promise<Player[]> {
  return players.filter((player) => player.tournamentSlug === slug);
}

export async function getCurrentUser(): Promise<User> {
  return currentUser;
}

export async function getTeamById(id: string): Promise<Team | undefined> {
  return teams.find((team) => team.id === id);
}

export async function registerTeamToTournament(
  teamId: string,
  tournamentSlug: string,
): Promise<TeamRegistration> {
  const newRegistration: TeamRegistration = {
    id: `reg${teamRegistrations.length + 1}`,
    teamId,
    tournamentSlug,
    status: "Pendiente",
  };
  teamRegistrations.push(newRegistration);
  return newRegistration;
}

export async function getTeamRegistrationsByTournament(
  tournamentSlug: string,
): Promise<TeamRegistration[]> {
  return teamRegistrations.filter(
    (reg) => reg.tournamentSlug === tournamentSlug,
  );
}

export async function updateTeamRegistrationStatus(
  registrationId: string,
  status: "Aceptado" | "Rechazado",
): Promise<void> {
  const registration = teamRegistrations.find(
    (reg) => reg.id === registrationId,
  );
  if (registration) {
    registration.status = status;
  }
}

export async function getTeamsByTournament(
  tournamentSlug: string,
): Promise<Team[]> {
  const acceptedRegistrations = teamRegistrations.filter(
    (reg) => reg.tournamentSlug === tournamentSlug && reg.status === "Aceptado",
  );

  const teamIds = acceptedRegistrations.map((reg) => reg.teamId);
  return teams.filter((team) => teamIds.includes(team.id));
}

export async function createMatch(match: Match): Promise<void> {
  matches.push(match);
}

export async function updateMatch(match: Match): Promise<void> {
  const index = matches.findIndex((m) => m.id === match.id);
  if (index !== -1) {
    matches[index] = match;
  }
}

export async function addEventToMatch(
  matchId: string,
  event: MatchEvent,
): Promise<void> {
  const match = matches.find((m) => m.id === matchId);
  if (match) {
    if (!match.events) {
      match.events = [];
    }
    match.events.push(event);
  }
}

export async function getTeamByCaptainId(
  captainId: string,
): Promise<Team | undefined> {
  return teams.find((team) => team.captainId === captainId);
}

export async function addPlayerToTeam(
  teamId: string,
  playerName: string,
): Promise<void> {
  const team = teams.find((t) => t.id === teamId);
  if (team) {
    team.players.push(playerName);
  }
}

export async function removePlayerFromTeam(
  teamId: string,
  playerName: string,
): Promise<void> {
  const team = teams.find((t) => t.id === teamId);
  if (team) {
    team.players = team.players.filter((player) => player !== playerName);
  }
}
