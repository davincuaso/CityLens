import SwiftUI

@main
struct CityLensApp: App {
    @StateObject private var arViewModel = ARCameraViewModel()
    @StateObject private var mapViewModel = MapViewModel()
    @StateObject private var savedPlacesViewModel = SavedPlacesViewModel()
    @StateObject private var settingsViewModel = SettingsViewModel()

    var body: some Scene {
        WindowGroup {
            RootTabView()
                .environmentObject(arViewModel)
                .environmentObject(mapViewModel)
                .environmentObject(savedPlacesViewModel)
                .environmentObject(settingsViewModel)
        }
    }
}

private struct RootTabView: View {
    enum Tab {
        case ar
        case map
        case saved
        case settings
    }

    @State private var selectedTab: Tab = .ar

    var body: some View {
        TabView(selection: $selectedTab) {
            ARCameraView(onOpenMap: {
                selectedTab = .map
            }, onOpenSettings: {
                selectedTab = .settings
            })
            .tabItem {
                Label("AR", systemImage: "camera.viewfinder")
            }
            .tag(Tab.ar)

            ExploreMapView()
                .tabItem {
                    Label("Map", systemImage: "map")
                }
                .tag(Tab.map)

            SavedPlacesView()
                .tabItem {
                    Label("Saved", systemImage: "bookmark")
                }
                .tag(Tab.saved)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape")
                }
                .tag(Tab.settings)
        }
    }
}

