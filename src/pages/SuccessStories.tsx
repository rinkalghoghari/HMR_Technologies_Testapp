import { ArrowRight, TrendingUp, Users, DollarSign, Clock, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const successStories = [
  {
    company: "TechFlow Solutions",
    logo: "TS",
    industry: "SaaS",
    challenge: "Legacy infrastructure limiting scalability",
    solution: "AI-powered cloud migration and optimization",
    results: {
      performance: "300% faster response times",
      cost: "60% reduction in infrastructure costs",
      scale: "10x increase in concurrent users"
    },
    testimonial: {
      quote: "HMR Technologies transformed our entire infrastructure. What used to take weeks now happens in hours. Our team can focus on innovation instead of maintenance.",
      author: "Sarah Chen",
      role: "CTO",
      avatar: "/api/placeholder/64/64"
    },
    metrics: [
      { icon: <TrendingUp className="w-5 h-5" />, label: "Revenue Growth", value: "150%" },
      { icon: <Users className="w-5 h-5" />, label: "User Base", value: "500K+" },
      { icon: <Clock className="w-5 h-5" />, label: "Time to Market", value: "75% faster" }
    ],
    image: "/api/placeholder/400/300",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    company: "RetailMax",
    logo: "RM",
    industry: "E-commerce",
    challenge: "Poor personalization and low conversion rates",
    solution: "AI-driven recommendation engine and analytics",
    results: {
      conversion: "85% increase in conversion rate",
      revenue: "120% boost in average order value",
      retention: "90% customer retention rate"
    },
    testimonial: {
      quote: "The AI recommendations completely changed our customer experience. Sales have never been better, and our customers are more engaged than ever.",
      author: "Michael Rodriguez",
      role: "Head of Digital",
      avatar: "/api/placeholder/64/64"
    },
    metrics: [
      { icon: <DollarSign className="w-5 h-5" />, label: "Revenue Increase", value: "$2.5M" },
      { icon: <Users className="w-5 h-5" />, label: "Active Customers", value: "250K+" },
      { icon: <TrendingUp className="w-5 h-5" />, label: "Conversion Rate", value: "12.8%" }
    ],
    image: "/api/placeholder/400/300",
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    company: "HealthConnect",
    logo: "HC",
    industry: "Healthcare",
    challenge: "Inefficient patient management and data silos",
    solution: "Integrated patient portal with AI diagnostics",
    results: {
      efficiency: "70% reduction in administrative tasks",
      satisfaction: "95% patient satisfaction score",
      accuracy: "40% improvement in diagnostic accuracy"
    },
    testimonial: {
      quote: "Our patients love the new platform, and our staff is more efficient than ever. The AI diagnostics have been a game-changer for our practice.",
      author: "Dr. Emily Watson",
      role: "Chief Medical Officer",
      avatar: "/api/placeholder/64/64"
    },
    metrics: [
      { icon: <Users className="w-5 h-5" />, label: "Patients Served", value: "50K+" },
      { icon: <Clock className="w-5 h-5" />, label: "Wait Time Reduction", value: "60%" },
      { icon: <TrendingUp className="w-5 h-5" />, label: "Efficiency Gain", value: "3.2x" }
    ],
    image: "/api/placeholder/400/300",
    gradient: "from-rose-600 to-pink-600"
  }
];

const companyLogos = [
  { name: "TechFlow", logo: "TF" },
  { name: "InnovateCorp", logo: "IC" },
  { name: "DataDyne", logo: "DD" },
  { name: "CloudScale", logo: "CS" },
  { name: "NextGen", logo: "NG" },
  { name: "SmartSys", logo: "SS" }
];

const overallMetrics = [
  { label: "Client Success Rate", value: "98%", description: "of clients achieve their goals within 6 months" },
  { label: "Average ROI", value: "340%", description: "return on investment within first year" },
  { label: "Customer Satisfaction", value: "4.9/5", description: "based on 500+ reviews" },
  { label: "Projects Delivered", value: "1,200+", description: "successful implementations" }
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-700 border-emerald-200">
            Success Stories
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Real Results from
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Real Customers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            See how leading companies across industries have transformed their businesses and achieved 
            remarkable growth with our solutions.
          </p>
          
          {/* Overall Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {overallMetrics.map((metric, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-600">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {successStories.map((story, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Story Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${story.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                      {story.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{story.company}</h3>
                      <Badge variant="outline" className="text-xs">
                        {story.industry}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-600">{story.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-600">{story.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {story.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${story.gradient} text-white`}>
                          {metric.icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-blue-50">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-emerald-500 mb-4" />
                    <blockquote className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                      "{story.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={story.testimonial.avatar} alt={story.testimonial.author} />
                        <AvatarFallback className="bg-emerald-500 text-white">
                          {story.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">{story.testimonial.author}</div>
                        <div className="text-sm text-gray-600">{story.testimonial.role}, {story.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Story Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${story.gradient} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <img
                    src={story.image}
                    alt={`${story.company} success story`}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            Trusted by Leading Companies
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold text-lg hover:from-emerald-100 hover:to-blue-100 hover:text-emerald-600 transition-all duration-300">
                  {company.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join the ranks of successful companies that have transformed their business with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-emerald-600 hover:bg-gray-100">
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}