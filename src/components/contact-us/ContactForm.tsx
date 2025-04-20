"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import axios from "axios"
import { useToast } from "@/hooks/use-toast"


// Define form schema
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Email is required."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(1, "Message is required."),
})

const ContactForm = () => {

  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email:"",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof ContactSchema>) {
    setIsSubmitting(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/forms/contact_us`;

    axios.post(apiUrl,data)
    .then(() => {
      form.reset();
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
        variant: "default",
        duration:5000,
        className:`!border-primaryGreen !text-hover`
      });
    })
    .catch(error =>{
      toast({
        title: `${error.response.data.error}`,
        description: `${error.response.data.message}`,
        variant: "destructive",
        duration:5000,
      });
    })
    .finally(()=>{
      setIsSubmitting(false);
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[20px] xl:mt-[27px] space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-[100%] xl:w-[85%] h-[45px] bg-black placeholder:text-[#333] border-[2px]
                  border-[#333] rounded-none hover:border-gradient-input focus:border-gradient-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-[100%] xl:w-[85%] h-[45px] bg-black placeholder:text-[#333] border-[2px]
                  border-[#333] rounded-none hover:border-gradient-input focus:border-gradient-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subject Field */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Message Subject"
                  className="w-[100%] xl:w-[85%] h-[45px] bg-black placeholder:text-[#333] border-[2px]
                  border-[#333] rounded-none hover:border-gradient-input focus:border-gradient-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write Your Message"
                  className="resize-none rounded-none placeholder:text-[#333]
                  border-[2px] border-[#333] w-[100%] xl:w-[85%] h-[100px] font-light text-[12px]
                  bg-black hover:border-gradient-input focus:border-gradient-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-[100%] xl:w-[85%] h-[50px] text-[14px] md:text-[18px] font-bold rounded-none
          !bg-transparent text-hover border-hover border hover:bg-transparent transition-all duration-300 
          hover:shadow-[0px_0px_10px_2px_var(--hover)]"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
