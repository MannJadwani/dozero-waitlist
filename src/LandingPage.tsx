import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav
    className="fixed top-0 w-full z-[100] px-8 py-10 flex justify-between items-center mix-blend-difference"
    role="navigation"
    aria-label="Main navigation"
  >
    <div
      className="text-sm font-bold tracking-[0.4em] text-white uppercase"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <span itemProp="name">Do Zero AI</span>
    </div>
    <div className="flex gap-10 text-[10px] tracking-[0.3em] uppercase font-bold text-white/40">
      <Link
        to="/blog"
        className="hover:text-brand-primary transition-colors"
        aria-label="Read our blog"
      >
        Blog
      </Link>
      <a
        href="#waitlist"
        className="hover:text-brand-primary transition-colors text-white/80"
        aria-label="Join the waitlist"
        aria-current="page"
      >
        Waitlist
      </a>
    </div>
  </nav>
);

export default function LandingPage() {
  const [step, setStep] = useState<
    "email" | "name" | "phone" | "socials" | "success"
  >("email");
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
      setStep("name");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await joinWaitlist({ email, name });
      setStep("phone");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await joinWaitlist({ email, name, phone });
      setStep("socials");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialsSubmit = async (e: React.FormEvent) => {
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

  const getStepTitle = () => {
    switch (step) {
      case "success":
        return "You're in";
      case "name":
        return "What's your name?";
      case "phone":
        return "Phone number?";
      case "socials":
        return "Social media?";
      default:
        return "Join the era \n of zero";
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case "success":
        return "We've secured your spot. Stay tuned for the transition.";
      case "name":
        return "Step 2 of 4";
      case "phone":
        return "Step 3 of 4 (optional)";
      case "socials":
        return "Step 4 of 4 (optional)";
      default:
        return "Limited alpha spots available. Be the first to transition to autonomous execution.";
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden selection:bg-brand-primary selection:text-black">
      <div className="noise" aria-hidden="true" />
      <Navbar />

      {/* Background Massive Text Layer - Hidden from screen readers */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
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

      {/* Background Glow - Decorative only */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[60vw] h-[60vw] bg-brand-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Foreground Waitlist Card */}
      <main
        id="waitlist"
        className="relative z-20 w-full max-w-xl px-6"
        style={{ perspective: "1000px" }}
        role="main"
        aria-label="Waitlist signup form"
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
          role="form"
          aria-labelledby="form-title"
        >
          <div
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10"
          >
            <h2
              id="form-title"
              className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.9] text-white"
            >
              {getStepTitle()}
            </h2>
            <p className="text-white/50 text-sm md:text-base mb-12 max-w-sm mx-auto font-medium">
              {getStepSubtitle()}
            </p>

            {step === "email" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleEmailSubmit}
                className="relative group max-w-sm mx-auto"
                aria-label="Email submission form"
              >
                <label htmlFor="email-input" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                  required
                  disabled={loading}
                  aria-required="true"
                  aria-describedby="email-help"
                  autoComplete="email"
                />
                <span id="email-help" className="sr-only">
                  Enter your email to join the waitlist
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-brand-primary text-black font-black uppercase py-4 rounded-none text-xs tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                  aria-label={
                    loading
                      ? "Submitting your request"
                      : "Request access to the waitlist"
                  }
                >
                  {loading ? (
                    <div
                      className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      Continue <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {step === "name" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleNameSubmit}
                className="relative group max-w-sm mx-auto"
                aria-label="Name submission form"
              >
                <label htmlFor="name-input" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                  required
                  autoComplete="name"
                  aria-required="true"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-brand-primary text-black font-black uppercase py-4 rounded-none text-xs tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                  aria-label={
                    loading ? "Saving your name" : "Continue to next step"
                  }
                >
                  {loading ? (
                    <div
                      className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      Continue <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="mt-3 text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
                >
                  Skip this step
                </button>
              </motion.form>
            )}

            {step === "phone" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePhoneSubmit}
                className="relative group max-w-sm mx-auto"
                aria-label="Phone submission form"
              >
                <label htmlFor="phone-input" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                  autoComplete="tel"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-brand-primary text-black font-black uppercase py-4 rounded-none text-xs tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                  aria-label={
                    loading ? "Saving your phone" : "Continue to next step"
                  }
                >
                  {loading ? (
                    <div
                      className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      Continue <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("socials")}
                  className="mt-3 text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
                >
                  Skip this step
                </button>
              </motion.form>
            )}

            {step === "socials" && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSocialsSubmit}
                className="relative group max-w-sm mx-auto"
                aria-label="Social media submission form"
              >
                <label htmlFor="socials-input" className="sr-only">
                  Social Media
                </label>
                <input
                  id="socials-input"
                  type="text"
                  value={socials}
                  onChange={(e) => setSocials(e.target.value)}
                  placeholder="Twitter / LinkedIn"
                  className="w-full bg-white/5 border border-white/10 rounded-none px-8 py-4 text-sm font-bold focus:outline-none focus:border-brand-primary transition-all placeholder:text-white/20 text-center"
                  autoComplete="off"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-brand-primary text-black font-black uppercase py-4 rounded-none text-xs tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                  aria-label={
                    loading
                      ? "Completing your profile"
                      : "Complete registration"
                  }
                >
                  {loading ? (
                    <div
                      className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"
                      aria-hidden="true"
                    />
                  ) : (
                    "Complete Profile"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("success")}
                  className="mt-3 text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
                >
                  Skip this step
                </button>
              </motion.form>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
                role="status"
                aria-live="polite"
                aria-label="Success message"
              >
                <CheckCircle2
                  size={48}
                  className="text-brand-primary"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="text-white/30 text-xs uppercase font-black tracking-widest">
                    Priority access for {email}
                  </p>
                </div>
              </motion.div>
            )}

            <footer
              className="mt-16 flex justify-center gap-8 opacity-40"
              aria-label="Product features"
            >
              {["Autonomous", "Secure", "Invisible"].map((text) => (
                <span
                  key={text}
                  className="text-[9px] font-black tracking-[0.2em] uppercase italic"
                >
                  {text}
                </span>
              ))}
            </footer>
          </div>

          {/* Internal card glow - Decorative */}
          <div
            className="absolute -inset-24 bg-gradient-to-tr from-brand-primary/10 via-transparent to-transparent opacity-50 pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>
      </main>

      {/* Static Footer Overlay */}
      <footer
        className="fixed bottom-10 w-full flex justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-10 h-1 bg-white/20 rounded-full" />
      </footer>
    </div>
  );
}
