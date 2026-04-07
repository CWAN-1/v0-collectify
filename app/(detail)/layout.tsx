export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-full">
      {children}
    </div>
  )
}
