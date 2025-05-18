"use client";
import { districts, navbarItems } from "@/lib/navbar-items";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Moon, Sun } from "lucide-react";
import { TfiWrite } from "react-icons/tfi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { getTokenData } from "@/helpers/getTokenData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resetAuthState } from "@/redux/features/users/authSlice";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { Switch } from "./ui/switch";

// Define the type for currentUser
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const { success } = useSelector((state: RootState) => state.auth.signin);
  const dispatch = useDispatch<AppDispatch>();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme && theme === "dark") {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark"); // ensure light is default
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const userData = getTokenData();
    setCurrentUser(userData);
  }, [success]);

  const isLoggedIn = currentUser ? currentUser : null;

  const removeTokenCookie = async () => {
    document.cookie =
      "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await dispatch(resetAuthState());
    await router.push("/login");
  };

  const handleDistrictSelect = (currentValue: string) => {
    const selected = currentValue === value ? "" : currentValue;
    setValue(selected);
    setOpen(false);
    if (selected) {
      router.push(`/districts/${selected}`);
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 shadow-md ">
      <div className="bg-blue-800 text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Website Logo"
              width={110}
              height={40}
              style={{ height: "auto", width: "auto" }}
              priority
            />
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Switch
            onCheckedChange={toggleDarkMode}
              className="data-[state=checked]:bg-black/40 data-[state=unchecked]:bg-blue-600"
              checkedIcon={<Moon size={12} className="text-blue-200" />}
              uncheckedIcon={<Sun size={12} className="text-orange-400" />}
            />
            {currentUser?.isAdmin && (
              <Link href="/admin/dashboard">
                <Button
                  variant="outline"
                  className="border border-white rounded-lg dark:bg-transparent bg-transparent text-white dark:hover:bg-white hover:bg-white hover:text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 transition-all duration-300 flex items-center gap-1"
                >
                  <TfiWrite className="w-3 h-2" />
                  <span className="hidden sm:inline-block">Dashboard</span>
                </Button>
              </Link>
            )}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-transparent border border-white flex items-center gap-1 text-white capitalize px-3 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300">
                  <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{currentUser?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 sm:w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                  <DropdownMenuLabel className="font-sans text-sm text-gray-900 dark:text-gray-200">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="hover:bg-red-600 hover:text-white text-gray-900 dark:text-gray-200 mt-2 rounded cursor-pointer text-sm font-sans font-semibold"
                    onClick={removeTokenCookie}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="bg-transparent border border-white text-white font-semibold px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-white hover:text-blue-800 transition-all duration-300"
              >
                లాగిన్
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Items and District Selector */}
        <div className="container mx-auto mt-3">
          <div className="flex items-center justify-between overflow-x-hidden whitespace-nowrap">
            <ul className="flex items-center gap-3 sm:gap-5">
              {navbarItems.map((item) => (
                <li key={item?.id}>
                  <Link
                    href={item?.href}
                    className="font-Gidugu text-sm sm:text-base lg:text-lg tracking-wide rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300 block px-3 py-1.5"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[90px] sm:w-[120px] lg:w-[150px] bg-transparent text-white flex items-center justify-between font-Gidugu text-sm lg:text-lg border-white py-1 h-8 lg:h-9 rounded-lg hover:bg-white hover:text-blue-800 transition-all duration-300 dark:hover:bg-white dark:bg-transparent"
                  >
                    {value
                      ? districts.find((framework) => framework.value === value)
                          ?.label
                      : "జిల్లాలు"}
                    <ChevronsUpDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] sm:w-[180px] lg:w-[200px] p-0 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                  <Command className="dark:bg-zinc-700 dark:text-zinc-200">
                    <CommandInput
                      placeholder="జిల్లా పేరు...."
                      className="h-8 text-sm font-Gidugu"
                    />
                    <CommandList className="text-sm lg:text-base font-Gidugu">
                      <CommandEmpty className="text-sm p-2 text-center text-zinc-500 dark:text-zinc-400">
                        దయచేసి మళ్లీ ప్రయత్నించండి
                      </CommandEmpty>
                      <CommandGroup className="text-sm lg:text-base">
                        {districts.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={handleDistrictSelect}
                            className="text-sm lg:text-base text-gray-900 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-gray-200"
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto w-4 h-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Navbar);
