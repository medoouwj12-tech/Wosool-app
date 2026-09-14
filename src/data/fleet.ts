export interface Vehicle {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  tag: string;
  tagColor: "gold" | "emerald" | "amber" | "blue";
  passengers: number;
  luggage: number;
  image: string;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
}

export const FLEET: Vehicle[] = [
  {
    id: "mg-zs",
    name: "إم جي ZS (MG ZS)",
    nameEn: "MG ZS SUV",
    category: "SUV عائلية فاخرة",
    tag: "متاحة الآن",
    tagColor: "gold",
    passengers: 4,
    luggage: 4,
    image: "/images/mg-zs.jpeg",
    description: "سيارة SUV عائلية حديثة، مرتفعة وواسعة ومريحة جداً للسفر بين المحافظات والمطارات مع مساحة تخزين رحبة وتكييف قوي.",
    descriptionEn: "Modern family SUV, high ground clearance, spacious and ultra-comfortable for intercity & airport travel with large trunk.",
    features: [
      "موديل حديث معقم ومكيف بأعلى كفاءة",
      "شنطة سفر واسعة تتسع للحقائب الكبيرة",
      "سائق محترف وملتزم بالمواعيد 100%",
      "مياه معدنية وشواحن لجميع الهواتف",
    ],
    featuresEn: [
      "Modern sanitized model with powerful AC",
      "Spacious trunk fitting large luggage",
      "Professional and 100% punctual chauffeur",
      "Complimentary water and multi-device chargers",
    ],
  },
  {
    id: "fiat-tipo",
    name: "فيات تيبو (Fiat Tipo)",
    nameEn: "Fiat Tipo Sedan",
    category: "سيدان كومفورت فاخرة",
    tag: "متاحة الآن",
    tagColor: "blue",
    passengers: 4,
    luggage: 3,
    image: "/images/fiat-tipo.jpeg",
    description: "سيدان إيطالية أنيقة ومريحة، صالون رحب وصندوق أمتعة كبير يتسع لحقائب السفر. تجربة سفر ناعمة وهادئة على الطريق السريع.",
    descriptionEn: "Elegant Italian sedan, spacious ergonomic cabin and generous trunk. Smooth and quiet highway travel experience.",
    features: [
      "صالون واسع ومريح للرحلات الطويلة",
      "تكييف قوي وعزل صوتي ممتاز",
      "سائق أمين وخبير بكافة المحاور والطرق",
      "خدمة توصيل مباشرة من الباب للباب",
    ],
    featuresEn: [
      "Spacious ergonomic interior for long journeys",
      "High-power AC and superb sound isolation",
      "Trustworthy driver expert in all routes",
      "Direct door-to-door pickup & dropoff",
    ],
  },
];