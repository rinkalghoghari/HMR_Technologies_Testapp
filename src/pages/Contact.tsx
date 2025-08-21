import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { usePageTitle } from "../hooks/usePageTitle";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useRef, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export interface InsertContactSubmission{
  name: string,
  email: string,
  phone: string,
  company: string,
  projectType: string,
  budget: string,
  details: string,
}

declare global {
  interface Window {
    grecaptcha: any;
    calendar?: {
      schedulingButton: {
        load: (options: {
          url: string;
          color?: string;
          label?: string;
          target: any;
        }) => void;
      };
    };

  }
}

export default function Contact() {
  usePageTitle(
    "Contact Us",
    "Get in touch with HMR Technologies for your next AI-powered development project. Let's discuss how we can accelerate your goals.",
  );

  const { toast } = useToast();
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const form = useForm<InsertContactSubmission>({
    // resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      details: "",
    },
  });

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6LcEvXQrAAAAAAnfpPtr8uO8o1OBY0i4jFY-NPqk",
          callback: (token: string) => {
            setRecaptchaToken(token);
          },
          'expired-callback': () => {
            setRecaptchaToken("");
          }
        });
        setIsRecaptchaLoaded(true);
      }
    };

    if (window.grecaptcha) {
      loadRecaptcha();
    } else {
      const checkRecaptcha = setInterval(() => {
        if (window.grecaptcha) {
          loadRecaptcha();
          clearInterval(checkRecaptcha);
        }
      }, 100);
    }
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (
      data: InsertContactSubmission & { recaptchaToken: string },
    ) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        details: "",
      });
      setRecaptchaToken("");
      // Reset reCAPTCHA
      if (window.grecaptcha && isRecaptchaLoaded) {
        window.grecaptcha.reset();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      // Reset reCAPTCHA on error
      if (window.grecaptcha && isRecaptchaLoaded) {
        window.grecaptcha.reset();
      }
      setRecaptchaToken("");
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {


    if (!recaptchaToken) {
      toast({
        title: "reCAPTCHA required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate({
      ...data,
      recaptchaToken: recaptchaToken,
    });
  };

  return (
    <div className="page-transition">
      {/* Hero Section with Form */}
      <section className="bg-gradient-to-br from-gray-50 to-white lg:py-16 sm:py-12 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Hero Content */}
            <div className="space-y-8">
              <div className="mb-4">
                <Breadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" },
                  ]}
                />
              </div>
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
                  <span className="text-blue-600 font-medium text-sm">
                    ✨ Get In Touch
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Let's Build Something
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Amazing Together
                  </span>
                </h1>
                <p className="text-xl text-gray-600 sm:mb-8 mb-4 leading-relaxed">
                  Have a project in mind? We'd love to hear about it. Share your
                  vision with us and let's turn your ideas into reality with
                  cutting-edge technology and innovative solutions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-6 gap-3 pt-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Fast Response
                    </h3>
                    <p className="text-sm text-gray-600">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Tailored Solutions
                    </h3>
                    <p className="text-sm text-gray-600">
                      Custom solutions for your specific needs
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Expert Team
                    </h3>
                    <p className="text-sm text-gray-600">
                      Experienced developers and designers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div
              id="contact-form"
              className="bg-white rounded-2xl shadow-xl sm:p-8 p-4 border border-gray-100"
            >
              <div className="mb-8 text-center">
                <p className="text-gray-600 text-left text-[16px] font-normal">
                  Fill out the form below and we'll get back to you with a
                  personalized proposal for your project.
                </p>
              </div>

              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log("Validation errors", errors);
                })} className="space-y-6"
              >


                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name*
                    </label>
                    <Input
                      placeholder="Enter Your Name"
                      {...form.register("name")}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary h-12"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address*
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter Your Email Address"
                      {...form.register("email")}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary h-12"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>

                  <PhoneInput
                    country={'in'}
                    containerClass="w-full"
                    inputStyle={{
                      width: "100%",
                      height: '3rem',
                    }}
                    inputClass="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400
                    focus-visible:!outline-blue-200 focus-visible:!outline focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(phone:any) => form.setValue('phone', phone, { shouldValidate: true })}
                  />

                  {form.formState.errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>


                {/* Project type and Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Select 
                      value={form.watch("projectType")}
                      onValueChange={(value:any) =>
                        form.setValue("projectType", value, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger className="focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary h-12">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Web Development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="Mobile App Development">
                          Mobile App Development
                        </SelectItem>
                        <SelectItem value="UI/UX Design">
                          UI/UX Design
                        </SelectItem>
                        <SelectItem value="Custom Software">
                          Custom Software
                        </SelectItem>
                        <SelectItem value="QA Testing">QA Testing</SelectItem>
                        <SelectItem value="Talent Solutions">
                          Talent Solutions
                        </SelectItem>
                        <SelectItem value="AI Integration">
                          AI Integration
                        </SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.projectType && (
                      <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.projectType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <Select
                      value={form.watch("budget") || ""}
                      onValueChange={(value:any) => form.setValue("budget", value, { shouldValidate: true })}
                    >
                      <SelectTrigger className="focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary h-12">
                        <SelectValue placeholder="Select Budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10,000</SelectItem>
                        <SelectItem value="10k-25k">
                          $10,000 - $25,000
                        </SelectItem>
                        <SelectItem value="25k-50k">
                          $25,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k-100k">
                          $50,000 - $100,000
                        </SelectItem>
                        <SelectItem value="100k-250k">
                          $100,000 - $250,000
                        </SelectItem>
                        <SelectItem value="250k-plus">$250,000+</SelectItem>
                        <SelectItem value="discuss">Let's Discuss</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.budget && (
                      <p className="text-red-600 text-sm mt-1">
                        {form.formState.errors.budget.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={5}
                    placeholder="Enter Your Message"
                    {...form.register("details")}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-primary resize-none"
                  />

                </div>

                <div>
                  <div ref={recaptchaRef} className="mb-4"></div>
                  {!recaptchaToken && (
                    <p className="text-sm text-gray-500 mb-2">
                      Please complete the reCAPTCHA verification
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full !bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
                  disabled={contactMutation.isPending || !isRecaptchaLoaded || !recaptchaToken}
                >
                  {contactMutation.isPending ? "Submitting..." : "Submit"}
                </Button>

              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="lg:py-16 sm:py-12 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center sm:mb-12 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HMR Technologies?
            </h2>
            <p className="text-xl text-gray-600">
              We deliver exceptional results with AI-powered development
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-4">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Faster Development
                </h4>
                <p className="text-gray-600 text-sm">
                  Accelerated delivery without compromising quality
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">24h</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Response Time
                </h4>
                <p className="text-gray-600 text-sm">
                  Quick responses to your inquiries and needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Code Quality
                </h4>
                <p className="text-gray-600 text-sm">
                  Rigorous testing and review processes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Ongoing Support
                </h4>
                <p className="text-gray-600 text-sm">
                  Continuous maintenance and feature updates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* FAQ Preview */}
      <section className="lg:py-16 sm:py-12 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Got questions? We've got answers. Check out our comprehensive FAQ
            section.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  How fast can you deliver my project?
                </h4>
                <p className="text-gray-600 text-sm">
                  Most projects are completed 60-80% faster than traditional
                  development, with typical web apps finishing in 4-6 weeks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Do you ensure code quality?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes, all AI-generated code goes through rigorous human review,
                  testing, and follows established coding standards.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
