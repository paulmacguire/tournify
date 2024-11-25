// import React, { createContext, useContext, useState } from 'react';

// const TournamentContext = createContext<{ tournamentId: string | null, setTournamentId: (id: string) => void }>({
//   tournamentId: null,
//   setTournamentId: () => {},
// });

// export const TournamentProvider = ({ children }: { children: React.ReactNode }) => {
//   const [tournamentId, setTournamentId] = useState<string | null>(null);

//   return (
//     <TournamentContext.Provider value={{ tournamentId, setTournamentId }}>
//       {children}
//     </TournamentContext.Provider>
//   );
// };

// export const useTournament = () => useContext(TournamentContext);
