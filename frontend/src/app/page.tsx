import { Header } from "@/components/header";

export default async function Home() {
  return (
    <div>
      <Header />
      <div className="text-black">
        <p>Front page.</p>
      </div>
    </div>
  );
}
