import Foundation

final class SavedPlacesStore {
    static let shared = SavedPlacesStore()

    private let key = "citylens.savedPlaceIDs"
    private let defaults = UserDefaults.standard

    private init() {}

    func loadPlaceIDs() -> [String] {
        defaults.stringArray(forKey: key) ?? []
    }

    func add(placeID: String) {
        var ids = loadPlaceIDs()
        guard !ids.contains(placeID) else { return }
        ids.append(placeID)
        defaults.set(ids, forKey: key)
    }

    func remove(placeID: String) {
        var ids = loadPlaceIDs()
        ids.removeAll { $0 == placeID }
        defaults.set(ids, forKey: key)
    }
}

