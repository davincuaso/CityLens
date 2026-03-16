'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Settings, Search, Scan, Navigation2 } from 'lucide-react'
import { PlaceCard } from './place-card'
import { MiniMapDock } from './mini-map-dock'
import { PlaceDetailDrawer } from './place-detail-drawer'
import { SearchPanel } from './search-panel'
import type { Place } from '@/lib/places-data'

interface ARCameraScreenProps {
  places: Place[]
  onMapOpen?: () => void
  onSettingsOpen?: () => void
  savedPlaces: string[]
  onToggleSave: (placeId: string) => void
}

export function ARCameraScreen({ places, onMapOpen, onSettingsOpen, savedPlaces, onToggleSave }: ARCameraScreenProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  const handlePlaceTap = (place: Place) => {
    setSelectedPlace(place)
    setIsDrawerOpen(true)
  }

  const handleScanTap = () => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 2000)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      {/* Simulated ARKit camera feed - Singapore street scene */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80"
          alt="Singapore street view"
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        {/* ARKit-style vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
      </div>

      {/* ARKit scanning overlay with plane detection effect */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            {/* Scanning grid pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="ar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ar-grid)" />
              </svg>
            </div>
            
            {/* Scanning line */}
            <motion.div
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
            />
            
            {/* Corner brackets - ARKit style */}
            <div className="absolute left-8 top-24 h-16 w-16 border-l-2 border-t-2 border-primary/60" />
            <div className="absolute right-8 top-24 h-16 w-16 border-r-2 border-t-2 border-primary/60" />
            <div className="absolute bottom-56 left-8 h-16 w-16 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-56 right-8 h-16 w-16 border-b-2 border-r-2 border-primary/60" />
            
            {/* Scanning status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 top-32 -translate-x-1/2 rounded-full bg-card/90 px-4 py-2 backdrop-blur-xl"
            >
              <span className="text-xs font-medium text-primary">Detecting surfaces...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top header */}
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="flex items-center justify-between p-4 pt-12">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-full bg-card/80 px-4 py-2.5 shadow-lg backdrop-blur-xl"
          >
            <Search className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-card-foreground">Search</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSettingsOpen}
            className="rounded-full bg-card/80 p-3 shadow-lg backdrop-blur-xl"
          >
            <Settings className="h-5 w-5 text-card-foreground" />
          </motion.button>
        </div>
      </div>

      {/* Search Panel */}
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onCategorySelect={setActiveCategory}
        onSearch={(q) => console.log('Search:', q)}
      />

      {/* Floating place cards with ARKit spatial anchoring */}
      {places.slice(0, 4).map((place, index) => (
        <PlaceCard
          key={place.id}
          place={place}
          variant="floating"
          onTap={() => handlePlaceTap(place)}
          style={{
            left: `${place.position.x}%`,
            top: `${place.position.y}%`,
            transform: 'translate(-50%, -50%)',
            // Simulate depth with slight scale variation
            scale: 1 - (index * 0.02),
          }}
        />
      ))}

      {/* Center targeting indicator - ARKit style */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ 
            scale: isScanning ? [1, 1.15, 1] : 1,
            opacity: isScanning ? [0.5, 1, 0.5] : 0.4 
          }}
          transition={{ repeat: isScanning ? Infinity : 0, duration: 1.5 }}
          className="relative"
        >
          {/* ARKit reticle */}
          <div className="h-20 w-20 rounded-full border border-foreground/20" />
          <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-foreground/30" />
          <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-foreground/30" />
          <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-foreground/30" />
          <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-foreground/30" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
        </motion.div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-48 left-0 right-0 z-20 flex items-center justify-center gap-4 px-4">
        {/* Scan button - ARKit style */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleScanTap}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 shadow-lg"
        >
          <Scan className={`h-5 w-5 text-primary-foreground ${isScanning ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-semibold text-primary-foreground">
            {isScanning ? 'Scanning...' : 'Scan Area'}
          </span>
        </motion.button>
      </div>

      {/* Map mode toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onMapOpen}
        className="absolute bottom-48 right-4 z-20 rounded-full bg-card/80 p-4 shadow-lg backdrop-blur-xl"
      >
        <Map className="h-6 w-6 text-card-foreground" />
      </motion.button>

      {/* Distance indicator - ARKit style */}
      <div className="absolute bottom-48 left-4 z-20 flex flex-col items-center rounded-2xl bg-card/80 px-3 py-2 shadow-lg backdrop-blur-xl">
        <Navigation2 className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold text-card-foreground">120m</span>
        <span className="text-[8px] text-muted-foreground">nearest</span>
      </div>

      {/* Mini map dock */}
      <MiniMapDock
        places={places}
        destination={places[0]}
        onMapTap={onMapOpen}
      />

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
