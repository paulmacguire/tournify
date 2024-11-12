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
  role: "Jugador" | "Capitan" | "Admin";
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
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/matches/tournament/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/matches/${id}`,
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

export async function getStandingsByTournament(slug: string): Promise<Team[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/tournamentSlug/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;  
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getTopScorersByTournament(slug: string): Promise<Player[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/players/tournamentSlug/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
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
  teamId: string, // este team tiene que existir previamente en la bdd!
  tournamentSlug: string
): Promise<TeamRegistration> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/teamregistrations`,
      { teamId, tournamentSlug },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
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
  try {
    await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/matches`,
      match,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}


export async function updateMatch(match: Match): Promise<void> {
  const index = matches.findIndex((m) => m.id === match.id);
  if (index !== -1) {
    matches[index] = match;
  }
}

export async function addEventToMatch(
  matchId: string,
  event: MatchEvent
): Promise<void> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/matches/${matchId}/add_event`,
      event,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log("Event added successfully:", response.data);
  } catch (error: any) {
    console.error("Failed to add event:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
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

export async function getUsersByPlayerRole() {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/users`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    const filteredUsers = response.data.filter(
      (user: User) => user.role === "Jugador" || user.role === "Capitan",
    );
    return filteredUsers;
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
  userId: string,
): Promise<void> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/remove_player`,
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
