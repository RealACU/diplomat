"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { stateAbbreviations } from "@/lib/stateAbbreviations";
import { stateNames } from "@/lib/stateNames";
import { TourneySchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import ProfileBar from "./ProfileBar";
import { User } from "@clerk/nextjs/server";
import getChairPreviews from "@/actions/getChairPreviews";

type Committee = {
  name: string;
  roomNumber: string;
  chairs: User[];
};

const CreateTourneyForm = ({ creatorId }: { creatorId: string }) => {
  // Form state
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // Dialog state for adding committees
  const [name, setName] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>(""); // Some schools use letters
  const [committees, setCommittees] = useState<Committee[]>([]);

  // Dialog state for adding chairs
  const [chairPreviews, setChairPreviews] = useState<User[]>();

  const form = useForm<z.infer<typeof TourneySchema>>({
    resolver: zodResolver(TourneySchema),
    defaultValues: {
      creatorId,
      name: "",
      description: "",
      school: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof TourneySchema>) => {
    // setError("");
    // setSuccess("");
    //
    // If end date < start date, set error and return
    // If end date === start date && end time < start time, set error & return
    //
    // Generate allChairIds here
    //
    // startTransition(() => {
    //   // TODO: make server action to create tourney
    //   createTourney(values).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.success);
    //   });
    // });
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const data = await getChairPreviews(e.target.value);
    const parsedData = JSON.parse(data);
    console.log(parsedData);

    setChairPreviews(parsedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="MAVMUN" disabled={isPending} />
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
                    placeholder="Advanced Technologies Academy HS"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1st Line of Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1411 Robin St"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Las Vegas"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stateAbbreviations.map((stateAbbrev, i) => (
                        <SelectItem key={stateAbbrev} value={stateAbbrev}>
                          {stateNames[i]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="89106"
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="When you enter the school..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Mention anything you'd like delegates to know.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="When you enter the school..."
                    type="datetime-local"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="When you enter the school..."
                    type="datetime-local"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>
          If the tournament does not last for more than a day, pick the same
          date for both the start and end date.
        </FormDescription>

        <div className="bg-white border-[1px] rounded-md p-4 grid gap-2 grid-cols-1">
          {/* Committees */}

          {committees.map((committee, i) => (
            <div
              key={i}
              className="flex flex-col p-2 rounded-md border-[1px] space-x-2 relative"
            >
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() =>
                  setCommittees((committees) => committees.splice(i, 1))
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <p className="font-semibold text-lg">{committee.name}</p>
              <p>Room {committee.roomNumber}</p>

              {/* Add chair */}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4" />
                    Add Chair
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Chair</DialogTitle>
                  </DialogHeader>
                  <div>
                    <Label htmlFor="query">Chair Info</Label>
                    <Input
                      id="query"
                      placeholder="Search by name, email, or phone number"
                      onBlur={handleBlur}
                    />
                  </div>
                  <DialogFooter className="sm:justify-start">
                    {/* This is where the chair preview select goes */}
                    <div className="h-full w-full flex flex-col gap-2 scroll-mx-0">
                      {!chairPreviews ? (
                        <p className="text-sm text-red-500 font-bold">
                          No matches
                        </p>
                      ) : null}
                      {chairPreviews?.map((chairPreview) => (
                        <DialogClose asChild>
                          <Button
                            className="h-auto w-full"
                            type="submit"
                            onClick={() => {
                              setCommittees((committees) =>
                                // comm refers to the unupdated version of a committee in the committees list
                                committees.map((comm) =>
                                  comm === committee
                                    ? {
                                        name: comm.name,
                                        roomNumber: comm.roomNumber,
                                        chairs: [...comm.chairs, chairPreview],
                                      }
                                    : comm
                                )
                              );
                            }}
                          >
                            <ProfileBar
                              profileImageUrl={chairPreview.imageUrl}
                              username={
                                chairPreview.firstName +
                                " " +
                                chairPreview.lastName
                              }
                              emailAddress={
                                chairPreview.emailAddresses[0].emailAddress
                              }
                              phoneNumber={
                                chairPreview.phoneNumbers[0].phoneNumber
                              }
                            />
                          </Button>
                        </DialogClose>
                      ))}
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="py-1"></div>
              {committee.chairs.map((chair, j) => (
                <div
                  key={j}
                  className="flex flex-col p-1 rounded-md border-[1px] bg-slate-200 hover:bg-slate-200/70"
                >
                  <ProfileBar
                    profileImageUrl={chair.imageUrl}
                    username={chair.firstName + " " + chair.lastName}
                    emailAddress={chair.emailAddresses[0].emailAddress}
                    phoneNumber={chair.phoneNumbers[0].phoneNumber}
                  />
                </div>
              ))}
            </div>
          ))}

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Add Committee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Committee</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name">Committee Name</Label>
                <Input
                  id="name"
                  placeholder="Disarmament and International Security"
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  placeholder="245A"
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    setRoomNumber(e.target.value)
                  }
                />
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() => {
                      if (!name || !roomNumber) {
                        return; //Todo: setError("please enter shi");
                      }

                      setCommittees((committees) => [
                        ...committees,
                        { name: name, roomNumber: roomNumber, chairs: [] },
                      ]);

                      setName("");
                      setRoomNumber("");
                    }}
                  >
                    Create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* <FormError message={error} />
        <FormSuccess message={success} /> */}
        <Button disabled={isPending} type="submit" className="w-full sm:w-16">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateTourneyForm;
