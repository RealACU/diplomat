"use client";

import * as z from "zod";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { ContactSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";

const ContactUsPage = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      access_key: "73ef8272-59c7-44b9-a56e-8b24df3de135",
    },
  });

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    startTransition(async () => {
      const json = JSON.stringify(values);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        Swal.fire({
          title: "Sucess!",
          text: "Message sent successfully!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="h-full w-full py-10 px-8 md:px-32">
      <section className="bg-slate-50 p-4 rounded-md shadow-lg">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-[2rem] font-bold text-center">Contact Form</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Jane Doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="janedoe@example.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Hello, I have a question..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              className="w-full sm:w-16 bg-docorange-100 hover:bg-docorange-200"
            >
              Send
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default ContactUsPage;
