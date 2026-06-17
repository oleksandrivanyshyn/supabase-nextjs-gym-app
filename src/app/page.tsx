import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-5">
      <h1>Homepage</h1>
        <Button className="w-max">Shadcn button</Button>
        <Input placeholder="Shadcn input"/>
    </div>
  );
}
