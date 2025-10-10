import portada from "../../assets/image/foto-portada.jpg";
import ItemListContainer from "../products/ItemListContainer";
import Footer from "../ui/Footer";
import Divider from "../ui/Divider";

function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-screen">
        <img
          src={portada}
          alt="foto-portada"
          className="h-full w-full object-cover bg-center shadow-lg"
        />

        <div className="absolute inset-0 bg-black opacity-30"></div>

        <h1 className="absolute bottom-10 left-10 z-10 text-left text-white drop-shadow-lg ">
          <span
            className="text-center 
               pt-20 
               text-5xl md:text-6xl lg:text-7xl 
               font-extrabold 
               text-black 
               drop-shadow-lg 
               drop-shadow-indigo-500/70"
          >
            Bienvenido a
          </span>
          <span
            className="text-3xl md:text-5xl lg:text-6xl  text-black font-bold
               drop-shadow-lg 
               drop-shadow-indigo-500/70 block mt-2"
          >
            Tu Tienda Online
          </span>
        </h1>
      </div>
      <h2
        className="text-center 
               pt-20 
               text-5xl md:text-6xl lg:text-7xl 
               font-extrabold 
               text-black 
               drop-shadow-lg 
               drop-shadow-indigo-500/70"
      >
        Productos Destacados
      </h2>
      <Divider />
      <ItemListContainer cantidad={4} />
      <Divider />
      <Footer />
    </div>
  );
}

export default Home;
