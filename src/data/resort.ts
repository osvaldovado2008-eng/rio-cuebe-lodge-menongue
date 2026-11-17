/**
 * Single source of truth for all Rio Cuebe Lodge content.
 * Edit text, contacts, prices and photos here; the page components only render this data.
 */
import aerea from "@/assets/resort/aerea-resort-hd.jpg.asset.json";
import suiteRio from "@/assets/resort/suite-rio.jpg.asset.json";
import bangaloJardim from "@/assets/resort/bangalo-jardim.jpg.asset.json";
import suiteFamilia from "@/assets/resort/suite-familia-sala.jpg.asset.json";
import safariBuggy from "@/assets/resort/safari-buggy.jpg.asset.json";
import passadicoPalmeiras from "@/assets/resort/passadico-palmeiras.jpg.asset.json";
import rioEntardecer from "@/assets/resort/rio-entardecer.jpg.asset.json";
import restauranteSalao from "@/assets/resort/restaurante-salao.jpg.asset.json";
import pratoGrelhados from "@/assets/resort/prato-grelhados.jpg.asset.json";
import sobremesaGelado from "@/assets/resort/sobremesa-gelado.jpg.asset.json";
import sobremesaFlan from "@/assets/resort/sobremesa-flan.jpg.asset.json";
import sobremesaRolo from "@/assets/resort/sobremesa-rolo-chocolate.jpg.asset.json";
import piscinaPanoramica from "@/assets/resort/piscina-panoramica.jpg.asset.json";
import varandaVime from "@/assets/resort/varanda-vime.jpg.asset.json";
import passadicoRestaurante from "@/assets/resort/passadico-restaurante.jpg.asset.json";
import bangalosEntardecer from "@/assets/resort/bangalos-entardecer.jpg.asset.json";
import piscinaDeck from "@/assets/resort/piscina-deck.jpg.asset.json";
import suiteAmpla from "@/assets/resort/suite-ampla.jpg.asset.json";
import aereaBangalosRio from "@/assets/resort/aerea-bangalos-rio-hd.jpg.asset.json";
import bangalosPorDoSol from "@/assets/resort/bangalos-por-do-sol-hd.jpg.asset.json";
import piscinaPorDoSol from "@/assets/resort/piscina-por-do-sol-hd.jpg.asset.json";
import rapidosCuebe from "@/assets/resort/rapidos-cuebe-hd.jpg.asset.json";
import lounge from "@/assets/resort/lounge.jpg.asset.json";
import rececao from "@/assets/resort/rececao.jpg.asset.json";
import quartoDuplo from "@/assets/resort/quarto-duplo.jpg.asset.json";
import salaSuite from "@/assets/resort/sala-suite.jpg.asset.json";
import restauranteNoite from "@/assets/resort/restaurante-noite.jpg.asset.json";
import esplanadaNoite from "@/assets/resort/esplanada-noite.jpg.asset.json";
import passadicoAcacias from "@/assets/resort/passadico-acacias.jpg.asset.json";
import bangaloNoite from "@/assets/resort/bangalo-noite.jpg.asset.json";
import bangalosMargem from "@/assets/resort/bangalos-margem.jpg.asset.json";
import spaMargemRio from "@/assets/resort/spa-margem-rio.jpg.asset.json";
import centroNegocios from "@/assets/resort/centro-negocios.jpg.asset.json";
import salaReunioes from "@/assets/resort/sala-reunioes.jpg.asset.json";
import discotecaFesta from "@/assets/resort/discoteca-festa.jpg.asset.json";
import santuario from "@/assets/resort/santuario.jpg.asset.json";

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
    "Suítes de palha sobre as margens do rio, gastronomia à beira-água e o silêncio de um lugar onde o tempo desacelera — no coração de África.",
  heroPhoto: photo(aerea, "Vista aérea do resort com a piscina, o restaurante de palha e o rio"),
};

/** Opening photos cross-fade once decoded, with a gentle zoom. The first one loads first. */
export const heroSlides: Photo[] = [
  resort.heroPhoto,
  photo(bangalosPorDoSol, "Bangalôs de palha ao pôr do sol"),
  photo(aereaBangalosRio, "Vista aérea dos bangalôs ao longo do Rio Cuebe"),
  photo(piscinaPorDoSol, "Piscina e espreguiçadeiras ao entardecer"),
  photo(rapidosCuebe, "Rápidos do Rio Cuebe vistos do ar"),
];

export const stats = [
  { value: "37", label: "suítes junto ao rio" },
  { value: "900+", label: "hectares de natureza" },
  { value: "11 km", label: "de Menongue" },
];

/* ---------- Contactos ---------- */
export const contact = {
  phones: [{ display: "+244 926 664 427", href: "tel:+244926664427" }],
  whatsapp: { display: "+244 926 664 427", number: "244926664427" },
  email: "reservas.riocuebelodge@gmail.com",
  hours: "Diariamente, das 8h às 22h",
  address: "Estrada de Menongue – Km 11, Missombo, Menongue",
  region: "Cuando Cubango, Angola",
  gps: { lat: -14.7708708, lng: 17.6886392, label: "-14,770871 / 17,688639" },
  plusCode: "5FQV6MHQ+MF",
  airportTransferNotice: "Transfer do aeroporto: avise com 72 h de antecedência",
} as const;

/** Redes sociais. Entries with an empty URL are hidden. */
export const social: { id: "facebook" | "instagram" | "youtube"; label: string; url: string }[] = [
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/Riocuebelodge" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/riocuebe" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/watch?v=AktKzRcfaLg" },
];

