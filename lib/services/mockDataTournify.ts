export async function getTournaments() {
  const tournaments = [
    {
      nombre: "Liga CAI UC",
      fecha: "2024-06-15",
      ubicacion: "Santiago, Chile",
      estado: "Disponible",
      rol: "Participante",
      clasificacion: "Primera División",
      description: "Torneo de Verano 2024",
      slug: "torneo-verano-2024",
      image: "../assets/liga_cai.png",
    },
    {
      nombre: "UltraPadel",
      fecha: "2024-12-01",
      ubicacion: "Santiago, Chile",
      estado: "Disponible",
      rol: "Participante",
      clasificacion: "Segunda División",
      description: "Torneo de Invierno 2024",
      slug: "torneo-invierno-2024",
      image: "../assets/ultrapadel.jpg",
    },
    {
      nombre: "Liga Premier",
      fecha: "2024-03-20",
      ubicacion: "Santiago, Chile",
      estado: "En Proceso",
      rol: "Participante",
      clasificacion: "Tercera División",
      description: "Torneo de Primavera 2024",
      slug: "torneo-primavera-2024",
      image: "../assets/liga_premier.png",
    },
    {
      nombre: "Liga Independiente de Futbol",
      fecha: "2024-03-20",
      ubicacion: "Santiago, Chile",
      estado: "En Proceso",
      rol: "Participante",
      clasificacion: "Segunda División",
      description: "Torneo de Primavera 2024",
      slug: "torneo-otono-2024",
      image: "../assets/lif.png",
    },
  ];

  return tournaments.map((item: any) => {
    const {
      nombre,
      fecha,
      ubicación,
      estado,
      rol,
      clasificación,
      description,
      slug,
      image,
      score,
      title,
    } = item;

    return {
      nombre,
      fecha,
      ubicación,
      estado,
      rol,
      clasificación,
      description,
      slug,
      image,
      score,
      title,
    };
  });
}
