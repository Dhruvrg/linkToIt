import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">LinkToIt</h3>
            <p className="text-sm text-primary-foreground/70">
              Your all-in-one link engagement solution for optimizing your
              online presence.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <FiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <FiTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <FiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <FiLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/70 hover:text-primary-foreground"
              >
                <FiGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Stay updated with the latest features and releases.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/70">
            &copy; 2024 LinkToIt. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
