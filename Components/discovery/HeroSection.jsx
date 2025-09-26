import React from "react";
import { Search, Compass, Globe, Mountain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection({ onSearch, searchQuery }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-indigo-900/90"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        ></motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Compass className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Next
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Adventure
            </span>
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore breathtaking destinations, plan unforgettable journeys, and create memories 
            that will last a lifetime. Your premium travel experience starts here.
          </p>

          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
              <Input
                placeholder="Where would you like to go next?"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-12 pr-32 h-16 text-lg bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-blue-400 shadow-2xl rounded-2xl"
              />
              <Button className="absolute right-2 top-2 h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold">
                Explore
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Globe className="w-6 h-6 text-blue-300" />
              </div>
              <p className="text-blue-200 font-semibold">200+ Destinations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Mountain className="w-6 h-6 text-purple-300" />
              </div>
              <p className="text-purple-200 font-semibold">Epic Adventures</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Compass className="w-6 h-6 text-pink-300" />
              </div>
              <p className="text-pink-200 font-semibold">Expert Guides</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}