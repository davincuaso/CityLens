'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, SlidersHorizontal, Bookmark, X } from 'lucide-react'
import { PlaceCard } from './place-card'
import { PlaceDetailDrawer } from './place-detail-drawer'
import type { Place } from '@/lib/places-data'

interface SavedPlacesScreenProps {
  places: Place[]
  savedPlaceIds: string[]
  onBack?: () => void
  onToggleSave: (placeId: string) => void
}

const filterOptions = ['All', 'Nearby', 'Recent', 'Most Visited']

export function SavedPlacesScreen({
  places,
  savedPlaceIds,
  onBack,
  onToggleSave,
}: SavedPlacesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const savedPlaces = places.filter((p) => savedPlaceIds.includes(p.id))
  
  const filteredPlaces = savedPlaces.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === 'Nearby') {
      return matchesSearch && place.distanceMeters < 500
    }
    return matchesSearch
  })

  const handlePlaceTap = (place: Place) => {
    setSelectedPlace(place)
    setIsDrawerOpen(true)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="shrink-0 pb-2 pt-12">
        <div className="flex items-center gap-3 px-4 pb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="rounded-full bg-secondary p-3"
          >
            <ArrowLeft className="h-5 w-5 text-secondary-foreground" />
          </motion.button>
          <h1 className="text-xl font-bold text-foreground">Saved Places</h1>
          <span className="ml-auto rounded-full bg-primary/20 px-2.5 py-1 text-sm font-semibold text-primary">
            {savedPlaces.length}
          </span>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search saved places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto px-4 scrollbar-hide">
          <button className="shrink-0 rounded-full bg-secondary p-2.5">
            <SlidersHorizontal className="h-4 w-4 text-secondary-foreground" />
          </button>
          {filterOptions.map((filter) => (
            <motion.button
              key={filter}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AnimatePresence mode="popLayout">
          {filteredPlaces.length > 0 ? (
            <motion.div className="flex flex-col gap-3 pb-8">
              {filteredPlaces.map((place, i) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <PlaceCard
                    place={place}
                    variant="list"
                    onTap={() => handlePlaceTap(place)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <Bookmark className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {searchQuery ? 'No matches found' : 'No saved places yet'}
              </h3>
              <p className="max-w-[250px] text-center text-sm text-muted-foreground">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Explore and save places to find them quickly later'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Place detail drawer */}
      <PlaceDetailDrawer
        place={selectedPlace}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isSaved={selectedPlace ? savedPlaceIds.includes(selectedPlace.id) : false}
        onSave={(place) => onToggleSave(place.id)}
      />
    </div>
  )
}
