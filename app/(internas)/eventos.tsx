import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import 'dayjs/locale/es';

dayjs.locale('es');

interface Eventos {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    acf?: {
        fecha_evento?: string;
    };
    embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
            media_details?: {
                sizes?: {
                    thumbnail?: {
                        source_url: string;
                    };
                    medium?: {
                        source_url: string;
                    };
                    full?: {
                        source_url: string;
                    };
                };
            };
        }>;
    };
}

export default function Eventos() {
    const router = useRouter();
    const { isAuth } = useAuth();
    const [eventos, setEventos] = React.useState<Eventos[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month());
    const currentYear = dayjs().year();

    const meses = Array.from({ length: 3 }, (_, i) => {
        const date = dayjs().add(i, 'month');
        return { label: date.format('MMMM'), month: date.month(), year: date.year() };
    });

    useEffect(() => {
        const getEventos = async () => {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/wp/v2/posts?categories=5&_embed`, {
                headers: { "content-type": "application/json" }
            });
            const data = await response.json();
            setEventos(data);
        };
        getEventos();
    }, []);
    
    const eventosFiltrados = eventos.filter(evento => {
        const fecha = evento.acf?.fecha_evento;
        if (!fecha) return false;

        const fechaEvento = dayjs(fecha);
        return fechaEvento.month() === selectedMonth && fechaEvento.year() === currentYear;
    });

    if (!isAuth) {
        return <Redirect href="/" />;
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/images/back_header.png")}
                style={styles.header}
                resizeMode="cover">
                <Text style={styles.title}>Eventos</Text>
            </ImageBackground>

            {/* Botones de los 3 meses */}
            <View style={styles.monthsContainer}>
                {meses.map((mes, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.monthButton,
                            selectedMonth === mes.month && styles.monthButtonActive
                        ]}
                        onPress={() => setSelectedMonth(mes.month)}
                    >
                        <Text style={[
                            styles.monthButtonText,
                            selectedMonth === mes.month && styles.monthButtonTextActive
                        ]}>
                            {mes.label.charAt(0).toUpperCase() + mes.label.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Lista de eventos o mensaje */}
            <View style={{ flex: 1, padding: 10 }}>
                {eventosFiltrados.length > 0 ? (
                    <FlatList
                        data={eventosFiltrados}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/(internas)/eventDetalle",
                                        params: {
                                            id: item.id,
                                            title: item.title.rendered,
                                            content: item.content.rendered,
                                            date: item.acf?.fecha_evento ?? '',
                                            image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? '',
                                        }
                                    })
                                }
                            >
                                <View style={styles.card}>
                                    <Text style={styles.eventTitle}>{item.title.rendered}</Text>
                                    <Text style={styles.eventDate}>
                                        {dayjs(item.acf?.fecha_evento).format("D [de] MMMM YYYY")}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text style={styles.noEventsText}>Este mes no hay eventos</Text>
                )}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        width: "105%",
        height: 70,
        justifyContent: "center",
        paddingVertical: 10,
        paddingLeft: 20
    },
    title: {
        fontSize: 12,
        fontWeight: "300",
        textTransform: "uppercase",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#325aa6",
        color: '#162d40',
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 10,
        width: 120,
    },
    monthsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    monthButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    monthButtonActive: {
        backgroundColor: '#325aa6',
        borderColor: '#325aa6',
    },
    monthButtonText: {
        fontSize: 14,
        color: '#333',
    },
    monthButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f0f4ff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventDate: {
        fontSize: 14,
        color: '#555',
    },
    noEventsText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
    }
});