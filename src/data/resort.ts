/**
 * Single source of truth for all Rio Cuebe Lodge content.
 * Edit text, contacts, prices and photos here; the page components only render this data.
 */
import aerea from "@/assets/resort/aerea-resort.jpg.asset.json";
import suiteRio from "@/assets/resort/suite-rio.jpg.asset.json";
import bangaloJardim from "@/assets/resort/bangalo-jardim.jpg.asset.json";
import suiteFamilia from "@/assets/resort/suite-familia-sala.jpg.asset.json";
import safariBuggy from "@/assets/resort/safari-buggy.jpg.asset.json";
import passadicoPalmeiras from "@/assets/resort/passadico-palmeiras.jpg.asset.json";
import rioEntardecer from "@/assets/resort/rio-entardecer.jpg.asset.json";
import margemRio from "@/assets/resort/margem-rio.jpg.asset.json";
import restauranteSalao from "@/assets/resort/restaurante-salao.jpg.asset.json";
import pratoGrelhados from "@/assets/resort/prato-grelhados.jpg.asset.json";
import sobremesaGelado from "@/assets/resort/sobremesa-gelado.jpg.asset.json";
import sobremesaFlan from "@/assets/resort/sobremesa-flan.jpg.asset.json";
import sobremesaRolo from "@/assets/resort/sobremesa-rolo-chocolate.jpg.asset.json";
import piscinaPanoramica from "@/assets/resort/piscina-panoramica.jpg.asset.json";
import mobiliarioCocos from "@/assets/resort/mobiliario-cocos.jpg.asset.json";
import varandaVime from "@/assets/resort/varanda-vime.jpg.asset.json";
import passadicoRestaurante from "@/assets/resort/passadico-restaurante.jpg.asset.json";
import bangalosEntardecer from "@/assets/resort/bangalos-entardecer.jpg.asset.json";
import piscinaDeck from "@/assets/resort/piscina-deck.jpg.asset.json";
import suiteAmpla from "@/assets/resort/suite-ampla.jpg.asset.json";
import aereaBangalosRio from "@/assets/resort/aerea-bangalos-rio.jpg.asset.json";
import bangalosPorDoSol from "@/assets/resort/bangalos-por-do-sol.jpg.asset.json";
import piscinaPorDoSol from "@/assets/resort/piscina-por-do-sol.jpg.asset.json";
import rapidosCuebe from "@/assets/resort/rapidos-cuebe.jpg.asset.json";
import lounge from "@/assets/resort/lounge.jpg.asset.json";
import rececao from "@/assets/resort/rececao.jpg.asset.json";
import quartoDuplo from "@/assets/resort/quarto-duplo.jpg.asset.json";
import salaSuite from "@/assets/resort/sala-suite.jpg.asset.json";
import restauranteNoite from "@/assets/resort/restaurante-noite.jpg.asset.json";
import esplanadaNoite from "@/assets/resort/esplanada-noite.jpg.asset.json";
import passadicoAcacias from "@/assets/resort/passadico-acacias.jpg.asset.json";
import bangaloNoite from "@/assets/resort/bangalo-noite.jpg.asset.json";
import bangalosMargem from "@/assets/resort/bangalos-margem.jpg.asset.json";

export type Photo = { src: string; alt: string };

const photo = (asset: { url: string }, alt: string): Photo => ({ src: asset.url, alt });

/* ---------- Identidade ---------- */
export const resort = {
  name: "Rio Cuebe Lodge",
  shortName: "Rio Cuebe",
  tagline: "Resort de ecoturismo e lazer",
  location: "Menongue, Angola",
  summary:
    "Resort de ecoturismo e lazer a 11 km de Menongue. Luxo rústico, natureza intocada e hospitalidade à beira do rio.",
  heroTitle: "Luxo rústico à beira do Rio Cuebe",
  heroText:
    "Suítes de palha sobre as margens do rio, gastronomia à beira-água e o silêncio de um lugar onde o tempo desacelera — na rota de safaris do sudoeste de Angola.",
  heroPhoto: photo(aerea, "Vista aérea do resort com a piscina, o restaurante de palha e o rio"),
};

export const stats = [
  { value: "37", label: "suítes junto ao rio" },
  { value: "900+", label: "hectares de natureza" },
  { value: "11 km", label: "de Menongue" },
];

