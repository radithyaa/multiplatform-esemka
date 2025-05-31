import { Button } from "@/components/ui/button";
import { useState } from "react";

function HomePage() {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col items-center justify-center m-4  h-full ">
      Hi, this is the Root page!
      <Button onClick={() => setText("Hello")}>
        <span>Click me</span>
      </Button>
        <span>{text}</span>
    </div>
  )
}

export default HomePage;
