# CityLens

CityLens is an AR-powered urban discovery app that allows users to explore their surroundings using a camera-first interface. By pointing their phone at real-world locations, users can discover nearby places, view contextual information, and navigate efficiently with intelligent routing.

This project demonstrates modern iOS architecture, reactive programming, modular design, and sensor-based interactions.

---

## Features

### AR Discovery
Users can explore nearby locations through an augmented-reality camera interface.

- Floating place cards anchored to physical locations
- Real-time distance calculations
- Context-aware discovery

### Smart Navigation
CityLens provides optimized route suggestions based on real-world conditions.

- walking distance
- transit availability
- crowd levels
- travel time

### Map Exploration
Interactive map interface to browse locations.

- filters
- search
- place details
- route planning

### Saved Locations
Bookmark locations for quick access.

### Developer Metrics Dashboard
Internal dashboard displaying app health and performance metrics.

---

## Tech Stack

### iOS
- Swift
- SwiftUI
- UIKit (for advanced views)
- RxSwift
- Combine (where appropriate)

### Apple Frameworks
- ARKit
- CoreLocation
- MapKit
- AVFoundation

### Backend
- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Redis

### DevOps
- GitHub Actions
- fastlane
- TestFlight
- Swift Package Manager

---

## Architecture

CityLens follows **Clean Architecture with MVVM**.

Layers:
