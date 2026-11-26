"use client";

import React, { useState, useRef } from "react";
import {
  SakugaButton,
  SakugaToggle,
  SakugaSlider,
  SakugaCheckbox,
  SakugaRadio,
  SakugaInput,
  SakugaTabs,
  SakugaProgress,
  SakugaRating,
  SakugaToast,
  SakugaTooltip,
} from "@/components/sakuga";
import type {
  SakugaButtonElement,
  SakugaProgressElement,
  SakugaToastElement,
} from "@/types/sakuga";

export function SakugaStation() {
  const [sliderVal, setSliderVal] = useState(65);
  const [toggleState, setToggleState] = useState(true);
  const [checkState, setCheckState] = useState(true);
  const [progressVal, setProgressVal] = useState(0.4);
  const [ratingVal, setRatingVal] = useState(4);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("effects");

  const progressRef = useRef<SakugaProgressElement | null>(null);
  const toastRef = useRef<SakugaToastElement | null>(null);
  const primaryBtnRef = useRef<SakugaButtonElement | null>(null);

  const triggerToast = (msg: string) => {
    if (toastRef.current) {
      toastRef.current.show(msg);
    }
  };

  const handleProgressBoost = () => {
    const next = progressVal >= 1 ? 0.2 : Number((progressVal + 0.3).toFixed(2));
    const target = Math.min(1, next);
    setProgressVal(target);
    if (progressRef.current) {
      progressRef.current.set(target);
    }
    if (target >= 1) {
      triggerToast("Limit Break: 100% Complete! ドン!");
    }
  };

  const resetProgress = () => {
    setProgressVal(0);
    if (progressRef.current) {
      progressRef.current.reset();
    }
  };

  return (
    <section id="vfx-station" suppressHydrationWarning className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10 bg-[#ffffff]">
      {/* Toast Element mounted in fixed viewport corner */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
        <SakugaToast ref={toastRef} duration={3} message="Anime VFX System Initialized!" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sfx-tag text-[10px]">LABORATORY</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626]">
              Live Anime VFX Physics
            </span>
          </div>
          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#18181b]">
            Anime VFX Interactive Lab
          </h2>
          <p className="text-sm text-[#71717a] max-w-xl mt-2 leading-relaxed">
            Ordinary UI controls engineered to react like keyframe animation. Springs, squash and overshoot,
            impact bursts, and drawn manga sound-effect lettering on a single shared canvas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerToast("ズザッ! Anime Smear Toast triggered!")}
            className="manga-badge text-xs font-bold hover:border-[#18181b]"
          >
            Trigger Toast ズザッ
          </button>
        </div>
      </div>

      {/* Grid of Interactive Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Impact Buttons */}
        <div className="manga-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sakuga-title text-base text-[#18181b]">
                Impact Frame Buttons
              </h3>
              <span className="sfx-tag text-[9px]">ドン!</span>
            </div>
            <p className="text-xs text-[#71717a] mb-6">
              Press to squash flat. Release to trigger one-frame ink inversion, spiky burst, crystal shards, and ドン! lettering.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6 gap-4 min-h-[140px] bg-[#fff1f2] rounded-xl border border-[#fee2e2]">
            <SakugaButton
              ref={primaryBtnRef}
              variant="primary"
              onClick={() => {
                setTimeout(() => primaryBtnRef.current?.done(2000), 250);
              }}
            >
              Impact Me ⚡
            </SakugaButton>

            <SakugaButton variant="secondary">
              Cancel / Secondary
            </SakugaButton>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-[11px] text-[#71717a]">
            <span>Click to test checkmark</span>
            <span className="font-mono">&lt;vfx-button&gt;</span>
          </div>
        </div>

        {/* 2. Smeared 43-Frame Toggle */}
        <div className="manga-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sakuga-title text-base text-[#18181b]">
                Drawn Anime Toggle
              </h3>
              <span className="sfx-tag text-[9px]">カチッ</span>
            </div>
            <p className="text-xs text-[#71717a] mb-6">
              43 painted frames: the knob smears across, slams into the housing with splash crown, and settles with a glint.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6 min-h-[140px] bg-[#fff1f2] rounded-xl border border-[#fee2e2]">
            <SakugaToggle
              label="Interactive VFX"
              checked={toggleState}
              onChange={(val) => {
                setToggleState(val);
                triggerToast(val ? "VFX Powered UP! 🔥" : "VFX Quenched ❄️");
              }}
            />
            <span className="text-xs font-bold text-[#18181b] mt-2">
              Status: {toggleState ? "OVERDRIVE ON" : "STANDBY"}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-[11px] text-[#71717a]">
            <span>Flip back &amp; forth</span>
            <span className="font-mono">&lt;vfx-toggle&gt;</span>
          </div>
        </div>

        {/* 3. Cumulus Cloud Slider */}
        <div className="manga-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sakuga-title text-base text-[#18181b]">
                Kinetic Cloud Slider
              </h3>
              <span className="sfx-tag text-[9px]">シュッ</span>
            </div>
            <p className="text-xs text-[#71717a] mb-6">
              Thumb stretches into a teardrop. Drag fast and cumulus clouds roll up behind it; let go while moving for a flying crescent.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6 min-h-[140px] bg-[#fff1f2] rounded-xl border border-[#fee2e2] px-4">
            <SakugaSlider
              label="Energy Output"
              min={0}
              max={100}
              value={sliderVal}
              unit="%"
              onInput={setSliderVal}
              onChange={setSliderVal}
            />
            <span className="text-xs font-bold text-[#18181b] mt-4">
              Power Level: {sliderVal}%
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-[11px] text-[#71717a]">
            <span>Drag fast to throw crescent</span>
            <span className="font-mono">&lt;vfx-slider&gt;</span>
          </div>
        </div>

        {/* 4. Storm Progress Bar */}
        <div className="manga-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sakuga-title text-base text-[#18181b]">
                Storm Cloud Progress
              </h3>
              <span className="sfx-tag text-[9px]">ゴゴゴゴ</span>
            </div>
            <p className="text-xs text-[#71717a] mb-6">
              A storm cloud rides the leading edge, ground line draws, pebbles lift off, ゴゴゴゴ rumbles; 100% unleashes an impact burst.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-4 min-h-[140px] bg-[#fff1f2] rounded-xl border border-[#fee2e2] px-4">
            <SakugaProgress
              ref={progressRef}
              label="Compilation Meter"
              value={progressVal}
              doneLabel="Limit Break! ✓"
            />
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleProgressBoost}
                className="px-3 py-1 bg-[#18181b] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#dc2626] transition-colors"
              >
                Boost (+30%)
              </button>
              <button
                onClick={resetProgress}
                className="px-3 py-1 bg-white border border-[#fee2e2] text-xs font-bold rounded-lg text-[#71717a] hover:text-[#18181b] transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-[11px] text-[#71717a]">
            <span>Fill to 100% for burst</span>
            <span className="font-mono">&lt;vfx-progress&gt;</span>
          </div>
        </div>

        {/* 5. Star Rating & Tooltip */}
        <div className="manga-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sakuga-title text-base text-[#18181b]">
                Pop Stars &amp; Speech Bubble
              </h3>
              <span className="sfx-tag text-[9px]">ポン</span>
            </div>
            <p className="text-xs text-[#71717a] mb-6">
              Stars pop in one by one with hollow ポン. Five stars fires an anime burst! Tooltip pops like a manga speech bubble with カチッ.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6 min-h-[140px] bg-[#fff1f2] rounded-xl border border-[#fee2e2] gap-4">
            <SakugaRating
              label="Portfolio Craft"
              value={ratingVal}
              onChange={(val) => {
                setRatingVal(val);
                if (val === 5) triggerToast("5 Stars! MAX IMPACT BURST! ★★★★★");
              }}
            />

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-[#71717a]">Hover for hint:</span>
              <SakugaTooltip text="Crafted with pure math, springs, and no external UI libs!">
                <span className="w-7 h-7 rounded-full bg-[#18181b] text-white text-xs font-bold flex items-center justify-center cursor-help">
                  ?
                </span>
              </SakugaTooltip>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-[11px] text-[#71717a]">
            <span>5 Stars unlocks impact star</span>
            <span className="font-mono">&lt;vfx-rating&gt;</span>
          </div>
        </div>

        {/* 6. Manga Checkbox & Dynamic Dust Input */}
        <div className="manga-card p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sakuga-title text-base text-[#18181b]">
                Dust Input &amp; Checkbox
              </h3>
              <span className="sfx-tag text-[9px]">ズザッ</span>
            </div>
            <p className="text-xs text-[#71717a] mb-6">
              Typing kicks up anime dust puffs right at the cursor caret! Ticking checkbox sweeps crescents with crystals and ズザッ!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6 min-h-[140px] bg-[#fff1f2] rounded-xl border border-[#fee2e2] gap-4 px-4">
            <div className="w-full max-w-[240px]">
              <SakugaInput
                label="Type to kick up dust"
                placeholder="Type here..."
                value={inputText}
                onInput={setInputText}
              />
            </div>

            <div className="flex items-center gap-3">
              <SakugaCheckbox
                checked={checkState}
                onChange={setCheckState}
                label="Overdrive"
              >
                <span className="text-xs font-bold text-[#18181b]">
                  Engage Anime Engine
                </span>
              </SakugaCheckbox>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-[11px] text-[#71717a]">
            <span>Watch dust puff on typing</span>
            <span className="font-mono">&lt;vfx-input&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

