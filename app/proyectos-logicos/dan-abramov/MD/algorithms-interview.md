Aquí tienes la traducción en formato **Markdown**, lista para copiar y pegar en un `README.md`:

````markdown
# Valid Parentheses (Paréntesis válidos)

Escribe una función que reciba una cadena de paréntesis y determine si el orden de los paréntesis es válido. La función debe devolver `true` si la cadena es válida y `false` si es inválida.

## Ejemplos

```text
"()"                  => true
")(()))"              => false
"("                   => false
"(())((()())())"      => true
```

## Restricciones

```text
0 <= longitud de la cadena <= 100
```

---

# Count Salutes (Contar saludos)

Hay un pasillo estrecho por el que las personas solo pueden caminar hacia la derecha o hacia la izquierda. Cuando dos personas se encuentran en el pasillo, por tradición deben saludarse mutuamente. Todas las personas se mueven a la misma velocidad.

Tu tarea es escribir una función que, dada una representación en forma de cadena de las personas moviéndose por el pasillo, cuente el número total de saludos que ocurrirán.

> **Nota:** Cada encuentro genera **2 saludos**, uno por cada persona.

## Entrada

- `>` representa una persona que camina hacia la derecha.
- `<` representa una persona que camina hacia la izquierda.
- `-` representa un espacio vacío y puede ignorarse.

Ejemplo:

```text
>--<--->->
```

## Ejemplos

**Entrada:**

```text
>----->-----<--<
```

**Salida:**

```text
8
```

**Explicación:**

Las dos personas que caminan hacia la derecha se encontrarán con las dos que caminan hacia la izquierda. En total ocurren **4 encuentros** y, como cada encuentro produce **2 saludos**, habrá **8 saludos**.

---

**Entrada:**

```text
<---<--->----<
```

**Salida:**

```text
2
```

**Explicación:**

Solo ocurre un encuentro.

---

# Vasya Clerk (Vasya, el cajero)

¡La nueva película de **Avengers** acaba de estrenarse! Hay muchas personas haciendo fila en la taquilla del cine. Cada una tiene un único billete de **25**, **50** o **100 dólares**. Cada entrada cuesta **25 dólares**.

Vasya trabaja como cajero y quiere vender una entrada a cada persona de la fila.

¿Puede Vasya vender una entrada a todas las personas y dar el cambio correspondiente si comienza **sin dinero** y atiende estrictamente en el orden en que las personas están en la fila?

Devuelve **`YES`** si Vasya puede vender todas las entradas y dar el cambio correctamente. En caso contrario, devuelve **`NO`**.

## Ejemplos

```javascript
tickets([25, 25, 50]);
// => YES

tickets([25, 100]);
// => NO
// Vasya no tendrá suficiente dinero para dar cambio a un billete de 100.

tickets([25, 50, 25, 100, 25, 25, 25, 100, 25, 25, 50, 100, 50, 25]);
// => NO
```
````
