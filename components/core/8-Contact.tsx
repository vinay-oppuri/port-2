"use client";

import { useState } from "react";
import { Mail, Calendar, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6"; // Standard React icon for X
import { socialLinks } from "@/lib/hero.config";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ContactDialog = () => {
    const emailToUse = "oppurivinay25@gmail.com";
    const xLink = socialLinks.find(link => link.name.toLowerCase() === "x" || link.name.toLowerCase() === "twitter");

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    phone: "" // phone expected by endpoint payload
                }),
            });

            if (response.ok) {
                toast.success('Message sent successfully!');
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
            } else {
                const errData = await response.json();
                toast.error(errData.error?.message || 'Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="flex flex-col gap-6 w-full px-2 md:px-0 py-8">
            {/* Super Heading / Metadata overlay */}
            <div className="flex flex-col gap-1 mb-6">
                <p className="text-sm text-muted-foreground">Let's</p>
                <h2 className="text-2xl font-bold text-foreground">Connect</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">

                {/* Left Card: Get in Touch */}
                <div className="bg-foreground/3 border border-white/5 rounded-lg p-4 sm:p-6 flex flex-col justify-between shadow-2xl">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg md:text-xl font-bold text-foreground">Get in Touch</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Choose your preferred method to connect and let&apos;s discuss your project.
                        </p>

                        <div className="flex flex-col gap-3 mt-4">
                            {/* Schedule Call */}
                            <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-foreground/1 hover:bg-foreground/3 border border-white/5 rounded-lg group transition-all duration-300">
                                <div className="flex items-center gap-1">
                                    <div className="p-2.5 transition-colors text-muted-foreground group-hover:text-foreground">
                                        <Calendar className="w-5 h-5 shrink-0" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-semibold text-muted-foreground">Schedule a free call</span>
                                        <span className="text-xs text-muted-foreground/60 mt-0.5 truncate">30-minute strategy session</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            {/* Email */}
                            <a href={`mailto:${emailToUse}`} className="flex items-center justify-between p-3 bg-foreground/1 hover:bg-foreground/3 border border-white/5 rounded-lg group transition-all duration-300">
                                <div className="flex items-center gap-1">
                                    <div className="p-2.5 transition-colors text-muted-foreground group-hover:text-foreground">
                                        <Mail className="w-5 h-5 shrink-0" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-semibold text-muted-foreground">{emailToUse}</span>
                                        <span className="text-xs text-muted-foreground/60 mt-0.5 truncate">Quick inquiries & questions</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>

                            {/* X / Twitter */}
                            {xLink && (
                                <a href={xLink.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-foreground/1 hover:bg-foreground/3 border border-white/5 rounded-lg group transition-all duration-300">
                                    <div className="flex items-center gap-1">
                                        <div className="p-2.5 transition-colors text-muted-foreground group-hover:text-foreground">
                                            <FaXTwitter className="w-5 h-5 shrink-0" />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-semibold text-muted-foreground">Connect on X</span>
                                            <span className="text-xs text-muted-foreground/60 mt-0.5 truncate">Follow for updates & insights</span>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-xs text-muted-foreground/40 mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                        Response within 24 hours <span className="text-white/10">•</span> Available for hire
                    </p>
                </div>

                {/* Right Card: Send a Message Form */}
                <div className="bg-foreground/3 border border-white/5 rounded-lg p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg md:text-xl font-bold text-foreground">Send a Message</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Prefer to write? Fill out the form and I&apos;ll get back to you within 24 hours.
                        </p>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-in zoom-in-50 duration-300" />
                                <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                                <p className="text-xs text-muted-foreground">Thank you for reaching out.</p>
                                <button onClick={() => setSubmitted(false)} className="text-xs underline text-foreground/60 hover:text-foreground mt-2">
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-1.5">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-sm bg-foreground/1! border border-white/5 hover:border-white/10 focus:border-white/20 py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-sm bg-foreground/1! border border-white/5 hover:border-white/10 focus:border-white/20 py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Textarea
                                        name="message"
                                        rows={4}
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full min-h-30 rounded-sm bg-foreground/1! border border-white/5 hover:border-white/10 focus:border-white/20 py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/30 resize-none focus:outline-none transition-all"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50 text-sm"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        "Send Message"
                                    )}
                                    {!loading && <ArrowUpRight className="w-4 h-4" />}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactDialog;
