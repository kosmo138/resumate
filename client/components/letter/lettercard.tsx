import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { LetterHead } from "@/types/letter"

export default function LetterCard({ letterHead }: { letterHead: LetterHead }) {
  return (
    <Card>
      <CardContent>
        <h3>{letterHead.title}</h3>
      </CardContent>
      <CardFooter>
        <p>{letterHead.updatedAt}</p>
      </CardFooter>
    </Card>
  )
}
