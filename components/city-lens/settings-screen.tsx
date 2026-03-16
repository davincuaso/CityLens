'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Eye, 
  Shield, 
  HelpCircle, 
  Info,
  ChevronRight,
  Moon,
  Compass,
  Volume2
} from 'lucide-react'

interface SettingsScreenProps {
  onBack: () => void
}

interface SettingItemProps {
  icon: React.ReactNode
  label: string
  value?: string
  hasToggle?: boolean
  toggled?: boolean
  onClick?: () => void
}

function SettingItem({ icon, label, value, hasToggle, toggled, onClick }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-secondary/50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          {icon}
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {hasToggle ? (
        <div className={`h-6 w-11 rounded-full p-0.5 transition-colors ${toggled ? 'bg-primary' : 'bg-muted'}`}>
          <div className={`h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${toggled ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
      ) : value ? (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="text-sm">{value}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      ) : (
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  )
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  return (
    <div className="h-full w-full bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-4 px-4 pb-4 pt-12">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </motion.button>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Settings List */}
      <div className="overflow-auto p-4" style={{ height: 'calc(100% - 88px)' }}>
        {/* AR Experience */}
        <div className="mb-6">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AR Experience
          </h2>
          <div className="rounded-2xl bg-card">
            <SettingItem
              icon={<Eye className="h-4 w-4" />}
              label="AR Overlay Opacity"
              value="80%"
            />
            <SettingItem
              icon={<Compass className="h-4 w-4" />}
              label="Auto-Scan Mode"
              hasToggle
              toggled={true}
            />
            <SettingItem
              icon={<Volume2 className="h-4 w-4" />}
              label="Sound Effects"
              hasToggle
              toggled={false}
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Notifications
          </h2>
          <div className="rounded-2xl bg-card">
            <SettingItem
              icon={<Bell className="h-4 w-4" />}
              label="Push Notifications"
              hasToggle
              toggled={true}
            />
            <SettingItem
              icon={<MapPin className="h-4 w-4" />}
              label="Nearby Place Alerts"
              hasToggle
              toggled={true}
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="mb-6">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Appearance
          </h2>
          <div className="rounded-2xl bg-card">
            <SettingItem
              icon={<Moon className="h-4 w-4" />}
              label="Dark Mode"
              hasToggle
              toggled={true}
            />
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="mb-6">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Privacy & Security
          </h2>
          <div className="rounded-2xl bg-card">
            <SettingItem
              icon={<MapPin className="h-4 w-4" />}
              label="Location Access"
              value="While Using"
            />
            <SettingItem
              icon={<Shield className="h-4 w-4" />}
              label="Privacy Settings"
            />
          </div>
        </div>

        {/* Support */}
        <div className="mb-6">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Support
          </h2>
          <div className="rounded-2xl bg-card">
            <SettingItem
              icon={<HelpCircle className="h-4 w-4" />}
              label="Help Center"
            />
            <SettingItem
              icon={<Info className="h-4 w-4" />}
              label="About CityLens"
              value="v2.1.0"
            />
          </div>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">CityLens v2.1.0</p>
          <p className="mt-1 text-xs text-muted-foreground">Made with care in San Francisco</p>
        </div>
      </div>
    </div>
  )
}
