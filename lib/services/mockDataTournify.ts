// lib/services/mockDataTournify.ts

export interface Tournament {
  nombre: string;
  fecha: string;
  ubicacion: string;
  estado: string;
  rol: string;
  clasificacion: string;
  description: string;
  slug: string;
  image: any; // Acepta 'require' de imágenes
  organizador: string;
}

export interface Team {
  id: string;
  nombre: string;
  capitanId: string;
  jugadores: string[]; 

  puntos: number;
  partidosJugados: number;
  partidosGanados: number;
  partidosEmpatados: number;
  partidosPerdidos: number;
  golesFavor: number;
  golesContra: number;
  diferenciaGoles: number;
  torneoSlug: string;
}


export interface TeamRegistration {
  id: string;
  equipoId: string;
  torneoSlug: string;
  estado: 'Pendiente' | 'Aceptado' | 'Rechazado';
}

export interface Player {
  id: string;
  nombre: string;
  equipoId: string;
  equipoNombre: string;
  goles: number;
  torneoSlug: string;
}

export interface MatchEvent {
  minuto: number;
  tipo: 'Gol' | 'Tarjeta Amarilla' | 'Tarjeta Roja' | 'Sustitución';
  jugador: string;
  equipo: string;
  detalle?: string;
}

export interface Match {
  id: string;
  fecha: string;
  hora: string;
  equipo1: string;
  equipo2: string;
  resultado: string;
  torneoSlug: string;
  estado: 'Pendiente' | 'Finalizado';
  eventos?: MatchEvent[];
}

export interface User {
  id: string;
  nombre: string;
  rol: 'Usuario' | 'Capitan' | 'Admin';
}

// Datos simulados
let tournaments: Tournament[] = [
  {
    nombre: "Liga CAI UC",
    fecha: "2024-06-15",
    ubicacion: "Santiago, Chile",
    estado: "Disponible",
    rol: "Participante",
    clasificacion: "Universitario",
    description: "Torneo Universitario Ingeniería UC",
    slug: "liga-cai-uc",
    image: require("../../assets/liga_cai.png"),
    organizador: "Diego Astudillo",
  },
  {
    nombre: "UltraFutbol",
    fecha: "2024-12-01",
    ubicacion: "Santiago, Chile",
    estado: "Disponible",
    rol: "Participante",
    clasificacion: "Amateur",
    description: "Torneo corporativo CCU",
    slug: "ultrapadel",
    image: require("../../assets/ultrapadel.jpg"),
    organizador: "Francisco Campos",
  },
  // Puedes agregar más torneos si lo deseas
];

let teams: Team[] = [
  {
    id: 'team1',
    nombre: 'Ingeniería FC',
    capitanId: 'user2', // ID del capitán
    jugadores: ['user2', 'user3', 'user4'],
    puntos: 9,
    partidosJugados: 3,
    partidosGanados: 3,
    partidosEmpatados: 0,
    partidosPerdidos: 0,
    golesFavor: 8,
    golesContra: 2,
    diferenciaGoles: 6,
    torneoSlug: 'liga-cai-uc',
  },
  {
    id: 'team2',
    nombre: 'Medicina United',
    capitanId: 'user5',
    jugadores: ['user5', 'user6', 'user7'],
    puntos: 6,
    partidosJugados: 3,
    partidosGanados: 2,
    partidosEmpatados: 0,
    partidosPerdidos: 1,
    golesFavor: 5,
    golesContra: 3,
    diferenciaGoles: 2,
    torneoSlug: 'liga-cai-uc',
  },
  {
    id: 'team3',
    nombre: 'Derecho Club',
    capitanId: 'user8',
    jugadores: ['user8', 'user9', 'user10'],
    puntos: 4,
    partidosJugados: 3,
    partidosGanados: 1,
    partidosEmpatados: 1,
    partidosPerdidos: 1,
    golesFavor: 3,
    golesContra: 4,
    diferenciaGoles: -1,
    torneoSlug: 'liga-cai-uc',
  },
  {
    id: 'team4',
    nombre: 'Arquitectura SC',
    capitanId: 'user11',
    jugadores: ['user11', 'user12', 'user13'],
    puntos: 1,
    partidosJugados: 3,
    partidosGanados: 0,
    partidosEmpatados: 1,
    partidosPerdidos: 2,
    golesFavor: 2,
    golesContra: 6,
    diferenciaGoles: -4,
    torneoSlug: 'liga-cai-uc',
  },
  // Add more teams as needed
];


let teamRegistrations: TeamRegistration[] = [
  {
    id: 'reg1',
    equipoId: 'team1',
    torneoSlug: 'liga-cai-uc',
    estado: 'Pendiente',
  },
  // Agrega más registros si es necesario
];

