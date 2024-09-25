// mockDataTournify.ts

export async function getTournaments() {
  const tournaments = [
    {
      nombre: "Liga CAI UC",
      fecha: "2024-06-15",
      ubicacion: "Santiago, Chile",
      estado: "Disponible",
      rol: "Participante",
      clasificacion: "Universitario",
      description: "Torneo Universitario Ingeniería UC",
      slug: "torneo-verano-2024",
      image: "../assets/liga_cai.png",
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
      slug: "torneo-invierno-2024",
      image: "../assets/ultrapadel.jpg",
      organizador: "Francisco Campos",
    },
    {
      nombre: "Liga Premier",
      fecha: "2024-03-20",
      ubicacion: "Santiago, Chile",
      estado: "En Proceso",
      rol: "Participante",
      clasificacion: "Amateur",
      description: "Liga Amateur de futbol",
      slug: "torneo-primavera-2024",
      image: "../assets/liga_premier.png",
      organizador: "Paul MacGuire",
    },
    {
      nombre: "Liga Independiente de Futbol",
      fecha: "2024-03-20",
      ubicacion: "Santiago, Chile",
      estado: "En Proceso",
      rol: "Participante",
      clasificacion: "Amateur",
      description: "Liga Independiente de futbol",
      slug: "torneo-otono-2024",
      image: "../assets/lif.png",
      organizador: "Michele Grimaldos",
    },
  ];

  return tournaments;
}
