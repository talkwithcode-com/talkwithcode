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
    LandingPage,
    FormUpdateQuestion,
} from "./pages"

import JoinRoom from "./pages/JoinRoom"
import LanguageProvider from "./providers/LanguageProvider"
import client from "./graphql/config"
import { ApolloProvider } from "@apollo/client"
import CodeSandbox from "./pages/CodeSandbox"

export default function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/landing">
                        <LandingPage />
                    </Route>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/code">
                        <DummyPage />
                    </Route>
                    <Route path="/add-question">
                        <FormQuestion />
                    </Route>
                    <Route path="/questions/:question_id">
                        <FormUpdateQuestion />
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
                    <Route path="/rooms-list/:detail">
                        <Rooms />
                    </Route>
                    <Route path="/sandbox/:id">
                        <LanguageProvider>
                            <CodeSandbox />
                        </LanguageProvider>
                    </Route>
                    <Route path="/join-room">
                        <JoinRoom />
                    </Route>
                    <Route exact path="/room">
                        <LanguageProvider>
                            <RoomPage />
                        </LanguageProvider>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    )
}
