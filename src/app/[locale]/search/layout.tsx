type Props = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return <div className="container mx-auto space-y-4">{children}</div>;
}
