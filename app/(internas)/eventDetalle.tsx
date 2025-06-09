import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import dayjs from 'dayjs';

export default function EventDetalle() {
    const { title, content, date, image } = useLocalSearchParams();
    const router = useRouter();
    const stripHtml = (html: string) => {
        if (!html) return '';
        return html
            .replace(/<[^>]+>/g, '')       // Elimina etiquetas HTML
            .replace(/&nbsp;/g, ' ')        // Reemplaza entidades comunes
            .replace(/\n{2,}/g, '\n')       // Reduce saltos de línea múltiples
            .replace(/\s{2,}/g, ' ')        // Elimina espacios excesivos
            .trim();
    };
    const stripTags = (html: string) => {
        if (!html) return '';
        return html
            .replace(/<[^>]+>/g, '')       // Elimina todas las etiquetas HTML
            .replace(/&nbsp;/g, ' ')       // Convierte entidades
            .trim();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Pressable onPress={() => router.push("/(internas)/eventos")}>
                <Text style={styles.back}>← Volver</Text>
            </Pressable>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>
                {dayjs(date as string).format('D [de] MMMM YYYY')}
            </Text>

            {(content as string)
                .split(/<\/p>|<br\s*\/?>/i)
                .filter(paragraph => paragraph.trim().length > 0)
                .map((paragraph, index) => (
                    <Text key={index} style={styles.paragraph}>
                        {stripTags(paragraph)}
                    </Text>
                ))}

            {image ? (
                <Image source={{ uri: image as string }} style={styles.image} />
            ) : null}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    back: {
        marginBottom: 20,
        color: '#325aa6',
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        height: 400,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#162d40',
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    paragraph: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 10, // Espacio entre párrafos
    }
});
