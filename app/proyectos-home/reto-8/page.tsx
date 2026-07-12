"use client";
import { useState } from "react";

function App() {
  const GRID = Array.from(Array(9).keys());

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const currentPlayer = xIsNext ? "X" : "O";

  const handleClick = (index: number) => {
    if (squares[index] || winner) return;
    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  //mensaje de estado del juego

  let status: string;
  if (winner) {
    status = `Ganador: ${winner}`;
  } else if (isDraw) {
    status = "Empate";
  } else {
    status = `Siguiente jugador: ${currentPlayer}`;
  }

  return (
    <div style={styles.container}>
      <div style={styles.status}>{status}</div>
      <main style={styles.main}>
        {GRID.map((i) => (
          <button
          key={i}
          style={styles.cell}
          onClick={() => handleClick(i)}
          disabled={Boolean(squares[i] || winner)}
          >
          </button>
        ))}
      </main>
        <button style={styles.resetButton} onClick={resetGame}>Reiniciar</button>
    </div>
  );
}

//helper para calcular ganador
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    fontFamily: "sans-serif",
  },
  status: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    fontWeight: "bold",
    color: "#ffffff", // Aseguramos el color del texto de estado
  },
  main: {
    display: "grid",
    placeContent: "center",
    gridTemplate: "repeat(3, 128px) / repeat(3, 128px)",
    gap: "1em",
    padding: "1em",
    borderRadius: "12px",
    backgroundColor: "#1a1a1a",
  },
  cell: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    backgroundColor: "#333",
    color: "#fff !important",
    WebkitTextFillColor: "#ffffff !important",
    border: "none",
    cursor: "pointer",
    display: "grid",
    placeContent: "center",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
  },
};