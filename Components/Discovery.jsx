
import React, { useState, useEffect } from "react";
import { Destination } from "@/entities/Destination";
import { Search, Filter, MapPin, Star, Heart, Camera, Clock, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

import DestinationCard from "../components/discovery/DestinationCard";
import DestinationModal from "../components/discovery/DestinationModal";
import FilterPanel from "../components/discovery/FilterPanel";
import HeroSection from "../components/discovery/HeroSection";

export default function Discovery() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
    let filtered = destinations;

    if (searchQuery) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedContinent !== "all") {
      filtered = filtered.filter(dest => dest.continent === selectedContinent);
    }

    if (selectedBudget !== "all") {
      filtered = filtered.filter(dest => dest.budget_range === selectedBudget);
    }

    if (selectedStyle !== "all") {
      filtered = filtered.filter(dest => dest.travel_style?.includes(selectedStyle));
    }

    setFilteredDestinations(filtered);
  }, [destinations, searchQuery, selectedContinent, selectedBudget, selectedStyle]);

  const loadDestinations = async () => {
    setIsLoading(true);
    const data = await Destination.list("-average_rating", 50);
    setDestinations(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <HeroSection 
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search destinations, countries, or experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-slate-200/60 focus:border-blue-300 focus:ring-blue-200"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={selectedContinent} onValueChange={setSelectedContinent}>
              <SelectTrigger className="w-40 h-12 bg-white/80 backdrop-blur-sm border-slate-200/60">
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Continents</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="South America">South America</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger className="w-32 h-12 bg-white/80 backdrop-blur-sm border-slate-200/60">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="Budget">Budget</SelectItem>
                <SelectItem value="Mid-range">Mid-range</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="Ultra-luxury">Ultra-luxury</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-4 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:bg-blue-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <FilterPanel
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              onClose={() => setShowFilters(false)}
            />
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="mb-6">
          <p className="text-slate-600 font-medium">
            {filteredDestinations.length} destinations found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Destinations Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(9).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-slate-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onClick={() => setSelectedDestination(destination)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredDestinations.length === 0 && !isLoading && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <MapPin className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No destinations found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Try adjusting your search criteria or filters to discover amazing travel destinations.
            </p>
          </motion.div>
        )}
      </div>

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
}
