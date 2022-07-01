import { useEffect } from "react"

export const useCustomJavascript = (codeToRun) => {
    return useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        codeToRun()
    }, [])
}