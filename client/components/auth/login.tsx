import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaComment } from "react-icons/fa";

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="align-middle">
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              이메일
            </Label>
            <Input
              id="email"
              placeholder="이메일을 입력해 주세요"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              type="password"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <Button className="center" type="submit">
            로그인
          </Button>
        </div>
        <span className="block text-sm text-muted-foreground sm:text-center">
          <a target="singin" href="#">
            회원가입{" "}
          </a>
          |
          <a target="findid" href="#">
            {" "}
            ID 찾기{" "}
          </a>
          |
          <a target="findpw" href="#">
            {" "}
            패스워드 찾기
          </a>
        </span>
        <div className="w-283 h-15 item-center">
          <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=81fb547326f915ccdfff93033c19647a&redirect_uri=http://localhost:3000/oauth/">
            <img src="kakao-login.png" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
