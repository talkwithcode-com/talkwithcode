import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { DummyPage, HomePage } from "./pages"

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/code">
                    <DummyPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
