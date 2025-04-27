// app/home/index.tsx
import { Redirect } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function LaCasitaHome() {
  // Aquí puedes agregar la lógica para manejar el estado de autenticación
  const { isAuth, setIsAuth } = useAuth(); // 🔥
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      // FETCH al WordPress Headless API
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/jwt-auth/v1/token`, {
        username: email,
        password: password,
      });

      if (response.data.token) {
        setIsAuth(true);
      }
      else {
        Alert.alert("Ingreso a fallado", "Error en el usuario o contraseña");
      }

    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Ingreso a fallado", "Error de red");
    }

  }

  if (isAuth) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/images/background.png")} style={styles.background}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../assets/images/logo_casita.png")} style={styles.logo} />
          <TextInput
            placeholder="DIRECCIÓN DE CORREO ELECTRÓNICO"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor={"#888"}
          />

          <TextInput
            placeholder="CONTRASEÑA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor={"#888"}
          />

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: 60 }} onPress={() => { console.log('Registro') }}>
            <Text style={styles.register}>regístrate aquí</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 2,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 50,
    backgroundColor: "transparent",
    width: 180,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e88db4',
    paddingVertical: 8,
    marginBottom: 25,
    fontSize: 14,
    width: '80%',
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#f4b23d',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  register: {
    color: '#001122',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
