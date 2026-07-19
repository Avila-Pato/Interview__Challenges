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
          <Link href="./proyectos-logicos/directorio-usuarios/caso-3">
            complejidad ALTA (accesibilidad, actualizaciones optimísticas y
            undo/redo).
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/directorio-usuarios/caso-4">
            complejidad moderada (selección múltiple, borrado masivo y
            reordenamiento).
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/directorio-usuarios/caso-5">
            complejidad moderada (paginación, estados de carga y scroll
            infinito).
          </Link>
        </li>
      </ul>
      <h1>Gilla simetica</h1>
      <ul>
        <li>
          <Link href="./proyectos-logicos/grilla-simetrica">
            Gilla simetica
          </Link>
        </li>
      </ul>
      <h1>Listas supermercado</h1>
      <ul>
        <li>
          <Link href="./proyectos-logicos/lista-supermercado/caso-0">
            Caso 0
          </Link>
        </li>
        <li  >
          <Link href="./proyectos-logicos/lista-supermercado/caso-1">
            caso 1
          </Link>
        </li>
         <li  >
          <Link href="./proyectos-logicos/lista-supermercado/caso-2">
            caso 2
          </Link>
        </li>
        <h1>Tienda Pokemon</h1>
        <li>
          <Link href="./proyectos-logicos/tienda-pokemon/caso-0">
            Caso 0
          </Link>
        </li>
         <li>
          <Link href="./proyectos-logicos/tienda-pokemon/caso-1">
            Caso 1
          </Link>
        </li>
         <li>
          <Link href="./proyectos-logicos/tienda-pokemon/caso-2">
            Caso 2
          </Link>
        </li>
        <h1>Wordle</h1>
        <li>
          <Link href="./proyectos-logicos/wordle/caso-0">
            Caso 0
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/wordle/caso-1">
            Caso 1
          </Link>
        </li>
        <li>
          <Link href="./proyectos-logicos/wordle/caso-2">
            Caso 2
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
