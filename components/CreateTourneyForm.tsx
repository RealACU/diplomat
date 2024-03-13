"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TourneySchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CreateTourneyForm = () => {
  const currentDate = new Date();

  const form = useForm<z.infer<typeof TourneySchema>>({
    resolver: zodResolver(TourneySchema),
    defaultValues: {
      creatorId: "",
      name: "",
      school: "",
      location: "",
      startDate: currentDate,
      endDate: currentDate,
      allChairIds: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="EagleMUNC XII" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Advanced Technologies Academy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1411 Robin St, Las Vegas, NV 89106"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateTourneyForm;
