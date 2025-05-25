"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Validation schema using Zod
const formSchema = z.object({
  // Text inputs
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),

  // Number inputs
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Must be less than 120"),
  salary: z.number().min(0, "Salary must be positive"),
  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years"),

  // Date inputs
  birthDate: z.string().min(1, "Birth date is required"),
  startDate: z.string().min(1, "Start date is required"),

  // Select inputs
  country: z.string().min(1, "Please select a country"),
  position: z.string().min(1, "Please select a position"),
  department: z.string().min(1, "Please select a department"),

  // Textarea
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio cannot exceed 500 characters"),
  comments: z.string().optional(),

  // Checkbox inputs
  terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
  newsletter: z.boolean().optional(),
  marketing: z.boolean().optional(),

  // Radio inputs
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  employmentType: z.enum(["full-time", "part-time", "contract", "freelance"], {
    required_error: "Please select employment type",
  }),

  // Switch inputs
  notifications: z.boolean().optional(),
  publicProfile: z.boolean().optional(),
  twoFactorAuth: z.boolean().optional(),

  // Slider inputs
  skillLevel: z.array(z.number()).length(1),
  satisfaction: z.array(z.number()).length(1),

  // File input (we'll handle this separately)
  profilePicture: z.any().optional(),
  resume: z.any().optional(),
});

const FormsPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      website: "",
      age: 25,
      salary: 50000,
      experience: 2,
      birthDate: "",
      startDate: "",
      country: "",
      position: "",
      department: "",
      bio: "",
      comments: "",
      terms: false,
      newsletter: false,
      marketing: false,
      gender: undefined,
      employmentType: undefined,
      notifications: true,
      publicProfile: false,
      twoFactorAuth: false,
      skillLevel: [5],
      satisfaction: [7],
      profilePicture: null,
      resume: null,
    },
  });

  const onSubmit = (data) => {
    console.warn("Form Data:", data);
    console.warn("Form submitted successfully!");

    // Show success message
    alert("Form submitted successfully! Check the console for data.");
  };

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
  ];

  const positions = [
    { value: "developer", label: "Software Developer" },
    { value: "designer", label: "UI/UX Designer" },
    { value: "manager", label: "Project Manager" },
    { value: "analyst", label: "Business Analyst" },
    { value: "tester", label: "QA Tester" },
    { value: "devops", label: "DevOps Engineer" },
  ];

  const departments = [
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Comprehensive Form Example</h1>
        <p className="text-gray-600 mb-6">
          This form demonstrates all types of inputs with React Hook Form validation.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
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
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: Your personal or professional website
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Gender Radio Group */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio Textarea */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a brief description about yourself (10-500 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Professional Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Professional Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {positions.map((position) => (
                            <SelectItem key={position.value} value={position.value}>
                              {position.label}
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
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
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
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Employment Type Radio Group */}
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Employment Type *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full-time" id="full-time" />
                          <Label htmlFor="full-time">Full-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part-time" id="part-time" />
                          <Label htmlFor="part-time">Part-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="contract" id="contract" />
                          <Label htmlFor="contract">Contract</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="freelance" id="freelance" />
                          <Label htmlFor="freelance">Freelance</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Salary *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Annual salary in USD</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Preferences Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Preferences & Settings</h2>

              {/* Slider Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level: {field.value?.[0] || 5}/10</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>Rate your overall skill level</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="satisfaction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Satisfaction: {field.value?.[0] || 7}/10</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>Rate your current job satisfaction</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Switch Inputs */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email Notifications</FormLabel>
                        <FormDescription>
                          Receive email notifications about important updates
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publicProfile"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Public Profile</FormLabel>
                        <FormDescription>Make your profile visible to other users</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twoFactorAuth"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two-factor authentication for enhanced security
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Checkbox Inputs */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Subscribe to Newsletter</FormLabel>
                        <FormDescription>
                          Receive our weekly newsletter with updates and tips
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Marketing Communications</FormLabel>
                        <FormDescription>
                          Receive marketing emails about new features and offers
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept Terms and Conditions *</FormLabel>
                        <FormDescription>
                          You agree to our Terms of Service and Privacy Policy
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Comments */}
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional comments or information..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Any additional information you&apos;d like to share
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">File Uploads</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => form.setValue("profilePicture", e.target.files?.[0])}
                  />
                  <p className="text-sm text-gray-500">Upload a profile picture (JPG, PNG)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => form.setValue("resume", e.target.files?.[0])}
                  />
                  <p className="text-sm text-gray-500">Upload your resume (PDF, DOC, DOCX)</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset Form
              </Button>
              <Button type="submit">Submit Form</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormsPage;
