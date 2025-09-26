import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const travelStyles = ["Adventure", "Culture", "Beach", "City", "Nature", "Romance", "Family", "Solo", "Luxury"];

export default function FilterPanel({ selectedStyle, setSelectedStyle, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Travel Style</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedStyle === "all" ? "default" : "outline"}
          className={`cursor-pointer transition-colors ${
            selectedStyle === "all" 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          }`}
          onClick={() => setSelectedStyle("all")}
        >
          All Styles
        </Badge>
        {travelStyles.map((style) => (
          <Badge
            key={style}
            variant={selectedStyle === style ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              selectedStyle === style 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
            }`}
            onClick={() => setSelectedStyle(style)}
          >
            {style}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}