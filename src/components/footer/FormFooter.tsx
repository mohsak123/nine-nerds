/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useToast } from "@/hooks/use-toast"
import axios from "axios"

const ContactSchema = z.object({
  FullName: z.string().min(1, "Full Name is required."),
  Email: z.string().email("Email is required."),
  PhoneNumber: z.string().min(1, "Phone Number is required.")
    .regex(/^\d+$/, "Phone Number must only contain numbers"),
  Position: z.string().min(1, "Position is required."),
  PortfolioLinks: z.string().optional(),
  CV: z.any().refine(file => file instanceof File && file.type === "application/pdf", {
    message: "The CV File field must be a file of type: pdf",
  }),
  AboutYou: z.string().optional(),
})

const positionOptions = [
  { label: "Graphic Designer", value: "graphic_designer" },
  { label: "3D Designer", value: "three_d_designer" },
  { label: "UI/UX", value: "ui_ux_designer" },
  { label: "Motion Graphics Designer", value: "motion_graphics_designer" },
  { label: "Concept Artist", value: "concept_artist" },
  { label: "Logo Designer", value: "logo_designer" },
  { label: "Social Media Designer", value: "social_media_designer" },
  { label: "Web Developer", value: "web_developer" },
  { label: "React / Next.js", value: "react_next_developer" },
  { label: "Frontend Developer", value: "frontend_developer" },
  { label: "Backend Developer", value: "backend_developer" },
  { label: "WordPress Developer", value: "wordpress_developer" },
  { label: "Software Engineer", value: "software_engineer" },
  { label: "Photographer", value: "photographer" },
  { label: "Video Grapher", value: "videographer" },
  { label: "Video Editor", value: "video_editor" },
  { label: "Content Writer", value: "content_writer" },
  { label: "Social Media Manager", value: "social_media_manager" },
  { label: "SEO", value: "seo_specialist" },
  { label: "Meta, Google Ads", value: "ads_specialist" },
  { label: "Marketing Analyst", value: "marketing_analyst" },
  { label: "Interior Architect", value: "interior_architect" },
  { label: "Exhibition Supervisor", value: "exhibition_supervisor" },
  { label: "Print Technician", value: "print_technician" },
  { label: "Logistics Supervisor", value: "logistics_supervisor" },
  { label: "Sales Representative", value: "sales_representative" },
  { label: "PR Manager", value: "pr_manager" },
  { label: "Project Coordinator", value: "project_coordinator" },
  { label: "Executive Secretary", value: "executive_secretary" },
  { label: "Design Trainer", value: "design_trainer" },
  { label: "Digital Marketing Trainer", value: "digital_marketing_trainer" },
  { label: "Intern", value: "intern" },
  { label: "Freelancer", value: "freelancer" },
]

type inputArrayProps = {
  type: string;
  placeholder: string;
  name: "FullName" | "Email" | "PhoneNumber" | "PortfolioLinks";
}

const FormFooter = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      FullName: "",
      Email: "",
      PhoneNumber: "",
      Position: "",
      PortfolioLinks: "",
      CV: undefined,
      AboutYou: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("full_name", data.FullName)
    formData.append("email", data.Email)
    formData.append("phone", data.PhoneNumber.replace(/^0/, ''))
    formData.append("position", data.Position)
    formData.append("portfolio_links", data.PortfolioLinks ?? "")
    formData.append("cv_file", data.CV)
    formData.append("about_you", data.AboutYou ?? "")

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/forms/join_us`
      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      form.reset()
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
        variant: "default",
        duration: 5000,
        className: `!border-primaryGreen !text-hover`,
      })
    } catch (error:any) {
      console.log("Error:", error)
      toast({
        title: `${error.response.data.error}`,
          description: `${error.response.data.message}`,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputArray: inputArrayProps[] = [
    { type: "text", placeholder: "Enter Your Name", name: "FullName" },
    { type: "email", placeholder: "Enter Your Email", name: "Email" },
    { type: "text", placeholder: "Enter Your Phone Number", name: "PhoneNumber" },
    { type: "text", placeholder: "Enter Your Portfolio Links", name: "PortfolioLinks" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 lg:gap-8">
          {inputArray.map((inp, index) => (
            <FormField
              key={index}
              control={form.control}
              name={inp.name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={inp.type}
                      placeholder={inp.placeholder}
                      className="!text-[12px] lg:!text-[16px] h-[45px] placeholder:text-[#333] font-light px-4 py-[15px] rounded-none border-[2px] border-[#333] bg-black relative z-10 hover:border-gradient-input focus:border-gradient-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="!text-[11px] sm:!text-sm !mt-1" />
                </FormItem>
              )}
            />
          ))}

          {/* File Input for CV */}
          <FormField
            control={form.control}
            name="CV"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    className="!text-[12px] lg:!text-[16px] h-[45px] font-light px-4 py-[15px] rounded-none border-[2px] border-[#333] bg-black relative z-10 hover:border-gradient-input focus:border-gradient-input
                      before:!m-[-5px]
                    "
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage className="!text-[11px] sm:!text-sm !mt-1" />
              </FormItem>
            )}
          />

          {/* Position Select */}
          <FormField
            control={form.control}
            name="Position"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="!text-[12px] lg:!text-[16px] h-[45px] font-light px-4 
                      py-[15px] rounded-none border-[2px] border-[#333] bg-black relative z-10 
                      hover:border-gradient-input focus:border-gradient-input">
                      <SelectValue placeholder="Select Your Position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black border-[2px] border-[#333] rounded-none">
                    {positionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} 
                        className="hover:bg-[#333] focus:bg-[#333] text-hover focus:!text-hover">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="!text-[11px] sm:!text-sm !mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* AboutYou Textarea */}
        <div>
          <FormField
            control={form.control}
            name="AboutYou"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write something about you"
                    className="resize-none mt-6 !outline-none rounded-none placeholder:text-[#333] border-[2px] border-[#333] h-[100px] font-light !text-[12px] lg:!text-[16px] relative z-10 bg-black hover:border-gradient-input focus:border-gradient-input"
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
            className="w-[200px] sm:w-[250px] md:w-[373px] h-[50px] text-[14px] md:text-[18px] font-bold rounded-none !bg-transparent text-hover border-hover border hover:bg-transparent transition-all duration-300 hover:shadow-[0px_0px_10px_2px_var(--hover)] mt-8"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormFooter
