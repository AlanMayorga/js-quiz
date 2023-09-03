import { Button, Link } from "@nextui-org/react"
import { GitHubLogo } from "./icons"

function Header() {
    return (
        <header className="flex justify-end p-4">
            <ul>
                <li>
                    <Button
                        isIconOnly
                        isExternal
                        variant="light"
                        href="https://github.com/AlanMayorga"
                        as={Link}
                    >
                        <GitHubLogo />
                    </Button>
                </li>
            </ul>
        </header>
    )
}

export default Header