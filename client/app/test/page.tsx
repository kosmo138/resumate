"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@/components/ui/form";

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  // useForm 훅을 사용하여 폼 초기화
  const methods = useForm();

  // 제출 핸들러
  const onSubmit = (data) => {
    console.log("입력된 정보:", data); // 입력된 정보를 콘솔에 출력
  };

  return (
    <div>
      <div>
        <Button onClick={() => alert("버튼이 클릭되었습니다.")}>
          클릭하세요
        </Button>
        <Button variant="outline">Outline 버튼</Button>
        <Button variant="destructive">삭제 버튼</Button>
        <Button variant="secondary" size="lg">
          Large Secondary 버튼
        </Button>
      </div>
      <div>
        <Card className="max-w-xs mx-auto border-gray-300">
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the content of the card.</p>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Button
            </button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <>
          <Dialog>
            <DialogTrigger asChild>
              <button onClick={openDialog}>Open Dialog</button>
            </DialogTrigger>

            {isOpen && (
              <DialogContent>
                <DialogClose onClick={closeDialog} />
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a simple dialog description.
                  </DialogDescription>
                </DialogHeader>
                <p>Dialog Content...</p>
                <DialogFooter>
                  <button onClick={closeDialog}>Close</button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button onClick={openMenu}>Open Menu</button>
          </DropdownMenuTrigger>
          {open && (
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={closeMenu}>
                  Action 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={closeMenu}>
                  Action 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={closeMenu}>
                  Action 3
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuCheckboxItem checked={true}>
                  Option 1
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Option 2</DropdownMenuCheckboxItem>
                <DropdownMenuRadioGroup value="radio1">
                  <DropdownMenuRadioItem value="radio1">
                    Radio 1
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="radio2">
                    Radio 2
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      <div>
        <label
          htmlFor="example-input"
          className="block mb-2 font-medium text-lg"
        >
          Enter your name:
        </label>
        <Input
          id="example-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter your name here"
        />
        <p className="text-sm mt-1">Hello, {value || "Stranger"}!</p>
      </div>
      <div>
        <Label htmlFor="example-input" className="text-primary">
          Name:
        </Label>
        <Input id="example-input" type="text" className="input" />
      </div>
      <div>
        <Textarea
          id="example-textarea"
          placeholder="Enter your message..."
          rows={4}
          className="textarea"
        />
      </div>
      <div>
        <Form>
          <Input type="text" name="firstName"></Input>
          <Input type="text" name="lastName"></Input>
        </Form>
      </div>
    </div>
  );
}
