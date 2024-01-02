"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Callout } from "@radix-ui/themes";

interface IssueForm {
  name: string;
}

const IssuesPage = () => {
  const { register, handleSubmit } = useForm<IssueForm>();
  /*  const { register, control } = useForm<IssueForm>(); */
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Name" {...register("name")} />
        </TextField.Root>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default IssuesPage;

/*
      <SimpleMDE />
      <Controller name="test" control={control render={({field}) => <SimpleMDE {..field}/>}></Controller>
*/
