'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Coffee, Utensils, Train, ShoppingBag, Trees, Camera, Building2 } from 'lucide-react'

interface SearchPanelProps {
  isOpen: boolean
  onClose: () => void
  onCategorySelect: (category: string) => void
  onSearch: (query: string) => void
}

// Singapore-specific categories
const categories = [
  { id: 'all', label: 'All', icon: Building2 },
  { id: 'hawker', label: 'Hawkers', icon: Utensils },
  { id: 'cafe', label: 'Cafes', icon: Coffee },
  { id: 'transit', label: 'MRT', icon: Train },
  { id: 'mall', label: 'Malls', icon: ShoppingBag },
  { id: 'park', label: 'Parks', icon: Trees },
  { id: 'attraction', label: 'Attractions', icon: Camera },
]

// Recent/popular searches for Singapore
const recentSearches = [
  'Maxwell Food Centre',
  'Tanjong Pagar MRT',
  'Marina Bay Sands',
]

export function SearchPanel({ isOpen, onClose, onCategorySelect, onSearch }: SearchPanelProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-background/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-x-4 top-24 z-50 rounded-2xl bg-card shadow-2xl"
          >
            {/* Search input */}
            <form onSubmit={handleSearch} className="border-b border-border p-4">
              <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Singapore..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </form>

            {/* Recent searches */}
            {!query && (
              <div className="border-b border-border p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recent
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        onSearch(term)
                        onClose()
                      }}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Browse by Category
              </p>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onCategorySelect(cat.id)
                      onClose()
                    }}
                    className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary p-3 transition-colors hover:bg-secondary/80"
                  >
                    <cat.icon className="h-5 w-5 text-primary" />
                    <span className="text-[10px] font-medium text-foreground">{cat.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Close button */}
            <div className="border-t border-border p-3">
              <button
                onClick={onClose}
                className="w-full rounded-xl py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
