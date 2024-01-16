"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Select } from "@radix-ui/themes";

const IssuesPage = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then(function (response) {
        let tasks = response.data.tasks;

        tasks.forEach((task) => {
          // unsure why date of month is one number lower
          // for now just increment the day of month
          //let date = new Date(task.duedate);
          //date.setDate(date.getDate() + 1);
          // task.duedate = date.toDateString();
          let date = new Date(task.duedate);
          date.setDate(date.getDate() + 1);

          task.duedate = date.toLocaleDateString();
        });

        setTasks(tasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const sortChanged = async (value) => {
    axios
      .get("/api/tasks?sortBy=" + value)
      .then(function (response) {
        let tasks = response.data.tasks;
        setTasks(tasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteTask = async (taskId: any) => {
    if (!confirm("Are you sure?")) {
      return;
    }

    axios
      .delete("/api/tasks?id=" + taskId)
      .then(function (response) {
        setTasks(response.data.tasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editTask = (taskId: any) => {
    router.push("/tasks/edit?taskId=" + taskId);
  };

  return (
    <div className="p-8">
      <div className="mb-5">
        Sort By: &nbsp;
        <Select.Root
          defaultValue="name"
          size="2"
          onValueChange={(value) => sortChanged(value)}
        >
          <Select.Trigger variant="surface" />
          <Select.Content>
            <Select.Group color="purple">
              <Select.Item value="name">Name</Select.Item>
              <Select.Item value="description">Description</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>

      <table className="table-auto shadow-lg bg-white mb-3">
        <thead>
          <tr>
            <th className="bg-blue-300 border text-left px-8 py-4">Delete</th>
            <th className="bg-blue-300 border text-left px-8 py-4">Name</th>
            <th className="bg-blue-300 border text-left px-8 py-4">
              Description
            </th>
            <th className="bg-blue-300 border text-left px-8 py-4">Due date</th>
            <th className="bg-blue-300 border text-left px-8 py-4">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.name}>
              <td
                className="border px-8 py-4 hand"
                onClick={() => deleteTask(task.id)}
              >
                <AiFillDelete />
              </td>
              <td className="border px-8 py-4">{task.name}</td>
              <td className="border px-8 py-4">{task.description}</td>
              <td className="border px-8 py-4">{task.duedate}</td>
              <td
                className="border px-8 py-4 hand"
                onClick={() => editTask(task.id)}
              >
                <FaEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 pt-5">
        <div className="mt-5">
          <Button className="bg-blue-300 border text-left px-8 py-4">
            <Link href="/tasks/new">New Task</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
