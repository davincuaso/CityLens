'use client'

import { motion } from 'framer-motion'

export function PlaceCardSkeleton({ variant = 'floating' }: { variant?: 'floating' | 'compact' | 'list' }) {
  const shimmer = (
    <motion.div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
      animate={{ translateX: ['100%', '-100%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
    />
  )

  if (variant === 'compact') {
    return (
      <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-card/95 p-3">
        {shimmer}
        <div className="h-12 w-12 shrink-0 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="relative flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-card/95 p-4">
        {shimmer}
        <div className="h-16 w-16 shrink-0 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-muted" />
            <div className="h-5 w-12 rounded-full bg-muted" />
          </div>
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-4 w-12 rounded bg-muted" />
          </div>
        </div>
      </div>
    )
  }

  // Floating variant
  return (
    <div className="relative min-w-[180px] overflow-hidden rounded-2xl bg-card/90 p-3">
      {shimmer}
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-3 w-12 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="h-8 flex-1 rounded-xl bg-muted" />
        <div className="h-8 flex-1 rounded-xl bg-muted" />
      </div>
    </div>
  )
}

export function MapSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-secondary">
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
        animate={{ translateX: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />
      {/* Fake grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skeleton-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skeleton-grid)" />
        </svg>
      </div>
      {/* Fake markers */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute h-6 w-6 rounded-full bg-muted"
          style={{
            left: `${20 + i * 20}%`,
            top: `${25 + (i % 2) * 30}%`,
          }}
        />
      ))}
    </div>
  )
}

export function ScreenSkeleton() {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <div className="h-11 w-11 rounded-full bg-muted" />
        <div className="h-11 flex-1 rounded-full bg-muted" />
      </div>
      
      {/* Filter chips skeleton */}
      <div className="flex gap-2 px-4 pb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-20 shrink-0 rounded-full bg-muted" />
        ))}
      </div>

      {/* Map area skeleton */}
      <div className="flex-1">
        <MapSkeleton />
      </div>

      {/* Bottom panel skeleton */}
      <div className="rounded-t-3xl bg-card p-5 pt-4">
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-muted" />
        <div className="mb-4 flex items-center justify-between">
          <div className="h-6 w-32 rounded bg-muted" />
          <div className="h-5 w-16 rounded bg-muted" />
        </div>
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-[200px] shrink-0">
              <PlaceCardSkeleton variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
