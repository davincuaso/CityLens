'use client'

import { motion } from 'framer-motion'
import { Star, Clock } from 'lucide-react'
import type { Place } from '@/lib/places-data'

interface PlaceCardProps {
  place: Place
  onTap?: () => void
  style?: React.CSSProperties
  variant?: 'floating' | 'compact' | 'list'
}

export function PlaceCard({ place, onTap, style, variant = 'floating' }: PlaceCardProps) {
  if (variant === 'compact') {
    return (
      <motion.button
        onClick={onTap}
        className="flex items-center gap-3 rounded-2xl bg-card/95 p-3 text-left shadow-lg backdrop-blur-xl"
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-card-foreground">{place.name}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-accent text-accent" />
              {place.rating}
            </span>
            <span>·</span>
            <span>{place.distance}</span>
          </div>
        </div>
      </motion.button>
    )
  }

  if (variant === 'list') {
    return (
      <motion.button
        onClick={onTap}
        className="flex w-full items-center gap-4 rounded-2xl bg-card/95 p-4 text-left shadow-lg backdrop-blur-xl"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-base font-semibold text-card-foreground">{place.name}</h3>
            <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              {place.distance}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{place.category}</p>
          <div className="mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-card-foreground">{place.rating}</span>
              <span className="text-muted-foreground">({place.userRatingsTotal?.toLocaleString()})</span>
            </span>
            <span className={`flex items-center gap-1 text-sm ${place.isOpen ? 'text-success' : 'text-destructive'}`}>
              <Clock className="h-3.5 w-3.5" />
              {place.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      </motion.button>
    )
  }

  // Floating AR card variant - simplified and compact
  return (
    <motion.button
      onClick={onTap}
      className="absolute"
      style={style}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Anchor line */}
      <div className="absolute left-1/2 top-full h-6 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent" />
      <div className="absolute left-1/2 top-[calc(100%+24px)] h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary)/.4)]" />
      
      {/* Compact Card */}
      <div className="flex items-center gap-2.5 rounded-full bg-card/90 py-2 pl-2 pr-4 shadow-xl backdrop-blur-xl">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-xs font-semibold text-card-foreground">{place.name}</h3>
          <div className="flex items-center gap-1.5 text-[10px]">
            <Star className="h-2.5 w-2.5 fill-accent text-accent" />
            <span className="text-card-foreground">{place.rating}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{place.distance}</span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
