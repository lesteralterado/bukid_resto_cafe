// Featured dishes. `price` (₱) and `bestSeller` are shown only when set.
// Photos are real Bukid Resto Cafe photos hosted on Cloudinary. Guests trust (and order)
// what they can actually see on the table, so keep each photo matched to its dish.

export type Dish = {
  title: string;
  description: string;
  label: string;
  image: string;
  price?: number;
  bestSeller?: boolean;
};

export const dishes: Dish[] = [
  {
    label: 'Signature Grill',
    title: 'Grilled Pork Belly',
    description: 'Tender, smoky pork belly served with a savory dipping sauce and rice.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/714363738_122115168621043826_1941352113389072552_n_kiewlo.jpg',
    bestSeller: true, // TODO: confirm best sellers
  },
  {
    label: 'Seafood Feast',
    title: 'Seafood Platter',
    description: 'A generous mix of grilled seafood made for sharing.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/721881103_122116111761043826_2008001494691661035_n_lhgr6i.jpg',
    bestSeller: true,
  },
  {
    label: 'House Brew',
    title: 'Signature Coffee',
    description: 'A rich local-inspired coffee blend crafted for slow afternoons.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/722754957_122116618275043826_3405707230625711570_n_jazmko.jpg',
    bestSeller: true,
  },
  {
    label: 'Sweet Treats',
    title: 'Homemade Desserts',
    description: 'Freshly prepared desserts with a homemade taste.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/724124419_122116240557043826_8655294559173541423_n_vnivo9.jpg',
  },
  {
    label: 'Cafe Favorite',
    title: 'Bukid Breakfast Plate',
    description: 'A hearty breakfast plate with eggs, toast, and seasonal sides.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/724770276_122116618293043826_4494773150655047075_n_yduh26.jpg',
  },
  {
    label: 'Comfort Meal',
    title: 'Creamy Pasta',
    description: 'Creamy pasta tossed with savory sauce and fresh herbs.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/724612779_122116618305043826_8041142901930317140_n_rdm3av.jpg',
  },
  {
    label: 'Light Bite',
    title: 'Garden Salad',
    description: 'Crisp greens, fresh vegetables, and a bright house dressing.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/722754957_122116618275043826_3405707230625711570_n_jazmko.jpg',
  },
  {
    label: 'Cool Refreshment',
    title: 'Mountain Fruit Shake',
    description: 'A chilled fruit shake made with refreshing local flavors.',
    image: 'https://res.cloudinary.com/dhxi75eld/image/upload/v1782147243/714363738_122115168621043826_1941352113389072552_n_kiewlo.jpg',
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
