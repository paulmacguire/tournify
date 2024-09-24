import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from '../assets/Styles/Torneos';

interface Torneo {
    ID_Torneo: number;
    Nombre: string;
    Fecha: string;
    Ubicación: string;
    Estado: string;
    Clasificación: string;
    ID_Organizador: number;
}

const Torneos: React.FC = () => {
    const [torneos, setTorneos] = useState<Torneo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Datos de torneos simulados
        const torneosSimulados: Torneo[] = [
            {
                ID_Torneo: 1,
                Nombre: "Torneo de Verano",
                Fecha: "15-11-2024",
                Ubicación: "Santiago",
                Estado: "Activo",
                Clasificación: "Ping Pong",
                ID_Organizador: 101
            },
            {
                ID_Torneo: 2,
                Nombre: "Torneo de Otoño",
                Fecha: "30-10-2024",
                Ubicación: "Concepción",
                Estado: "Activo",
                Clasificación: "Baloncesto",
                ID_Organizador: 102
            },
            {
                ID_Torneo: 3,
                Nombre: "Copa Primavera",
                Fecha: "15-09-2024",
                Ubicación: "La Serena",
                Estado: "Finalizado",
                Clasificación: "Fútbol",
                ID_Organizador: 103
            }
        ];

        // Simulando el tiempo de carga
        setTimeout(() => {
            setTorneos(torneosSimulados);
            setLoading(false);
        }, 1000);

    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Cargando torneos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={torneos}
                keyExtractor={(torneo) => torneo.ID_Torneo.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.Nombre}</Text>
                        <View style={styles.row}>
                            <Text>{item.Fecha}</Text>
                            <Text>{item.Ubicación}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>
                                Estado: <Text style={{ color: item.Estado === 'Finalizado' ? 'red' : 'blue' }}>{item.Estado}</Text>
                            </Text>
                            <Text style={styles.boldText}>{item.Clasificación}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default Torneos;
