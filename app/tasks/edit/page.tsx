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
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/app/createTaskSchema";
import { Text } from "@radix-ui/themes";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/spinner";
import { AiFillDelete } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
type IssueForm = z.infer<typeof createTaskSchema>;

const IssuesPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createTaskSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const [task, setTask] = useState({ name: "", taskId: 0 });

  const handeSubmitForm = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      data.taskId = task.id;
      await axios.post("/api/tasks", data);
      router.push("/tasks");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  useEffect(() => {
    axios
      .get("/api/tasks?taskId=" + searchParams.get("taskId"))
      .then(function (response) {
        setTask(response.data.task);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5 p-5" onSubmit={handeSubmitForm}>
        <TextField.Root>
          <TextField.Input {...register("name")} Value={task.name} />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssuesPage;