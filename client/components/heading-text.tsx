interface HeadingProps {
  children: string
  subtext?: string
}
//flex-col , items-center,  text-center뺐음 & space 간격 변경
export default function HeadingText({ children, subtext }: HeadingProps) {
  return (
    <header className="mb-6 flex space-y-1.5 ">
      <h1 className="text-primary text-3xl font-bold lg:text-4xl">
        {children}
      </h1>
      <h2 className="text-muted-foreground font-light lg:text-xl">{subtext}</h2>
    </header>
  )
}
