import React, { useState, useEffect } from "react";
import { Trip } from "@/entities/Trip";
import { Plus, Calendar, MapPin, Users, DollarSign, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

import TripCard from "../components/trips/TripCard";
import TripModal from "../components/trips/TripModal";
import CreateTripModal from "../components/trips/CreateTripModal";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    setIsLoading(true);
    const data = await Trip.list("-created_date");
    setTrips(data);
    setIsLoading(false);
  };

  const handleCreateTrip = async (tripData) => {
    await Trip.create(tripData);
    setShowCreateModal(false);
    loadTrips();
  };

  const filterTrips = (status) => {
    if (status === "all") return trips;
    return trips.filter(trip => trip.status === status);
  };

  const getUpcomingTrips = () => filterTrips("upcoming");
  const getPlanningTrips = () => filterTrips("planning");
  const getCompletedTrips = () => filterTrips("completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
              <p className="text-slate-600 mt-2">Plan, organize, and track your adventures</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Plan New Trip
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{getPlanningTrips().length}</p>
                <p className="text-sm text-slate-600">Planning</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{getUpcomingTrips().length}</p>
                <p className="text-sm text-slate-600">Upcoming</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{getCompletedTrips().length}</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  ${trips.reduce((sum, trip) => sum + (trip.budget || 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-slate-600">Total Budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200/60 p-1">
            <TabsTrigger value="all" className="px-6 py-2">All Trips ({trips.length})</TabsTrigger>
            <TabsTrigger value="planning" className="px-6 py-2">Planning ({getPlanningTrips().length})</TabsTrigger>
            <TabsTrigger value="upcoming" className="px-6 py-2">Upcoming ({getUpcomingTrips().length})</TabsTrigger>
            <TabsTrigger value="completed" className="px-6 py-2">Completed ({getCompletedTrips().length})</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="all">
              <TripGrid trips={trips} isLoading={isLoading} onTripClick={setSelectedTrip} />
            </TabsContent>
            <TabsContent value="planning">
              <TripGrid trips={getPlanningTrips()} isLoading={isLoading} onTripClick={setSelectedTrip} />
            </TabsContent>
            <TabsContent value="upcoming">
              <TripGrid trips={getUpcomingTrips()} isLoading={isLoading} onTripClick={setSelectedTrip} />
            </TabsContent>
            <TabsContent value="completed">
              <TripGrid trips={getCompletedTrips()} isLoading={isLoading} onTripClick={setSelectedTrip} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <TripModal
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onUpdate={loadTrips}
      />

      <CreateTripModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTrip}
      />
    </div>
  );
}

function TripGrid({ trips, isLoading, onTripClick }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded mb-3"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3 mb-4"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <MapPin className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No trips yet</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Start planning your next adventure and create unforgettable memories.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence>
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onClick={() => onTripClick(trip)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}