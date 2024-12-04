function normalizeText(input) {
  // Verifica si el input es una cadena válida
  if (typeof input !== "string") {
    return input; // Si no es una cadena, devuelve el valor original
  }

  // Caracteres que se reemplazarán y sus equivalentes
  const from = "áéíóúÁÉÍÓÚñÑ"; // Incluye caracteres adicionales según tu proyecto
  const to = "aeiouAEIOUnN";

  // Crea un mapa para las transformaciones
  const mapping = {};
  for (let i = 0; i < from.length; i++) {
    mapping[from.charAt(i)] = to.charAt(i);
  }

  // Procesa el texto: elimina espacios, normaliza caracteres y convierte a minúsculas
  const result = input
    .replace(/\s+/g, "") // Elimina espacios en blanco
    .split("") // Convierte a un array de caracteres
    .map((char) => mapping[char] || char) // Sustituye los caracteres mapeados
    .join("") // Vuelve a unir los caracteres en una cadena
    .toLowerCase(); // Convierte a minúsculas

  return result;
}

export default normalizeText;
