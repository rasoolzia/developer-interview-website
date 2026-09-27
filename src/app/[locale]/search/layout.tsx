type Props = {
  children: React.ReactNode;
};

export default function SearchLayout({ children }: Props) {
  return (
    <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
