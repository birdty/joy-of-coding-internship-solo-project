"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const IssuesPage = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then(function (response) {
        setTasks(response.data.tasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const deleteTask = async (taskId: any) => {
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
      <table className="table-auto shadow-lg bg-white mb-3">
        <thead>
          <tr>
            <th className="bg-blue-100">Delete</th>
            <th className="bg-blue-300 border text-left px-8 py-4">Name</th>
            <th className="bg-blue-300 border text-left px-8 py-4">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.name}>
              <td
                className="border px-8 py-4"
                onClick={() => deleteTask(task.id)}
              >
                <AiFillDelete />
              </td>
              <td className="border px-8 py-4">{task.name}</td>
              <td
                className="border px-8 py-4"
                onClick={() => editTask(task.id)}
              >
                <FaEdit />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 pt-5">
        <Button className="bg-blue-300 border text-left px-8 py-4">
          <Link href="/tasks/new">New Task</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssuesPage;
