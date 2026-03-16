import Foundation
import CoreLocation

struct SearchPlacesUseCase {
    static let shared = SearchPlacesUseCase()

    private let repository: PlacesRepository

    init(repository: PlacesRepository = .shared) {
        self.repository = repository
    }

    func execute(
        query: String,
        near coordinate: CLLocationCoordinate2D,
        radius: Int
    ) async throws -> [Place] {
        // For v1, we just reuse nearby search and filter in-memory.
        let nearby = try await repository.fetchNearbyRestaurants(at: coordinate, radius: radius)
        guard !query.isEmpty else { return nearby }
        let lowercased = query.lowercased()
        return nearby.filter { place in
            place.name.lowercased().contains(lowercased) ||
            (place.address?.lowercased().contains(lowercased) ?? false)
        }
    }
}

