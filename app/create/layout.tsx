export default function CreateLayout({
  children,
  submitRoute,
}: {
  children: React.ReactNode;
  submitRoute: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {submitRoute}
    </div>
  );
}
