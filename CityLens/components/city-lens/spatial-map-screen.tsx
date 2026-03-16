'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Utensils,
  Star,
  Eye,
  Flame,
  MapPin,
  Train,
  TreePine,
  ShoppingBag,
} from 'lucide-react'
import { PlaceDetailDrawer } from './place-detail-drawer'
import type { Place } from '@/lib/places-data'

interface SpatialMapScreenProps {
  places: Place[]
  onBack?: () => void
  savedPlaces: string[]
  onToggleSave: (placeId: string) => void
}

// Get icon for category
function getCategoryIcon(category: string) {
  switch (category) {
    case 'Hawker':
    case 'Cafe':
      return Utensils
    case 'Transit':
      return Train
    case 'Park':
      return TreePine
    case 'Mall':
      return ShoppingBag
    default:
      return MapPin
  }
}

// Get color for category
function getCategoryColor(category: string) {
  switch (category) {
    case 'Hawker':
    case 'Cafe':
      return { bg: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/40', glow: 'bg-orange-500/30' }
    case 'Transit':
      return { bg: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/40', glow: 'bg-blue-500/30' }
    case 'Park':
      return { bg: 'from-green-400 to-green-600', shadow: 'shadow-green-500/40', glow: 'bg-green-500/30' }
    case 'Mall':
      return { bg: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-500/40', glow: 'bg-purple-500/30' }
    default:
      return { bg: 'from-gray-400 to-gray-600', shadow: 'shadow-gray-500/40', glow: 'bg-gray-500/30' }
  }
}

export function SpatialMapScreen({ places, onBack, savedPlaces, onToggleSave }: SpatialMapScreenProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d')
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null)

  // Filter to prioritize restaurants/food places
  const foodPlaces = places.filter((p) => 
    p.category === 'Hawker' || p.category === 'Cafe' || p.types?.includes('food') || p.types?.includes('restaurant')
  )
  const otherPlaces = places.filter((p) => 
    p.category !== 'Hawker' && p.category !== 'Cafe' && !p.types?.includes('food')
  )

  const handlePlaceTap = (place: Place) => {
    setSelectedPlace(place)
    setIsDrawerOpen(true)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === '2d' ? '3d' : '2d')
  }

  // 3D perspective transform values
  const perspective = viewMode === '3d' ? 'perspective(1000px) rotateX(50deg)' : 'none'
  const markerTransform = viewMode === '3d' ? 'rotateX(-50deg)' : 'none'

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Spatial 3D map area */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-bottom"
          animate={{
            transform: perspective,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Map base layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1c] to-[#0f0f10]">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="spatial-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3a3a40" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#spatial-grid)" />
              </svg>
            </div>

            {/* 3D Buildings */}
            <div className="absolute inset-0">
              {[
                { x: 12, y: 18, h: 60, w: 40 },
                { x: 22, y: 25, h: 90, w: 35 },
                { x: 55, y: 12, h: 70, w: 45 },
                { x: 72, y: 28, h: 100, w: 40 },
                { x: 38, y: 55, h: 50, w: 50 },
                { x: 82, y: 60, h: 80, w: 35 },
                { x: 18, y: 70, h: 65, w: 38 },
              ].map((building, i) => (
                <div
                  key={i}
                  className="absolute rounded-sm bg-[#252528]"
                  style={{
                    left: `${building.x}%`,
                    top: `${building.y}%`,
                    width: building.w,
                    height: building.h,
                    transform: viewMode === '3d' ? `translateZ(${building.h / 2}px) rotateX(-50deg)` : 'none',
                    transformStyle: 'preserve-3d',
                    boxShadow: viewMode === '3d' 
                      ? `0 ${building.h / 3}px ${building.h / 2}px rgba(0,0,0,0.5)` 
                      : 'none',
                  }}
                >
                  {/* Building top face in 3D */}
                  {viewMode === '3d' && (
                    <div 
                      className="absolute inset-x-0 top-0 bg-[#2d2d32]"
                      style={{
                        height: 8,
                        transform: 'translateZ(0px)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Roads */}
            <div className="absolute left-[30%] top-0 h-full w-2 bg-[#3a3a40]/50" />
            <div className="absolute left-[62%] top-0 h-full w-3 bg-[#3a3a40]/60" />
            <div className="absolute left-0 top-[42%] h-2 w-full bg-[#3a3a40]/50" />
            <div className="absolute left-0 top-[72%] h-3 w-full bg-[#3a3a40]/60" />

            {/* Water feature - Marina Bay */}
            <div 
              className="absolute right-0 top-0 h-[30%] w-[25%] rounded-bl-[60px] bg-gradient-to-br from-[#1c3d5a]/40 to-[#0f2840]/40"
            />

            {/* User location */}
            <div 
              className="absolute left-1/2 top-1/2 z-20"
              style={{
                transform: `translate(-50%, -50%) ${markerTransform}`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 animate-ping rounded-full bg-blue-500/30" />
                <div className="absolute -inset-2 rounded-full bg-blue-500/40" />
                <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
              </div>
            </div>

            {/* Restaurant markers (3D pins) */}
            {foodPlaces.map((place) => {
              const colors = getCategoryColor(place.category)
              const Icon = getCategoryIcon(place.category)
              const isHovered = hoveredPlace === place.id
              
              return (
                <motion.button
                  key={place.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isHovered ? 1.15 : 1, 
                    opacity: 1,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlaceTap(place)}
                  onMouseEnter={() => setHoveredPlace(place.id)}
                  onMouseLeave={() => setHoveredPlace(null)}
                  className="absolute z-10"
                  style={{
                    left: `${place.position.x}%`,
                    top: `${place.position.y}%`,
                    transform: `translate(-50%, -100%) ${markerTransform}`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Glow effect */}
                    <div className={`absolute -inset-3 rounded-full ${colors.glow} blur-sm`} />
                    
                    {/* 3D Pin body */}
                    <div 
                      className="relative"
                      style={{ 
                        transform: viewMode === '3d' ? 'translateZ(20px)' : 'none',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Pin head */}
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${colors.bg} ${colors.shadow} shadow-lg ring-2 ring-white/90`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Rating badge */}
                      <div className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground shadow-md">
                        {place.rating}
                      </div>
                    </div>
                    
                    {/* 3D Pin stem */}
                    <div 
                      className="relative flex flex-col items-center"
                      style={{ 
                        transform: viewMode === '3d' ? 'translateZ(10px)' : 'none',
                      }}
                    >
                      <div className={`h-5 w-1 rounded-b-full bg-gradient-to-b ${colors.bg}`} />
                      <div className={`-mt-0.5 h-2 w-2 rounded-full ${colors.glow}`} />
                    </div>
                    
                    {/* Place name label (flattened in 3D) */}
                    <AnimatePresence>
                      {(isHovered || viewMode === '2d') && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-1 whitespace-nowrap rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-medium text-card-foreground shadow-lg backdrop-blur-sm"
                          style={{ 
                            transform: viewMode === '3d' ? 'rotateX(50deg) translateZ(5px)' : 'none',
                          }}
                        >
                          {place.name.length > 18 ? place.name.slice(0, 18) + '...' : place.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              )
            })}

            {/* Other place markers (smaller, de-emphasized) */}
            {otherPlaces.map((place) => {
              const colors = getCategoryColor(place.category)
              const Icon = getCategoryIcon(place.category)
              
              return (
                <motion.button
                  key={place.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.75 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlaceTap(place)}
                  className="absolute z-5"
                  style={{
                    left: `${place.position.x}%`,
                    top: `${place.position.y}%`,
                    transform: `translate(-50%, -100%) ${markerTransform}`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
                    <div 
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${colors.bg} shadow ring-1 ring-white/60`}
                      style={{ 
                        transform: viewMode === '3d' ? 'translateZ(12px)' : 'none',
                      }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div 
                      className="h-3 w-0.5 rounded-b-full bg-secondary"
                      style={{ 
                        transform: viewMode === '3d' ? 'translateZ(6px)' : 'none',
                      }}
                    />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-30">
          <div className="flex items-center gap-3 p-4 pt-12">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="rounded-full bg-card/90 p-3 shadow-lg backdrop-blur-xl"
            >
              <ArrowLeft className="h-5 w-5 text-card-foreground" />
            </motion.button>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-card/90 px-5 py-3 shadow-lg backdrop-blur-xl">
              <Utensils className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-card-foreground">Restaurants nearby</span>
            </div>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="absolute bottom-40 right-4 z-30">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleViewMode}
            className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg backdrop-blur-xl transition-colors ${
              viewMode === '3d' ? 'bg-primary text-primary-foreground' : 'bg-card/90 text-card-foreground'
            }`}
          >
            <Eye className="h-5 w-5" />
          </motion.button>
          <span className="mt-1 block text-center text-[10px] text-muted-foreground">
            {viewMode === '3d' ? '3D' : '2D'}
          </span>
        </div>
      </div>

      {/* Bottom panel - Restaurant recommendations */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="relative z-30 rounded-t-3xl bg-card pb-8 pt-2 shadow-2xl"
      >
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted" />
        
        <div className="flex items-center justify-between px-5 pb-3">
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-bold text-card-foreground">Top Eats</h2>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-xs font-medium text-orange-500">{foodPlaces.length} nearby</span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {foodPlaces.slice(0, 5).map((place) => (
            <motion.button
              key={place.id}
              onClick={() => handlePlaceTap(place)}
              whileTap={{ scale: 0.98 }}
              className="w-[160px] shrink-0 rounded-2xl bg-secondary/50 p-3 text-left"
            >
              <div className="relative mb-2 h-20 w-full overflow-hidden rounded-xl">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-full bg-card/90 px-1.5 py-0.5 text-[10px] font-bold backdrop-blur-sm">
                  <Star className="h-2.5 w-2.5 fill-accent text-accent" />
                  {place.rating}
                </div>
              </div>
              <h3 className="truncate text-sm font-semibold text-card-foreground">{place.name}</h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={place.isOpen ? 'text-green-500' : 'text-red-500'}>
                  {place.isOpen ? 'Open' : 'Closed'}
                </span>
                <span>·</span>
                <span>{place.distance}</span>
              </div>
            </motion.button>
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
