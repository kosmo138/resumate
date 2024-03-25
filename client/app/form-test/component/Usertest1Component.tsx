"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const Usertest1Component: React.FC = () => {
  const { control } = useFormContext<z.infer<typeof formSchema>>(); // useFormContext hook을 사용하여 상위 Form 컴포넌트에서 제공된 form context를 가져옵니다.

  return (
    <FormField
      control={control}
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
  );
};

export default Usertest1Component;
