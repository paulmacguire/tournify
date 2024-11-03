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

export async function getTournaments(): Promise<Tournament[]> {
  const tournaments: Tournament[] = [
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
  return tournaments;
}

export async function getTournamentBySlug(slug: string): Promise<Tournament | undefined> {
  const tournaments = await getTournaments();
  return tournaments.find((tournament) => tournament.slug === slug);
}

export async function getMatchesByTournament(slug: string): Promise<Match[]> {
  const matches: Match[] = [
    // Partidos Finalizados
    {
      id: '1',
      fecha: '2024-06-16',
      hora: '16:00',
      equipo1: 'Ingeniería',
      equipo2: 'Medicina',
      resultado: '2-1',
      torneoSlug: 'liga-cai-uc',
      estado: 'Finalizado',
      eventos: [
        { minuto: 10, tipo: 'Gol', jugador: 'Juan Pérez', equipo: 'Ingeniería' },
        { minuto: 45, tipo: 'Gol', jugador: 'Carlos López', equipo: 'Medicina' },
        { minuto: 70, tipo: 'Gol', jugador: 'Miguel Torres', equipo: 'Ingeniería' },
      ],
    },
    {
      id: '2',
      fecha: '2024-06-18',
      hora: '18:00',
      equipo1: 'Derecho',
      equipo2: 'Arquitectura',
      resultado: '1-1',
      torneoSlug: 'liga-cai-uc',
      estado: 'Finalizado',
      eventos: [
        { minuto: 30, tipo: 'Gol', jugador: 'Andrés Silva', equipo: 'Derecho' },
        { minuto: 60, tipo: 'Gol', jugador: 'Luis Gómez', equipo: 'Arquitectura' },
      ],
    },
    // Partidos Pendientes
    {
      id: '3',
      fecha: '2024-07-20',
      hora: '15:00',
      equipo1: 'Ingeniería',
      equipo2: 'Arquitectura',
      resultado: '',
      torneoSlug: 'liga-cai-uc',
      estado: 'Pendiente',
    },
    {
      id: '4',
      fecha: '2024-07-22',
      hora: '17:00',
      equipo1: 'Medicina',
      equipo2: 'Derecho',
      resultado: '',
      torneoSlug: 'liga-cai-uc',
      estado: 'Pendiente',
    },
    // Agrega más partidos para otros torneos si lo deseas
  ];

  return matches.filter((match) => match.torneoSlug === slug);
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  const matches = await getAllMatches();
  return matches.find((match) => match.id === id);
}

export async function getStandingsByTournament(slug: string): Promise<Team[]> {
  const standings: Team[] = [
    {
      id: 'team1',
      nombre: 'Ingeniería',
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
      nombre: 'Medicina',
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
      nombre: 'Derecho',
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
      nombre: 'Arquitectura',
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
    // Agrega más equipos para otros torneos si lo deseas
  ];
  return standings.filter((team) => team.torneoSlug === slug);
}

export async function getTopScorersByTournament(slug: string): Promise<Player[]> {
  const topScorers: Player[] = [
    { id: 'player1', nombre: 'LA GACELA CAMPOS', equipoId: 'team1', equipoNombre: 'Ingeniería', goles: 5, torneoSlug: 'liga-cai-uc' },
    { id: 'player2', nombre: 'Carlos López', equipoId: 'team2', equipoNombre: 'Medicina', goles: 4, torneoSlug: 'liga-cai-uc' },
    { id: 'player3', nombre: 'Andrés Silva', equipoId: 'team3', equipoNombre: 'Derecho', goles: 3, torneoSlug: 'liga-cai-uc' },
    // Agrega más jugadores si lo deseas
  ];
  return topScorers.filter((player) => player.torneoSlug === slug);
}

async function getAllMatches(): Promise<Match[]> {
  const tournaments = await getTournaments();
  let allMatches: Match[] = [];
  for (const tournament of tournaments) {
    const matches = await getMatchesByTournament(tournament.slug);
    allMatches = allMatches.concat(matches);
  }
  return allMatches;
}
