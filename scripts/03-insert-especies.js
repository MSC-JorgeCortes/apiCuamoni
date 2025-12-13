// scripts/03-insert-especies.js
import { Especie } from '../config/database.js';


const especiesData = [
  {
    nombreCientifico: "Platanus mexicana",
    nombreComun: "Álamo",
    familia: "Platanaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol de gran tamaño que crece en riberas de ríos, con corteza que se desprende en placas. Muy apreciado por su sombra y madera.",
    caracteristicas: {
      alturaMaxima: 25,
      diametroMaximo: 1.5,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Arcilloso", "Húmedo"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 2 días", observaciones: "Mantener suelo húmedo pero no encharcado", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Compost orgánico", cantidad: "100g", frecuencia: 30, epocaAplicacion: "Todo el año" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Protección contra hormigas", "Tutor para crecimiento recto"]
      }
    ],
    plagasComunes: ["Escarabajo descortezador", "Pulgones", "Cochinillas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Sombra", "Madera para construcción", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Ficus pertusa",
    nombreComun: "Amate",
    familia: "Moraceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol siempreverde con raíces aéreas, importante en la cultura local. Proporciona excelente sombra.",
    caracteristicas: {
      alturaMaxima: 20,
      diametroMaximo: 2.0,
      tipoCrecimiento: "Medio",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Humífero", "Bien drenado"],
      phSuelo: { min: 6.5, max: 7.5 },
      exposicionSolar: "Ambos",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 8 },
        riego: { cantidadAgua: "150-250ml", frecuencia: "Cada 3 días", observaciones: "Evitar encharcamientos", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Humus de lombriz", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Época de crecimiento" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Primavera", tipoMaceta: "Maceta de barro" },
        protecciones: ["Protección contra heladas ligeras"]
      }
    ],
    plagasComunes: ["Ácaros", "Cochinillas algodonosas"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Sombra", "Ornamental", "Cercas vivas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Enterolobium cyclocarpum",
    nombreComun: "Párroco",
    familia: "Fabaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol de gran tamaño con frutos en forma de oreja, proporciona excelente sombra para ganado.",
    caracteristicas: {
      alturaMaxima: 30,
      diametroMaximo: 3.0,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 20, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Juvenil",
        rangoEdadMeses: { min: 6, max: 36 },
        riego: { cantidadAgua: "10-15 litros", frecuencia: "Semanal", observaciones: "Riego profundo para desarrollo radicular",
        frecuenciaDias: 7 },
        fertilizacion: { tipoFertilizante: "Fosfato diamónico", cantidad: "300g", frecuencia: 90, epocaAplicacion: "Época de lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 365, epocaRecomendada: ["Secas"] },
        trasplante: { requiere: true, epocaRecomendada: "Inicio lluvias", tipoMaceta: "Directo tierra" },
        protecciones: ["Protección contra ganado", "Tutor fuerte"]
      },
    ],
    plagasComunes: ["Gallina ciega", "Barrenadores"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Sombra para ganado", "Madera", "Forraje"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Bursera simaruba",
    nombreComun: "Palo mulato",
    familia: "Burseraceae",
    origen: "Nativo de Mesoamérica",
    descripcion: "Árbol con corteza lisa y rojiza que se desprende en láminas. Muy resistente y de rápido crecimiento.",
    caracteristicas: {
      alturaMaxima: 20,
      diametroMaximo: 0.8,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Arenoso"],
      phSuelo: { min: 6.5, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 40 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-400ml", frecuencia: "Cada 3 días", observaciones: "Tolerante a sequía una vez establecido", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Compost", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Primavera-Verano" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Protección contra vientos fuertes"]
      }
    ],
    plagasComunes: ["Escarabajos", "Cochinillas"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Sombra", "Cercas vivas", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Ceiba pentandra",
    nombreComun: "Ceiba",
    familia: "Malvaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol sagrado para culturas mesoamericanas, de gran tamaño y tronco espinoso en juveniles.",
    caracteristicas: {
      alturaMaxima: 60,
      diametroMaximo: 3.0,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media-Alta",
      temperatura: { min: 22, max: 40 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "400-600ml", frecuencia: "Cada 4 días", observaciones: "Sensible al exceso de agua", frecuenciaDias: 4 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "250g", frecuencia: 90, epocaAplicacion: "Lluvias" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor profundo" },
        protecciones: ["Protección contra heladas en juveniles"]
      }
    ],
    plagasComunes: ["Barrenadores", "Escarabajos"],
    epocaFloracion: "Enero - Marzo",
    epocaFructificacion: "Abril - Junio",
    usosTradicionales: ["Sagrado", "Sombra", "Fibra"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Enterolobium cyclocarpum",
    nombreComun: "Párota",
    familia: "Fabaceae",
    origen: "Nativo de Mesoamérica",
    descripcion: "Árbol majestuoso con copa amplia y frutos en forma de oreja. Muy valorado por su sombra y madera.",
    caracteristicas: {
      alturaMaxima: 35,
      diametroMaximo: 3.0,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media-Alta",
      temperatura: { min: 20, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 3 días", observaciones: "Requiere riego regular en primeros años", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Fosfórico", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 365},
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Tutor para crecimiento recto"]
      }
    ],
    plagasComunes: ["Barrenadores", "Escarabajos"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Sombra", "Madera", "Forraje"],
    estadoConservacion: "Preocupación menor"
  },
  
  {
    nombreCientifico: "Lysiloma divaricatum",
    nombreComun: "Quebracho",
    familia: "Fabaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol de mediano tamaño con corteza rugosa y follaje denso. Muy resistente a sequías.",
    caracteristicas: {
      alturaMaxima: 15,
      diametroMaximo: 0.6,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Seco", "Pedregoso"],
      phSuelo: { min: 6.5, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja",
      temperatura: { min: 15, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 180, epocaAplicacion: "Lluvias" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente a condiciones adversas"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Leña", "Carbón", "Sombra"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Guazuma ulmifolia",
    nombreComun: "Guácima",
    familia: "Malvaceae",
    origen: "Nativo de Mesoamérica",
    descripcion: "Árbol pequeño a mediano con frutos comestibles y múltiples usos medicinales.",
    caracteristicas: {
      alturaMaxima: 12,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Variado", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-350ml", frecuencia: "Cada 3 días", observaciones: "Adaptable a diferentes condiciones", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente naturalmente"]
      }
    ],
    plagasComunes: ["Pulgones", "Cochinillas"],
    epocaFloracion: "Mayo - Agosto",
    epocaFructificacion: "Agosto - Noviembre",
    usosTradicionales: ["Medicinal", "Forraje", "Leña"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Cedrela odorata",
    nombreComun: "Cedro rojo",
    familia: "Meliaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol maderable muy valioso con madera aromática y resistente a insectos.",
    caracteristicas: {
      alturaMaxima: 30,
      diametroMaximo: 1.5,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media-Alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 3 días", observaciones: "Sensible a encharcamientos", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Protección contra barrenadores"]
      }
    ],
    plagasComunes: ["Barrenador del cedro"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Madera fina", "Aromática", "Construcción"],
    estadoConservacion: "Vulnerable"
  },
  {
    nombreCientifico: "Swietenia macrophylla",
    nombreComun: "Caoba",
    familia: "Meliaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol maderable de alto valor comercial con madera rojiza y excelente calidad.",
    caracteristicas: {
      alturaMaxima: 40,
      diametroMaximo: 2.0,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Fértil"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 22, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "400-600ml", frecuencia: "Cada 3 días", observaciones: "Requiere humedad constante", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Rico en fósforo", cantidad: "300g", frecuencia: 90, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Protección contra broca de la caoba"]
      }
    ],
    plagasComunes: ["Broca de la caoba"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Madera de lujo", "Ebanistería"],
    estadoConservacion: "Vulnerable"
  },
  {
    nombreCientifico: "Ficus insipida",
    nombreComun: "Higo cimarrón",
    familia: "Moraceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de gran tamaño con raíces aéreas y frutos importantes para fauna silvestre.",
    caracteristicas: {
      alturaMaxima: 35,
      diametroMaximo: 2.5,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Húmedo", "Rico en materia orgánica"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "500-700ml", frecuencia: "Cada 2 días", observaciones: "Requiere alta humedad", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "400g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: true, tipo: "Contención", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Espacio amplio para desarrollo"]
      }
    ],
    plagasComunes: ["Cochinillas", "Ácaros"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Sombra", "Ornamental", "Fauna silvestre"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Gliricidia sepium",
    nombreComun: "Cacao de nance",
    familia: "Fabaceae",
    origen: "Nativo de Mesoamérica",
    descripcion: "Árbol multipropósito usado como cercas vivas, forraje y abono verde.",
    caracteristicas: {
      alturaMaxima: 10,
      diametroMaximo: 0.3,
      tipoCrecimiento: "Muy rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Variado", "Bien drenado"],
      phSuelo: { min: 6.0, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 4 días", observaciones: "Muy adaptable", frecuenciaDias: 4 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 180, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente naturalmente"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Cercas vivas", "Forraje", "Abono verde"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Pithecellobium dulce",
    nombreComun: "Guamúchil",
    familia: "Fabaceae",
    origen: "Nativo de Mesoamérica",
    descripcion: "Árbol espinoso con frutos comestibles dulces y múltiples usos tradicionales.",
    caracteristicas: {
      alturaMaxima: 15,
      diametroMaximo: 0.8,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Seco", "Bien drenado"],
      phSuelo: { min: 6.5, max: 8.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja-Media",
      temperatura: { min: 15, max: 40 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "150g", frecuencia: 180, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Manejar con cuidado por espinas"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Fruto comestible", "Sombra", "Forraje"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Cordia dodecandra",
    nombreComun: "Siricote",
    familia: "Boraginaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol ornamental con flores vistosas anaranjadas y frutos comestibles.",
    caracteristicas: {
      alturaMaxima: 12,
      diametroMaximo: 0.5,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-450ml", frecuencia: "Cada 3 días", observaciones: "Riego regular para buena floración", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Rico en fósforo", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Floración" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos fuertes"]
      }
    ],
    plagasComunes: ["Pulgones", "Cochinillas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Ornamental", "Fruto comestible", "Madera"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Luehea speciosa",
    nombreComun: "Guácimo blanco",
    familia: "Malvaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de mediano tamaño con flores blancas vistosas y corteza fibrosa.",
    caracteristicas: {
      alturaMaxima: 18,
      diametroMaximo: 0.7,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 16, max: 34 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 3 días", observaciones: "Riego regular en crecimiento", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "180g", frecuencia: 60, epocaAplicacion: "Crecimiento activo" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra plagas foliares"]
      }
    ],
    plagasComunes: ["Escarabajos defoliadores"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Ornamental", "Madera", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Tabebuia rosea",
    nombreComun: "Macuilís",
    familia: "Bignoniaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol ornamental con espectacular floración rosada en época seca.",
    caracteristicas: {
      alturaMaxima: 25,
      diametroMaximo: 0.9,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 36 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "350-550ml", frecuencia: "Cada 3 días", observaciones: "Reducir riego en floración", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Rico en fósforo", cantidad: "220g", frecuencia: 90, epocaAplicacion: "Antes de floración" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos fuertes"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Ornamental", "Sombra", "Madera"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Brosimum alicastrum",
    nombreComun: "Ojite",
    familia: "Moraceae",
    origen: "Nativo de la región",
    descripcion: "Árbol con frutos nutritivos utilizados como alimento humano y forraje.",
    caracteristicas: {
      alturaMaxima: 30,
      diametroMaximo: 1.2,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media-Alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "400-600ml", frecuencia: "Cada 3 días", observaciones: "Mantener humedad constante", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Rico en nitrógeno", cantidad: "250g", frecuencia: 90, epocaAplicacion: "Lluvias" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Protección contra herbívoros"]
      }
    ],
    plagasComunes: ["Escarabajos defoliadores"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Alimento", "Forraje", "Madera"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Spondias mombin",
    nombreComun: "Jobo",
    familia: "Anacardiaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol frutal con frutos ácidos comestibles, muy apreciado en la gastronomía local.",
    caracteristicas: {
      alturaMaxima: 20,
      diametroMaximo: 0.8,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 3 días", observaciones: "Riego regular para buen desarrollo", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Crecimiento activo" },
        poda: { requiere: true, tipo: "Formación" },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra moscas de la fruta"]
      }
    ],
    plagasComunes: ["Moscas de la fruta", "Pulgones"],
    epocaFloracion: "Enero - Marzo",
    epocaFructificacion: "Abril - Junio",
    usosTradicionales: ["Fruto comestible", "Sombra", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Psidium guajava",
    nombreComun: "Guayabo",
    familia: "Myrtaceae",
    origen: "Nativo de Mesoamérica",
    descripcion: "Árbol frutal ampliamente cultivado por sus deliciosos frutos y propiedades medicinales.",
    caracteristicas: {
      alturaMaxima: 8,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 5.5, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 3 días", observaciones: "Evitar encharcamientos", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Rico en potasio", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: true, tipo: "Formación y fructificación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra mosca de la fruta"]
      }
    ],
    plagasComunes: ["Mosca de la fruta", "Pulgones", "Cochinillas"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Fruto comestible", "Medicinal", "Mermeladas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Annona purpurea",
    nombreComun: "Cabeza de negro",
    familia: "Annonaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol frutal con frutos grandes y aromáticos, pariente silvestre de la chirimoya.",
    caracteristicas: {
      alturaMaxima: 10,
      diametroMaximo: 0.5,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Húmedo", "Rico en materia orgánica"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Media sombra a sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 20, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 2 días", observaciones: "Requiere alta humedad ambiental", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "200g", frecuencia: 60, epocaAplicacion: "Crecimiento activo" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos"]
      }
    ],
    plagasComunes: ["Cochinillas", "Ácaros"],
    epocaFloracion: "Mayo - Julio",
    epocaFructificacion: "Agosto - Octubre",
    usosTradicionales: ["Fruto comestible", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Pouteria sapota",
    nombreComun: "Mamey",
    familia: "Sapotaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol frutal muy apreciado por sus deliciosos frutos de pulpa rojiza y dulce.",
    caracteristicas: {
      alturaMaxima: 25,
      diametroMaximo: 1.0,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media-Alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "400-600ml", frecuencia: "Cada 3 días", observaciones: "Sensible a sequías prolongadas", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "250g", frecuencia: 90, epocaAplicacion: "Crecimiento activo" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Protección contra nematodos"]
      }
    ],
    plagasComunes: ["Moscas de la fruta", "Nematodos"],
    epocaFloracion: "Diciembre - Febrero",
    epocaFructificacion: "Marzo - Junio",
    usosTradicionales: ["Fruto comestible", "Sombra", "Ornamental"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Manilkara zapota",
    nombreComun: "Chicozapote",
    familia: "Sapotaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol frutal conocido por su delicioso fruto y por producir el chicle natural.",
    caracteristicas: {
      alturaMaxima: 30,
      diametroMaximo: 1.2,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Arenoso"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "350-550ml", frecuencia: "Cada 4 días", observaciones: "Tolerante a sequía una vez establecido", frecuenciaDias: 4 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Crecimiento activo" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Protección contra cochinillas"]
      }
    ],
    plagasComunes: ["Cochinillas", "Ácaros"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Fruto comestible", "Chicle", "Madera"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Casimiroa edulis",
    nombreComun: "Zapote blanco",
    familia: "Rutaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol frutal con frutos de pulpa dulce y propiedades sedantes.",
    caracteristicas: {
      alturaMaxima: 15,
      diametroMaximo: 0.7,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 12, max: 30 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 3 días", observaciones: "Sensible a exceso de agua", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "180g", frecuencia: 60, epocaAplicacion: "Crecimiento activo" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra heladas"]
      }
    ],
    plagasComunes: ["Pulgones", "Moscas de la fruta"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Fruto comestible", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Inga spuria",
    nombreComun: "Chalahuite",
    familia: "Fabaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol de rápido crecimiento con frutos comestibles y uso como sombra para café.",
    caracteristicas: {
      alturaMaxima: 12,
      diametroMaximo: 0.5,
      tipoCrecimiento: "Muy rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Húmedo", "Rico en materia orgánica"],
      phSuelo: { min: 5.5, max: 7.0 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Alta",
      temperatura: { min: 18, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "400-600ml", frecuencia: "Cada 2 días", observaciones: "Requiere alta humedad", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Nitrogenado", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Protección contra hormigas"]
      }
    ],
    plagasComunes: ["Hormigas", "Escarabajos"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Sombra de café", "Fruto comestible", "Abono verde"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Erythrina americana",
    nombreComun: "Zompantle",
    familia: "Fabaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol ornamental con espectacular floración roja y usos medicinales tradicionales.",
    caracteristicas: {
      alturaMaxima: 8,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 3 días", observaciones: "Tolerante a sequía", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "120g", frecuencia: 180, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Diciembre - Marzo",
    epocaFructificacion: "Abril - Junio",
    usosTradicionales: ["Ornamental", "Medicinal", "Cercas vivas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Heliocarpus appendiculatus",
    nombreComun: "Jonote",
    familia: "Malvaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol pionero de rápido crecimiento con corteza fibrosa usada para cordelería.",
    caracteristicas: {
      alturaMaxima: 15,
      diametroMaximo: 0.5,
      tipoCrecimiento: "Muy rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Variado", "Bien drenado"],
      phSuelo: { min: 5.5, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 16, max: 36 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-450ml", frecuencia: "Cada 3 días", observaciones: "Muy adaptable", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 180, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Contención", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente naturalmente"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Fibra", "Pionero en recuperación de suelos"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Lonchocarpus rugosus",
    nombreComun: "Chaperno",
    familia: "Fabaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de mediano tamaño con propiedades insecticidas naturales.",
    caracteristicas: {
      alturaMaxima: 12,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Seco"],
      phSuelo: { min: 6.0, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja-Media",
      temperatura: { min: 15, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-350ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 365, epocaAplicacion: "Lluvias" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente naturalmente"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Mayo - Julio",
    epocaFructificacion: "Agosto - Octubre",
    usosTradicionales: ["Insecticida natural", "Leña"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Acacia farnesiana",
    nombreComun: "Huizache",
    familia: "Fabaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto o árbol pequeño espinoso con flores aromáticas muy apreciadas en perfumería.",
    caracteristicas: {
      alturaMaxima: 6,
      diametroMaximo: 0.3,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Seco", "Bien drenado"],
      phSuelo: { min: 6.5, max: 8.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja",
      temperatura: { min: 10, max: 40 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "150-250ml", frecuencia: "Cada 7 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 7 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "80g", frecuencia: 365, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Manejar con cuidado por espinas"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Noviembre - Marzo",
    epocaFructificacion: "Abril - Junio",
    usosTradicionales: ["Perfumería", "Medicinal", "Cercas vivas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Bauhinia divaricata",
    nombreComun: "Pata de vaca",
    familia: "Fabaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol pequeño con hojas características en forma de pezuña y flores ornamentales.",
    caracteristicas: {
      alturaMaxima: 8,
      diametroMaximo: 0.3,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 4 días", observaciones: "Riego moderado", frecuenciaDias: 4 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "120g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos"]
      }
    ],
    plagasComunes: ["Pulgones", "Cochinillas"],
    epocaFloracion: "Marzo - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Ornamental", "Medicinal"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Crescentia alata",
    nombreComun: "Jícaro",
    familia: "Bignoniaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol pequeño con frutos esféricos utilizados para elaborar vasijas y artesanías.",
    caracteristicas: {
      alturaMaxima: 8,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Seco", "Bien drenado"],
      phSuelo: { min: 6.5, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja",
      temperatura: { min: 18, max: 40 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 365, epocaAplicacion: "Lluvias" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente naturalmente"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Mayo - Agosto",
    epocaFructificacion: "Septiembre - Diciembre",
    usosTradicionales: ["Artesanías", "Medicinal", "Recipientes"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Haematoxylum campechianum",
    nombreComun: "Palo de tinte",
    familia: "Fabaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol histórico cuya madera produce tinte natural de color púrpura.",
    caracteristicas: {
      alturaMaxima: 10,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Calcáreo", "Bien drenado"],
      phSuelo: { min: 7.0, max: 8.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 20, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 4 días", observaciones: "Tolerante a sequía", frecuenciaDias: 4 },
        fertilizacion: { tipoFertilizante: "Calcio", cantidad: "150g", frecuencia: 180, epocaAplicacion: "Crecimiento" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra suelos ácidos"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Tinte natural", "Medicinal", "Histórico"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Coccoloba barbadensis",
    nombreComun: "Uvero",
    familia: "Polygonaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de zonas costeras con frutos comestibles y hojas grandes y redondeadas.",
    caracteristicas: {
      alturaMaxima: 12,
      diametroMaximo: 0.5,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Arenoso", "Bien drenado"],
      phSuelo: { min: 6.0, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media-Alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-450ml", frecuencia: "Cada 3 días", observaciones: "Tolerante a salinidad", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Resistente a vientos costeros"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Fruto comestible", "Ornamental", "Estabilización de dunas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Muntingia calabura",
    nombreComun: "Capulín",
    familia: "Muntingiaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol pequeño de rápido crecimiento con deliciosos frutos rojos comestibles.",
    caracteristicas: {
      alturaMaxima: 10,
      diametroMaximo: 0.3,
      tipoCrecimiento: "Muy rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Variado", "Bien drenado"],
      phSuelo: { min: 5.5, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 3 días", observaciones: "Muy adaptable", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "120g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: true, tipo: "Fructificación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra aves en fructificación"]
      }
    ],
    plagasComunes: ["Pájaros", "Moscas de la fruta"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Fruto comestible", "Sombra", "Ornamental"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Sideroxylon capiri",
    nombreComun: "Tempisque",
    familia: "Sapotaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol de madera muy dura y resistente, utilizada para herramientas y construcciones.",
    caracteristicas: {
      alturaMaxima: 20,
      diametroMaximo: 0.8,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 4 días", observaciones: "Crecimiento lento pero constante", frecuenciaDias: 4 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Crecimiento" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Paciencia por crecimiento lento"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Madera dura", "Herramientas", "Construcción"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Vitex mollis",
    nombreComun: "Uvalama",
    familia: "Lamiaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol con frutos comestibles de sabor dulce y propiedades medicinales.",
    caracteristicas: {
      alturaMaxima: 15,
      diametroMaximo: 0.6,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Media",
      temperatura: { min: 16, max: 36 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-450ml", frecuencia: "Cada 3 días", observaciones: "Riego regular para buena producción", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "180g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra pájaros en fructificación"]
      }
    ],
    plagasComunes: ["Pájaros", "Moscas de la fruta"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Fruto comestible", "Medicinal", "Sombra"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Zanthoxylum fagara",
    nombreComun: "Tachuelo",
    familia: "Rutaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto o árbol pequeño espinoso con propiedades medicinales y culinarias.",
    caracteristicas: {
      alturaMaxima: 6,
      diametroMaximo: 0.2,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Seco"],
      phSuelo: { min: 6.5, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja-Media",
      temperatura: { min: 15, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "80g", frecuencia: 365, epocaAplicacion: "Lluvias" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Manejar con cuidado por espinas"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Condimento", "Medicinal", "Cercas vivas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Bravaisia integerrima",
    nombreComun: "Palo de agua",
    familia: "Acanthaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol de zonas inundables con raíces aéreas y alta tolerancia a suelos anegados.",
    caracteristicas: {
      alturaMaxima: 12,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Inundable", "Arcilloso"],
      phSuelo: { min: 5.5, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Muy alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "500-700ml", frecuencia: "Diario", observaciones: "Requiere suelos constantemente húmedos", frecuenciaDias: 1 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "200g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor con buen drenaje" },
        protecciones: ["Adaptado a inundaciones"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Junio - Agosto",
    epocaFructificacion: "Septiembre - Noviembre",
    usosTradicionales: ["Estabilización de riberas", "Sombra", "Madera"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Cupania glabra",
    nombreComun: "Palo de cera",
    familia: "Sapindaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de mediano tamaño con frutos ornamentales y corteza lisa característica.",
    caracteristicas: {
      alturaMaxima: 18,
      diametroMaximo: 0.6,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 16, max: 34 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-500ml", frecuencia: "Cada 3 días", observaciones: "Riego regular en crecimiento", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "180g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Ornamental", "Sombra", "Madera"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Diphysa carthagenensis",
    nombreComun: "Guachipelín",
    familia: "Fabaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol pequeño con flores amarillas vistosas y madera muy dura.",
    caracteristicas: {
      alturaMaxima: 10,
      diametroMaximo: 0.4,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Seco"],
      phSuelo: { min: 6.5, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja-Media",
      temperatura: { min: 15, max: 38 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-350ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 365, epocaAplicacion: "Lluvias" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Resistente naturalmente"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Febrero - Abril",
    epocaFructificacion: "Mayo - Julio",
    usosTradicionales: ["Madera dura", "Ornamental", "Cercas vivas"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Eugenia capuli",
    nombreComun: "Arrayán",
    familia: "Myrtaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto aromático con frutos comestibles y hojas utilizadas como condimento.",
    caracteristicas: {
      alturaMaxima: 5,
      diametroMaximo: 0.2,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 5.5, max: 7.0 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 3 días", observaciones: "Mantener humedad constante", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "100g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor pequeño" },
        protecciones: ["Protección contra heladas"]
      }
    ],
    plagasComunes: ["Pulgones", "Cochinillas"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Condimento", "Medicinal", "Fruto comestible"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Ficus cotinifolia",
    nombreComun: "Amate prieto",
    familia: "Moraceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de gran tamaño con raíces aéreas y hojas coriáceas de color oscuro.",
    caracteristicas: {
      alturaMaxima: 25,
      diametroMaximo: 1.5,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Húmedo"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Alta",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "400-600ml", frecuencia: "Cada 2 días", observaciones: "Requiere alta humedad ambiental", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "300g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: true, tipo: "Contención", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Espacio amplio para desarrollo"]
      }
    ],
    plagasComunes: ["Cochinillas", "Ácaros"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Sombra", "Ornamental", "Fauna silvestre"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Guarea glabra",
    nombreComun: "Palo santo",
    familia: "Meliaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol de madera aromática muy apreciada en ebanistería y carpintería fina.",
    caracteristicas: {
      alturaMaxima: 20,
      diametroMaximo: 0.8,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundo", "Bien drenado"],
      phSuelo: { min: 6.0, max: 7.0 },
      exposicionSolar: "Media sombra a sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 20, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "350-550ml", frecuencia: "Cada 3 días", observaciones: "Requiere humedad constante", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Crecimiento" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Protección contra vientos"]
      }
    ],
    plagasComunes: ["Barrenadores"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Junio - Agosto",
    usosTradicionales: ["Madera fina", "Aromática", "Ebanistería"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Hamelia patens",
    nombreComun: "Chichipince",
    familia: "Rubiaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto ornamental con flores tubulares rojas que atraen colibríes y mariposas.",
    caracteristicas: {
      alturaMaxima: 4,
      diametroMaximo: 0.15,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 3 días", observaciones: "Riego regular para buena floración", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Rico en fósforo", cantidad: "80g", frecuencia: 60, epocaAplicacion: "Floración" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor pequeño" },
        protecciones: ["Atrae polinizadores"]
      }
    ],
    plagasComunes: ["Pulgones", "Ácaros"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Ornamental", "Medicinal", "Polinizadores"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Iresine diffusa",
    nombreComun: "Hierba del toro",
    familia: "Amaranthaceae",
    origen: "Nativo de la región",
    descripcion: "Planta herbácea perenne con propiedades medicinales y uso como forraje.",
    caracteristicas: {
      alturaMaxima: 1.5,
      diametroMaximo: 0.05,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Húmedo", "Rico en materia orgánica"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Media sombra a sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 18, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "100-200ml", frecuencia: "Cada 2 días", observaciones: "Mantener suelo húmedo", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Nitrogenado", cantidad: "50g", frecuencia: 30, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Maceta pequeña" },
        protecciones: ["Protección contra caracoles"]
      }
    ],
    plagasComunes: ["Caracoles", "Babosas"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Medicinal", "Forraje", "Ornamental"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Jatropha curcas",
    nombreComun: "Piñón",
    familia: "Euphorbiaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto con semillas tóxicas pero utilizadas para producir biodiesel.",
    caracteristicas: {
      alturaMaxima: 5,
      diametroMaximo: 0.2,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Seco", "Bien drenado"],
      phSuelo: { min: 6.0, max: 8.5 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Baja",
      temperatura: { min: 18, max: 40 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 5 días", observaciones: "Muy resistente a sequía", frecuenciaDias: 5 },
        fertilizacion: { tipoFertilizante: "Poco exigente", cantidad: "100g", frecuencia: 180, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Bolsa negra" },
        protecciones: ["Cuidado: semillas tóxicas"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Biodiesel", "Cercas vivas", "Medicinal con precaución"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Lippia alba",
    nombreComun: "Orégano de monte",
    familia: "Verbenaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto aromático con propiedades medicinales y uso como condimento.",
    caracteristicas: {
      alturaMaxima: 2,
      diametroMaximo: 0.1,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "150-250ml", frecuencia: "Cada 3 días", observaciones: "Riego regular para buen aroma", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "60g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Maceta pequeña" },
        protecciones: ["Protección contra exceso de agua"]
      }
    ],
    plagasComunes: ["Pulgones", "Ácaros"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Condimento", "Medicinal", "Té aromático"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Montanoa tomentosa",
    nombreComun: "Zoapatle",
    familia: "Asteraceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto con propiedades medicinales tradicionales, especialmente ginecológicas.",
    caracteristicas: {
      alturaMaxima: 3,
      diametroMaximo: 0.15,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "200-300ml", frecuencia: "Cada 3 días", observaciones: "Riego regular", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "80g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor pequeño" },
        protecciones: ["Uso medicinal con precaución"]
      }
    ],
    plagasComunes: ["Pulgones", "Cochinillas"],
    epocaFloracion: "Octubre - Diciembre",
    epocaFructificacion: "Enero - Marzo",
    usosTradicionales: ["Medicinal", "Ornamental"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Neurolaena lobata",
    nombreComun: "Contrahierba",
    familia: "Asteraceae",
    origen: "Nativo de la región",
    descripcion: "Planta medicinal con reconocidas propiedades antiparasitarias y antimaláricas.",
    caracteristicas: {
      alturaMaxima: 2,
      diametroMaximo: 0.08,
      tipoCrecimiento: "Rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Húmedo", "Rico en materia orgánica"],
      phSuelo: { min: 5.5, max: 7.0 },
      exposicionSolar: "Media sombra",
      humedadAmbiente: "Alta",
      temperatura: { min: 18, max: 30 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "150-250ml", frecuencia: "Cada 2 días", observaciones: "Mantener humedad constante", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "60g", frecuencia: 30, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Maceta pequeña" },
        protecciones: ["Protección contra sol directo"]
      }
    ],
    plagasComunes: ["Caracoles", "Babosas"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Medicinal", "Antiparasitario", "Antimalárico"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Ocimum micranthum",
    nombreComun: "Albahaca de monte",
    familia: "Lamiaceae",
    origen: "Nativo de la región",
    descripcion: "Hierba aromática con usos culinarios y medicinales, pariente silvestre de la albahaca.",
    caracteristicas: {
      alturaMaxima: 1,
      diametroMaximo: 0.05,
      tipoCrecimiento: "Rápido",
      longevidad: "Anual"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 18, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "100-200ml", frecuencia: "Cada 2 días", observaciones: "Mantener suelo ligeramente húmedo", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "40g", frecuencia: 30, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Maceta pequeña" },
        protecciones: ["Protección contra babosas"]
      }
    ],
    plagasComunes: ["Babosas", "Pulgones"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Condimento", "Medicinal", "Té"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Piper auritum",
    nombreComun: "Hoja santa",
    familia: "Piperaceae",
    origen: "Nativo de la región",
    descripcion: "Arbusto aromático con grandes hojas utilizadas en la gastronomía mexicana.",
    caracteristicas: {
      alturaMaxima: 4,
      diametroMaximo: 0.15,
      tipoCrecimiento: "Muy rápido",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Húmedo", "Rico en materia orgánica"],
      phSuelo: { min: 5.5, max: 7.0 },
      exposicionSolar: "Media sombra",
      humedadAmbiente: "Alta",
      temperatura: { min: 18, max: 32 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "300-400ml", frecuencia: "Cada 2 días", observaciones: "Requiere alta humedad", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "100g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Frecuente", frecuencia: 90 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio de lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra sol directo"]
      }
    ],
    plagasComunes: ["Caracoles", "Babosas"],
    epocaFloracion: "Todo el año",
    epocaFructificacion: "Todo el año",
    usosTradicionales: ["Culinario", "Medicinal", "Aromático"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Swietenia macrophylla",
    nombreComun: "Caoba",
    familia: "Meliaceae",
    origen: "Endémico de la cuenca del Papaloapan",
    descripcion: "Árbol maderable de alto valor con madera preciosa rojiza. Crece en selvas húmedas.",
    caracteristicas: {
      alturaMaxima: 40,
      diametroMaximo: 2.0,
      tipoCrecimiento: "Medio",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Profundos", "Fértiles"],
      phSuelo: { min: 5.5, max: 7.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 20, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 12 },
        riego: { cantidadAgua: "300-600ml", frecuencia: "Cada 2 días", observaciones: "Requiere humedad constante", frecuenciaDias: 2 },
        fertilizacion: { tipoFertilizante: "Fertilizante completo", cantidad: "200g", frecuencia: 90, epocaAplicacion: "Crecimiento" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio lluvias", tipoMaceta: "Bolsa grande" },
        protecciones: ["Protección contra insectos barrenadores"]
      }
    ],
    plagasComunes: ["Barrenador de brotes"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Madera preciosa", "Ornamental", "Sombra"],
    estadoConservacion: "Vulnerable"
  },
  {
    nombreCientifico: "Taxodium mucronatum",
    nombreComun: "Ahuehuete",
    familia: "Cupressaceae",
    origen: "Nativo de México",
    descripcion: "Árbol emblemático de México, conocido por su longevidad y resistencia a inundaciones.",
    caracteristicas: {
      alturaMaxima: 30,
      diametroMaximo: 3.0,
      tipoCrecimiento: "Lento",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Inundable", "Arcilloso"],
      phSuelo: { min: 6.0, max: 8.0 },
      exposicionSolar: "Sol pleno",
      humedadAmbiente: "Alta",
      temperatura: { min: 15, max: 30 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 12 },
        riego: { cantidadAgua: "500-700ml", frecuencia: "Diario", observaciones: "Requiere suelos constantemente húmedos", frecuenciaDias: 1 },
        fertilizacion: { tipoFertilizante: "Orgánico", cantidad: "200g", frecuencia: 60, epocaAplicacion: "Todo el año" },
        poda: { requiere: false },
        trasplante: { requiere: true, epocaRecomendada: "Inicio lluvias", tipoMaceta: "Contenedor grande" },
        protecciones: ["Adaptado a inundaciones"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Marzo - Mayo",
    epocaFructificacion: "Agosto - Octubre",
    usosTradicionales: ["Ornamental", "Sombra", "Cultural"],
    estadoConservacion: "Preocupación menor"
  },
  {
    nombreCientifico: "Zanthoxylum fagara",
    nombreComun: "Fagara",
    familia: "Rutaceae",
    origen: "Nativo de la región",
    descripcion: "Árbol pequeño con espinas y frutos aromáticos, utilizado en medicina tradicional.",
    caracteristicas: {
      alturaMaxima: 8,
      diametroMaximo: 0.3,
      tipoCrecimiento: "Moderado",
      longevidad: "Perenne"
    },
    requisitosAmbientales: {
      tipoSuelo: ["Bien drenado", "Fértil"],
      phSuelo: { min: 6.0, max: 7.5 },
      exposicionSolar: "Sol pleno a media sombra",
      humedadAmbiente: "Media",
      temperatura: { min: 15, max: 35 }
    },
    cuidadosPorEdad: [
      {
        etapa: "Plántula",
        rangoEdadMeses: { min: 1, max: 6 },
        riego: { cantidadAgua: "250-400ml", frecuencia: "Cada 3 días", observaciones: "Riego regular", frecuenciaDias: 3 },
        fertilizacion: { tipoFertilizante: "Balanceado", cantidad: "150g", frecuencia: 60, epocaAplicacion: "Crecimiento" },
        poda: { requiere: true, tipo: "Formación", frecuencia: 180 },
        trasplante: { requiere: true, epocaRecomendada: "Inicio lluvias", tipoMaceta: "Contenedor mediano" },
        protecciones: ["Protección contra vientos"]
      }
    ],
    plagasComunes: ["Escasas"],
    epocaFloracion: "Abril - Junio",
    epocaFructificacion: "Julio - Septiembre",
    usosTradicionales: ["Ornamental", "Sombra", "Madera"],
    estadoConservacion: "Preocupación menor"
  }
  // Continuar con las demás especies...
];

async function insertEspecies() {
  console.log(`🌿 Insertando ${especiesData.length} especies...`);
  
  let especiesInsertadas = 0;
  let especiesActualizadas = 0;

  for (const especieData of especiesData) {
    try {
      const especieExistente = await Especie.findOne({ 
        nombreCientifico: especieData.nombreCientifico 
      });
      
      if (!especieExistente) {
        const especie = new Especie(especieData);
        await especie.save();
        especiesInsertadas++;
        console.log(`   ✅ ${especieData.nombreComun}`);
      } else {
        // Actualizar especie existente
        await Especie.findOneAndUpdate(
          { nombreCientifico: especieData.nombreCientifico },
          especieData,
          { new: true }
        );
        especiesActualizadas++;
        console.log(`   🔄 ${especieData.nombreComun} (actualizada)`);
      }
    } catch (error) {
      console.error(`   ❌ Error con ${especieData.nombreComun}:`, error.message);
    }
  }

  console.log(`\n📊 Resumen especies:`);
  console.log(`   ✅ Nuevas: ${especiesInsertadas}`);
  console.log(`   🔄 Actualizadas: ${especiesActualizadas}`);
  console.log(`   📈 Total en BD: ${await Especie.countDocuments()}`);
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  import('../config/database.js').then(() => insertEspecies());
} else {
  await insertEspecies();
}