import { Container, Logo } from "@/shared/ui";

import { HeaderNavigation } from "./header-navigation";

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <HeaderNavigation />
      </Container>
    </header>
  );
}
