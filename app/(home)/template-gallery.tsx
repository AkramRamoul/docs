import { Carousel, CarouselContent } from "@/components/ui/carousel";
import React from "react";

function Templates() {
  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4 ">
        <h3 className="ont-medium">Templates</h3>
        <Carousel>
          <CarouselContent></CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default Templates;
