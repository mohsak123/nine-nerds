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
} from "@/components/ui/form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"

// Define form schema
const ContactSchema = z.object({
  username: z.string().min(1, "Name is required."),
  companyName: z.string().min(1, "Company is required."),
  email: z.string().email("Email is required."),
  phone: z.string().min(1, "Phone is required.")
    .regex(/^\d+$/, "Phone must only contain numbers"),
  description: z.string().min(1, "Description is required."),
})

interface FormProps {
  idService: number;
  setOpen: (open: boolean) => void;
}

const FormOrderServices = ({idService,setOpen}:FormProps) => {

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      username: "",
      companyName: "",
      email: "",
      phone: "",
      description: "",
    },
  })
    
  function onSubmit(data: z.infer<typeof ContactSchema>) {

    setIsSubmitting(true)

    const { username, companyName, email, phone, description } = data;
    
    const phoneNumber = Number(phone.replace(/^0/, ''));
  
    const apiData = {
      service_id: idService,
      name: username,
      email: email,
      phone: phoneNumber,
      description: description,
      company: companyName,
    };
  
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/forms/order_service`;
  
    axios.post(apiUrl, apiData)
      .then(() => {
        form.reset();
        setOpen(false);
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
          variant: "default",
          duration:5000,
          className:`!border-primaryGreen !text-hover`
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
        toast({
          title: `${error.response.data.error}`,
          description: `${error.response.data.message}`,
          variant: "destructive",
          duration:5000,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
      
    console.log(apiData)
  }

  type inputArrayProps ={
    type:string;
    placeholder:string;
    name: "email" | "username" | "description" | "companyName" | "phone";
  }

  const inputArray:inputArrayProps[] = [
    {type: "text", placeholder: "Enter Your Name",name:"username"},
    {type: "text", placeholder: "Enter Your Company Name",name:"companyName"},
    {type: "email", placeholder: "Enter Your Email",name:"email"},
    {type: "text", placeholder: "Enter Your Phone Number",name:"phone"}
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 lg:gap-8">
          {
            inputArray.map((inp,index) =>(

              <FormField
                key={index}
                control={form.control}
                name={inp.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="!text-[12px] lg:!text-[16px] h-[45px] placeholder:text-[#333] font-light
                        px-4 py-[15px] rounded-none border-[2px] border-[#333] bg-black relative z-10
                        hover:border-gradient-input focus:border-gradient-input"
                        {...field}
                        type={inp.type}
                        placeholder={inp.placeholder}
                      />
                      </FormControl>
                      <FormMessage className="!text-[11px] sm:!text-sm !mt-1" />
                  </FormItem>
                )}
              />
            ))
          }
        </div>

        <div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="write description of your project"
                    className="resize-none mt-6 sm:mt-4 lg:mt-6 !outline-none rounded-none placeholder:text-[#333]
                      border-[2px] border-[#333] h-[100px] font-light !text-[12px] lg:!text-[16px] relative z-10 bg-black
                      hover:border-gradient-input focus:border-gradient-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!text-[11px] sm:!text-sm !mt-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="secondary"
            className="w-[200px] sm:w-[250px] md:w-[373px] h-[50px] text-[14px] md:text-[18px] font-bold rounded-none
            !bg-transparent text-hover border-hover border hover:bg-transparent transition-all duration-300 
            hover:shadow-[0px_0px_10px_2px_var(--hover)] mt-4 lg:mt-8">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default FormOrderServices