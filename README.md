
# Luz roja - luz verde en ReactJS
Este es un proyecto de un juego desarrollado en ReactJS, donde el jugador debe presionar los botones correspondientes (izquierda y derecha) según la luz de un semáforo (roja o verde) para obtener puntos. La duración de la luz verde cambia según el puntaje, y el jugador puede competir en un ranking basado en un puntaje máximo.

## Requisitos
1. **Node.js**: Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.
2. **React**: Este proyecto utiliza ReactJS como framework principal.

## Instalación
1. Clona este repositorio a tu ordenador:
```bash
git clone https://github.com/imc89/BBVA-Game.git
```
2. Abre desde terminal el proyecto:
```bash
cd BBVA-Game
```
3. Instala las dependencias:
```bash
npm i 
```
4. corre el proyecto en local:
```bash
npm run start 
```

## Web online de la aplicación
```bash
https://imc89.github.io/BBVA-Game/ 
```

## Estructura del Proyecto
Este proyecto está compuesto por los siguientes archivos principales:

- **`App.js`**: El archivo principal que gestiona las rutas de la aplicación.
- **`Home.js`**: Página de inicio donde el jugador ingresa su nombre, puede ver el ranking de puntuaciones e iniciar el juego.
- **`Game.js`**: Página del juego, donde el jugador interactúa con el semáforo ganando puntuación, se puede usar las teclas derecha e izquierda del teclado en lugar de los botones. Para ganar puntuación el jugador deberá moverse solo con luz verde pulsando derecha izquierda alternativamente.
- **Componentes**:
  - **`TrafficLight.js`**: Muestra el semáforo (rojo o verde).
  - **`GameInfo.js`**: Muestra la puntuación actual y el puntaje máximo.
  - **`RankingTable.js`**: Muestra la tabla de clasificación de los jugadores con las puntuaciones más altas.
  - **`AudioPlayer.js`**: Reproduce el audio durante el juego y ajusta su velocidad según la puntuación.

## Persistencia de Datos
- Los datos del jugador, como el nombre, el puntaje actual y el puntaje máximo, se almacenan en `localStorage`. Esto permite que los jugadores mantengan su puntaje incluso si recargan la página o cierran el navegador.
- Los puntajes se mantienen mientras el jugador no cambie su nombre.

## Conflictos con Navegadores y Dependencias
### Problemas de Audio en Safari
**Safari** (especialmente en macOS y iOS) tiene ciertos problemas conocidos relacionados con la reproducción de audio en aplicaciones web. En algunos casos, el audio puede no reproducirse correctamente o no se ajusta bien al cambiar la velocidad de reproducción (playback rate). Esto se debe a las restricciones de Safari sobre la reproducción automática de medios y la gestión del audio en segundo plano.
### Problemas con vibración en iOS 
En iOS, Apple restringe el uso de la vibración en sitios web por razones de seguridad y privacidad, impidiendo que las páginas activen esta función sin el consentimiento explícito del usuario. Esta medida forma parte del enfoque de Apple para limitar la interacción intrusiva de las webs con el dispositivo, protegiendo así la experiencia y el control del usuario. Siendo solo posible ejecutar este tipo de eventos a través de botones o interacciones directas del usuario.

#### Recomendación:
- **Google Chrome** y **Mozilla Firefox** funcionan mucho mejor con la funcionalidad de audio y el ajuste de la velocidad en el juego. Si encuentras problemas de audio en Safari, te recomendamos probar el juego en uno de estos navegadores para una experiencia óptima.
