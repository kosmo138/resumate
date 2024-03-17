import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ResumeCard({
  title,
  date,
}: {
  title: string
  date: string
}) {
  return (
    <Card>
      <CardContent>
        <h3>{title}</h3>
      </CardContent>
      <CardFooter>
        <p>{date}</p>
      </CardFooter>
    </Card>
  )
}