/* ---------- Contactos ---------- */
export const contact = {
  phones: [
    { display: "+244 931 510 510", href: "tel:+244931510510" },
    { display: "+244 951 510 510", href: "tel:+244951510510" },
  ],
  whatsapp: { display: "+244 931 510 510", number: "244931510510" },
  email: "info@hoteisangola.com",
  hours: "Diariamente, das 8h às 22h",
  address: "Estrada de Menongue – Caiundo, Km 11, Missombo, Menongue",
  region: "Cuando Cubango, Angola",
  gps: { lat: -14.7708708, lng: 17.6886392, label: "-14,770871 / 17,688639" },
  plusCode: "5FQV6MHQ+MF",
  airportTransferNotice: "Transfer do aeroporto: avise com 72 h de antecedência",
} as const;

/** Redes sociais. Add the Instagram URL here when available; empty entries are hidden. */
export const social: { id: "facebook" | "instagram"; label: string; url: string }[] = [
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/Riocuebelodge" },
];

export const mapEmbedUrl = `https://www.google.com/maps?q=${contact.gps.lat},${contact.gps.lng}&z=14&output=embed`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contact.gps.lat},${contact.gps.lng}`;

/* ---------- Navegação ---------- */
export const navLinks = [
  { href: "#acomodacoes", label: "Acomodações" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#gastronomia", label: "Gastronomia" },
  { href: "#lazer", label: "Lazer" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contactos", label: "Contactos" },
];

/* ---------- Acomodações ---------- */
export type Accommodation = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  /** Price per night in Kwanzas. null = "sob consulta" until the real price is confirmed. */
  pricePerNight: number | null;
  photo: Photo;
};

export const accommodationsIntro =
  "37 suítes ao longo da margem do Rio Cuebe, em bangalôs espaçosos com tetos de palha, madeira natural e janelas amplas com vista para a vegetação e para o rio.";

export const accommodations: Accommodation[] = [
  {
    id: "rio",
    name: "Bangalô Rio",
    description:
      "Varanda sobre as margens, cama king e sala de estar com sofá. Acorde com o reflexo do rio.",
    highlights: ["Vista rio", "Cama king", "Varanda privada"],
    pricePerNight: null,
    photo: photo(suiteRio, "Suite com cama de casal, sofá de pele e teto de palha trançada"),
  },
  {
    id: "jardim",
    name: "Bangalô Jardim",
    description:
      "Rodeado de vegetação nativa, com ambiente reservado e decoração em madeira e fibras naturais.",
    highlights: ["Entre árvores", "Mais privacidade", "Silêncio total"],
    pricePerNight: null,
    photo: photo(bangaloJardim, "Bangalô de palha entre árvores com caminho de lajes verdes"),
  },
  {
    id: "familia",
    name: "Bangalô Família",
    description:
      "Mais espaço para partilhar: sala ampla, camas adicionais e vistas abertas para o rio.",
    highlights: ["Sala ampla", "Camas extra", "Ideal para famílias"],
    pricePerNight: null,
    photo: photo(suiteFamilia, "Sala de estar da suite com poltronas, mesa de jantar e tapete de zebra"),
  },
];

export const amenities = [
  "Wi-Fi gratuito",
  "Estacionamento gratuito",
  "Pequeno-almoço buffet",
  "Ar condicionado",
  "Receção 24 horas",
  "Transfer do aeroporto",
  "Lavandaria",
  "Cofre",
  "Concierge",
];

/* ---------- Experiências ---------- */
export type Experience = {
  id: string;
  name: string;
  description: string;
  /** Short practical note shown on the card. */
  note: string;
  photo: Photo;
};

export const experiencesIntro =
  "Num território de mais de 900 hectares: passeios guiados, observação da vida selvagem, caminhadas e momentos à beira-água.";

export const experiences: Experience[] = [
  {
    id: "safari",
    name: "Safari em buggy",
    description:
      "Passeios guiados em veículo todo-o-terreno (UTV) pelas trilhas da floresta, com paragens para observar a paisagem.",
    note: "Com guia · reserve na receção",
    photo: photo(safariBuggy, "Buggy a percorrer uma trilha na floresta"),
  },
  {
    id: "caminhadas",
    name: "Caminhadas à beira-rio",
    description:
      "Percursos a pé ao longo das margens e pelos passadiços de madeira, ao nascer ou ao pôr do sol.",
    note: "Nascer e pôr do sol",
    photo: photo(passadicoPalmeiras, "Passadiço de madeira junto ao rio, com palmeiras"),
  },
  {
    id: "pesca",
    name: "Pesca",
    description: "Pontos tranquilos junto ao rio para pescar com calma, sozinho ou em grupo.",
    note: "Consulte condições",
    photo: photo(rioEntardecer, "Rio calmo ao fim da tarde, com margens douradas"),
  },
  {
    id: "banho",
    name: "Banho nas margens",
    description:
      "Zonas de margem com rochas e sombra para refrescar e relaxar. Sujeito à época do ano.",
    note: "Incluído na estadia",
    photo: photo(margemRio, "Margem do rio sob as árvores"),
  },
];

/* ---------- Gastronomia ---------- */
export const dining = {
  title: "Sabores do resort, com vista para o rio",
  text: "Um salão panorâmico com teto de palha trançada e esplanada virada para a água. Cozinha angolana e internacional, grelhados da casa e bebidas bem geladas num ambiente rústico, rodeado de natureza.",
  highlights: [
    { title: "Cozinha angolana e internacional", text: "Pratos tradicionais e grelhados da casa." },
    { title: "Pequeno-almoço buffet", text: "Incluído, com saladas frescas e acompanhamentos." },
    { title: "Bar no deck", text: "Bebidas geladas junto ao rio." },
    { title: "Sobremesas artesanais", text: "Rolo de chocolate, flan e gelado." },
  ],
  hero: photo(restauranteSalao, "Salão do restaurante com mesas postas e janelas sobre o rio"),
  dishes: [
    photo(pratoGrelhados, "Prato de grelhados com batata frita e salada"),
    photo(sobremesaFlan, "Flan com calda de caramelo e natas"),
    photo(sobremesaRolo, "Rolo de chocolate com chantilly"),
    photo(sobremesaGelado, "Sobremesa de gelado servido em cesto de bolacha"),
  ],
};

/* ---------- Lazer ---------- */
export const leisure = [
  {
    id: "piscina",
    name: "Piscina exterior",
    description: "Espreguiçadeiras e guarda-sóis, integrada na paisagem ribeirinha.",
    photo: photo(piscinaPanoramica, "Piscina exterior com espreguiçadeiras e guarda-sóis"),
  },
  {
    id: "relaxamento",
    name: "Varandas sobre o rio",
    description: "Cadeiras de vime, passadiços e miradouros para ler, conversar ou só observar.",
    photo: photo(varandaVime, "Varanda coberta com poltronas de vime sobre o rio"),
  },
  {
    id: "artesanal",
    name: "Mobiliário artesanal",
    description: "Mesas e bancos feitos à mão com cocos e texturas naturais.",
    photo: photo(mobiliarioCocos, "Mesas e bancos artesanais feitos de cocos"),
  },
  {
    id: "lounge",
    name: "Lounge",
    description: "Sofás de pele e poltronas com padrão de zebra, sob o teto de palha trançada.",
    photo: photo(lounge, "Lounge com poltronas de padrão zebra, pufes de pele e tapete vermelho"),
  },
];

export const extraFacilities = [
  "Spa e massagens",
  "Piscina e parque infantil",
  "Centro de negócios e salas de reuniões",
  "Discoteca",
  "Santuário",
];

/* ---------- Galeria ---------- */
export const gallery: Photo[] = [
  photo(aereaBangalosRio, "Vista aérea dos bangalôs ao longo do Rio Cuebe"),
  photo(bangalosPorDoSol, "Bangalôs de palha ao pôr do sol"),
  photo(piscinaPorDoSol, "Piscina e espreguiçadeiras ao entardecer"),
  photo(rapidosCuebe, "Rápidos do Rio Cuebe vistos do ar"),
  photo(lounge, "Lounge com poltronas de padrão zebra"),
  photo(rececao, "Receção com balcão em pedra e sala de estar"),
  photo(quartoDuplo, "Quarto com duas camas e candeeiros de cabeceira"),
  photo(salaSuite, "Sala da suite com sofá de pele e vista para o jardim"),
  photo(restauranteNoite, "Restaurante à noite, com mesas postas para o jantar"),
  photo(esplanadaNoite, "Deck iluminado do restaurante à noite"),
  photo(passadicoAcacias, "Passadiço iluminado entre acácias, junto ao rio"),
  photo(bangaloNoite, "Bangalô iluminado ao anoitecer"),
  photo(bangalosMargem, "Bangalôs alinhados na margem do rio"),
  photo(aerea, "Vista aérea do restaurante e da piscina junto ao rio"),
  photo(bangalosEntardecer, "Bangalôs entre as árvores ao fim da tarde"),
  photo(passadicoRestaurante, "Passadiço de madeira ao longo do restaurante, junto ao rio"),
  photo(piscinaDeck, "Piscina junto à varanda, com espreguiçadeiras e guarda-sóis"),
  photo(suiteAmpla, "Suite ampla com cama de casal, sofá e mesa de jantar"),
  photo(safariBuggy, "Buggies a percorrer uma trilha na floresta"),
  photo(rioEntardecer, "O Rio Cuebe ao entardecer"),
];
