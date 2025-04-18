"use client";
import { districts, navbarItems } from "@/lib/navbar-items";
import Link from "next/link";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <nav>
      <ul className=" bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between space-x-4">
          <li className="text-2xl font-bold font-sans">News</li>
          <Link href="/login" className="font-Gidugu font-bold text-xl text-center bg-gray-50 text-gray-800 rounded-xl px-4 py-1 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
            {user ? `Welcome, ${user.name}` : "లాగిన్"}
          </Link>
        </div>
        <div className="flex items-center justify-between mt-4 mx-2">
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
