
export enum Template {
  Classic = 'Clásico',
  Modern = 'Moderno',
  Minimalist = 'Minimalista',
  GradientWave = 'Ola Degradada',
  Sunset = 'Atardecer',
  Aurora = 'Aurora',
  FotoFondo = 'Foto de Fondo',
  CristalEsmerilado = 'Cristal Esmerilado',
  CapasTranslucidas = 'Capas Translúcidas',
}

export enum FontFamily {
  Roboto = 'Roboto',
  Lato = 'Lato',
  Montserrat = 'Montserrat',
  Poppins = 'Poppins',
  Merriweather = 'Merriweather',
  PlayfairDisplay = 'Playfair Display',
  NotoSans = 'Noto Sans',
}

export interface CardData {
  fullName: string;
  title: string;
  company: string;
  phone: string;
  email:string;
  website: string;
  logo: string | null;
  template: Template;
  fontFamily: FontFamily;
  backgroundColor: string;
  textColor: string;
  showQrCode: boolean;
}