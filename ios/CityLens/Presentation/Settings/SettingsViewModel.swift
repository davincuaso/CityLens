import Foundation

@MainActor
final class SettingsViewModel: ObservableObject {
    @Published var useMetricUnits: Bool = true
    @Published var showDebugOverlays: Bool = false
    @Published var maxSearchRadiusMeters: Double = 800

    // In a full implementation this would read/write from persistence.
    func load() {
        // Stubbed for now.
    }

    func save() {
        // Stubbed for now.
    }
}

