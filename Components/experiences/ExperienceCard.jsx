import React from "react";
import { Star, MapPin, Tag, DollarSign, Clock, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const categoryColors = {
  "Adventure": "bg-orange-100 text-orange-700 border-orange-200",
  "Culture": "bg-purple-100 text-purple-700 border-purple-200",
  "Food": "bg-red-100 text-red-700 border-red-200",
  "Nature": "bg-green-100 text-green-700 border-green-200",
  "History": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Art": "bg-pink-100 text-pink-700 border-pink-200",
  "Music": "bg-blue-100 text-blue-700 border-blue-200",
  "Sports": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Wellness": "bg-teal-100 text-teal-700 border-teal-200",
  "Shopping": "bg-gray-100 text-gray-700 border-gray-200"
};

export default function ExperienceCard({ experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group cursor-pointer bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg hover:border-blue-200/60 transition-all duration-300 overflow-hidden">
        <div className="relative overflow-hidden">
          <div 
            className="h-40 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundImage: `url(${experience.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop'})` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            {experience.rating && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-semibold">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{experience.rating}</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3">
              <Badge className={`${categoryColors[experience.category]} border font-medium`}>
                {experience.category}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1 line-clamp-1">
            {experience.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{experience.destination}</span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {experience.description}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
            {experience.price_range && <div className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {experience.price_range}</div>}
            {experience.duration && <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {experience.duration}</div>}
            {experience.difficulty && <div className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {experience.difficulty}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}