import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PostList } from "@/components/PostList";

export default function HomePage() {
  return (
    <div className="container mx-auto px-5 mb-10"> 
      <Navbar />
      <PostList />
      <Footer />
    </div>
  );
}