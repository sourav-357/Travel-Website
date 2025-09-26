import React from "react";
import { X, MapPin, Star, Calendar, DollarSign, Thermometer, Camera, Heart, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const budgetColors = {
  "Budget": "bg-green-100 text-green-700 border-green-200",
  "Mid-range": "bg-blue-100 text-blue-700 border-blue-200",  
  "Luxury": "bg-purple-100 text-purple-700 border-purple-200",
  "Ultra-luxury": "bg-amber-100 text-amber-700 border-amber-200"
};

export default function DestinationModal({ destination, onClose }) {
  if (!destination) return null;

  return (
    <Dialog open={!!destination} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${destination.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop'})` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.name}</h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg font-medium">{destination.country}, {destination.continent}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">About {destination.name}</h2>
                  <p className="text-slate-600 leading-relaxed">
                    {destination.description || "A beautiful destination waiting to be explored with rich culture, stunning landscapes, and unforgettable experiences."}
                  </p>
                </div>

                {/* Highlights */}
                {destination.highlights && destination.highlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Top Highlights</h3>
                    <div className="grid gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span className="text-slate-600">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Travel Styles */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Perfect For</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.travel_style?.map((style, index) => (
                      <Badge key={index} className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Gallery Preview */}
                {destination.gallery_images && destination.gallery_images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {destination.gallery_images.slice(0, 6).map((image, index) => (
                        <div 
                          key={index}
                          className="aspect-square bg-cover bg-center rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                  <h3 className="font-bold text-slate-900">Travel Info</h3>
                  
                  {destination.average_rating && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-slate-900">
                        {destination.average_rating}/5 Rating
                      </span>
                    </div>
                  )}

                  {destination.budget_range && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <Badge className={budgetColors[destination.budget_range]}>
                        {destination.budget_range}
                      </Badge>
                    </div>
                  )}

                  {destination.best_time_to_visit && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-600">
                        Best time: {destination.best_time_to_visit}
                      </span>
                    </div>
                  )}

                  {destination.climate && (
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-slate-600">
                        Climate: {destination.climate}
                      </span>
                    </div>
                  )}

                  {destination.language && (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-center text-xs font-bold text-purple-600">L</span>
                      <span className="text-sm text-slate-600">
                        Language: {destination.language}
                      </span>
                    </div>
                  )}

                  {destination.currency && (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-center text-xs font-bold text-emerald-600">$</span>
                      <span className="text-sm text-slate-600">
                        Currency: {destination.currency}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3">
                    <Map className="w-4 h-4 mr-2" />
                    Plan Trip Here
                  </Button>
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 font-semibold py-3">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Bucket List
                  </Button>
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 font-semibold py-3">
                    <Camera className="w-4 h-4 mr-2" />
                    View More Photos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}