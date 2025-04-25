"use client";
import { districts, navbarItems } from "@/lib/navbar-items";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
  const { success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userData = getTokenData();
    setCurrentUser(userData);
  }, [success]);

  const isLoggedIn = currentUser !== null;

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
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-[#3D3BF3] text-white px-3 py-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Website Logo"
              width={50}
              height={50}
              className="w-12 h-10 sm:w-16 sm:h-12"
              priority
            />
          </Link>

          {/* User Menu */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-black/20 border-2 border-white flex items-center gap-1 text-white capitalize px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
                  <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{currentUser?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 sm:w-48">
                  <DropdownMenuLabel className="font-sans text-sm">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentUser.isAdmin && (
                    <Link href="/admin/dashboard">
                      <DropdownMenuItem className="border-2 rounded cursor-pointer text-sm">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuItem
                    className="bg-red-500 text-white mt-2 rounded cursor-pointer text-sm"
                    onClick={removeTokenCookie}
                  >
                    లాగ్ అవుట్
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="bg-blue-50 text-black px-2 py-1 rounded-md text-xs sm:text-sm flex items-center"
              >
                లాగిన్
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Items and District Selector */}
        <div className="container mx-auto mt-2">
          <div className="flex items-center justify-between overflow-x-auto whitespace-nowrap">
            <ul className="flex items-center gap-2 sm:gap-4">
              {navbarItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="font-Gidugu text-base sm:text-lg tracking-wide hover:bg-gray-50 hover:text-gray-400 transition duration-300 ease-in-out block py-1 px-2"
                  >
                    {item.name}
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
                    className="w-[100px] sm:w-[120px] bg-transparent text-white flex items-center justify-between font-Gidugu text-base sm:text-lg border-white py-1 h-8 sm:h-9"
                  >
                    {value
                      ? districts.find((framework) => framework.value === value)
                          ?.label
                      : "జిల్లాలు"}
                    <ChevronsUpDown className="w-3 h-3 sm:w-4 sm:h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] sm:w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="జిల్లా పేరు...."
                      className="h-8 text-base font-Gidugu"
                    />
                    <CommandList className="text-base font-Gidugu">
                      <CommandEmpty className="text-sm p-2 text-center">
                        దయచేసి మళ్లీ ప్రయత్నించండి
                      </CommandEmpty>
                      <CommandGroup className="text-base">
                        {districts.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={handleDistrictSelect}
                            className="text-base"
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