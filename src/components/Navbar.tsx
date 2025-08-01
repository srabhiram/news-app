"use client";
import { districts, navbarItems } from "@/lib/navbar-items";
import Link from "next/link";
import React, {  useState } from "react";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/features/users/authSlice";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";

// Define the type for currentUser
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
interface userDataProps {
  userData: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null;
}
function Navbar({ userData }: userDataProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isDarkMode, toggleDarkMode } = useTheme();

// useEffect(() => {
//   setCurrentUser(userData);
// }, [signin.success, signout.success]);


  const removeTokenCookie = async () => {
    await dispatch(logoutUser());
    await router.push("/login");
    await router.refresh()
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
    <nav className="sticky top-0 z-50 shadow-sm bg-blue-100/30 backdrop-blur-md text-zinc-900 dark:bg-zinc-950/50 dark:border-b-2 rounded-b-md dark:text-white">
      <div className=" px-0.5 lg:px-4 py-3 mx-1">
        <div className="container mx-auto flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 ml-1">
            <Image
              src="/images/logo.png"
              alt="SRS News"
              width={100}
              height={50}
              style={{ height: "auto", width: 95 }}
              
            />
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Button
              onClick={toggleDarkMode}
              className="border-zinc-400 rounded-lg bg-transparent dark:bg-transparent hover:backdrop-blur-xl hover:text-zinc-950  hover:bg-zinc-200 dark:hover:text-white text-xs sm:text-sm px-2 sm:px-3 py-1 transition-all duration-30"
              variant={"outline"}
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </Button>

            {userData?.isAdmin && (
              <Link href="/admin/dashboard">
                <Button
                  variant="outline"
                  className="border-zinc-400 active:border-zinc-400 hover:border-zinc-400 rounded-lg dark:bg-transparent bg-transparent text-zinc-800 dark:text-white dark:hover:bg-white hover:bg-white hover:text-zinc-950 text-xs sm:text-sm px-2 sm:px-3 py-1 transition-all duration-300 flex items-center gap-1"
                >
                  <TfiWrite className="w-3 h-2" />
                  <span className="hidden sm:inline-block">Dashboard</span>
                </Button>
              </Link>
            )}
            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-transparent border border-zinc-400 active:border-zinc-400 hover:border-zinc-400 flex items-center gap-1 text-zinc-900 dark:text-white capitalize px-3 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-white hover:text-zinc-950 transition-all duration-300">
                  <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{userData?.name}</span>
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
                className="bg-transparent border border-zinc-500 text-zinc-800 dark:text-white font-semibold px-3 sm:px-3 py-2 rounded-lg text-sm sm:text-sm hover:bg-white hover:text-blue-800 transition-all duration-300"
              >
                లాగిన్
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Items and District Selector */}
        <div className="container mx-auto mt-3">
          <div className="flex items-center justify-between overflow-x-hidden whitespace-nowrap max-sm:mx-2">
            <ul className="flex items-center gap-2 sm:gap-5">
              {navbarItems.map((item) => (
                <li key={item?.id}>
                  <Link
                    href={item?.href}
                    className=" text-base lg:text-lg tracking-wide rounded-lg hover:bg-zinc-950/5 active:bg-zinc-950/5   hover:text-zinc-950 transition-all duration-300 block px-2 sm:px-3 py-1.5 dark:hover:text-white dark:hover:bg-white/5 font-semibold"
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
                    className="w-[90px] sm:w-[120px] lg:w-[150px] bg-transparent dark:text-white text-zinc-900 flex items-center justify-between  text-sm lg:text-lg border-zinc-400  py-1 h-8 lg:h-9 rounded-lg hover:bg-white hover:text-zinc-950 transition-all duration-300 dark:hover:bg-white dark:bg-transparent font-semibold"
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
                      className="h-8 text-sm "
                    />
                    <CommandList className="text-sm lg:text-base">
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
