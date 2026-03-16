'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Grid3X3,
  Utensils,
  Train,
  Coffee,
  ShoppingBag,
  Trees,
  ChevronRight,
  MapPin,
  Camera,
  Navigation2,
  Locate,
} from 'lucide-react'
import { PlaceCard } from './place-card'
import { PlaceDetailDrawer } from './place-detail-drawer'
import type { Place } from '@/lib/places-data'
import { categories } from '@/lib/places-data'

interface ExploreMapScreenProps {
  places: Place[]
  onBack?: () => void
  savedPlaces: string[]
  onToggleSave: (placeId: string) => void
}

const iconMap: { [key: string]: React.ElementType } = {
  Grid3X3,
  Utensils,
  Train,
  Coffee,
  ShoppingBag,
  Trees,
  Camera,
}

// MapKit-style marker colors by category
const markerColors: { [key: string]: string } = {
  Hawker: 'bg-orange-500',
  Attraction: 'bg-rose-500',
  Transit: 'bg-blue-500',
  Park: 'bg-green-500',
  Mall: 'bg-purple-500',
  Cafe: 'bg-amber-600',
  default: 'bg-primary',
}

export function ExploreMapScreen({ places, onBack, savedPlaces, onToggleSave }: ExploreMapScreenProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredPlaces = activeCategory === 'all'
    ? places
    : places.filter((p) => p.category.toLowerCase() === activeCategory || 
        (activeCategory === 'hawker' && p.category === 'Hawker') ||
        (activeCategory === 'cafe' && p.category === 'Cafe') ||
        (activeCategory === 'transit' && p.category === 'Transit') ||
        (activeCategory === 'mall' && p.category === 'Mall') ||
        (activeCategory === 'park' && p.category === 'Park') ||
        (activeCategory === 'attraction' && p.category === 'Attraction')
      )

  const handlePlaceTap = (place: Place) => {
    setSelectedPlace(place)
    setIsDrawerOpen(true)
  }

  const popularPlaces = places.filter((p) => p.rating >= 4.4).slice(0, 3)

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
      {/* MapKit-style map area */}
      <div className="relative flex-1">
        {/* Map background - Apple Maps style */}
        <div className="absolute inset-0 bg-[#1d1d1f]">
          {/* Subtle terrain texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#252528] to-[#1d1d1f]" />
          
          {/* Singapore street grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3a3a3c" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sg-grid)" />
            </svg>
          </div>

          {/* Main roads - Singapore CBD style */}
          <div className="absolute left-[20%] top-0 h-full w-1.5 bg-[#48484a]/50" />
          <div className="absolute left-[45%] top-0 h-full w-2 bg-[#48484a]/60" />
          <div className="absolute left-[70%] top-0 h-full w-1.5 bg-[#48484a]/50" />
          <div className="absolute left-0 top-[35%] h-1.5 w-full bg-[#48484a]/50" />
          <div className="absolute left-0 top-[60%] h-2 w-full bg-[#48484a]/60" />

          {/* Water feature - Marina Bay area */}
          <div className="absolute right-0 top-0 h-[40%] w-[35%] rounded-bl-[100px] bg-[#1c3d5a]/40" />

          {/* User location - MapKit blue dot */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-8 animate-ping rounded-full bg-blue-500/20" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-4 rounded-full bg-blue-500/30" />
              <div className="relative h-4 w-4 rounded-full border-[3px] border-white bg-blue-500 shadow-lg" />
            </div>
          </div>

          {/* MapKit-style place markers */}
          <AnimatePresence mode="popLayout">
            {filteredPlaces.map((place) => {
              const markerColor = markerColors[place.category] || markerColors.default
              return (
                <motion.button
                  key={place.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlaceTap(place)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${place.position.x}%`,
                    top: `${place.position.y}%`,
                  }}
                >
                  {/* MapKit balloon marker */}
                  <div className="relative flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${markerColor} shadow-lg ring-2 ring-white/80`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    {/* Marker stem */}
                    <div className={`-mt-0.5 h-2 w-0.5 ${markerColor}`} />
                    <div className={`h-1 w-1 rounded-full ${markerColor} opacity-60`} />
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-10">
          <div className="flex items-center gap-3 p-4 pt-12">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="rounded-full bg-card/90 p-3 shadow-lg backdrop-blur-xl"
            >
              <ArrowLeft className="h-5 w-5 text-card-foreground" />
            </motion.button>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-card/90 px-5 py-3 shadow-lg backdrop-blur-xl">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Search Singapore...</span>
            </div>
          </div>

          {/* Category filters - Apple style pills */}
          <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Grid3X3
              const isActive = activeCategory === cat.id
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 shadow-lg backdrop-blur-xl transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card/90 text-card-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{cat.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Map controls - MapKit style */}
        <div className="absolute bottom-36 right-4 z-10 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-card/90 shadow-lg backdrop-blur-xl"
          >
            <Navigation2 className="h-5 w-5 text-primary" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-card/90 shadow-lg backdrop-blur-xl"
          >
            <Locate className="h-5 w-5 text-card-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Popular places panel - Apple Maps style */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="relative z-10 rounded-t-3xl bg-card pb-8 pt-2 shadow-2xl"
      >
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted" />
        
        <div className="flex items-center justify-between px-5 pb-4">
          <h2 className="text-lg font-bold text-card-foreground">Popular in Singapore</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-primary">
            See all
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {popularPlaces.map((place) => (
            <div key={place.id} className="w-[200px] shrink-0">
              <PlaceCard
                place={place}
                variant="compact"
                onTap={() => handlePlaceTap(place)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Place detail drawer */}
      <PlaceDetailDrawer
        place={selectedPlace}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isSaved={selectedPlace ? savedPlaces.includes(selectedPlace.id) : false}
        onSave={(place) => onToggleSave(place.id)}
      />
    </div>
  )
}
