"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  name: string;
}

const IssuesPage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  /*  const { register, control } = useForm<IssueForm>(); */
  const router = useRouter();

  return (
    <form
      className="max-w-xl p-5 space-y-5"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Name" {...register("name")} />
      </TextField.Root>
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default IssuesPage;

/*
      <SimpleMDE />
      <Controller name="test" control={control render={({field}) => <SimpleMDE {..field}/>}></Controller>
*/
