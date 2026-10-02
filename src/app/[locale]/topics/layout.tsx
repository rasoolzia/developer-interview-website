import { Container } from "@/shared/ui/container";

type Props = {
  children: React.ReactNode;
};

export default function TopicsLayout({ children }: Props) {
  return (
    <Container className="py-8 sm:py-12" as="section">
      {children}
    </Container>
  );
}
