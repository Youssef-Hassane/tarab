"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"


import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (


  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "group relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="group cursor-pointer relative h-2 w-full grow overflow-hidden rounded-full bg-gray-500">
      <SliderPrimitive.Range className="absolute h-full bg-custom-yellow" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className="
      hidden h-5 w-5 rounded-full 
      bg-white shadow-lg 
      transition-colors 
      focus-visible:outline-none 
      group-hover:block


      cursor-pointer
      
      hover:bg-custom-yellow
      " />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
