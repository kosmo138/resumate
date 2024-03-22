import { Button } from "@/components/ui/button"

export default function SaveButton() {
  return (
    <div className="mt-5 flex justify-end space-x-4">
      <Button variant="outline">취소</Button>
      <Button>저장</Button>
    </div>
  )
}
