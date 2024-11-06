import axios from "axios";

export interface Tournament {
  id: string;
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
  Players: Player[];
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
  teamId: string;
  userId: string;
  teamName: string;
  User: User;
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

export async function getTournaments(): Promise<Tournament[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/tournaments/`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getTournamentById(
  id: string,
): Promise<Tournament | undefined> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/tournaments/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
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

export async function getTeamById(id: string): Promise<Team | undefined> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
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
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/captain/${captainId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function addPlayerToTeam(
  teamId: string,
  userId: string,
): Promise<void> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/add_player`,
      { team_id: teamId, user_id: userId },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
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
