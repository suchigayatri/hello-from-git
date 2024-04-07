//
//  DevOpsTestApp.swift
//  DevOpsTest
//
//  Created by X on 29/2/2024.
//

import SwiftUI

@main
struct DevOpsTestApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
