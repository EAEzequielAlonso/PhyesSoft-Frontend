import { Skeleton } from "@/components/ui/skeleton"; // Asegúrate de tener un componente Skeleton o usa divs
import { motion } from "framer-motion";

export default function DashboardSkeleton() {
  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-100 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-1/3" /> {/* Simula un título */}
        <Skeleton className="h-10 w-24" /> {/* Simula un botón */}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>

      {/* Tabla */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Skeleton className="h-8 w-1/4 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}