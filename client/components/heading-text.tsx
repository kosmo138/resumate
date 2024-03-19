interface HeadingProps {
  children: string
  subtext?: string
}

export default function HeadingText({ children, subtext }: HeadingProps) {
  return (
    <header className="mb-0 flex flex-col items-center space-y-2 text-center">
      <h1 className="text-primary text-3xl font-bold lg:text-4xl">
        {children}
      </h1>
      <h2 className="text-muted-foreground font-light lg:text-xl">{subtext}</h2>
    </header>
  )
}
