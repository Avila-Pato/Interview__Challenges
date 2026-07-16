import Link from "next/link";

function App() {
  return (
    <div>
      <h1>Pruebas</h1>
      <ul>
        <li>
          <Link href="./pruebas/reto-1">Reto 1</Link>
        </li>
        <li>
          <Link href="./pruebas/reto-2">Reto 2</Link>
        </li>
        <li>
          <Link href="./pruebas/reto-3">Reto 3</Link>
        </li>
        <li>
          <Link href="./pruebas/reto-4">Reto 4</Link>
        </li>
        <li>
          <Link href="./pruebas/reto-5">Reto 5</Link>
        </li>
        <li>
          <Link href="./pruebas/reto-6">Reto 6</Link>
        </li>
      </ul>

      <h1>Proyectos take home</h1>
      <ul>
        <li>
          <Link href="./proyectos-home/reto-1">Reto 1</Link>
        </li>
        <li>
          <Link href="./proyectos-home/reto-2">Reto 2</Link>
        </li>
        <li>
          {" "}
          <Link href="./proyectos-home/reto-3">Reto 3</Link>
        </li>
        <li>
          <Link href="./proyectos-home/reto-4">Reto 4</Link>
        </li>
        <li>
          <Link href="./proyectos-home/reto-5">Reto 5</Link>
        </li>
        <li>
          <Link href="./proyectos-home/reto-6">Reto 6</Link>
        </li>
        <li>
          <Link href="./proyectos-home/reto-7">Reto 7</Link>
        </li>
        <li>
          <Link href="./proyectos-home/reto-8">Reto 8</Link>
        </li>
      </ul>

      <h1>Proyectos logicos</h1>
      <ul>
        <li>
          <Link href="./proyectos-logicos/buscador-de-listar/caso-0">
            Caso 0
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/buscador-de-listar/caso-1">
            Caso 1
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/buscador-de-listar/caso-2">
            Caso 2
          </Link>
        </li>
      </ul>
      <h1>Proyectos logicos</h1>
      <ul>
        <li>
          <Link href="./proyectos-logicos/carrito-tienda">
            Carrito de tiendas
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/directorio-usuarios/caso-0">
            complejidad baja (listar datos y estados de carga).
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/directorio-usuarios/caso-1">
            complejidad baja (formularios, validación, orden y persistencia)..
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/directorio-usuarios/caso-2">
            complejidad moderada (sincronización de estado, estados de carga y
            race conditions).
          </Link>
        </li>
         <li>
          {/* <Link href="./proyectos-logicos/directorio-usuarios/caso-3">
            complejidad moderada (sincronización de estado, estados de carga y
            race conditions).
          </Link> */}
        </li>
      </ul>
    </div>
  );
}

export default App;
