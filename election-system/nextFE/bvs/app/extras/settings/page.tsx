// app/extras/settings/page.tsx
"use client";
import SettingsForm from "@components/Settings";

export default function SettingsPage() {
  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <SettingsForm electionDistrict="default" />
      </div>
    </div>
  );
}
