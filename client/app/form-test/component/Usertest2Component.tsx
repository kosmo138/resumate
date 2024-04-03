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
import { Input } from "@/components/ui/input";

const Usertest2Component: React.FC = () => {
  const { control } = useFormContext<z.infer<typeof formSchema>>(); // useFormContext hook을 사용하여 상위 Form 컴포넌트에서 제공된 form context를 가져옵니다.

  return (
    <FormField
      control={control}
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
  );
};

export default Usertest2Component;
