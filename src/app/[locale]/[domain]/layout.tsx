import { Container } from "@/shared/ui/container";

type Props = {
  children: React.ReactNode;
};

export default function DomainLayout({ children }: Props) {
  return (
    <Container className="py-6" as="section">
      {children}
    </Container>
  );
}
