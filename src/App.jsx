import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Dashboard } from "./pages"

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
