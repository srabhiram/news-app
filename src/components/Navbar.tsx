"use client";
import { districts, navbarItems } from "@/lib/navbar-items";
import Link from "next/link";
import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resetAuthState } from "@/redux/features/users/authSlice";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { success, user } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = success && user !== null;
  return (
    <nav>
      <ul className=" bg-[#3D3BF3] text-white p-4">
        <div className="flex items-center justify-between space-x-4">
          <Link href="/" className="text-2xl font-bold font-sans">
            News
          </Link>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-gray-50 text-gray-950 capitalize px-4 py-1 rounded-md">
                {user?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="font-sans">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.isAdmin && (
                  <Link href="/admin" className="w-full">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem className="bg-red-300 px-3 py-1 rounded-md" onClick={()=>dispatch(resetAuthState())}>
                  లాగ్ అవుట్
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="bg-blue-50 text-black px-3 py-1 rounded-md">
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
                className="w-[150px] bg-gray-50 text-gray-900 border-0 justify-between font-Gidugu text-xl overflow-hidden"
              >
                {value
                  ? districts.find((framework) => framework.value === value)
                      ?.label
                  : "జిల్లాలు"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command className=" ">
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
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
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
