"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "../shared/CurrencyInput";
import { Card, CardContent } from "../ui/card";
import { CalendarIcon, Heart, Plus, User, Users } from "lucide-react";
import { AddInterest } from "./AddInterest";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const dataTraveling = [
  {
    label: "Solo trip",
    icon: <User />,
  },
  {
    label: "Couple trip",
    icon: <Heart />,
  },
  {
    label: "Family trip",
    icon: <User />,
  },
  {
    label: "Friends trip",
    icon: <Users />,
  },
];

const dataFood = ["Vegetarian Food", "Halal Food"];
const dataInterested = [
  "Beaches",
  "Must-See Attraction",
  "Outdoor Adventures & Sports",
  "Festival/Events",
  "Food Culinary",
  "Sightseeing",
  "Fine Dining",
  "Shopping",
  "Hidden Gems",
  "Spa Wellness",
  "Night Clubs & Bar",
  "Art & Culture",
];

const Badge = ({ text, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`border ${
        isActive && "bg-gradient-to-r from-[#26D0CE] to-green-300 text-white"
      } rounded-full py-2.5 px-4 cursor-pointer active:scale-95  transition-all flex items-center justify-center text-sm w-max`}
    >
      {text}
    </div>
  );
};

const formSchema = z.object({
  budget: z
    .number({ invalid_type_error: "Budget must be a number" })
    .min(1, { message: "Budget must be more than 0" })
    .nullable()
    .refine((val) => val !== null, { message: "This field is required" }),
  interested: z
    .array(z.string().min(1))
    .min(1, { message: "Please select at least one interest" }),
  plan: z.string().min(1, {
    message: "This field is required",
  }),
  food: z.string().min(1, {
    message: "This field is required",
  }),
  date: z
    .object({
      from: z.date({ required_error: "Start date is required" }),
      to: z.date({ required_error: "End date is required" }),
    })
    .refine((data) => data.from && data.to, {
      message: "Both start and end dates are required",
    })
    .refine((data) => data.from <= data.to, {
      message: "Start date must be before end date",
    }),
});

const FormPage = () => {
  const [dialog, setDialog] = useState({
    addInterest: false,
  });
  const {
    formState: { errors },
    ...form
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      budget: null,
      plan: "",
      interested: [],
      food: "",
      date: {
        from: undefined,
        to: undefined,
      },
    },
  });
  const onSubmit = () => {};

  console.log({ value: form.watch(), errors });

  return (
    <div className="mx-[100px] xl:mx-[300px] my-[80px] font-medium">
      <div className="space-y-3">
        <h3 className="font-bold text-5xl">Enter you travel details</h3>
        <p className="text-neutral-500 text-lg font-normal">
          Simply input your information, and we'll design a custom travel plan
          your needs
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full px-3 active:scale-none py-6 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              `${format(field.value.from, "PPP")} - ${format(
                                field.value.to,
                                "PPP"
                              )}`
                            ) : (
                              format(field.value.from, "PPP")
                            )
                          ) : (
                            <span>Choose a date range</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <span className="text-sm text-destructive font-normal">
                    {(errors.date?.from?.message ||
                      errors.date?.to?.message ||
                      errors.date?.message) &&
                      "This field is required"}
                  </span>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your total budget?</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Input your estimated budget?"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you plan on traveling with?</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-6">
                      {dataTraveling.map((val, key) => {
                        return (
                          <Card
                            onClick={() => {
                              form.setValue("plan", val.label, {
                                shouldValidate: true,
                              });
                            }}
                            className={`p-1.5 ${
                              field.value == val.label &&
                              "bg-gradient-to-r from-[#26D0CE] to-green-300 text-white"
                            } cursor-pointer rounded-md active:scale-95 transition-all`}
                            key={key}
                          >
                            <CardContent className={"p-1.5 space-y-1 "}>
                              {/* <User /> */}
                              {val.icon}
                              <p className="text-sm">{val.label}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interested"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you interested in?</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-3">
                      {dataInterested.map((val, key) => {
                        const isSelected = field.value.includes(val);
                        return (
                          <Badge
                            text={val}
                            key={key}
                            isActive={isSelected}
                            onClick={() => {
                              const updated = isSelected
                                ? field.value.filter((v) => v !== val)
                                : [...field.value, val];

                              form.setValue("interested", updated, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        );
                      })}
                      <Badge
                        onClick={() => {
                          //   setDialog({ addInterest: true });
                        }}
                        text={
                          <div className="flex items-center justify-center space-x-1">
                            <Plus className="h-4 w-4" />
                            <span>Add Interest</span>{" "}
                          </div>
                        }
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="food"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have any food preferences?</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-3">
                      {dataFood.map((val, key) => {
                        return (
                          <Badge
                            text={val}
                            key={key}
                            isActive={field.value == val}
                            onClick={() => {
                              form.setValue("food", val, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        );
                      })}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button size={"lg"} type="submit">
                Submit answer
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* /////////////// */}
      {/* DIALOG */}
      {/* //////////////// */}
      <AddInterest
        isOpen={dialog.addInterest}
        handleClose={() => {
          setDialog({ addInterest: false });
        }}
      />
    </div>
  );
};

export default FormPage;
