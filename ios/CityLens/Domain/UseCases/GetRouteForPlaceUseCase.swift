import Foundation
import CoreLocation
import MapKit

struct GetRouteForPlaceUseCase {
    static let shared = GetRouteForPlaceUseCase()

    func execute(
        from origin: CLLocationCoordinate2D,
        to destination: CLLocationCoordinate2D
    ) async throws -> RouteSummary {
        let request = MKDirections.Request()
        request.source = MKMapItem(placemark: MKPlacemark(coordinate: origin))
        request.destination = MKMapItem(placemark: MKPlacemark(coordinate: destination))
        request.transportType = [.walking, .transit]

        let directions = MKDirections(request: request)
        let response = try await directions.calculate()

        guard let route = response.routes.first else {
            throw NSError(domain: "GetRouteForPlaceUseCase", code: 0, userInfo: nil)
        }

        let distance = Measurement(value: route.distance, unit: UnitLength.meters)
        let distanceText: String
        if distance.value < 1000 {
            distanceText = String(format: "%.0f m", distance.value)
        } else {
            distanceText = String(format: "%.1f km", distance.converted(to: .kilometers).value)
        }

        let durationMinutes = Int(route.expectedTravelTime / 60)
        let durationText = "\(durationMinutes) min"

        let mode: RouteSummary.Mode = route.transportType.contains(.transit) ? .transit : .walking

        return RouteSummary(
            mode: mode,
            distanceText: distanceText,
            durationText: durationText
        )
    }
}

