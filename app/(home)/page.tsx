import { Button } from "@/components/ui/button";
import { HomepageView } from "@/modules/home/ui/views/homepage-view";

export default function Home() {
  return (
    <div>
      <HomepageView />
      <Button className="bg-primary">Click me</Button>
    </div>
  );
}
