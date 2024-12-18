export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {

  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute top-10 left-10 text-white opacity-20 text-4xl">✖</div>
          <div className="absolute top-10 right-10 text-white opacity-20 text-4xl">▦</div>
          <div className="absolute bottom-10 left-20 text-white opacity-20 text-4xl">▶</div>
          <div className="absolute bottom-10 right-20 text-white opacity-20 text-4xl">■</div>
        </div>
  
        {/* Content */}
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </div>
    );
  }
  