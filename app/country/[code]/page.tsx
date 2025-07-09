import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  countryService,
  getNativeName,
  getCurrencies,
  getLanguages,
} from "@/lib/api/countries";
import { CountryDetail } from "@/components/pages/country-detail";

interface CountryPageProps {
  params: { code: string };
}

// Generar metadatos dinámicos
export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  try {
    const country = await countryService.getCountryByCode(params.code);

    return {
      title: `${country.name.common} | Where in the world?`,
      description: `Discover detailed information about ${
        country.name.common
      }. Population: ${country.population.toLocaleString()}, Capital: ${
        country.capital?.[0] || "N/A"
      }, Region: ${country.region}`,
      keywords: [
        country.name.common,
        country.name.official,
        country.region,
        country.subregion,
        "country information",
        "geography",
      ].filter((keyword): keyword is string => Boolean(keyword)),
      openGraph: {
        title: `${country.name.common} | Countries Explorer`,
        description: `Learn about ${country.name.common} - ${country.region}`,
        images: [
          {
            url: country.flags.svg,
            width: 640,
            height: 480,
            alt: `Flag of ${country.name.common}`,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Country Not Found | Where in the world?",
    };
  }
}

// Página de detalle del país (Server Component)
export default async function CountryPage({ params }: CountryPageProps) {
  try {
    const country = await countryService.getCountryByCode(params.code);

    if (!country) {
      notFound();
    }

    return <CountryDetail country={country} />;
  } catch (error) {
    console.error("Error fetching country:", error);
    notFound();
  }
}

// Generar rutas estáticas para países comunes (opcional para mejor rendimiento)
export async function generateStaticParams() {
  // Solo generar rutas estáticas para algunos países populares
  // Esto mejora el rendimiento sin generar todas las rutas posibles
  const popularCountries = [
    "USA",
    "CAN",
    "GBR",
    "FRA",
    "DEU",
    "JPN",
    "AUS",
    "BRA",
    "IND",
    "CHN",
    "RUS",
    "ITA",
    "ESP",
    "NLD",
    "BEL",
    "CHE",
    "SWE",
    "NOR",
    "DNK",
    "FIN",
  ];

  return popularCountries.map((code) => ({
    code: code,
  }));
}
