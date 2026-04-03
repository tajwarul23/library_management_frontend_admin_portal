import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Components/ui/alert-dialog";
import { Button } from "../Components/ui/button";
const Login = () => {
  return (
    <div>
      <div className="grid grid-cols-[240px_1fr] min-h-screen">
        <aside className="bg-gray-900 text-white p-6">Sidebar</aside>
        <main className="p-8">
          Content
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <input type="text" placeholder="Enter your name"
class="w-full border border-gray-300 rounded-md px-4 py-2
focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </main>
      </div>
    </div>
  );
};

export default Login;
