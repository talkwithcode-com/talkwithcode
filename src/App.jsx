import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { HomePage } from "./pages"

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
