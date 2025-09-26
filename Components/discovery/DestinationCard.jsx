import React from "react";
import { MapPin, Star, Heart, Camera, ThermometerSun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const budgetColors = {
  "Budget": "bg-green-100 text-green-700 border-green-200",
  "Mid-range": "bg-blue-100 text-blue-700 border-blue-200",  
  "Luxury": "bg-purple-100 text-purple-700 border-purple-200",
  "Ultra-luxury": "bg-amber-100 text-amber-700 border-amber-200"
};

export default function DestinationCard({ destination, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="group cursor-pointer bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-2xl hover:border-blue-200/60 transition-all duration-300 overflow-hidden"
        onClick={onClick}
      >
        <div className="relative overflow-hidden">
          <div 
            className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundImage: `url(${destination.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'})` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute top-3 right-3">
              <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group/heart">
                <Heart className="w-4 h-4 text-slate-600 group-hover/heart:text-red-500 transition-colors" />
              </button>
            </div>
            <div className="absolute bottom-3 left-3">
              {destination.budget_range && (
                <Badge className={`${budgetColors[destination.budget_range]} border font-medium`}>
                  {destination.budget_range}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                {destination.name}
              </h3>
              <div className="flex items-center gap-1 text-slate-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{destination.country}</span>
              </div>
            </div>
            {destination.average_rating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-700">
                  {destination.average_rating}
                </span>
              </div>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {destination.description || "Discover the beauty and wonder of this amazing destination."}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {destination.travel_style?.slice(0, 3).map((style, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                {style}
              </Badge>
            ))}
            {destination.travel_style?.length > 3 && (
              <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                +{destination.travel_style.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              {destination.climate && (
                <div className="flex items-center gap-1">
                  <ThermometerSun className="w-3 h-3" />
                  <span>{destination.climate}</span>
                </div>
              )}
              {destination.best_time_to_visit && (
                <div className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  <span>{destination.best_time_to_visit}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}