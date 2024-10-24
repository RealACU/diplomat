"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trash2, Plus, MoveRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { stateAbbreviations } from "@/lib/stateAbbreviations";
import { stateNames } from "@/lib/stateNames";
import { TourneySchema } from "@/schemas";
import { HexColorPicker } from "react-colorful";

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
import createTourney from "@/actions/createTourney";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export type Committee = {
  name: string;
  roomNumber: string;
  chairs: User[];
};

const CreateTourneyForm = ({ creatorId }: { creatorId: string }) => {
  const router = useRouter();

  // Form state
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // Dialog state for adding committees
  const [name, setName] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>(""); // Some schools use letters
  const [committees, setCommittees] = useState<Committee[]>([]);

  // Dialog state for adding chairs
  const [chairPreviews, setChairPreviews] = useState<User[]>();

  // Default colors
  const DEFAULT_PRIMARY = "#5370A2";
  const DEFAULT_SECONDARY = "#92A8CE";
  // Dialog state for setting colors
  const [primaryColor, setPrimaryColor] = useState<string>(DEFAULT_PRIMARY);
  const [secondaryColor, setSecondaryColor] =
    useState<string>(DEFAULT_SECONDARY);
  const [tempPrimary, setTempPrimary] = useState<string>(DEFAULT_PRIMARY);
  const [tempSecondary, setTempSecondary] = useState<string>(DEFAULT_SECONDARY);

  const form = useForm<z.infer<typeof TourneySchema>>({
    resolver: zodResolver(TourneySchema),
    defaultValues: {
      name: "",
      description: "",
      school: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      startDate: "",
      endDate: "",
      primaryColorHex: DEFAULT_PRIMARY,
      secondaryColorHex: DEFAULT_SECONDARY,
    },
  });

  const { setValue } = form;

  const onSubmit = (values: z.infer<typeof TourneySchema>) => {
    startTransition(async () => {
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);

      if (startDate > endDate) {
        return setError("Start date cannot be after end date");
      }

      const res = await createTourney(values, committees, creatorId);
      if (res) {
        Swal.fire({
          title: "Success!",
          text: "Did it without a hitch",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: 'bg-periwinkle-100 hover:bg-periwinkle-200 text-white',
          },
        });
        return router.push("/");
      }
    });
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    setChairPreviews(undefined);

    if (!e.target.value) {
      return;
    }

    const data = await getChairPreviews(e.target.value);
    const parsedData = JSON.parse(data);

    setChairPreviews(parsedData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    placeholder="MAVMUN"
                    disabled={isPending}
                  />
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
                    value={field.value}
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
                    value={field.value}
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
                      value={field.value}
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
                      value={field.value}
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
              <FormLabel>Invitation and Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value}
                  placeholder="Thank you for your interest in our tournament! When you enter the school..."
                />
              </FormControl>
              <FormDescription>
                Mention anything you would like delegates to know.
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
                    value={field.value}
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
                    value={field.value}
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

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white w-full relative p-4 flex flex-col">
            <p className="text-center mb-4 font-semibold">
              Tournament Page Preview
            </p>
            <div className="grid grid-cols-2 mb-4 gap-x-4">
              {/* Set primary color */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="text-xs lg:text-sm text-wrap hover:text-slate-300 transition-all duration-100"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Change Primary Color
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md h-80">
                  <DialogHeader>
                    <DialogTitle>
                      <p>Pick a Primary Color</p>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-grow relative">
                    <div className="flex flex-1 -mt-2">
                      <HexColorPicker
                        color={tempPrimary}
                        onChange={setTempPrimary}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="ml-6 flex items-center justify-center flex-col gap-y-3">
                      <p>Hex: {tempPrimary}</p>
                      <div
                        style={{ backgroundColor: tempPrimary }}
                        className="h-32 w-32 border border-gray-300"
                      />
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            setPrimaryColor(tempPrimary);
                            setValue("primaryColorHex", tempPrimary);
                          }}
                        >
                          Save Color
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Set secondary color */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="text-xs lg:text-sm text-wrap duration-100 transition-all hover:text-slate-300"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Change Secondary Color
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md h-80">
                  <DialogHeader>
                    <DialogTitle>
                      <p>Pick a Secondary Color</p>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="flex flex-grow relative">
                    <div className="flex flex-1 -mt-2">
                      <HexColorPicker
                        color={tempSecondary}
                        onChange={setTempSecondary}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="ml-6 flex items-center justify-center flex-col gap-y-3">
                      <p>Hex: {tempSecondary}</p>
                      <div
                        style={{ backgroundColor: tempSecondary }}
                        className="h-32 w-32 border border-gray-300"
                      />
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            setSecondaryColor(tempSecondary);
                            setValue("secondaryColorHex", tempSecondary);
                          }}
                        >
                          Save Color
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/*Preview of tourney page, as it's being created*/}
            <div className="flex flex-col">
              <div className="w-full aspect-[16/9] flex flex-col rounded-md overflow-hidden">
                <div className="relative h-2/6 grid grid-cols-2">
                  <div className="flex items-center p-8 text-navy-100 z-20 text-2xl font-bold">
                    {form.watch("name") ? form.watch("name") : "(Name)"}
                  </div>
                  <div className="flex flex-col justify-end text-right p-8 text-navy-100 z-20 text-md">
                    <div>
                      {form.watch("startDate")
                        ? new Date(form.watch("startDate")).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "(Start Date)"}
                    </div>
                    <div>
                      {form.watch("city") ? form.watch("city") : "(City)"},{" "}
                      {form.watch("state") ? form.watch("state") : "(State)"}
                    </div>
                  </div>
                </div>
                <div
                  className="h-4/6 flex flex-row gap-x-3"
                  style={{
                    background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                  }}
                >
                  <div className="w-2/3 h-full rounded-md my-3 ml-3 bg-slate-300"></div>
                  <div className="w-1/3 h-full rounded-md my-3 mr-3 bg-slate-50"></div>
                </div>
              </div>

              <div className="w-full">
                {(primaryColor !== DEFAULT_PRIMARY ||
                  secondaryColor !== DEFAULT_SECONDARY) && (
                  <Button
                    onClick={() => {
                      setPrimaryColor(DEFAULT_PRIMARY); // Reset to default
                      setSecondaryColor(DEFAULT_SECONDARY); // Reset to default
                      setTempPrimary(DEFAULT_PRIMARY);
                      setTempSecondary(DEFAULT_SECONDARY);
                    }}
                    className="text-black -m-4 mt-2 bg-white hover:bg-white hover:font-bold transition-all duration-100"
                  >
                    Reset to Default
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border-[1px] rounded-md p-4 gap-2">
            {/* Committees */}

            <p className="text-center mb-4 font-semibold">
              Tournament Committees
            </p>

            {committees.map((committee, i) => (
              <div
                key={i}
                className="flex flex-col p-2 rounded-md border-[1px] space-x-2 relative"
              >
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() =>
                    setCommittees((committees) =>
                      committees.filter((comm) => comm !== committee)
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <p className="font-semibold text-lg">{committee.name}</p>
                <p className="pb-4">Room {committee.roomNumber}</p>

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
                    <Label htmlFor="query">Chair Info</Label>
                    <div className="flex gap-1">
                      <Input
                        id="query"
                        placeholder="Search by name, email, or phone number"
                        onBlur={handleBlur}
                      />
                      <Button>
                        <MoveRight />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      {/* This is where the chair preview select goes */}
                      <div className="h-full w-full flex flex-col gap-2 scroll-mx-0">
                        {!chairPreviews || chairPreviews.length === 0 ? (
                          <p className="text-sm text-red-500 font-bold">
                            No matches
                          </p>
                        ) : null}
                        {chairPreviews?.map((chairPreview, j) => (
                          <DialogClose key={j} asChild>
                            <Button
                              className="h-auto w-full bg-slate-100 hover:bg-slate-200"
                              type="submit"
                              onClick={() => {
                                setCommittees((committees) =>
                                  // comm refers to the unupdated version of a committee in the committees list
                                  committees.map((comm) =>
                                    comm === committee
                                      ? {
                                          name: comm.name,
                                          roomNumber: comm.roomNumber,
                                          chairs: [
                                            ...comm.chairs,
                                            chairPreview,
                                          ],
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
                                  chairPreview.emailAddresses[0]?.emailAddress
                                }
                                phoneNumber={
                                  chairPreview.phoneNumbers[0]?.phoneNumber
                                }
                              />
                            </Button>
                          </DialogClose>
                        ))}
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="py-2 flex flex-col gap-1">
                  {committee.chairs.map((chair, k) => (
                    <Button
                      key={k}
                      onClick={() => {
                        setCommittees((committees) =>
                          // comm refers to the unupdated version of a committee in the committees list
                          committees.map((comm) =>
                            comm === committee
                              ? {
                                  name: comm.name,
                                  roomNumber: comm.roomNumber,
                                  // Creates a committee object without this specific chair
                                  chairs: comm.chairs.filter(
                                    (c) => c !== chair
                                  ),
                                }
                              : comm
                          )
                        );
                      }}
                      className="h-auto w-full flex p-1 rounded-md border-[1px] bg-slate-100 hover:bg-slate-200"
                    >
                      <ProfileBar
                        profileImageUrl={chair.imageUrl}
                        username={chair.firstName + " " + chair.lastName}
                        emailAddress={chair.emailAddresses[0]?.emailAddress}
                        phoneNumber={chair.phoneNumbers[0]?.phoneNumber}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-slate-800 w-full bg-slate-200 hover:bg-slate-300">
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
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center mt-10">
          <Button
            disabled={isPending}
            type="submit"
            className="text-lg w-64 h-12 bg-periwinkle-100 hover:bg-periwinkle-200"
          >
            Create Tournament
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateTourneyForm;
