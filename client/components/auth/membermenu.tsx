import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { FiUser, FiKey, FiXCircle, FiLogOut } from "react-icons/fi";

interface MemberMenuProps{
  onLogout: ()=> void;
}

export function MemberMenu({onLogout}:MemberMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="align-middle">
          <FiUser className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FiKey className="mr-2 h-4 w-4" />
            <span>비밀번호 변경</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FiXCircle className="mr-2 h-4 w-4" />
            <span>회원 탈퇴</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FiLogOut className="mr-2 h-4 w-4" />
            <span onClick={onLogout}>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
