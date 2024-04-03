"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// zod를 통한 유효성 검사
const formSchema = z.object({
  usertest1: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // 이메일 유효성 검사
  usertest2: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// 양식 정의
const ProfileForm2: React.FC<{}> = () => {
  // 1. Define your form.
  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usertest1: "",
      usertest2: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form2}>
      <form onSubmit={form2.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form2.control}
          name="usertest1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>usertest1</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>usertest1</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form2.control}
          name="usertest2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>usertest2</FormLabel>
              <FormControl>
                <Input placeholder="Enter usertest2" {...field} />
              </FormControl>
              <FormDescription>usertest2</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProfileForm2;
