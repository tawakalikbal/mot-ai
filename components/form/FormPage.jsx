"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fetchItinerarySSE, hitApiItinerary } from "@/utils/apiUtils";
import { getOrCreateSessionId, getOrCreateUserId } from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Heart, Plus, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { AddInterest } from "./AddInterest";

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
        isActive && "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white"
      } rounded-full py-2.5 px-4 cursor-pointer active:scale-95  transition-all flex items-center justify-center text-sm w-max`}
    >
      {text}
    </div>
  );
};

const formSchema = z.object({
  destination: z
    .string(1, { message: "Destination is required" })
    .min(1, { message: "Destination is required" })
    .refine((val) => val, {
      message: "Destination is required",
    }),
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

const FormPage = ({handleCloseFormModal}) => {
  const [dialog, setDialog] = useState({
    addInterest: false,
  });
  const {
    formState: { errors },
    ...form
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
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
  const router = useRouter()
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const status = await hitApiItinerary(
        uid,
        sid,
        data.destination,
        data.budget,
        data.plan,
        data.interested,
        data.food,
        data.date.from,
        data.date.to
      );
      if (status == 200) {
        const statusItinerary = await buatItinerary();
        if (statusItinerary) {
          router.push('/itinerary')
        }
      }
    } catch (err) {
      console.error("Gagal kirim data");
      setLoading(false);
    }
  };

  const buatItinerary = async (data) => {
    setLoading(true);
    try {
      const resdata = await fetchItinerarySSE(
        uid,
        sid,
      );
      return resdata;
    } catch (err) {
      console.error("Gagal kirim data");
      setLoading(false);
    }
  };
  
  const destination = [
    { label: "Bali", value: "Bali" },
    { label: "Yogyakarta", value: "Yogyakarta" },
    { label: "Lombok", value: "Lombok" },
    { label: "Labuan Bajo", value: "Labuan Bajo" },
    { label: "Raja Ampat", value: "Raja Ampat" },
    { label: "Bandung", value: "Bandung" },
    { label: "Jakarta", value: "Jakarta" },
    { label: "Malang", value: "Malang" },
    { label: "Bromo", value: "Bromo" },
    { label: "Toba Lake", value: "Toba Lake" },
    { label: "Belitung", value: "Belitung" },
    { label: "Derawan Islands", value: "Derawan Islands" },
    { label: "Wakatobi", value: "Wakatobi" },
    { label: "Makassar", value: "Makassar" },
    { label: "Manado", value: "Manado" },
    { label: "Tana Toraja", value: "Tana Toraja" },
    { label: "Semarang", value: "Semarang" },
    { label: "Medan", value: "Medan" },
    { label: "Padang", value: "Padang" },
    { label: "Aceh", value: "Aceh" }
  ];

  const [uid, setUid] = useState(null)
  const [sid, setSid] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getOrCreateUserId();
    const sessionId = getOrCreateSessionId();
    setUid(userId);
    setSid(sessionId);
  }, []);

  // console.log({ value: form.watch(), errors });

  return (
    <>
    <div className="max-w-[768px] mx-auto lg:my-[20px] h-[100vh] lg:h-[95vh] font-medium bg-white p-10 rounded-xl relative overflow-scroll">
      <div onClick={handleCloseFormModal} className="cursor-pointer absolute top-5 right-5 text-base w-7 h-7 border border-black rounded-full flex items-center justify-center">X</div>
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
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {destination.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
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
                    <input
                      type="number"
                      placeholder="Input your estimated budget?"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        const parsed = value === "" ? null : Number(value);
                        field.onChange(parsed);
                      }}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
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
                              "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white"
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
              <Button size={"lg"} variant={"formsubmit"} type="submit">
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
    <div className={`fixed top-0 right-0 bottom-0 left-0 bg-black/75 flex items-center justify-center ${loading ? '' : 'hidden'}`}>
        <span className="loading loading-spinner loading-xl text-white"></span>
    </div>
    </>
  );
};

export default FormPage;
