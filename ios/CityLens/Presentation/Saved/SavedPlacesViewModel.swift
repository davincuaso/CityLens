import Foundation

@MainActor
final class SavedPlacesViewModel: ObservableObject {
    @Published private(set) var savedPlaces: [Place] = []

    private let savedPlacesStore: SavedPlacesStore
    private let placesRepository: PlacesRepository

    init(
        savedPlacesStore: SavedPlacesStore = .shared,
        placesRepository: PlacesRepository = .shared
    ) {
        self.savedPlacesStore = savedPlacesStore
        self.placesRepository = placesRepository
    }

    func loadSavedPlaces() async {
        let ids = savedPlacesStore.loadPlaceIDs()
        do {
            savedPlaces = try await placesRepository.fetchPlaces(withIDs: ids)
        } catch {
            // For v1 we silently ignore errors here
        }
    }

    func toggleSaved(_ place: Place) {
        if savedPlaces.contains(place) {
            savedPlaces.removeAll { $0 == place }
            savedPlacesStore.remove(placeID: place.id)
        } else {
            savedPlaces.append(place)
            savedPlacesStore.add(placeID: place.id)
        }
    }
}