export const mapEmbedUrl = `https://www.google.com/maps?q=${contact.gps.lat},${contact.gps.lng}&z=14&output=embed`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contact.gps.lat},${contact.gps.lng}`;

/* ---------- Navegação ---------- */
export const navLinks = [
  { href: "#acomodacoes", label: "Acomodações" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#gastronomia", label: "Gastronomia" },
  { href: "#lazer", label: "Lazer" },
  { href: "#eventos", label: "Eventos" },
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
      "Varanda sobre as margens, cama king e sala de estar com sofá de pele, poltronas e mesa de refeições. Acorde com o reflexo do rio.",
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

/** What every suite has inside (as shown in the resort's presentation video). */
export const roomFeatures = [
  "Sala de estar com sofá e poltronas",
  "Mesa de refeições",
  "Televisão",
  "Roupeiro amplo",
  "Minibar",
  "Produtos de higiene",
  "Varanda com cadeiras",
  "Teto de palha trançada",
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
  "Num território de mais de 900 hectares: passeios de buggy pela floresta, massagens à beira-rio, caminhadas, pesca e momentos junto aos rápidos do Cuebe.";

export const experiences: Experience[] = [
  {
    id: "buggy",
    name: "Passeio em buggy",
    description:
      "Passeios guiados em veículo todo-o-terreno (UTV) pelas trilhas da floresta, com paragens para observar a paisagem.",
    note: "Com guia · sob consulta",
    photo: photo(safariBuggy, "Buggy a percorrer uma trilha na floresta"),
  },
  {
    id: "spa",
    name: "Spa à beira-rio",
    description:
      "Massagens num deck de madeira sobre o rio, com chá e o som da água. Relaxamento a sério, no meio da natureza.",
    note: "Marcação prévia",
    photo: photo(spaMargemRio, "Massagem num deck de madeira com vista para o rio"),
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
    id: "rapidos",
    name: "Rápidos do Cuebe",
    description:
      "Um miradouro de palha junto aos rápidos e zonas de margem com rochas e sombra para refrescar. Banho sujeito à época do ano.",
    note: "Incluído na estadia",
    photo: photo(rapidosCuebe, "Rápidos do Rio Cuebe vistos do ar"),
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
    id: "santuario",
    name: "Santuário",
    description: "Um pavilhão de palha ao ar livre com a imagem de Nossa Senhora — um lugar de silêncio e recolhimento.",
    photo: photo(santuario, "Pavilhão de palha com a imagem de Nossa Senhora, ao entardecer"),
  },
  {
    id: "lounge",
    name: "Lounge",
    description: "Sofás de pele e poltronas com padrão de zebra, sob o teto de palha trançada.",
    photo: photo(lounge, "Lounge com poltronas de padrão zebra, pufes de pele e tapete vermelho"),
  },
];

export const extraFacilities = [
  "Piscina e parque infantil",
  "Mobiliário artesanal feito de cocos",
  "Bar no deck",
  "Receção 24 horas",
];

/* ---------- Eventos e negócios ---------- */
export const events = {
  title: "Reuniões, conferências e festas",
  text: "Espaços para trabalhar e celebrar no meio da natureza: centro de negócios, sala de reuniões, sala de conferências e uma discoteca para grandes festas.",
  spaces: [
    {
      id: "negocios",
      name: "Centro de negócios",
      description: "Escritório com computadores e zona de estar, para trabalhar durante a estadia.",
      photo: photo(centroNegocios, "Entrada do centro de negócios, em edifício de palha"),
    },
    {
      id: "reunioes",
      name: "Reuniões e conferências",
      description: "Sala de administração com cadeiras de pele e ecrã, e sala ampla com microfones nas mesas para seminários e encontros de empresa.",
      photo: photo(salaReunioes, "Sala de reuniões com mesa comprida, cadeiras de pele e ecrã"),
    },
    {
      id: "festas",
      name: "Discoteca e festas",
      description: "Pista iluminada e salão para casamentos, aniversários e festas de empresa.",
      photo: photo(discotecaFesta, "Festa na discoteca, com pista iluminada e muitos convidados"),
    },
  ],
};

/* ---------- Vídeo ---------- */
export const video = {
  youtubeId: "AktKzRcfaLg",
  title: "Conheça o lodge em vídeo",
  text: "Da entrada às suítes, do spa aos rápidos do rio: uma volta completa pelo Rio Cuebe Lodge.",
  duration: "7 min",
  poster: photo(aereaBangalosRio, "Vista aérea dos bangalôs ao longo do Rio Cuebe"),
};

/* ---------- Reservas ---------- */
export type ServiceKind = "stay" | "activity" | "table" | "event";
export type BookableService = { id: string; name: string; kind: ServiceKind };

/** Everything the booking form can request. Each "Reservar" button preselects one of these by id. */
export const bookableGroups: { label: string; services: BookableService[] }[] = [
  { label: "Estadia", services: accommodations.map((a) => ({ id: a.id, name: a.name, kind: "stay" as const })) },
  { label: "Experiências", services: experiences.map((e) => ({ id: e.id, name: e.name, kind: "activity" as const })) },
  {
    label: "Restaurante e eventos",
    services: [
      { id: "mesa", name: "Mesa no restaurante", kind: "table" },
      { id: "evento", name: "Evento, reunião ou festa", kind: "event" },
    ],
  },
];

export const bookableServices: BookableService[] = bookableGroups.flatMap((g) => g.services);

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
  photo(spaMargemRio, "Massagem no deck do spa, sobre o rio"),
  photo(santuario, "Santuário de palha com a imagem de Nossa Senhora"),
  photo(safariBuggy, "Buggies a percorrer uma trilha na floresta"),
  photo(rioEntardecer, "O Rio Cuebe ao entardecer"),
];
