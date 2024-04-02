import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ResumeHead } from "@/types/resume"
import Link from "next/link"

export default function ResumeCard({ resumeHead }: { resumeHead: ResumeHead }) {
  return (
    <Card>
      <CardContent>
        <Link href={`/resume/${resumeHead.id}`}>
          <h3>{resumeHead.title}</h3>
        </Link>
      </CardContent>
      <CardFooter>
        <p>{resumeHead.modified}</p>
      </CardFooter>
    </Card>
  )
}
