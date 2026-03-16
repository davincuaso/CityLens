'use client'

import { motion } from 'framer-motion'
import { Navigation, Clock, MapPin, Train } from 'lucide-react'
import type { Place } from '@/lib/places-data'

interface MiniMapDockProps {
  places: Place[]
  userLocation?: { x: number; y: number }
  destination?: Place
  onMapTap?: () => void
}

export function MiniMapDock({
  places,
  userLocation = { x: 50, y: 50 },
  destination,
  onMapTap,
}: MiniMapDockProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute inset-x-4 bottom-6"
    >
      <div className="overflow-hidden rounded-3xl bg-card/95 shadow-2xl backdrop-blur-xl">
        {/* Mini Map - MapKit style */}
        <button
          onClick={onMapTap}
          className="relative h-28 w-full overflow-hidden bg-[#1d1d1f]"
        >
          {/* Singapore-style map grid */}
          <div className="absolute inset-0 opacity-25">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sg-mini-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#3a3a3c" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sg-mini-grid)" />
            </svg>
          </div>
          
          {/* Roads - Singapore CBD layout */}
          <div className="absolute inset-0">
            <div className="absolute left-[25%] top-0 h-full w-0.5 bg-[#48484a]/40" />
            <div className="absolute left-[50%] top-0 h-full w-1 bg-[#48484a]/50" />
            <div className="absolute left-[75%] top-0 h-full w-0.5 bg-[#48484a]/40" />
            <div className="absolute left-0 top-[40%] h-0.5 w-full bg-[#48484a]/40" />
            <div className="absolute left-0 top-[65%] h-1 w-full bg-[#48484a]/50" />
          </div>

          {/* Water - Marina Bay */}
          <div className="absolute right-0 top-0 h-[35%] w-[30%] rounded-bl-2xl bg-[#1c3d5a]/30" />

          {/* Place markers */}
          {places.slice(0, 4).map((place, i) => (
            <div
              key={place.id}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-lg ring-1 ring-white/50"
              style={{
                left: `${20 + i * 18}%`,
                top: `${30 + (i % 2) * 35}%`,
              }}
            />
          ))}

          {/* User location - Apple Maps blue dot */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
          >
            <div className="relative">
              <div className="absolute -inset-2 animate-ping rounded-full bg-blue-500/30" style={{ animationDuration: '2s' }} />
              <div className="relative h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
            </div>
          </div>

          {/* Navigation line if destination */}
          {destination && (
            <svg className="absolute inset-0 h-full w-full">
              <path
                d={`M ${userLocation.x}% ${userLocation.y}% Q 60% 35%, 75% 40%`}
                fill="none"
                stroke="#007AFF"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Map expand indicator */}
          <div className="absolute right-2 top-2 rounded-lg bg-card/80 p-1 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
          </div>
        </button>

        {/* Route info - Singapore context */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Navigation className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">
                {destination ? destination.name : 'Ready to navigate'}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {destination ? (
                  <>
                    <span>{destination.distance} away</span>
                    <span>·</span>
                    <span>{destination.vicinity}</span>
                  </>
                ) : (
                  'Tap to set destination'
                )}
              </div>
            </div>
          </div>
          
          {destination && (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1">
                <Clock className="h-3 w-3 text-green-500" />
                <span className="text-xs font-medium text-green-500">2 min</span>
              </div>
              {destination.category === 'Transit' && (
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Train className="h-3 w-3" />
                  <span>MRT nearby</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
