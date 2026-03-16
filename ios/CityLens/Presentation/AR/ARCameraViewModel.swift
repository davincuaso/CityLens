import Foundation
import Combine
import CoreLocation

@MainActor
final class ARCameraViewModel: ObservableObject {
    @Published private(set) var nearbyPlaces: [Place] = []
    @Published private(set) var isLoading: Bool = false
    @Published private(set) var errorMessage: String?

    private let fetchNearbyRestaurants: FetchNearbyRestaurantsUseCase
    private let locationService: LocationService

    private var cancellables = Set<AnyCancellable>()

    init(
        fetchNearbyRestaurants: FetchNearbyRestaurantsUseCase = FetchNearbyRestaurantsUseCase.shared,
        locationService: LocationService = .shared
    ) {
        self.fetchNearbyRestaurants = fetchNearbyRestaurants
        self.locationService = locationService

        observeLocation()
    }

    private func observeLocation() {
        locationService.locationPublisher
            .compactMap { $0 }
            .removeDuplicates()
            .sink { [weak self] location in
                Task {
                    await self?.loadNearbyPlaces(at: location)
                }
            }
            .store(in: &cancellables)
    }

    func loadNearbyPlaces(at location: CLLocationCoordinate2D) async {
        isLoading = true
        errorMessage = nil
        do {
            let places = try await fetchNearbyRestaurants.execute(
                at: location,
                radius: 800
            )
            nearbyPlaces = places
        } catch {
            errorMessage = "Failed to load nearby places."
        }
        isLoading = false
    }
}

