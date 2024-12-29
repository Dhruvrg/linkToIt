"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Link,
  Globe,
  Type,
  FileText,
  Tag,
  AtSign,
  Hash,
  Zap,
  Info,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { CreateLinkValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import {
  createLink,
  checkShortUrlAvailability,
} from "@/lib/actions/link.actions";

interface Props {
  projectId: string;
}

const CreateShortUrlForm: React.FC<Props> = ({ projectId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrlAvailability, setShortUrlAvailability] = useState<
    "available" | "taken" | null
  >(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateLinkValidation>>({
    resolver: zodResolver(CreateLinkValidation),
    defaultValues: {
      destination: "",
      title: "",
      description: "",
      shortUrl: "",
      utmMedium: "",
      utmCampaign: "",
      utmSource: "",
      utmTerm: "",
      utmContent: "",
    },
  });

  const shortUrl = form.watch("shortUrl");

  useEffect(() => {
    const checkAvailability = async () => {
      if (shortUrl && shortUrl.length > 2) {
        try {
          const isAvailable = await checkShortUrlAvailability(shortUrl);
          setShortUrlAvailability(isAvailable ? "available" : "taken");
        } catch (error) {
          console.error("Error checking short URL availability:", error);
          setShortUrlAvailability(null);
        }
      } else {
        setShortUrlAvailability(null);
      }
    };

    const debounceTimer = setTimeout(checkAvailability, 500);

    return () => clearTimeout(debounceTimer);
  }, [shortUrl]);

  const onSubmit = async (values: z.infer<typeof CreateLinkValidation>) => {
    setIsLoading(true);
    try {
      await createLink(values, projectId);
      toast.success("Short URL Created!");
      router.push(`/dashboard/${projectId}/links`);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-lg text-[#9b7bf7]">
                        <Globe className="mr-2 h-5 w-5" />
                        Destination URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                        />
                      </FormControl>
                      <FormDescription>
                        The original URL you want to shorten
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-lg text-[#9b7bf7]">
                        <Type className="mr-2 h-5 w-5" />
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a title for your link"
                          {...field}
                          className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-lg text-[#9b7bf7]">
                        <FileText className="mr-2 h-5 w-5" />
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Describe the purpose of this link"
                          className="resize-none bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Button
                  type="submit"
                  className="group h-min disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 ring-none rounded-lg shadow-lg font-bold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-violet-500 border-b-violet-700 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white border-b-4 hover:border-0 active:border-0 active:bg-violet-800 active:text-gray-300 focus-visible:outline-violet-500 sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900 w-full hover:bg-[#8a6ae6] text-white text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                  disabled={isLoading || shortUrlAvailability === "taken"}
                >
                  {isLoading ? "Creating..." : "Create Short URL"}
                </Button>
              </div>
            </div>

            {/* Second Column */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#9b7bf7] mb-2">
                UTM Parameters
              </h3>
              <FormField
                control={form.control}
                name="utmSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-[#9b7bf7]">
                      <AtSign className="mr-2 h-4 w-4" />
                      UTM Source
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., facebook, newsletter"
                        {...field}
                        className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmMedium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-[#9b7bf7]">
                      <Hash className="mr-2 h-4 w-4" />
                      UTM Medium
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., email, social"
                        {...field}
                        className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmCampaign"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-[#9b7bf7]">
                      <Zap className="mr-2 h-4 w-4" />
                      UTM Campaign
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., summer_sale"
                        {...field}
                        className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-[#9b7bf7]">
                      <Tag className="mr-2 h-4 w-4" />
                      UTM Term
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., running+shoes"
                        {...field}
                        className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="utmContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-[#9b7bf7]">
                      <FileText className="mr-2 h-4 w-4" />
                      UTM Content
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., logolink"
                        {...field}
                        className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Third Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <FormField
                  control={form.control}
                  name="shortUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-lg text-[#9b7bf7]">
                        <Tag className="mr-2 h-5 w-5" />
                        Short URL Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="e.g., my-awesome-link"
                            {...field}
                            className="bg-gray-200 rounded-2xl border-2 border-[#9b7bf7]/20 focus:border-[#9b7bf7] transition-colors text-gray-800 pr-10"
                          />
                          {shortUrlAvailability && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              {shortUrlAvailability === "available" ? (
                                <Check className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Choose a custom name for your short URL
                      </FormDescription>
                      {shortUrlAvailability && (
                        <p
                          className={`text-sm ${
                            shortUrlAvailability === "available"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {shortUrlAvailability === "available"
                            ? "This short URL is available!"
                            : "This URL is already in use. Try a different one."}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-[#9b7bf7] mb-2 flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  Short URL Preview
                </h3>
                <p className="text-gray-700 mb-2">
                  Your short URL will look like this:
                </p>
                <div className="bg-gray-200 p-3 rounded-2xl border border-[#9b7bf7]/20">
                  <span className="text-[#9b7bf7] font-medium">
                    https://linktoit.in/
                  </span>
                  <span className="font-bold text-gray-800">
                    {form.watch("shortUrl") || "your-custom-name"}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-[#9b7bf7] mb-1">
                  Tips for Effective Short URLs
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Keep it short and memorable</li>
                  <li>Use relevant keywords</li>
                  <li>Avoid special characters</li>
                  <li>Make it easy to type and share</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg visible md:hidden shadow-md p-6">
            <Button
              type="submit"
              className="w-full bg-[#9b7bf7] hover:bg-[#8a6ae6] text-white py-3 rounded-2xl text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              disabled={isLoading || shortUrlAvailability === "taken"}
            >
              <Link className="mr-2 h-5 w-5" />
              Create Short URL
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateShortUrlForm;
