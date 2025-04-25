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
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // Define currentUser as User | null
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Set state type to User | null
  const router = useRouter();
  const { success } = useSelector((state: RootState) => state.auth);
  // Update currentUser whenever the token changes
  useEffect(() => {
    const userData = getTokenData();
    setCurrentUser(userData); // This will work now because currentUser can be User | null
  }, [success]);

  const isLoggedIn = currentUser !== null;
  const dispatch = useDispatch<AppDispatch>();
  // Function to remove the cookie
  const removeTokenCookie = async () => {
    document.cookie =
      "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await dispatch(resetAuthState());
    await router.push("/login"); // Redirect to login page after logout
  };

  const handleDistrictSelect = (currentValue: string) => {
    const selected = currentValue === value ? "" : currentValue;
    setValue(selected);
    setOpen(false);
    if (selected) {
      router.push(`/districts/${selected}`); // <-- your redirect path
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <ul className="bg-[#3D3BF3] text-white p-4">
        <div className="flex items-center justify-between space-x-4">
          <Link href="/" className="text-2xl font-bold font-sans shrink-0">
           <Image src={`/images/logo.png`} alt="logo" width={50} height={10} className="w-20 h-15 "/> 
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-black/20 border-2 border-white flex gap-2 items-center text-white   capitalize px-4 py-1 rounded-md font-semibold">
               <span><FaUser/></span> {currentUser?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-3 ">
                <DropdownMenuLabel className="font-sans">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currentUser.isAdmin && (
                  <Link href="/admin/dashboard" className="w-full">
                    <DropdownMenuItem className="border-2 rounded">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem
                  className="bg-red-500 text-white mt-2 rounded"
                  onClick={() => {
                    removeTokenCookie(); // Remove token cookie on logout
                  }}
                >
                  లాగ్ అవుట్
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="bg-blue-50 text-black px-3 py-1 rounded-md"
            >
              లాగిన్
            </Link>
          )}
        </div>
        <div className="flex items-center justify-between sm:mx-56 mt-4 mx-2">
          {navbarItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <li className="font-Gidugu text-xl tracking-wide hover:bg-gray-50 hover:text-gray-400 transition duration-300 ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[120px] bg-transparent text-white flex items-center justify-between font-Gidugu text-xl overflow-hidden"
              >
                {value
                  ? districts.find((framework) => framework.value === value)
                      ?.label
                  : "జిల్లాలు"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="జిల్లా పేరు...."
                  className="h-9 text-xl font-Gidugu"
                />
                <CommandList className="text-xl font-Gidugu">
                  <CommandEmpty className="text-lg p-2 text-center">
                    దయచేసి మళ్లీ ప్రయత్నించండి
                  </CommandEmpty>
                  <CommandGroup className="text-xl">
                    {districts.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={handleDistrictSelect}
                      >
                        {framework.label}
                        <Check
                          className={cn(
                            "ml-auto",
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
      </ul>
    </nav>
  );
}

export default React.memo(Navbar);
