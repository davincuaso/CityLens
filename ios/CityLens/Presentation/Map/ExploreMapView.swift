import SwiftUI
import MapKit

struct ExploreMapView: View {
    @EnvironmentObject private var viewModel: MapViewModel
    @EnvironmentObject private var arViewModel: ARCameraViewModel
    @EnvironmentObject private var savedPlacesViewModel: SavedPlacesViewModel

    @State private var searchText: String = ""
    @State private var region: MKCoordinateRegion = .init(
        center: CLLocationCoordinate2D(latitude: 1.3521, longitude: 103.8198),
        span: .init(latitudeDelta: 0.05, longitudeDelta: 0.05)
    )

    var body: some View {
        ZStack(alignment: .top) {
            Map(coordinateRegion: $region, annotationItems: arViewModel.nearbyPlaces) { place in
                MapAnnotation(coordinate: place.coordinate) {
                    Button {
                        viewModel.select(place: place)
                    } label: {
                        VStack(spacing: 2) {
                            Image(systemName: "mappin.circle.fill")
                                .font(.title2)
                                .foregroundColor(.red)
                            Text(place.name)
                                .font(.caption2)
                                .padding(4)
                                .background(.thinMaterial)
                                .clipShape(Capsule())
                        }
                    }
                }
            }
            .ignoresSafeArea()

            VStack(spacing: 8) {
                HStack {
                    TextField("Search nearby", text: $searchText)
                        .padding(8)
                        .background(.regularMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    Button {
                        Task {
                            await performSearch()
                        }
                    } label: {
                        Image(systemName: "magnifyingglass")
                            .padding(8)
                            .background(.regularMaterial)
                            .clipShape(Circle())
                    }
                }
                .padding()

                if let selected = viewModel.selectedPlace {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(selected.name)
                                .font(.headline)
                            Spacer()
                            Button {
                                savedPlacesViewModel.toggleSaved(selected)
                            } label: {
                                Image(systemName: "bookmark")
                            }
                        }

                        if let address = selected.address {
                            Text(address)
                                .font(.caption)
                                .foregroundColor(.secondary)
                                .lineLimit(2)
                        }

                        if let summary = viewModel.routeSummary {
                            Text("\(summary.distanceText) • \(summary.durationText)")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }

                        HStack {
                            Button("Route") {
                                Task { await viewModel.loadRouteToSelectedPlace() }
                            }
                            Spacer()
                        }
                        .padding(.top, 4)
                    }
                    .padding()
                    .background(.thinMaterial)
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                    .padding(.horizontal)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                }

                Spacer()
            }
        }
        .onAppear {
            if let userLocation = LocationService.shared.currentCoordinate {
                region.center = userLocation
            }
        }
    }

    private func performSearch() async {
        guard let coordinate = LocationService.shared.currentCoordinate else { return }
        do {
            let useCase = SearchPlacesUseCase.shared
            let results = try await useCase.execute(
                query: searchText,
                near: coordinate,
                radius: 800
            )
            await MainActor.run {
                arViewModel.nearbyPlaces = results
            }
        } catch {
            // Ignore for v1
        }
    }
}

