import SwiftUI

struct SavedPlacesView: View {
    @EnvironmentObject private var viewModel: SavedPlacesViewModel

    var body: some View {
        NavigationStack {
            List {
                ForEach(viewModel.savedPlaces) { place in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(place.name)
                            .font(.headline)
                        if let address = place.address {
                            Text(address)
                                .font(.caption)
                                .foregroundColor(.secondary)
                                .lineLimit(2)
                        }
                    }
                    .contentShape(Rectangle())
                    .swipeActions {
                        Button(role: .destructive) {
                            viewModel.toggleSaved(place)
                        } label: {
                            Label("Remove", systemImage: "trash")
                        }
                    }
                }
            }
            .navigationTitle("Saved Places")
        }
        .task {
            await viewModel.loadSavedPlaces()
        }
    }
}

