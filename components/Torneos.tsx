import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

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
        }, 1000); // 1 segundo de delay simulado

    }, []);

    if (loading) {
        return (
            <View className="flex">
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando torneos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={torneos}
                keyExtractor={(torneo) => torneo.ID_Torneo.toString()}
                renderItem={({ item }) => (
                    // <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    //     <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Nombre}</Text>
                    //     <Text>Fecha: {item.Fecha}</Text>
                    //     <Text>Ubicación: {item.Ubicación}</Text>
                    //     <Text>Estado: {item.Estado}</Text>
                    //     <Text>Clasificación: {item.Clasificación}</Text>
                    // </View>
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Nombre}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{item.Fecha}</Text>
                            <Text>{item.Ubicación}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Estado: {item.Estado}</Text>
                            <Text>{item.Clasificación}</Text>
                        </View>
                    </View>

                )}
            />
        </View>
    );
};

export default Torneos;
