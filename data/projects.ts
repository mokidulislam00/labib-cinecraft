
export type Project = {
  id: number;
  title: string;
  category: "Photography" | "Cinematography" | "Wedding";
  year: string;
  image: string;
  description: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Golden Hour",
    category: "Photography",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85",
    description: "A quiet story told through natural light.",
  },
  {
    id: 2,
    title: "The Wedding Film",
    category: "Wedding",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    description: "An intimate celebration of two lives.",
  },
  {
    id: 3,
    title: "Into The Wild",
    category: "Cinematography",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=85",
    description: "A cinematic journey through nature.",
  },
  {
    id: 4,
    title: "Quiet Moments",
    category: "Photography",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1200&q=85",
    description: "Finding beauty in the everyday.",
  },
  {
    id: 5,
    title: "Forever Begins",
    category: "Wedding",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    description: "A timeless collection of wedding memories.",
  },
  {
    id: 6,
    title: "City After Dark",
    category: "Cinematography",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85",
    description: "The rhythm and atmosphere of city life.",
  },
];
