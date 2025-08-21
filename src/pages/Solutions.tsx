import { ArrowRight, CheckCircle, Zap, Shield, Users, BarChart3, Globe, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "AI-Powered Development",
    description: "Accelerate your development lifecycle with intelligent automation and smart code generation.",
    features: ["Automated Code Generation", "Smart Testing", "Performance Optimization", "Code Review Assistance"],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    navigate:'/solutions/ai-powered-devlopement'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Comprehensive security solutions built for modern enterprises with zero-trust architecture.",
    features: ["Zero-Trust Security", "Advanced Encryption", "Compliance Automation", "Threat Detection"],
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    navigate:'/solutions/enterprise-security'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Collaboration",
    description: "Streamline team workflows with integrated collaboration tools and real-time synchronization.",
    features: ["Real-time Collaboration", "Project Management", "Team Analytics", "Integration Hub"],
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50",
    navigate:'/solutions/team-collaboration'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Analytics & Insights",
    description: "Transform your data into actionable insights with advanced analytics and visualization.",
    features: ["Real-time Analytics", "Custom Dashboards", "Predictive Modeling", "Data Visualization"],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    navigate:'/solutions/analytics-insights'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Infrastructure",
    description: "Scale globally with our distributed infrastructure and edge computing capabilities.",
    features: ["Edge Computing", "Global CDN", "Auto-scaling", "99.99% Uptime"],
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
       navigate:'/solutions/global-infrastructure'

  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Rapid Deployment",
    description: "Deploy faster with our automated CI/CD pipelines and containerized deployment solutions.",
    features: ["One-click Deployment", "Auto CI/CD", "Container Orchestration", "Environment Management"],
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
        navigate:'/solutions/rapid-devlopement'

  }
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 border-blue-200">
            Solutions
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Powerful Solutions for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your business with our comprehensive suite of AI-powered solutions designed to accelerate growth, 
            enhance security, and streamline operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Explore Solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${solution.bgGradient}`}>
                <CardHeader className="pb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${solution.gradient} text-white mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    {solution.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full mt-6 group-hover:bg-white/50 transition-colors duration-300">
                    {/* <a href={`${solution.navigate}`} >Learn More</a> */}
                    <Link to={`${solution.navigate}`}>Learn More</Link>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our solutions to drive innovation and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/contact">Contact Sales</Link> 
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}