import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { DummyPage, RoomPage, Dashboard } from "./pages"
import DocumentProvider from "./providers/DocumentProvider"
import LanguageProvider from "./providers/LanguageProvider"

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/code">
                    <DummyPage />
                </Route>
                <Route exact path="/room">
                    <DocumentProvider>
                        <LanguageProvider>
                            <RoomPage />
                        </LanguageProvider>
                    </DocumentProvider>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
