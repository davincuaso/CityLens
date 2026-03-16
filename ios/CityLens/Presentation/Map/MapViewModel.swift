import Foundation
import CoreLocation
import MapKit

@MainActor
final class MapViewModel: ObservableObject {
    @Published var selectedPlace: Place?
    @Published var visibleRegion: MKCoordinateRegion?
    @Published private(set) var routeSummary: RouteSummary?

    private let getRouteForPlace: GetRouteForPlaceUseCase
    private let locationService: LocationService

    init(
        getRouteForPlace: GetRouteForPlaceUseCase = GetRouteForPlaceUseCase.shared,
        locationService: LocationService = .shared
    ) {
        self.getRouteForPlace = getRouteForPlace
        self.locationService = locationService
    }

    func select(place: Place) {
        selectedPlace = place
    }

    func updateVisibleRegion(_ region: MKCoordinateRegion) {
        visibleRegion = region
    }

    func loadRouteToSelectedPlace() async {
        guard let place = selectedPlace,
              let userLocation = locationService.currentCoordinate else { return }

        do {
            routeSummary = try await getRouteForPlace.execute(
                from: userLocation,
                to: place.coordinate
            )
        } catch {
            routeSummary = nil
        }
    }
}

