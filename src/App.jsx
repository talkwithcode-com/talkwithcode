import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { DummyPage, HomePage, Dashboard

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
            </Switch>
        </BrowserRouter>
    )
}
