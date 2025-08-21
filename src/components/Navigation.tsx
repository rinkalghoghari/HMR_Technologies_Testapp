import * as React from "react"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Brain,
  Target,
  Trophy,
  ShoppingCart,
  Utensils,
  Smartphone,
  Heart,
  Car,
  Shield,
  Users,
  BarChart3,
  Building2,
  Stethoscope,
  GraduationCap,
} from "lucide-react";
import Logo from "./Logo";
import { Button } from "../components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    {
      name: "Company",
      dropdown: true,
      items: [
        { name: "Contact Us", path: "/contact" },
        { name: "About Us", path: "/about" },
        { name: "FAQ", path: "/faq" },
        { name: "Careers", path: "/careers" },
      ],
    },
    {
      name: "Solutions",
      dropdown: true,
      icon: Brain,
      items: [
        { name: "Use Cases", path: "/use-cases" },
        { name: "Case Studies", path: "/case-studies" },
      ],
      sections: [
        {
          title: "Solutions",
          description: "AI-powered development solutions",
          icon: Brain,
          items: [
            {
              name: "AI-Powered Development",
              path: "/solutions/ai-powered-devlopement",
              icon: Brain,
              description: "Accelerate development with AI assistance",
            },
            {
              name: "Enterprise Security",
              path: "/solutions/enterprise-security",
              icon: Shield,
              description: "Enterprise-grade security solutions",
            },
            {
              name: "Team Collaboration",
              path: "/solutions/team-collaboration",
              icon: Users,
              description: "Enhanced team productivity tools",
            },
            {
              name: "Analytics & Insights",
              path: "/solutions/analytics-insights",
              icon: BarChart3,
              description: "Data-driven business insights",
            },
            
          ],
        },
        {
          title: "Use Cases",
          description: "Industry-specific applications",
          icon: Target,
          items: [
            {
              name: "Enterprise Solutions",
              path: "/use-cases/enterprise-solution",
              icon: Building2,
              description: "Large-scale enterprise implementations",
            },
            {
              name: "E-commerce Platforms",
              path: "/use-cases/ecommerce-platforms",
              icon: ShoppingCart,
              description: "Online marketplace solutions",
            },
            {
              name: "Healthcare Systems",
              path: "/use-cases/healthcare-system",
              icon: Stethoscope,
              description: "Healthcare management systems",
            },
            {
              name: "Education Technology",
              path: "/use-cases/education-technology",
              icon: GraduationCap,
              description: "Educational technology platforms",
            },
          ],
        },
        {
          title: "Success Stories",
          description: "Real customer success stories",
          icon: Trophy,
          items: [
            {
              name: "E-commerce Marketplace",
              path: "/success-stories/e-commerce",
              icon: ShoppingCart,
              description: "185% revenue growth with AI recommendations",
            },
            {
              name: "Food Delivery Application",
              path: "/success-stories/food-delivery",
              icon: Utensils,
              description: "300% order volume increase in 6 months",
            },
            {
              name: "On-Demand Application",
              path: "/success-stories/on-demand",
              icon: Smartphone,
              description: "500% service request growth platform",
            },
            {
              name: "Dating Application",
              path: "/success-stories/dating",
              icon: Heart,
              description: "15M+ matches with AI compatibility",
            },
            {
              name: "Taxi Booking Application",
              path: "/success-stories/taxi-booking",
              icon: Car,
              description: "25K+ daily rides, 2-minute wait times",
            },
          ],
        },
      ],
    },
    { name: "Blog", path: "/blog" },
  ];

  const isActive = (path: string) => {
    if (path === "/services") {
      return (
        location.pathname === path || location.pathname.startsWith("/services/")
      );
    }
    return location.pathname === path;
  };

  const isDropdownActive = (item: any) => {
    if (item.items) {
      return item.items.some((subItem: any) => isActive(subItem.path));
    }
    if (item.sections) {
      return item.sections.some((section: any) =>
        section.items.some((subItem: any) => isActive(subItem.path)),
      );
    }
    return false;
  };

  useEffect(() => {
    const scriptUrl =
      "https://calendar.google.com/calendar/scheduling-button-script.js";

    const isScriptLoaded = () =>
      typeof window !== "undefined" && !!window.calendar;

    const loadCalendarButton = () => {
      const scriptTags = document.querySelectorAll(
        "script[data-gcal-scheduling]",
      );
      const target = scriptTags[0] || null;

      if (target && window.calendar && window.calendar.schedulingButton) {
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0p33jE1HcESBflV5jJu7bvb8ryT3HW5soW2JIAcu8qYSgzT5EblRdcZ92vQsfUeWsnTKqNH3p0?gv=true",
          color: "#039BE5",
          label: "Book A Meeting",
          target,
        });
      }
    };

    // If already loaded
    if (isScriptLoaded()) {
      loadCalendarButton();
    } else {
      // Check if script already exists in DOM
      const existingScript = document.querySelector(
        `script[src="${scriptUrl}"]`,
      );

      if (!existingScript) {
        // Add the script
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        script.setAttribute("data-gcal-scheduling", "true");
        document.body.appendChild(script);

        // Once script is loaded
        script.onload = () => {
          loadCalendarButton();
        };
      } else {
        // Wait for script to finish loading
        existingScript.addEventListener("load", loadCalendarButton);
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center group">
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <Logo className="h-12" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 text-base lg:text-lg font-medium transition-all duration-300 hover:text-primary group ${
                        isDropdownActive(item)
                          ? "text-primary font-semibold"
                          : "text-gray-700"
                      }`}
                      onMouseEnter={() => {
                        if (item.name === "Company") setCompanyDropdown(true);
                        if (item.name === "Solutions")
                          setSolutionsDropdown(true);
                      }}
                      onMouseLeave={() => {
                        if (item.name === "Company")
                          setTimeout(() => setCompanyDropdown(false), 0);
                        if (item.name === "Solutions")
                          setTimeout(() => setSolutionsDropdown(false), 0);
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (item.name === "Company" && companyDropdown) ||
                          (item.name === "Solutions" && solutionsDropdown)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 ${
                        item.name === "Solutions" && false
                          ? "w-[600px] max-w-[90vw]"
                          : "w-64"
                      } bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 ${
                        (item.name === "Company" && companyDropdown) ||
                        (item.name === "Solutions" && solutionsDropdown)
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-2 invisible"
                      }`}
                      onMouseEnter={() => {
                        if (item.name === "Company") setCompanyDropdown(true);
                        if (item.name === "Solutions")
                          setSolutionsDropdown(true);
                      }}
                      onMouseLeave={() => {
                        if (item.name === "Company") setCompanyDropdown(false);
                        if (item.name === "Solutions")
                          setSolutionsDropdown(false);
                      }}
                    >
                      {/* Enhanced Multi-Section Dropdown */}
                      {item.name === "Solutions" && false ? (
                        <div className="p-6 lg:p-8">
                          {/* Three Column Layout - Responsive */}
                          <div className="grid">
                            {(item as any).sections.map(
                              (section: any, sectionIndex: number) => (
                                <div
                                  key={section.title}
                                  className="space-y-2 pb-6"
                                >
                                  {/* Section Main Title (Clickable Link) */}
                                  <div className="flex justify-between items-start">
                                    <Link
                                      to={
                                        section.title === "Solutions"
                                          ? "/solutions"
                                          : section.title === "Use Cases"
                                            ? "/use-cases"
                                            : "/success-stories"
                                      }
                                      className="group block mb-4"
                                    >
                                      <div className="flex items-center space-x-3 mb-2">
                                        {React.createElement(section.icon, {
                                          className:
                                            "w-6 h-6 lg:w-7 lg:h-7 text-primary",
                                        })}
                                        <h4 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                                          {section.title}
                                        </h4>
                                      </div>
                                      <p className="text-sm lg:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                                        {section.description}
                                      </p>
                                    </Link>
                                    {/* View More Link */}
                                    <div className="text-right">
                                      <Link
                                        to={
                                          section.title === "Solutions"
                                            ? "/solutions"
                                            : section.title === "Use Cases"
                                              ? "/use-cases"
                                              : "/success-stories"
                                        }
                                        className="inline-flex items-center text-sm lg:text-base font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                                      >
                                        View More
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                      </Link>
                                    </div>
                                  </div>

                                  {/* 2x2 Grid Layout for Items */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {section.items
                                      .slice(0, 4)
                                      .map((subItem: any, index: number) => (
                                        <Link
                                          key={subItem.path}
                                          to={subItem.path}
                                          className="group block rounded-lg transition-all duration-200 hover:bg-primary/5 hover:shadow-sm"
                                          style={{
                                            animationDelay: `${(sectionIndex * 4 + index) * 30}ms`,
                                          }}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-200">
                                              {React.createElement(
                                                subItem.icon,
                                                {
                                                  className:
                                                    "w-4 h-4 lg:w-5 lg:h-5 text-black",
                                                },
                                              )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <h5 className="text-sm lg:text-base font-medium text-gray-900 hover:text-primary transition-colors duration-200">
                                                {subItem.name}
                                              </h5>
                                            </div>
                                          </div>
                                        </Link>
                                      ))}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Simple dropdown for Company */
                        <div className="py-2">
                          {(item as any).items?.map(
                            (subItem: any, index: number) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block px-4 py-3 text-sm lg:text-base font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary hover:translate-x-1 ${
                                  isActive(subItem.path)
                                    ? "text-primary bg-primary/5 border-r-2 border-primary"
                                    : "text-gray-700"
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                {subItem.name}
                              </Link>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item?.path ?? "#"}
                    className={`relative text-base lg:text-lg font-medium transition-all duration-300 hover:text-primary group ${
                      item.path && isActive(item.path)
                        ? "text-primary font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div
                      className={`absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform transition-all duration-300 ${
                        item.path && isActive(item.path)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-75"
                      }`}
                    />
                  </Link>
                )}
              </div>
            ))}

            <div className="flex items-center space-x-4 ml-6">
              <Button
                variant="outline"
                asChild
                className="px-6 py-2 text-sm font-medium border-2 hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-md"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
              <script data-gcal-scheduling></script>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </div>
              <div
                className={`absolute inset-0 transform transition-transform duration-300 ${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                }`}
              >
                <X className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100 pb-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-4 space-y-2">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.dropdown ? (
                  <div className="space-y-2">
                    <button
                      className={`flex items-center justify-between w-full px-4 py-3 text-left text-base font-medium rounded-lg transition-all duration-300 ${
                        isDropdownActive(item)
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 hover:text-primary hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        if (item.name === "Company")
                          setCompanyDropdown(!companyDropdown);
                        if (item.name === "Solutions")
                          setSolutionsDropdown(!solutionsDropdown);
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (item.name === "Company" && companyDropdown) ||
                          (item.name === "Solutions" && solutionsDropdown)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`ml-4 space-y-1 transform transition-all duration-300 ${
                        (item.name === "Company" && companyDropdown) ||
                        (item.name === "Solutions" && solutionsDropdown)
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      {/* Mobile dropdown content */}
                      {item.name === "Solutions" ? (
                        <div className="space-y-4">
                          {(item as any).sections.map(
                            (section: any, sectionIndex: number) => (
                              <div key={section.title} className="space-y-2">
                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4">
                                  {section.title}
                                </h5>
                                {section.items.map(
                                  (subItem: any, subIndex: number) => (
                                    <Link
                                      key={subItem.path}
                                      to={subItem.path}
                                      className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                        isActive(subItem.path)
                                          ? "text-primary bg-primary/10"
                                          : "text-gray-600 hover:text-primary hover:bg-gray-50"
                                      }`}
                                      style={{
                                        animationDelay: `${(sectionIndex * section.items.length + subIndex) * 30}ms`,
                                      }}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setCompanyDropdown(false);
                                        setSolutionsDropdown(false);
                                      }}
                                    >
                                      <div className="w-6 h-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-md flex items-center justify-center">
                                        {React.createElement(subItem.icon, {
                                          className: "w-3 h-3 text-primary",
                                        })}
                                      </div>
                                      <span>{subItem.name}</span>
                                    </Link>
                                  ),
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        (item as any).items?.map(
                          (subItem: any, subIndex: number) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                isActive(subItem.path)
                                  ? "text-primary bg-primary/10"
                                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
                              }`}
                              style={{ animationDelay: `${subIndex * 50}ms` }}
                              onClick={() => {
                                setIsOpen(false);
                                setCompanyDropdown(false);
                                setSolutionsDropdown(false);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ),
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item?.path ?? "#"}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                      item.path && isActive(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-3">
              <Button
                variant="outline"
                asChild
                className="w-full justify-center py-3 text-base font-medium border-2 hover:border-primary hover:text-primary"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
