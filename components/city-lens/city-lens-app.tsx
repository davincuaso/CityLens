'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ARCameraScreen } from './ar-camera-screen'
import { SpatialMapScreen } from './spatial-map-screen'
import { SavedPlacesScreen } from './saved-places-screen'
import { SettingsScreen } from './settings-screen'
import { BottomNav } from './bottom-nav'
import { ScreenSkeleton } from './skeletons'
import { places } from '@/lib/places-data'

type Tab = 'ar' | 'map' | 'saved' | 'profile' | 'settings'

export function CityLensApp() {
  const [activeTab, setActiveTab] = useState<Tab>('ar')
  const [savedPlaces, setSavedPlaces] = useState<string[]>(['5', '6'])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleToggleSave = (placeId: string) => {
    setSavedPlaces((prev) =>
      prev.includes(placeId)
        ? prev.filter((id) => id !== placeId)
        : [...prev, placeId]
    )
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
  }

  if (isLoading) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-background">
        <ScreenSkeleton />
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {activeTab === 'ar' && (
          <motion.div
            key="ar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <ARCameraScreen
              places={places}
              onMapOpen={() => setActiveTab('map')}
              onSettingsOpen={() => setActiveTab('settings')}
              savedPlaces={savedPlaces}
              onToggleSave={handleToggleSave}
            />
          </motion.div>
        )}

        {activeTab === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <SpatialMapScreen
              places={places}
              onBack={() => setActiveTab('ar')}
              savedPlaces={savedPlaces}
              onToggleSave={handleToggleSave}
            />
          </motion.div>
        )}

        {activeTab === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <SavedPlacesScreen
              places={places}
              savedPlaceIds={savedPlaces}
              onBack={() => setActiveTab('ar')}
              onToggleSave={handleToggleSave}
            />
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-full w-full flex-col items-center justify-center bg-background px-8"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <span className="text-4xl font-bold text-muted-foreground">JD</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">John Doe</h2>
            <p className="mb-6 text-muted-foreground">Explorer since 2024</p>
            <div className="grid w-full max-w-xs grid-cols-3 gap-4 rounded-2xl bg-card p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{savedPlaces.length}</p>
                <p className="text-xs text-muted-foreground">Saved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">47</p>
                <p className="text-xs text-muted-foreground">Visited</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <SettingsScreen onBack={() => setActiveTab('ar')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide bottom nav on AR screen to prevent overlap with mini map */}
      {activeTab !== 'ar' && activeTab !== 'settings' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  )
}
