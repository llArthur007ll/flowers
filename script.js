// Constantes y variables necesarias
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";
const colors = [
  "#FFD700", // Amarillo
  "#FFBF00", // Amarillo naranja
  "#FFA500", // Naranja
  "#FF8C00"  // Naranja oscuro
];

// Crear una circunferencia de flores y texto con saltos de línea
function createFlowerCircle(centerX, centerY, radius, message) {
  const svg = document.getElementById("svg");

 
  // Crear texto con saltos de línea
  const text = document.createElementNS(SVG_NS, "text");
  text.setAttribute("x", centerX+1000);
  text.setAttribute("y", centerY);
  text.setAttribute("font-size", "500");
  text.setAttribute("fill", "#FFBF00");
  text.setAttribute("text-anchor", "middle");
  

  // Separar el mensaje por saltos de línea
  const lines = message.split("\n");
  lines.forEach((line, index) => {
    const tspan = document.createElementNS(SVG_NS, "tspan");
    tspan.setAttribute("x", centerX);
    tspan.setAttribute("dy", index === 0 ? "0" : "1.2em"); // Espaciado entre líneas
    tspan.textContent = line;
    text.appendChild(tspan);
  }); 
// Calcular el ancho total del texto
const textWidth = text.getComputedTextLength();

// Calcular las coordenadas x e y para centrar el texto
const textX = centerX - (textWidth / 2);
const textY = centerY - ((lines.length - 1) * 0.6 * parseInt(text.getAttribute("font-size")) / 2);

// Establecer las coordenadas x e y del texto
text.setAttribute("x", textX);
text.setAttribute("y", textY);


  svg.appendChild(text);

  // Crear flores en la circunferencia
  const numFlowers = 70; // Aumentamos el número de flores
  const angleIncrement = (2 * Math.PI) / numFlowers;
  for (let i = 0; i < numFlowers; i++) {
    const angle = i * angleIncrement;
    const flowerX = centerX + radius * Math.cos(angle);
    const flowerY = centerY + radius * Math.sin(angle);
    const n = 2 + Math.floor(Math.random() * 4); // Número de pétalos
    const scale = Math.floor(Math.random() * 12) + 3; // Escala de la flor
    const color = colors[Math.floor(Math.random() * colors.length)]; // Color de la flor

    // Crear flor
    const flower = new Flower(n, { x: flowerX, y: flowerY }, scale, svg, color);
    setTimeout(() => {
      flower.G.setAttribute("class", `_${flower.n}`);
    }, 50);
  }
}

// Función para crear flores
class Flower {
  constructor(n, pos, scale, parent, color) {
    this.n = n;
    this.scale = scale;
    this.pos = pos;
    this.width = 40;
    this.height = 40;
    this.color = color || colors[Math.floor(Math.random() * colors.length)];
    this.parent = parent;

    this.markup();
  }

  markup() {
    this.G = document.createElementNS(SVG_NS, "g");
    this.G.setAttribute("style", `--scale:${this.scale};`);
    this.G.setAttributeNS(
      null,
      "transform",
      `translate(${this.pos.x},${this.pos.y}) rotate(${Math.random() * 360})`
    );
    this.G.setAttributeNS(null, "fill", this.color);
    const ga = document.createElementNS(SVG_NS, "g");
    ga.setAttribute("class", "a");

    for (let i = 0; i < 2; i++) {
      // left, right
      const g = document.createElementNS(SVG_NS, "g");
      for (let j = 0; j < this.n; j++) {
        const use = document.createElementNS(SVG_NS, "use");
        use.setAttributeNS(SVG_XLINK, "xlink:href", `#petal${this.n}`);
        use.setAttributeNS(null, "width", this.width);
        use.setAttributeNS(null, "height", this.height);

        g.appendChild(use);
      }
      ga.appendChild(g);
    }
    this.G.appendChild(ga);

    this.parent.appendChild(this.G);
  }
}

// Llamar a la función para crear la circunferencia de flores y texto con saltos de línea
createFlowerCircle(5000, 5000, 2000, "Feliz\n21 de marzo\nTe quiero");