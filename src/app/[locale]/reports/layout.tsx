import { Container } from "@/shared/ui";

type Props = {
  children: React.ReactNode;
};

export default function SearchLayout({ children }: Props) {
  return <Container>{children}</Container>;
}
