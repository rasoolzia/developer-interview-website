import { SearchInput } from "@/features/search";
import { Container } from "@/shared/ui";

export function SearchSection() {
  return (
    <Container className="py-10 sm:py-12" as="section">
      <SearchInput />
    </Container>
  );
}
