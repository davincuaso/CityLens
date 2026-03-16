// Google Places API structured data for Singapore locations
export interface Place {
  id: string
  placeId: string // Google Places API place_id
  name: string
  category: string
  types: string[] // Google Places API types array
  rating: number
  userRatingsTotal: number // Google Places naming
  distance: string
  distanceMeters: number
  isOpen: boolean
  openingHours?: {
    openNow: boolean
    periods?: { open: string; close: string }[]
    weekdayText?: string[]
  }
  closesAt?: string
  opensAt?: string
  phone: string
  formattedAddress: string // Google Places naming
  vicinity: string // Short address
  image: string
  photoReference?: string // Google Places photo_reference
  position: { x: number; y: number }
  geometry: {
    location: { lat: number; lng: number }
  }
  priceLevel?: number // 0-4 scale
  isSaved?: boolean
}

export const places: Place[] = [
  {
    id: '1',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    name: 'Maxwell Food Centre',
    category: 'Hawker',
    types: ['food', 'restaurant', 'point_of_interest', 'establishment'],
    rating: 4.4,
    userRatingsTotal: 8542,
    distance: '120m',
    distanceMeters: 120,
    isOpen: true,
    openingHours: {
      openNow: true,
      weekdayText: ['Monday: 8:00 AM – 10:00 PM', 'Tuesday: 8:00 AM – 10:00 PM'],
    },
    closesAt: '10:00 PM',
    phone: '+65 6325 7700',
    formattedAddress: '1 Kadayanallur St, Singapore 069184',
    vicinity: 'Kadayanallur Street',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
    position: { x: 25, y: 30 },
    geometry: { location: { lat: 1.2805, lng: 103.8448 } },
    priceLevel: 1,
  },
  {
    id: '2',
    placeId: 'ChIJVVVVVVcZ2jERbGPOd0VZ8co',
    name: 'Marina Bay Sands',
    category: 'Attraction',
    types: ['lodging', 'casino', 'tourist_attraction', 'point_of_interest'],
    rating: 4.6,
    userRatingsTotal: 42850,
    distance: '850m',
    distanceMeters: 850,
    isOpen: true,
    openingHours: { openNow: true },
    closesAt: '11:00 PM',
    phone: '+65 6688 8868',
    formattedAddress: '10 Bayfront Ave, Singapore 018956',
    vicinity: 'Bayfront Avenue',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80',
    position: { x: 70, y: 25 },
    geometry: { location: { lat: 1.2834, lng: 103.8607 } },
    priceLevel: 4,
    isSaved: true,
  },
  {
    id: '3',
    placeId: 'ChIJMRTLRL4Z2jERbzOfd0VZ3Hw',
    name: 'Tanjong Pagar MRT',
    category: 'Transit',
    types: ['transit_station', 'subway_station', 'point_of_interest'],
    rating: 4.2,
    userRatingsTotal: 1876,
    distance: '180m',
    distanceMeters: 180,
    isOpen: true,
    openingHours: { openNow: true },
    phone: '+65 1800 336 8900',
    formattedAddress: '120 Maxwell Rd, Singapore 069119',
    vicinity: 'Maxwell Road',
    image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=400&q=80',
    position: { x: 40, y: 55 },
    geometry: { location: { lat: 1.2764, lng: 103.8456 } },
  },
  {
    id: '4',
    placeId: 'ChIJIQBpAG2ahzsRkqQOZBKZCpo',
    name: 'Lau Pa Sat',
    category: 'Hawker',
    types: ['food', 'restaurant', 'point_of_interest', 'establishment'],
    rating: 4.3,
    userRatingsTotal: 12430,
    distance: '350m',
    distanceMeters: 350,
    isOpen: true,
    openingHours: { openNow: true },
    closesAt: '2:00 AM',
    phone: '+65 6220 2138',
    formattedAddress: '18 Raffles Quay, Singapore 048582',
    vicinity: 'Raffles Quay',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    position: { x: 60, y: 40 },
    geometry: { location: { lat: 1.2806, lng: 103.8505 } },
    priceLevel: 2,
  },
  {
    id: '5',
    placeId: 'ChIJvd3v0WEZ2jERY8jh8cOB-F8',
    name: 'Gardens by the Bay',
    category: 'Park',
    types: ['park', 'tourist_attraction', 'point_of_interest', 'establishment'],
    rating: 4.7,
    userRatingsTotal: 98542,
    distance: '1.2km',
    distanceMeters: 1200,
    isOpen: true,
    openingHours: { openNow: true },
    closesAt: '9:00 PM',
    phone: '+65 6420 6848',
    formattedAddress: '18 Marina Gardens Dr, Singapore 018953',
    vicinity: 'Marina Gardens Drive',
    image: 'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=400&q=80',
    position: { x: 80, y: 60 },
    geometry: { location: { lat: 1.2816, lng: 103.8636 } },
    priceLevel: 2,
    isSaved: true,
  },
  {
    id: '6',
    placeId: 'ChIJyY4rtGcX2jERIJpX6WBT0dI',
    name: 'ION Orchard',
    category: 'Mall',
    types: ['shopping_mall', 'point_of_interest', 'establishment'],
    rating: 4.5,
    userRatingsTotal: 24680,
    distance: '2.8km',
    distanceMeters: 2800,
    isOpen: true,
    openingHours: { openNow: true },
    closesAt: '10:00 PM',
    phone: '+65 6238 8228',
    formattedAddress: '2 Orchard Turn, Singapore 238801',
    vicinity: 'Orchard Turn',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    position: { x: 15, y: 70 },
    geometry: { location: { lat: 1.3039, lng: 103.8318 } },
    priceLevel: 3,
  },
  {
    id: '7',
    placeId: 'ChIJVTPWk2cZ2jER_0mLfewG56c',
    name: 'Chinatown Complex',
    category: 'Hawker',
    types: ['food', 'restaurant', 'point_of_interest', 'establishment'],
    rating: 4.2,
    userRatingsTotal: 5680,
    distance: '450m',
    distanceMeters: 450,
    isOpen: true,
    openingHours: { openNow: true },
    closesAt: '11:00 PM',
    phone: '+65 6222 4128',
    formattedAddress: '335 Smith St, Singapore 050335',
    vicinity: 'Smith Street',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    position: { x: 30, y: 45 },
    geometry: { location: { lat: 1.2822, lng: 103.8442 } },
    priceLevel: 1,
  },
  {
    id: '8',
    placeId: 'ChIJMxZ0McIZ2jER8AlSZwSz_gc',
    name: 'Common Man Coffee',
    category: 'Cafe',
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    rating: 4.4,
    userRatingsTotal: 1842,
    distance: '280m',
    distanceMeters: 280,
    isOpen: true,
    openingHours: { openNow: true },
    closesAt: '6:00 PM',
    phone: '+65 6836 4042',
    formattedAddress: '22 Martin Rd, Singapore 239058',
    vicinity: 'Martin Road',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80',
    position: { x: 50, y: 20 },
    geometry: { location: { lat: 1.2892, lng: 103.8381 } },
    priceLevel: 2,
  },
]

export const categories = [
  { id: 'all', label: 'All', icon: 'Grid3X3' },
  { id: 'hawker', label: 'Hawkers', icon: 'Utensils' },
  { id: 'transit', label: 'MRT', icon: 'Train' },
  { id: 'cafe', label: 'Cafes', icon: 'Coffee' },
  { id: 'mall', label: 'Malls', icon: 'ShoppingBag' },
  { id: 'park', label: 'Parks', icon: 'Trees' },
  { id: 'attraction', label: 'Attractions', icon: 'Camera' },
]

// Helper to format distance in Singapore style (meters/km)
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`
  }
  return `${(meters / 1000).toFixed(1)}km`
}

// Singapore center coordinates
export const SINGAPORE_CENTER = {
  lat: 1.2905,
  lng: 103.8520,
}
