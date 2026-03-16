import Foundation
import CoreLocation

struct FetchNearbyRestaurantsUseCase {
    static let shared = FetchNearbyRestaurantsUseCase()

    private let repository: PlacesRepository

    init(repository: PlacesRepository = .shared) {
        self.repository = repository
    }

    func execute(at coordinate: CLLocationCoordinate2D, radius: Int) async throws -> [Place] {
        try await repository.fetchNearbyRestaurants(at: coordinate, radius: radius)
    }
}

