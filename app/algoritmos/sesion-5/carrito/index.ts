import { Carrito, Producto } from "./type";

export default function manejarCarrito(
  producto: Producto,
  cantidad: number,
  carrito: Carrito = [],
): Carrito {

  //Copia del carrito 
  const nuevoCarrito = [...carrito];
 // busca si el producto ya esta en el carrito
  const indice = nuevoCarrito.findIndex(
    //([id]) -> desustructura y toma el id para comparar.
    ([id]) => id === producto.id
  );

  // si el producto noe xiste devuelve un -1  lo agrega y termina
  if (indice === -1) {
    nuevoCarrito.push([producto.id, { cantidad, producto }]);
    return nuevoCarrito;
  }
  // si existe calcula la nueva cantidad
  // el , <- salta el id, toma el item nuevaCantidad
  const [, item] = nuevoCarrito[indice]; 
  const nuevaCantidad = item.cantidad + cantidad;

  // si la nueva cantidad es 0 o menos eliminar el producto
  if (nuevaCantidad <= 0) {
    return nuevoCarrito.filter(([id]) => id !== producto.id);
  }
  // si la nueva cantidad es positiva -> actualiza
  nuevoCarrito[indice] = [producto.id, { ...item, cantidad: nuevaCantidad }];

  return nuevoCarrito;
}
