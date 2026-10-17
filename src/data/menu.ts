// Featured dishes. `price` (₱) and `bestSeller` are shown only when set.
// STOCK photos are free Unsplash placeholders; replace them with real photos of your dishes,
// because guests trust (and order) what they can actually see on the table.

export type Dish = {
  title: string;
  description: string;
  label: string;
  image: string;
  price?: number;
  bestSeller?: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const dishes: Dish[] = [
  {
    label: 'Signature Grill',
    title: 'Grilled Pork Belly',
    description: 'Tender, smoky pork belly served with a savory dipping sauce and rice.',
    image: unsplash('1555939594-58d7cb561ad1'), // STOCK
    bestSeller: true, // TODO: confirm best sellers
  },
  {
    label: 'Seafood Feast',
    title: 'Seafood Platter',
    description: 'A generous mix of grilled seafood made for sharing.',
    image: unsplash('1559737558-2f5a35f4523b'), // STOCK
    bestSeller: true,
  },
  {
    label: 'House Brew',
    title: 'Signature Coffee',
    description: 'A rich local-inspired coffee blend crafted for slow afternoons.',
    image: unsplash('1509042239860-f550ce710b93'), // STOCK
    bestSeller: true,
  },
  {
    label: 'Sweet Treats',
    title: 'Homemade Desserts',
    description: 'Freshly prepared desserts with a homemade taste.',
    image: unsplash('1488477181946-6428a0291777'), // STOCK
  },
  {
    label: 'Cafe Favorite',
    title: 'Bukid Breakfast Plate',
    description: 'A hearty breakfast plate with eggs, toast, and seasonal sides.',
    image: unsplash('1533089860892-a7c6f0a88666'), // STOCK
  },
  {
    label: 'Comfort Meal',
    title: 'Creamy Pasta',
    description: 'Creamy pasta tossed with savory sauce and fresh herbs.',
    image: unsplash('1608219992759-8d74ed8d76eb'), // STOCK
  },
  {
    label: 'Light Bite',
    title: 'Garden Salad',
    description: 'Crisp greens, fresh vegetables, and a bright house dressing.',
    image: unsplash('1512621776951-a57141f2eefd'), // STOCK
  },
  {
    label: 'Cool Refreshment',
    title: 'Mountain Fruit Shake',
    description: 'A chilled fruit shake made with refreshing local flavors.',
    image: unsplash('1623065422902-30a2d299bbe4'), // STOCK
  },
  {
    label: 'Pinoy Favorite',
    title: 'Lumpia',
    description: 'Crispy rolled appetizer served with a savory dipping sauce.',
    image:
      'https://res.cloudinary.com/dhxi75eld/image/upload/v1781986844/725457305_122116616475043826_3490672837484293300_n_pbx1ol.jpg',
  },
  {
    label: 'Classic Bite',
    title: 'Burger',
    description: 'A classic burger with savory fillings and a soft bun.',
    image:
      'https://res.cloudinary.com/dhxi75eld/image/upload/v1781986703/725518739_122116490505043826_6411777298136620101_n_wzgmer.jpg',
  },
  {
    label: 'Shareable Combo',
    title: 'French Fries/Chicken Fingers',
    description: 'Crispy fries paired with chicken fingers for sharing.',
    image:
      'https://res.cloudinary.com/dhxi75eld/image/upload/v1781986702/725578823_122116489767043826_2621467015359406155_n_m1pj2u.jpg',
  },
  {
    label: 'Rice Favorite',
    title: 'Garlic Fried Rice',
    description: 'Aromatic fried rice with a savory garlic flavor.',
    image:
      'https://res.cloudinary.com/dhxi75eld/image/upload/v1781986212/k-photo-2021-05-garlic-fried-rice-02_ayrxfc.webp',
  },
];
