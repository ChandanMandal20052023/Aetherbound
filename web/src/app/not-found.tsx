import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#190c2d]">
      <div className="w-full max-w-md bg-[#201335] border-pixel-thick shadow-solid-lg rounded-2xl p-8 space-y-5">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-[#130728] border-3 border-black flex items-center justify-center text-4xl shadow-solid-sm">
          🌌
        </div>
        <div className="space-y-2">
          <span className="bg-[#ff5a5a] text-white font-black text-xs px-3 py-1 rounded border border-black uppercase shadow-solid-sm inline-block">
            ERROR 404 • VOID ANOMALY
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight font-heading">
            SECTOR NOT FOUND
          </h2>
          <p className="text-xs text-[#bccac1] font-semibold leading-relaxed">
            The coordinates you punched into the nav-console lead to an uncharted void rift. Warp back to the sanctuary hub.
          </p>
        </div>
        <Link href="/dashboard" className="block pt-2">
          <Button variant="primary" size="lg" fullWidth withArrow>
            RETURN TO SANCTUARY
          </Button>
        </Link>
      </div>
    </div>
  );
}
