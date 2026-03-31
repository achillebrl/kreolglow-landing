import type { Pack } from './types'

export const PACKS: Pack[] = [
  {
    id: 'nuit',
    name: 'Kit Nuit Cheveux',
    emoji: '🌙',
    price: 12.90,
    priceDisplay: '12,90€',
    tag: 'Le plus populaire',
    tagColor: '#C8435A',
    items: ['Bonnet satin double couche', 'Brosse démêlante bouclés', '20 élastiques sans trace'],
    costPrice: 3.75,
  },
  {
    id: 'glam',
    name: 'Kit Glam Créole',
    emoji: '✨',
    price: 14.90,
    priceDisplay: '14,90€',
    tag: 'Beauté & cheveux',
    tagColor: '#2D6A4F',
    items: ['Bonnet satin', '2 paires créoles dorées', 'Chouchou satin', '10 élastiques'],
    costPrice: 4.45,
  },
  {
    id: 'routine',
    name: 'Kit Routine Complète',
    emoji: '💎',
    price: 22.90,
    priceDisplay: '22,90€',
    tag: 'Meilleure valeur',
    tagColor: '#F4A261',
    items: ['Bonnet satin', 'Brosse + Peigne démêlant', '2 paires créoles', 'Chouchou satin', '20 élastiques'],
    costPrice: 7.64,
  },
]
