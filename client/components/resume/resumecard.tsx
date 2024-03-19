import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ResumeHead } from "@/types/resume"

export default function ResumeCard({resumeHead}: {resumeHead: ResumeHead}) {
  return (
    <Card>
      <CardContent>
        <h3>{resumeHead.title}</h3>
      </CardContent>
      <CardFooter>
        <p>{resumeHead.updatedAt}</p>
      </CardFooter>
    </Card>
  )
}
