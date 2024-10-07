import { useAuthGuard } from "./hooks/useAuthGuard"

export const App = ({ children }: { children: React.ReactNode }) => {
    useAuthGuard();

    return (
        <>
            {children}
        </>
    )
}