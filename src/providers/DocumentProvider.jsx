import React, { useCallback, useState } from "react"

const defaultValue = `
package main

import (
	"fmt"
)

func solve(n int) {
	for i := 0; i < n; i++ {
		for j := 0; j < i+1; j++ {
			fmt.Print("*")
		}
		fmt.Println("")
	}
}

func main() {
	solve(10)
}
`

/**
 for (let i=0; i<4; i++) {
  	let line = ""
 	for(let j=0; j<i+1; j++) {
    	line+="*"
    }
  	console.log(line)
}
 */

export const DocumentContext = React.createContext({
    defaultValue: defaultValue,
    value: "",

    updateValue: (_) => {},
})

const DocumentProvider = ({ children }) => {
    const [value, setValue] = useState(defaultValue)

    const updateValue = useCallback((value) => {
        setValue(value)
    }, [])

    return (
        <DocumentContext.Provider
            value={{
                value,
                defaultValue,
                updateValue,
            }}
        >
            {children}
        </DocumentContext.Provider>
    )
}

export default DocumentProvider
