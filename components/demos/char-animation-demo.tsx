import CharAnimation from "@/components/char-animation";

export default function CharAnimationDemo() {
  return (
    <div className="z-20 p-8 bg-black rounded-xl shadow-2xl flex items-center justify-center min-w-[300px]">
      <CharAnimation text="Hello World!" className="text-4xl text-white font-sans" />
    </div>
  );
}
