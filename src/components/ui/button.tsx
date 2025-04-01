interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
  }
  
  export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold transition duration-300";
  
    const variants = {
      primary: "bg-[#0D47A1] text-white shadow-lg hover:bg-[#08306b]",
      secondary: "bg-gray-200 text-gray-800 shadow hover:bg-gray-300",
      outline: "border-2 border-[#0D47A1] text-[#0D47A1] hover:bg-[#0D47A1] hover:text-white",
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
    );
  }
  