function App() {
  return (
    <main style={styles.mainSection}>
      <header>
        <h1>{0} puntos</h1>
        <h1>{0} segundos</h1>
      </header>
      <section>
        <span>Blanco</span>
      </section>
      <footer>
        <button>Jugar</button>
      </footer>
    </main>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  mainSection: {
  display: "grid",
  textAlign: "center",
  height: "100vh",
  width: "100vw",
  gridTemplateRows: "auto 1fr auto",
  },
  sectionMain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "36px",
  },
};