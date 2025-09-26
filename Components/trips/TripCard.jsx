import React from "react";
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

const statusColors = {
  "planning": "bg-blue-100 text-blue-700 border-blue-200",
  "upcoming": "bg-green-100 text-green-700 border-green-200",
  "in_progress": "bg-purple-100 text-purple-700 border-purple-200",
  "completed": "bg-gray-100 text-gray-700 border-gray-200",
  "cancelled": "bg-red-100 text-red-700 border-red-200"
};

const typeColors = {
  "Adventure": "bg-orange-100 text-orange-700",
  "Culture": "bg-purple-100 text-purple-700",
  "Beach": "bg-blue-100 text-blue-700",
  "City": "bg-indigo-100 text-indigo-700",
  "Nature": "bg-green-100 text-green-700",
  "Romance": "bg-pink-100 text-pink-700",
  "Family": "bg-amber-100 text-amber-700",
  "Solo": "bg-teal-100 text-teal-700",
  "Business": "bg-slate-100 text-slate-700",
  "Luxury": "bg-gold-100 text-yellow-700"
};

export default function TripCard({ trip, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="group cursor-pointer bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:border-blue-200/60 transition-all duration-300 overflow-hidden"
        onClick={onClick}
      >
        <div className="relative overflow-hidden">
          <div 
            className="h-32 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundImage: `url(${trip.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=300&fit=crop'})` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute top-3 right-3">
              <Badge className={`${statusColors[trip.status]} border font-medium`}>
                {trip.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3">
              {trip.trip_type && (
                <Badge className={`${typeColors[trip.trip_type]} font-medium`}>
                  {trip.trip_type}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors mb-1">
              {trip.title}
            </h3>
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{trip.destination}</span>
            </div>
          </div>

          <div className="space-y-3">
            {trip.start_date && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>
                  {format(new Date(trip.start_date), "MMM d")}
                  {trip.end_date && ` - ${format(new Date(trip.end_date), "MMM d, yyyy")}`}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-slate-600">
              {trip.travelers && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>{trip.travelers} travelers</span>
                </div>
              )}
              
              {trip.budget && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                  <span>${trip.budget.toLocaleString()}</span>
                </div>
              )}
            </div>

            {trip.notes && (
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {trip.notes}
              </p>
            )}

            {trip.itinerary && trip.itinerary.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{trip.itinerary.length} days planned</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}