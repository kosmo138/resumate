import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LetterHead } from "@/types/letter";
import Link from "next/link";

export default function LetterCard({ letterHead }: { letterHead: LetterHead }) {
  return (
    <Card>
      <CardContent>
        <Link href={`/letter/${letterHead.id}`}>
          <h3>{letterHead.title}</h3>
        </Link>
      </CardContent>
      <CardFooter>
        <p>{letterHead.modified}</p>
      </CardFooter>
    </Card>
  );
}
