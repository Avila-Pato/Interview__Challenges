"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Configuración de niveles de la torre basados en el precio
const TOWER_LEVELS = [
  { level: 10, min: 1400, label: "SUPREME MASTER", bottomCenter: 91.5 },
  { level: 9, min: 1200, label: "Shao Kahn Room", bottomCenter: 81.0 },
  { level: 8, min: 1000, label: "The Armory", bottomCenter: 69.5 },
  { level: 7, min: 900, label: "Acid Pool", bottomCenter: 58.5 },
  { level: 6, min: 800, label: "The Courtyard", bottomCenter: 48.0 },
  { level: 5, min: 700, label: "Goro's Lair", bottomCenter: 37.0 },
  { level: 4, min: 600, label: "The Pit", bottomCenter: 25.5 },
  { level: 3, min: 500, label: "Sub-Zero", bottomCenter: 15.5 },
  { level: 2, min: 400, label: "Scorpion", bottomCenter: 3.5 },
  { level: 1, min: 0, label: "Kombatant", bottomCenter: -8.0 },
];

export default function Page() {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const dollarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 1. Obtener la cotización en tiempo real desde bluelytics
  useEffect(() => {
    async function fetchDollar() {
      try {
        const res = await fetch("https://api.bluelytics.com.ar/v2/latest");
        const data = await res.json();
        setPrice(data.blue.value_sell);
      } catch (error) {
        console.log("Error al consultar la API, usando fallback:", error);
        setPrice(0);
      } finally {
        setLoading(false);
      }
    }
    fetchDollar();
  }, []);

  // 2. Animación de GSAP sincronizada con el centro del escalón
  useEffect(() => {
    if (loading || !dollarRef.current) return;

    const targetLevel =
      TOWER_LEVELS.find((level) => price >= level.min) ||
      TOWER_LEVELS[TOWER_LEVELS.length - 1];

    gsap.fromTo(
      dollarRef.current,
      {
        bottom: "0%",
        scale: 2,
        opacity: 0,
      },
      {
        bottom: `${targetLevel.bottomCenter}%`,
        scale: 1,
        opacity: 1,
        duration: 2.2,
        ease: "bounce.out",
        delay: 0.1,
      },
    );
  }, [price, loading]);

  // Handler para activar música de fondo
  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .catch((error) => console.log("Audio play bloqueado ", error));
    }
  };

  return (
    <main style={styles.mainContainer} onClick={handlePlayMusic}>
      {/* Elemento de Audio Oculto */}
      <audio ref={audioRef} src="/audio/mortal-kombat-theme.mp3" loop />

      <h1 style={styles.title}>DÓLAR KOMBAT</h1>
      
      <span style={styles.footerNote}>
        Haz clic en cualquier parte para activar el MK Theme 
      </span>
      <p style={styles.subtitle}>
        {loading
          ? "Calculando poder económico..."
          : `Cotización actual: ${price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}`}
      </p>

      <div style={styles.inputContainer} >
        <label style={styles.inputLabel}>Seleccione un precio: </label>
        <input
          type="number"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={styles.arcadeInput}
          placeholder="EJ: 850"
        />
      </div>

      {/* Contenedor relativo de la batalla */}
      <div style={styles.stageWrapper}>
        {/* Imagen de la Torre (Fondo de referencia estático) */}
        <Image
          alt="Tower"
          src="/images/tower.png"
          width={500}
          height={600}
          priority
          style={styles.towerImage}
        />

        {/* Personaje del Dólar (Posicionado perfectamente en la columna) */}
        {!loading && (
          <div ref={dollarRef} style={styles.dollarFighter}>
            <Image
              alt="1 dollar"
              src="/images/dollar.png"
              width={45}
              height={45}
              style={styles.dollarImage}
            />
            <p style={styles.priceTag}>
              {price.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </p>
          </div>
        )}
      </div>

    </main>
  );
}

// Estilos corregidos para visualización a pantalla completa (Full Viewport)
const styles: Record<string, React.CSSProperties> = {
mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    width: "100vw",
    // Estos estilos aseguran que se rompa cualquier restricción del body padre:
    top: 0,
    left: 0,
    overflowY: "auto", // Permite scroll vertical si la torre es muy alta en pantallas chicas
    
    cursor: "pointer",
    backgroundColor: "#0d0d11", 
    backgroundImage: "url('/images/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "30px 20px",
    boxSizing: "border-box",
    color: "#fff",
    fontFamily: "monospace",
  },
  title: {
    color: "#da1b1b",
    fontSize: "3rem",
    margin: "0 0 5px 0",
    textShadow: "0 0 10px rgba(218, 27, 27, 0.6), 2px 2px 4px #000",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "2px",
  },
  subtitle: {
    color: "#aaa",
    fontSize: "1.1rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  inputLabel: {
    fontSize: "0.75rem",
    color: "#ffaa00",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  arcadeInput: {
    backgroundColor: "#15151a",
    color: "#4ade80",
    border: "2px solid #da1b1b",
    padding: "8px 12px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textAlign: "center",
    outline: "none",
    width: "140px",
    boxShadow: "0 0 10px rgba(218, 27, 27, 0.2)",
  },
  stageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
    height: "600px",
    display: "flex",
    justifyContent: "center",
  },
  towerImage: {
    objectFit: "contain",
    width: "100%",
    height: "120%",
  },
  dollarFighter: {
    position: "absolute",
    left: "80%", // Centrado perfecto en la columna
    // El eje horizontal se centra y el translateY(-50%) posiciona el centro matemático del sprite con el bottomCenter
    transform: "translateX(-50%) translateY(50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: 10,
    width: "80px",
    height: "80px",
  },
  dollarImage: {
    filter: "drop-shadow(0px 0px 8px rgba(74, 222, 128, 0.9))",
  },
  priceTag: {
    backgroundColor: "black",
    color: "#4ade80",
    border: "1px solid #4ade80",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    margin: "5px 0 0 0",
    whiteSpace: "nowrap",
    boxShadow: "0 0 5px rgba(74, 222, 128, 0.3)",
  },
  footerNote: {
    fontSize: "0.75rem",
    color: "#777",
    textShadow: "1px 1px 2px #000",
    zIndex: 1,
  },
};