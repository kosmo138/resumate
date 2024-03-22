interface HeadingProps {
  children: string
  subtext?: string
}
//flex-col , items-center,  text-center뺐음 & space 간격 변경
export default function HeadingText({ children, subtext }: HeadingProps) {
  return (
    <header className="mb-6 flex space-y-1.5 ">
      <h1 className="text-3xl font-bold text-primary lg:text-4xl">
        {children}
      </h1>
      <h2 className="font-light text-muted-foreground lg:text-xl">{subtext}</h2>
    </header>
  )
}
