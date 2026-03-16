import SwiftUI
import ARKit

struct ARCameraView: View {
    @EnvironmentObject private var viewModel: ARCameraViewModel
    @EnvironmentObject private var savedPlacesViewModel: SavedPlacesViewModel

    let onOpenMap: () -> Void
    let onOpenSettings: () -> Void

    var body: some View {
        ZStack(alignment: .top) {
            ARCameraContainerView()
                .ignoresSafeArea()

            VStack {
                HStack {
                    Button(action: onOpenMap) {
                        Label("Map", systemImage: "map")
                            .padding(8)
                            .background(.regularMaterial)
                            .clipShape(Capsule())
                    }
                    Spacer()
                    Button(action: onOpenSettings) {
                        Image(systemName: "gearshape")
                            .padding(8)
                            .background(.regularMaterial)
                            .clipShape(Circle())
                    }
                }
                .padding()

                Spacer()

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(viewModel.nearbyPlaces) { place in
                            PlaceCard(place: place) {
                                savedPlacesViewModel.toggleSaved(place)
                            }
                        }
                    }
                    .padding(.horizontal)
                    .padding(.bottom, 16)
                }
                .background(
                    LinearGradient(
                        colors: [Color.black.opacity(0.0), Color.black.opacity(0.5)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                    .ignoresSafeArea(edges: .bottom)
                )
            }
        }
        .onAppear {
            Task {
                if let coordinate = LocationService.shared.currentCoordinate {
                    await viewModel.loadNearbyPlaces(at: coordinate)
                }
            }
        }
    }
}

private struct PlaceCard: View {
    let place: Place
    let onToggleSave: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(place.name)
                    .font(.headline)
                    .foregroundColor(.primary)
                    .lineLimit(1)
                Spacer()
                Button(action: onToggleSave) {
                    Image(systemName: "bookmark")
                }
            }

            if let rating = place.rating {
                HStack(spacing: 4) {
                    Image(systemName: "star.fill")
                        .foregroundColor(.yellow)
                        .font(.caption)
                    Text(String(format: "%.1f", rating))
                        .font(.subheadline)
                    if let total = place.totalRatings {
                        Text("(\(total))")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
            }

            if let address = place.address {
                Text(address)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
            }
        }
        .padding()
        .frame(width: 260)
        .background(.thinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }
}

private struct ARCameraContainerView: UIViewRepresentable {
    func makeUIView(context: Context) -> ARSCNView {
        let view = ARSCNView(frame: .zero)
        view.autoenablesDefaultLighting = true
        view.automaticallyUpdatesLighting = true
        return view
    }

    func updateUIView(_ uiView: ARSCNView, context: Context) {}

    static func dismantleUIView(_ uiView: ARSCNView, coordinator: ()) {
        uiView.session.pause()
    }
}

