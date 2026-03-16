import Foundation
import CoreLocation
import Combine

final class LocationService: NSObject, CLLocationManagerDelegate {
    static let shared = LocationService()

    private let manager = CLLocationManager()

    private let locationSubject = CurrentValueSubject<CLLocationCoordinate2D?, Never>(nil)
    var locationPublisher: AnyPublisher<CLLocationCoordinate2D?, Never> {
        locationSubject.eraseToAnyPublisher()
    }

    private(set) var currentCoordinate: CLLocationCoordinate2D? {
        didSet {
            locationSubject.send(currentCoordinate)
        }
    }

    private override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyHundredMeters
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
        manager.startUpdatingHeading()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let coordinate = locations.last?.coordinate else { return }
        currentCoordinate = coordinate
    }
}

