import manejarCarrito from "./index";
import type { Producto } from "./type";

const camisa: Producto = { id: "1", nombre: "Camisa", precio: 100 };
const pantalon: Producto = { id: "2", nombre: "Pantalon", precio: 200 };

let ok = 0;
let fail = 0;

function test(nombre: string, fn: () => void) {
  try {
    fn();
    console.log(`${nombre}`);
    ok++;
  } catch (e: any) {
    console.error(`✗ ${nombre}: ${e.message}`);
    fail++;
  }
}

function expect(valor: unknown) {
  return {
    toEqual(esperado: unknown) {
      const a = JSON.stringify(valor);
      const b = JSON.stringify(esperado);
      if (a !== b) throw new Error(`\n  recibido:  ${a}\n  esperado: ${b}`);
    },
  };
}

// --- Casos ---

test("agregar producto nuevo al carrito vacío", () => {
  const resultado = manejarCarrito(camisa, 1);
  expect(resultado).toEqual([["1", { cantidad: 1, producto: camisa }]]);
});

test("agregar dos productos distintos", () => {
  const c1 = manejarCarrito(camisa, 1);
  const c2 = manejarCarrito(pantalon, 2, c1);
  expect(c2.length).toEqual(2);
});

test("aumentar cantidad de producto existente", () => {
  const c1 = manejarCarrito(camisa, 1);
  const c2 = manejarCarrito(camisa, 3, c1);
  expect(c2).toEqual([["1", { cantidad: 4, producto: camisa }]]);
});

test("reducir cantidad de producto existente", () => {
  const c1 = manejarCarrito(camisa, 5);
  const c2 = manejarCarrito(camisa, -2, c1);
  expect(c2).toEqual([["1", { cantidad: 3, producto: camisa }]]);
});

test("eliminar producto si la cantidad llega a 0", () => {
  const c1 = manejarCarrito(camisa, 2);
  const c2 = manejarCarrito(camisa, -2, c1);
  expect(c2).toEqual([]);
});

test("eliminar producto si la cantidad queda negativa", () => {
  const c1 = manejarCarrito(camisa, 1);
  const c2 = manejarCarrito(camisa, -5, c1);
  expect(c2).toEqual([]);
});

test("eliminar solo el producto correcto", () => {
  const c1 = manejarCarrito(camisa, 1);
  const c2 = manejarCarrito(pantalon, 1, c1);
  const c3 = manejarCarrito(camisa, -1, c2);
  expect(c3).toEqual([["2", { cantidad: 1, producto: pantalon }]]);
});

// --- Resultado ---
console.log(`\n${ok} pasaron, ${fail} fallaron`);
if (fail > 0) process.exit(1);
