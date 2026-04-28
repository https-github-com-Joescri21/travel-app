
export interface Country {
translations: any;
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capital: string[];
  flags: { svg: string; alt: string };
  population: number;
  continents: string[]; // <-- Nueva
  currencies: { [key: string]: { name: string; symbol: string } };
  region: string;

}
