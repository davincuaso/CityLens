'use client'

import { motion } from 'framer-motion'
import { Scan, Map, Bookmark, User } from 'lucide-react'

interface BottomNavProps {
  activeTab: 'ar' | 'map' | 'saved' | 'profile'
  onTabChange: (tab: 'ar' | 'map' | 'saved' | 'profile') => void
}

const navItems = [
  { id: 'ar' as const, label: 'AR View', icon: Scan },
  { id: 'map' as const, label: 'Explore', icon: Map },
  { id: 'saved' as const, label: 'Saved', icon: Bookmark },
  { id: 'profile' as const, label: 'Profile', icon: User },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 px-4 pb-6">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="flex items-center justify-around rounded-2xl bg-card/95 py-3 shadow-2xl backdrop-blur-xl"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-1"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -inset-x-2 -inset-y-1 rounded-xl bg-primary/20"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <Icon
                className={`relative h-6 w-6 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`relative text-xs font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </motion.nav>
    </div>
  )
}
