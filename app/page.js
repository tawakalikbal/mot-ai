import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Landing from "./Landing";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen"> {/* Menggunakan flexbox untuk layout */}
      <Navbar />

      <Landing />

      <Footer />
    </div>
  );
}