import { Container } from "@/shared/ui";

type Props = {
  children: React.ReactNode;
};

export default function SearchLayout({ children }: Props) {
  return (
    <Container className="py-6" as="section">
      {children}
    </Container>
  );
}
