# La Casita Center

Bienvenido al nuevo proyecto **La Casita Center**: una app desarrollada en **React Native** con **Expo SDK 52**, conectada a un backend **WordPress Headless** vía API REST.

Este proyecto reemplaza la versión anterior con una arquitectura más moderna y segura.

---

## 🚀 Tecnologías utilizadas

- **React Native** (Expo 52)
- **Expo Router**
- **Axios** para consumo de API
- **Context API** para autenticación
- **WordPress Headless CMS** como backend
- **Push Notifications** (en preparación)
- **Autenticación JWT**

---

## 🧩 Funcionalidades principales

- **Autenticación de usuarios**
  - Inicio de sesión mediante API JWT
  - Redirección automática tras login/logout
- **Listado de alertas**
  - Recuperación en tiempo real de alertas desde WordPress
  - Actualización automática al detectar cambios
- **Navegación intuitiva**
  - Barra de navegación inferior con íconos
  - Menú lateral deslizable personalizado
- **Perfil de usuario**
  - Acceso rápido al perfil del usuario
- **Diseño responsive**
  - Adaptado a móviles y tablets
  - Scroll fluido usando `FlatList`
- **Preparado para notificaciones push**
  - Sistema de alertas en preparación para nuevos posts

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/cartes/la-casita-center.git
cd la-casita-center

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto:

   ```bash
   EXPO_PUBLIC_API_URL=https://tusitio.com/wp-json
   ```

4. Iniciar el proyecto:

   ```bash
   npx expo start
   ```

## 🔥 Próximas mejoras

- Integración de **notificaciones push** para nuevas alertas
- Sección de edición de perfil
- Modo oscuro
- Animaciones de carga en las vistas
- Soporte offline para alertas

## 🤝 Contribuciones

Si quieres aportar mejoras, ¡eres bienvenido!  
Puedes hacer un fork del proyecto, crear tu feature branch y enviar un Pull Request.

## 🐣 Autor

- **Cristian Cartes** – [@cartes](https://github.com/cartes)