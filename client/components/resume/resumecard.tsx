import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ResumeCard({
  title,
  updatedAt
}: {
  title?: string
  updatedAt?: string
}) {
  return (
    <Card>
      <CardContent>
        <h3>{title}</h3>
      </CardContent>
      <CardFooter>
        <p>{updatedAt}</p>
      </CardFooter>
    </Card>
  )
}
