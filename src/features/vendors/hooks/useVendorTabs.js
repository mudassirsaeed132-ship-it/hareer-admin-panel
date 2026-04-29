import { useState } from "react";

export default function useVendorTabs(initialTab) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return {
    activeTab,
    setActiveTab,
  };
}