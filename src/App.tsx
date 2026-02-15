import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-[100] px-8 py-10 flex justify-between items-center mix-blend-difference">
    <div className="text-sm font-bold tracking-[0.4em] text-white uppercase">
      Do Zero AI
    </div>
    <div className="flex gap-10 text-[10px] tracking-[0.3em] uppercase font-bold text-white/40">
      <a href="#" className="hover:text-brand-primary transition-colors">
        About
      </a>
      <a
        href="#"
        className="hover:text-brand-primary transition-colors text-white/80"
      >
        Waitlist
      </a>
    </div>
  </nav>
);

export default function App() {
  const [step, setStep] = useState<"email" | "details" | "success">("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [socials, setSocials] = useState("");
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const joinWaitlist = useMutation(api.myFunctions.joinWaitlist);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await joinWaitlist({ email });
      setStep("details");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await joinWaitlist({ email, name, phone, socials });
      setStep("success");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden selection:bg-brand-primary selection:text-black">
      <div className="noise" />
      <Navbar />

      {/* Background Massive Text Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="text-[15vw] font-black leading-[0.9] tracking-tighter uppercase text-center select-none text-white"
        >
          SOMETHING
          <br />
          AMAZING
          <br />
          IS COMING
        </motion.h1>
      </div>

      {/* Background Glow / Liquid Blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60vw] h-[60vw] bg-brand-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Foreground Waitlist Card */}
      <main
        className="relative z-20 w-full max-w-xl px-6"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-none p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-white">
              {step === "success" ? "You're in" : "Join the era \n of zero"}
            </h2>
            <p className="text-white/50 text-sm md:text-base mb-12 max-w-sm mx-auto font-medium">
              {step === "success"
                ? "We've secured your spot. Stay tuned for the transition."
                : "Limited alpha spots available. Be the first to transition to autonomous execution."}
            </p>

            {step === "email" && (
              <form
                onSubmit={handleEmailSubmit}
                className="relative group max-w-sm mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                  required
                  disabled={loading}
                />
                <button
                  disabled={loading}
                  className="mt-4 w-full bg-brand-primary text-black font-black uppercase py-4 rounded-none text-xs tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      Request Access <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}

            {step === "details" && (
              <form
                onSubmit={handleDetailsSubmit}
                className="relative group max-w-sm mx-auto space-y-4"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                />
                <input
                  type="text"
                  value={socials}
                  onChange={(e) => setSocials(e.target.value)}
                  placeholder="Twitter / LinkedIn"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                />
                <button
                  disabled={loading}
                  className="w-full bg-brand-primary text-black font-black uppercase py-4 rounded-none text-xs tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" />
                  ) : (
                    "Complete Profile"
                  )}
                </button>
              </form>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle2 size={48} className="text-brand-primary" />
                <div className="space-y-1">
                  <p className="text-white/30 text-xs uppercase font-black tracking-widest">
                    Priority access for {email}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="mt-16 flex justify-center gap-8 opacity-40">
              {["Autonomous", "Secure", "Invisible"].map((text) => (
                <span
                  key={text}
                  className="text-[9px] font-black tracking-[0.2em] uppercase italic"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Internal card glow */}
          <div className="absolute -inset-24 bg-gradient-to-tr from-brand-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        </motion.div>
      </main>

      {/* Static Footer Overlay */}
      <div className="fixed bottom-10 w-full flex justify-center pointer-events-none">
        <div className="w-10 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
