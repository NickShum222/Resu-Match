import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(data => console.log(data)
    )
  }, [])

  return (
    <section className="w-full bg-black flex flex-col justify-center items-center min-h-[100vh]">
      <div className="font-bold text-white text-[3rem]">
        Resu<span className="text-[#BFBFBF]">.me</span>
      </div>
      <button className="bg-primary text-white uppercase font-semibold text-[24px] py-3 px-[70px] rounded-md transform  duration-300 ease-in-out hover:bg-transparent border-[2px] border-primary hover:text-primary">
        Get Started
      </button>
    </section>
  );
}
