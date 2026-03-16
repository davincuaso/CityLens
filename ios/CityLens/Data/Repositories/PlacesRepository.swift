import Foundation
import CoreLocation

@MainActor
final class PlacesRepository {
    static let shared = PlacesRepository()

    private let client: GooglePlacesClient

    // Simple in-memory cache keyed by coarse coordinate string.
    private var cache: [String: [Place]] = [:]

    init(client: GooglePlacesClient = .shared) {
        self.client = client
    }

    func fetchNearbyRestaurants(
        at coordinate: CLLocationCoordinate2D,
        radius: Int
    ) async throws -> [Place] {
        let key = cacheKey(for: coordinate)
        if let cached = cache[key] {
            return cached
        }

        let places = try await client.fetchNearbyRestaurants(at: coordinate, radius: radius)
        cache[key] = places
        return places
    }

    func fetchPlaces(withIDs ids: [String]) async throws -> [Place] {
        // For v1, we simply filter cached places by ID.
        let allCached = cache.values.flatMap { $0 }
        let unique = Dictionary(grouping: allCached, by: { $0.id }).compactMap { $0.value.first }
        let lookup = Dictionary(uniqueKeysWithValues: unique.map { ($0.id, $0) })
        return ids.compactMap { lookup[$0] }
    }

    private func cacheKey(for coordinate: CLLocationCoordinate2D) -> String {
        let lat = (coordinate.latitude * 1000).rounded(.towardZero) / 1000
        let lon = (coordinate.longitude * 1000).rounded(.towardZero) / 1000
        return "\(lat),\(lon)"
    }
}

