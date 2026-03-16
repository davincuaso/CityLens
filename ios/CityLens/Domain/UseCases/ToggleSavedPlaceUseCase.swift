import Foundation

struct ToggleSavedPlaceUseCase {
    static let shared = ToggleSavedPlaceUseCase()

    private let savedPlacesStore: SavedPlacesStore

    init(savedPlacesStore: SavedPlacesStore = .shared) {
        self.savedPlacesStore = savedPlacesStore
    }

    func execute(placeID: String) {
        var ids = savedPlacesStore.loadPlaceIDs()
        if ids.contains(placeID) {
            savedPlacesStore.remove(placeID: placeID)
        } else {
            savedPlacesStore.add(placeID: placeID)
        }
    }
}

