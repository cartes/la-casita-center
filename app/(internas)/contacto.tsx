import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import MapView, { Marker } from "react-native-maps";

export default function Contacto() {
    const router = useRouter();

    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={styles.container}>
                <View style={styles.contactoInfoContainer}>
                    <Image source={require('../../assets/images/logo_casita.png')} style={{ width: 80, height: 70, resizeMode: 'contain' }} />
                    <Text style={styles.textInfo}>
                        Actualmente La Casita se encuentra operando y brindando todos sus servicios a través de nuestras líneas telefónicas.
                    </Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 12, color: '#6f7f89', textAlign: 'center', width: '80%', borderBottomColor: '#325aa6', borderBottomWidth: 1, paddingBottom: 5 }}>
                        DIRECCIÓN
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignItems: 'center', marginTop: 10 }}>
                        <Ionicons name="location" size={32} color="#ea6a7d" />
                        <Text style={{ fontSize: 14, width: '50%', color: '#325aa6', paddingLeft: 10, textAlign: 'center' }}>
                            223 E Magnolia Ave Louisville, KY 40208
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignItems: 'center', marginTop: 5 }}>
                        <MapView
                            style={{ width: '100%', height: 200, borderRadius: 5 }}
                            initialRegion={{
                                latitude: 38.2249,
                                longitude: -85.7541,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}>
                            <Marker
                                coordinate={{ latitude: -33.4489, longitude: -70.6693 }}
                                title={"La Casita Center"}
                                description={"223 E Magnolia Ave Louisville, KY 40208"}
                            />
                        </MapView>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 12, color: '#6f7f89', textAlign: 'center', width: '80%', borderBottomColor: '#325aa6', borderBottomWidth: 1, paddingBottom: 5 }}>
                        CONTACTO
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignItems: 'center', marginTop: 10 }}>
                        <Ionicons name="call" size={32} color="#ea6a7d" />
                        <Text style={{ fontSize: 14, width: '50%', color: '#325aa6', paddingLeft: 10, textAlign: 'left' }}>
                            (502) 322-4036
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignItems: 'center', marginTop: 10 }}>
                        <Ionicons name="mail-outline" size={32} color="#ea6a7d" />
                        <Text style={{ fontSize: 14, width: '52%', color: '#325aa6', paddingLeft: 10, textAlign: 'left' }}>
                            info@lacasitacenter.org
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
                    <Text style={{ fontSize: 12, color: '#6f7f89', textAlign: 'center', width: '80%', borderBottomColor: '#325aa6', borderBottomWidth: 1, paddingBottom: 5 }}>
                        REDES SOCIALES
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', alignItems: 'center', marginTop: 10 }}>
                        <Link href="https://www.instagram.com/lacasitacenter/" style={{ paddingRight: 10 }}>
                            <Image source={require('../../assets/images/logo_insta.png')} style={{ width: 32, height: 32 }} />
                        </Link>
                        <Link href="https://www.facebook.com/lacasitacenter" style={{ paddingRight: 10 }}>
                            <Image source={require('../../assets/images/logo_fb.png')} style={{ width: 32, height: 32 }} />
                        </Link>
                        <Link href="https://www.youtube.com/@lacasitacenter" style={{ paddingRight: 10 }}>
                            <Image source={require('../../assets/images/logo_yt.png')} style={{ width: 32, height: 32 }} />
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    contactoInfoContainer: {
        flexDirection: 'row',
        width: '80%',
        borderColor: '#325aa6',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        overflow: 'visible',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    textInfo: {
        width: '75%',
        fontSize: 12,
        lineHeight: 20,
        color: '#162d40',
        textAlign: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    }
});