import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var viewModel: SettingsViewModel

    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Units")) {
                    Toggle("Use metric units", isOn: $viewModel.useMetricUnits)
                }

                Section(header: Text("Search")) {
                    Stepper(
                        value: $viewModel.maxSearchRadiusMeters,
                        in: 200...2000,
                        step: 100
                    ) {
                        Text("Max radius: \(Int(viewModel.maxSearchRadiusMeters)) m")
                    }
                }

                Section(header: Text("Debug")) {
                    Toggle("Show AR debug overlays", isOn: $viewModel.showDebugOverlays)
                }
            }
            .navigationTitle("Settings")
        }
        .onAppear {
            viewModel.load()
        }
        .onDisappear {
            viewModel.save()
        }
    }
}

