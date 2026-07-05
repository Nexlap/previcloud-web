"use client";

import { useState } from "react";
import FaqFull from "./FaqFull";
import BetaSignupModal from "./BetaSignupModal";

export default function FaqPageClient() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

  return (
    <div className="landing-root bg-[#FAFAF9] text-slate-800">
      <FaqFull onOpenBeta={() => setIsBetaModalOpen(true)} />
      <BetaSignupModal
        isOpen={isBetaModalOpen}
        onClose={() => setIsBetaModalOpen(false)}
      />
    </div>
  );
}
