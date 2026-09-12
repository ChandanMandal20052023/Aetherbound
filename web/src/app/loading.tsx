import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-16 h-16 bg-[#130728] border-3 border-black rounded-2xl flex items-center justify-center shadow-solid-lg overflow-hidden relative animate-pulse">
        <Image
          src="/avatars/Rise.jpg"
          alt="Loading Aetherbound"
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-black text-sm uppercase tracking-widest text-[#7ef9c7] font-heading">
          SYNCHRONIZING AETHER CODEX...
        </h3>
        <p className="text-[11px] font-mono text-[#86948c]">
          Quantum telemetry stream initializing
        </p>
      </div>
    </div>
  );
}
