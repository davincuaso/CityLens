'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Clock, Navigation, Phone, Bookmark, X, MapPin, ChevronRight } from 'lucide-react'
import type { Place } from '@/lib/places-data'

interface PlaceDetailDrawerProps {
  place: Place | null
  isOpen: boolean
  onClose: () => void
  onSave?: (place: Place) => void
  isSaved?: boolean
}

export function PlaceDetailDrawer({ place, isOpen, onClose, onSave, isSaved }: PlaceDetailDrawerProps) {
  if (!place) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl bg-card shadow-2xl"
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-12 rounded-full bg-muted" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-secondary p-2 transition-colors hover:bg-secondary/80"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="max-h-[calc(85vh-48px)] overflow-y-auto px-6 pb-8">
              {/* Header */}
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {place.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-card-foreground">{place.name}</h2>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold text-card-foreground">{place.rating}</span>
                    <span className="text-muted-foreground">({place.userRatingsTotal?.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Status badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${place.isOpen ? 'bg-success/20' : 'bg-destructive/20'}`}>
                  <Clock className={`h-4 w-4 ${place.isOpen ? 'text-success' : 'text-destructive'}`} />
                  <span className={`text-sm font-medium ${place.isOpen ? 'text-success' : 'text-destructive'}`}>
                    {place.isOpen ? `Open · Closes ${place.closesAt}` : `Closed · Opens ${place.opensAt}`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">{place.distance}</span>
                </div>
              </div>

              {/* Address - Google Places formatted */}
              <div className="mt-5">
                <p className="text-sm text-muted-foreground">{place.formattedAddress}</p>
              </div>

              {/* Actions */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 rounded-2xl bg-primary p-4 transition-colors hover:bg-primary/90">
                  <Navigation className="h-6 w-6 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Navigate</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-2xl bg-secondary p-4 transition-colors hover:bg-secondary/80">
                  <Phone className="h-6 w-6 text-secondary-foreground" />
                  <span className="text-sm font-medium text-secondary-foreground">Call</span>
                </button>
                <button
                  onClick={() => onSave?.(place)}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-colors ${
                    isSaved ? 'bg-accent' : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <Bookmark className={`h-6 w-6 ${isSaved ? 'fill-accent-foreground text-accent-foreground' : 'text-secondary-foreground'}`} />
                  <span className={`text-sm font-medium ${isSaved ? 'text-accent-foreground' : 'text-secondary-foreground'}`}>
                    {isSaved ? 'Saved' : 'Save'}
                  </span>
                </button>
              </div>

              {/* Mini preview map */}
              <div className="mt-6 overflow-hidden rounded-2xl bg-secondary">
                <div className="relative h-32 w-full">
                  {/* Map grid pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="detail-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#detail-grid)" />
                    </svg>
                  </div>
                  
                  {/* Roads */}
                  <div className="absolute left-1/3 top-0 h-full w-1 bg-muted-foreground/30" />
                  <div className="absolute left-2/3 top-0 h-full w-1 bg-muted-foreground/30" />
                  <div className="absolute left-0 top-1/2 h-1 w-full bg-muted-foreground/30" />

                  {/* Place marker */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-primary/20" />
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-muted/50">
                  <span className="text-sm font-medium text-secondary-foreground">View on full map</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
