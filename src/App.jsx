import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import {
    DummyPage,
    RoomPage,
    Dashboard,
    FormRegister,
    FormRoom,
    FormQuestion,
    FormSampleSolution,
    FormSolution,
    FormLogin,
    Questions,
    Rooms,
} from "./pages"
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
                <Route path="/add-question">
                    <FormQuestion />
                </Route>
                <Route path="/add-room">
                    <FormRoom />
                </Route>
                <Route path="/add-solution/:question_id">
                    <FormSolution />
                </Route>
                <Route path="/add-sample/:question_id">
                    <FormSampleSolution />
                </Route>
                <Route path="/register">
                    <FormRegister />
                </Route>
                <Route path="/login">
                    <FormLogin />
                </Route>
                <Route path="/questions">
                    <Questions />
                </Route>
                <Route path="/rooms-list">
                    <Rooms />
                </Route>
                <Route exact path="/room">
                    <LanguageProvider>
                        <RoomPage />
                    </LanguageProvider>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
