import Foundation
import CoreLocation

struct GooglePlacesClient {
    enum PlacesError: Error {
        case apiKeyMissing
        case invalidResponse
    }

    static let shared = GooglePlacesClient()

    private init() {}

    private var apiKey: String? {
        // In a real app, load this from a secure location or build configuration.
        ProcessInfo.processInfo.environment["GOOGLE_PLACES_API_KEY"]
    }

    func fetchNearbyRestaurants(
        at coordinate: CLLocationCoordinate2D,
        radius: Int
    ) async throws -> [Place] {
        guard let apiKey else {
            throw PlacesError.apiKeyMissing
        }

        var components = URLComponents(string: "https://maps.googleapis.com/maps/api/place/nearbysearch/json")!
        components.queryItems = [
            .init(name: "location", value: "\(coordinate.latitude),\(coordinate.longitude)"),
            .init(name: "radius", value: "\(radius)"),
            .init(name: "type", value: "restaurant"),
            .init(name: "key", value: apiKey),
            .init(name: "components", value: "country:sg")
        ]

        let (data, response) = try await URLSession.shared.data(from: components.url!)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            throw PlacesError.invalidResponse
        }

        let decoded = try JSONDecoder().decode(NearbySearchResponse.self, from: data)
        return decoded.results.map { $0.toPlace() }
    }
}

// MARK: - DTOs

private struct NearbySearchResponse: Decodable {
    let results: [PlaceResult]
}

private struct PlaceResult: Decodable {
    let place_id: String
    let name: String
    let geometry: Geometry
    let vicinity: String?
    let rating: Double?
    let user_ratings_total: Int?
    let price_level: Int?
    let types: [String]?
    let opening_hours: OpeningHours?

    struct Geometry: Decodable {
        let location: Location

        struct Location: Decodable {
            let lat: Double
            let lng: Double
        }
    }

    struct OpeningHours: Decodable {
        let open_now: Bool?
    }

    func toPlace() -> Place {
        Place(
            id: place_id,
            name: name,
            coordinate: .init(
                latitude: geometry.location.lat,
                longitude: geometry.location.lng
            ),
            address: vicinity,
            rating: rating,
            totalRatings: user_ratings_total,
            priceLevel: price_level,
            categories: types ?? [],
            isOpenNow: opening_hours?.open_now
        )
    }
}

