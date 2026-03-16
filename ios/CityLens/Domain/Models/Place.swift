import Foundation
import CoreLocation

struct Place: Identifiable, Hashable {
    let id: String
    let name: String
    let coordinate: CLLocationCoordinate2D
    let address: String?
    let rating: Double?
    let totalRatings: Int?
    let priceLevel: Int?
    let categories: [String]
    let isOpenNow: Bool?
}

struct RouteSummary: Hashable {
    enum Mode {
        case walking
        case transit
        case driving
    }

    let mode: Mode
    let distanceText: String
    let durationText: String
}

