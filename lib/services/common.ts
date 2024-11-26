import axios from "axios";

export interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  state: string;
  rol: string;
  classification: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  Teams: Team[];
  Matches: Match[];
  Organizer: string;
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
  tournamentId: string;
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
  goals: number;
  name: string;
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
  name1?: string;
  name2?: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  result: string;
  tournamentId: string;
  status: "Pendiente" | "Finalizado";
  events?: MatchEvent[];
}

export interface User {
  id: string;
  name: string;
  role: "Jugador" | "Capitan" | "Admin";
  email: string;
}

interface TeamResponse {
  data: Team | undefined;
  status: number;
}

interface MatchesResponse {
  data: Match[];
  status: number;
}

interface TournamentResponse {
  data: Tournament[];
  status: number;
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

export async function getTournament(id: string): Promise<TournamentResponse> {
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
    return { data: response.data, status: response.status };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getMatchesByTournament(id: string): Promise<MatchesResponse> {
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
    return { data: response.data.matches, status: response.status };
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
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getTopScorersByTournament(
  id: string,
): Promise<Player[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/tournaments/${id}/top-scorers`,
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
  tournamentId: string,
): Promise<TeamRegistration> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/tournaments/${tournamentId}/add_team`,
      { team_id: teamId },
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

export async function getTeamRegistrationsByTournament(
  teamId: string,
  tournamentId: string,
): Promise<TeamRegistration[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/${teamId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("Registrations:", response.data);
    console.log("Tournament ID:", tournamentId);
    const tournament_id = response.data.tournamentId
    if (tournament_id == tournamentId) {
      return "Aceptado";
    }
    return "No Registrado";
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateTeamRegistrationStatus(
  registrationId: string,
  status: "Aceptado" | "Rechazado",
): Promise<void> {
  try {
    await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/teamregistrations/${registrationId}/status`,
      { status },
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

export async function createMatch(match: Match): Promise<void> {
  try {
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/matches`, match, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function updateMatch(match: Match): Promise<void> {
  try {
    const response = await axios.put(
      `${process.env.EXPO_PUBLIC_API_URL}/matches/${match.id}`,
      match,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("Match updated:", response.data);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function addEventToMatch(
  matchId: string,
  event: MatchEvent,
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
      },
    );
    console.log("Event added successfully:", response.data);
  } catch (error: any) {
    console.error(
      "Failed to add event:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || error.message);
  }
}

/**
 * Fetches a team by the captain's ID.
 *
 * @param captainId - The ID of the captain.
 * @returns A promise that resolves to an object containing the team data and the response status, or undefined if not found.
 * @throws Will throw an error if the request fails.
 */

export async function getTeamByCaptainId(
  captainId: string,
): Promise<TeamResponse> {
  console.log("captainId:", captainId);
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
    console.log("Team:", response.data);

    return { data: response.data, status: response.status };
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
