"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const IssuesPage = () => {
  return (
    <div className="max-w-xl p-5 space-y-5">
      <TextField.Root>
        <TextField.Input placeholder="Search the docs…" />
      </TextField.Root>
      <SimpleMDE />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default IssuesPage;
