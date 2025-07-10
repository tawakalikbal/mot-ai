import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen"> {/* Menggunakan flexbox untuk layout */}
      <Navbar />

      {/* Ini adalah div background gambar Anda, mengisi ruang yang tersisa */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/image/banner-explore-indonesia.jpg')" }}
      ></div>

      {/* Ini adalah "spacer" yang akan mendorong footer ke bawah. */}
      {/* flex-grow membuatnya mengisi semua ruang vertikal yang tersedia setelah navbar dan sebelum footer. */}
      <div className="flex-grow"></div> 

      {/* Footer akan otomatis berada di bagian bawah karena flex-grow di atasnya */}
      <Footer />
    </div>
  );
}