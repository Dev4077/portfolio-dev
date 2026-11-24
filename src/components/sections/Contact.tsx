"use client";

import React, { useState, useRef } from "react";
import { Mail, Github, Linkedin, MapPin, Send, MessageSquare, Sparkles } from "lucide-react";
import { sendMessageAction } from "@/app/actions";
import { SakugaButton, SakugaInput, SakugaToast, SakugaTooltip } from "@/components/sakuga";
import type { SakugaButtonElement, SakugaToastElement } from "@/types/sakuga";

export function Contact({ about }: { about?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buttonRef = useRef<SakugaButtonElement | null>(null);
  const toastRef = useRef<SakugaToastElement | null>(null);

  const email = about?.email || "dev.h.sakarsawala@gmail.com";
  const githubUrl = about?.githubUrl || "https://github.com/Dev4077";
  const linkedinUrl = about?.linkedinUrl || "https://www.linkedin.com/in/dev-sakarsawala/";
  const location = about?.location || "Surat, India";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toastRef.current?.show("Please fill in name, email and message!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendMessageAction({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Portfolio Contact",
        message: formData.message,
      });

      if (result.success) {
        buttonRef.current?.done(3000);
        toastRef.current?.show("Transmission received! ズザッ! I will reply shortly.");
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toastRef.current?.show("Transmission failed. Please email directly!");
      }
    } catch (err) {
      toastRef.current?.show("Error sending message. Please email directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#1d1a4a]/10 bg-[#ffffff] relative">
      <SakugaToast ref={toastRef} duration={3.5} message="Transmission received! ズザッ!" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Outreach & Badges */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="sfx-tag text-[10px]">TRANSMISSION</span>
              <span className="text-xs font-bold text-[#8580b0]">FINAL ACT</span>
            </div>

            <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#1d1a4a] mb-4">
              Let&apos;s Build Something Useful.
            </h2>

            <p className="text-sm sm:text-base text-[#1d1a4a]/80 leading-relaxed mb-8 font-medium">
              Have an ambitious vision, a product engineering opportunity, or a complex system to build?
              I&apos;m ready to collaborate and ship impactful solutions.
            </p>

            {/* Contact Channels Panel */}
            <div className="manga-panel p-6 bg-[#f4f3fc] space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dcdaf0] flex items-center justify-center text-[#ff5fa8] shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8580b0]">Direct Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-bold text-[#1d1a4a] hover:text-[#ff5fa8] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#dcdaf0]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dcdaf0] flex items-center justify-center text-[#1d1a4a] shadow-sm">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8580b0]">GitHub Repository</div>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#1d1a4a] hover:text-[#ff5fa8] transition-colors"
                  >
                    github.com/{githubUrl.split("/").filter(Boolean).pop()}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#dcdaf0]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dcdaf0] flex items-center justify-center text-[#8f8df7] shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8580b0]">LinkedIn Network</div>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#1d1a4a] hover:text-[#ff5fa8] transition-colors"
                  >
                    linkedin.com/in/dev-sakarsawala
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#dcdaf0]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dcdaf0] flex items-center justify-center text-[#1d1a4a] shadow-sm">
                  <MapPin className="w-5 h-5 text-[#ff5fa8]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8580b0]">Location</div>
                  <div className="text-sm font-bold text-[#1d1a4a]">{location} (Open to Global Remote)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comic Transmission Form */}
        <div className="lg:col-span-7">
          <div className="manga-panel p-6 sm:p-8 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-sakuga-title text-xl text-[#1d1a4a]">
                  Send Message
                </h3>
                <p className="text-xs text-[#8580b0] mt-0.5">
                  Inputs kick up dust puffs on every keystroke!
                </p>
              </div>
              <span className="sfx-tag text-[9px]">ズザッ</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1d1a4a] mb-2">
                    Your Name *
                  </label>
                  <SakugaInput
                    label="Name"
                    placeholder="E.g. Tony Stark"
                    value={formData.name}
                    onInput={(val) => setFormData((prev) => ({ ...prev, name: val }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1d1a4a] mb-2">
                    Your Email *
                  </label>
                  <SakugaInput
                    label="Email"
                    type="email"
                    placeholder="tony@stark.com"
                    value={formData.email}
                    onInput={(val) => setFormData((prev) => ({ ...prev, email: val }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1d1a4a] mb-2">
                  Subject / Topic
                </label>
                <SakugaInput
                  label="Subject"
                  placeholder="New Project / Role Inquiry / AI Workflow"
                  value={formData.subject}
                  onInput={(val) => setFormData((prev) => ({ ...prev, subject: val }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1d1a4a] mb-2">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your project, timeline, scope, or idea..."
                  className="w-full p-4 rounded-2xl border-2 border-[#dcdaf0] focus:border-[#1d1a4a] bg-[#f4f3fc] text-[#1d1a4a] font-medium text-sm outline-none transition-colors shadow-inner"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#dcdaf0]">
                <div className="text-xs text-[#8580b0] font-bold">
                  {submitted ? (
                    <span className="text-emerald-600">✓ Sent successfully!</span>
                  ) : (
                    <span>Clicking fires anime impact burst &amp; checkmark</span>
                  )}
                </div>

                <SakugaButton
                  ref={buttonRef}
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Transmitting..." : "Send Transmission 🚀"}
                </SakugaButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