let matches: Match[] = [
  // Partidos Finalizados
  {
    id: '1',
    fecha: '2024-06-16',
    hora: '16:00',
    equipo1: 'Ingeniería FC',
    equipo2: 'Medicina United',
    resultado: '2-1',
    torneoSlug: 'liga-cai-uc',
    estado: 'Finalizado',
    eventos: [
      { minuto: 10, tipo: 'Gol', jugador: 'Juan Pérez', equipo: 'Ingeniería FC' },
      { minuto: 45, tipo: 'Gol', jugador: 'Carlos López', equipo: 'Medicina United' },
      { minuto: 70, tipo: 'Gol', jugador: 'Miguel Torres', equipo: 'Ingeniería FC' },
    ],
  },
  {
    id: '2',
    fecha: '2024-06-18',
    hora: '18:00',
    equipo1: 'Derecho Club',
    equipo2: 'Arquitectura SC',
    resultado: '1-1',
    torneoSlug: 'liga-cai-uc',
    estado: 'Finalizado',
    eventos: [
      { minuto: 30, tipo: 'Gol', jugador: 'Andrés Silva', equipo: 'Derecho Club' },
      { minuto: 60, tipo: 'Gol', jugador: 'Luis Gómez', equipo: 'Arquitectura SC' },
    ],
  },
  // Partidos Pendientes
  {
    id: '3',
    fecha: '2024-07-20',
    hora: '15:00',
    equipo1: 'Ingeniería FC',
    equipo2: 'Arquitectura SC',
    resultado: '',
    torneoSlug: 'liga-cai-uc',
    estado: 'Pendiente',
  },
  {
    id: '4',
    fecha: '2024-07-22',
    hora: '17:00',
    equipo1: 'Medicina United',
    equipo2: 'Derecho Club',
    resultado: '',
    torneoSlug: 'liga-cai-uc',
    estado: 'Pendiente',
  },
  // Agrega más partidos si lo deseas
];

let players: Player[] = [
  { id: 'player1', nombre: 'LA GACELA CAMPOS', equipoId: 'team1', equipoNombre: 'Ingeniería FC', goles: 5, torneoSlug: 'liga-cai-uc' },
  { id: 'player2', nombre: 'Carlos López', equipoId: 'team2', equipoNombre: 'Medicina United', goles: 4, torneoSlug: 'liga-cai-uc' },
  { id: 'player3', nombre: 'Andrés Silva', equipoId: 'team3', equipoNombre: 'Derecho Club', goles: 3, torneoSlug: 'liga-cai-uc' },
  // Agrega más jugadores si lo deseas
];

let currentUser: User = {
  id: 'user2',
  nombre: 'Diego Astudillo',
  rol: 'Capitan',
};

// Funciones para obtener datos

export async function getTournaments(): Promise<Tournament[]> {
  return tournaments;
}

export async function getTournamentBySlug(slug: string): Promise<Tournament | undefined> {
  return tournaments.find((tournament) => tournament.slug === slug);
}

export async function getMatchesByTournament(slug: string): Promise<Match[]> {
  return matches.filter((match) => match.torneoSlug === slug);
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  return matches.find((match) => match.id === id);
}

export async function getStandingsByTournament(slug: string): Promise<Team[]> {
  return teams.filter((team) => team.torneoSlug === slug);
}


export async function getTopScorersByTournament(slug: string): Promise<Player[]> {
  return players.filter((player) => player.torneoSlug === slug);
}

export async function getCurrentUser(): Promise<User> {
  return currentUser;
}

export async function getTeamById(id: string): Promise<Team | undefined> {
  return teams.find((team) => team.id === id);
}

export async function registerTeamToTournament(equipoId: string, torneoSlug: string): Promise<TeamRegistration> {
  const newRegistration: TeamRegistration = {
    id: `reg${teamRegistrations.length + 1}`,
    equipoId,
    torneoSlug,
    estado: 'Pendiente',
  };
  teamRegistrations.push(newRegistration);
  return newRegistration;
}

export async function getTeamRegistrationsByTournament(torneoSlug: string): Promise<TeamRegistration[]> {
  return teamRegistrations.filter((reg) => reg.torneoSlug === torneoSlug);
}

export async function updateTeamRegistrationStatus(registrationId: string, estado: 'Aceptado' | 'Rechazado'): Promise<void> {
  const registration = teamRegistrations.find((reg) => reg.id === registrationId);
  if (registration) {
    registration.estado = estado;
  }
}

export async function getTeamsByTournament(torneoSlug: string): Promise<Team[]> {
  // Obtener los equipos que han sido aceptados en el torneo
  const acceptedRegistrations = teamRegistrations.filter(
    (reg) => reg.torneoSlug === torneoSlug && reg.estado === 'Aceptado'
  );

  const teamIds = acceptedRegistrations.map((reg) => reg.equipoId);
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

export async function addEventToMatch(matchId: string, event: MatchEvent): Promise<void> {
  const match = matches.find((m) => m.id === matchId);
  if (match) {
    if (!match.eventos) {
      match.eventos = [];
    }
    match.eventos.push(event);
  }
}

export async function getTeamByCaptainId(captainId: string): Promise<Team | undefined> {
  return teams.find((team) => team.capitanId === captainId);
}

export async function addPlayerToTeam(teamId: string, playerName: string): Promise<void> {
  const team = teams.find((t) => t.id === teamId);
  if (team) {
    team.jugadores.push(playerName);
  }
}

export async function removePlayerFromTeam(teamId: string, playerName: string): Promise<void> {
  const team = teams.find((t) => t.id === teamId);
  if (team) {
    team.jugadores = team.jugadores.filter((player) => player !== playerName);
  }
}
