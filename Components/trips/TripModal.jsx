
import React, { useState, useEffect } from "react";
import { X, MapPin, Calendar, Users, DollarSign, Edit, Trash2, Plus, ClipboardList, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming Label is used, though it's not explicitly in the outline for the packing list items, the `htmlFor` on the label makes it good practice.
import { Trip } from "@/entities/Trip"; // Assuming this entity exists and has an update method.

const statusColors = {
  "planning": "bg-blue-100 text-blue-700 border-blue-200",
  "upcoming": "bg-green-100 text-green-700 border-green-200",
  "in_progress": "bg-purple-100 text-purple-700 border-purple-200",
  "completed": "bg-gray-100 text-gray-700 border-gray-200",
  "cancelled": "bg-red-100 text-red-700 border-red-200"
};

export default function TripModal({ trip, onClose, onUpdate }) {
  const [packingList, setPackingList] = useState(trip?.packing_list || []);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setPackingList(trip?.packing_list || []);
  }, [trip]);

  const updatePackingList = async (newList) => {
    setPackingList(newList);
    // Assuming Trip.update is an asynchronous operation that persists the changes
    // This part depends on how your `Trip` entity is structured for data persistence.
    // Make sure trip.id is available and Trip.update correctly handles the update.
    try {
      await Trip.update(trip.id, { packing_list: newList });
      onUpdate(); // Notify parent component of update
    } catch (error) {
      console.error("Failed to update packing list:", error);
      // Optionally revert state or show an error message
    }
  };

  const handleTogglePacked = (index) => {
    const newList = [...packingList];
    newList[index].packed = !newList[index].packed;
    updatePackingList(newList);
  };
  
  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const newList = [...packingList, { item: newItem.trim(), packed: false }];
    updatePackingList(newList);
    setNewItem("");
  };

  if (!trip) return null;

  return (
    <Dialog open={!!trip} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${trip.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop'})` 
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
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={`${statusColors[trip.status]} border font-medium`}>
                    {trip.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  {trip.trip_type && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      {trip.trip_type}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{trip.title}</h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg font-medium">{trip.destination}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="packing">Packing List</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Trip Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {trip.start_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {format(new Date(trip.start_date), "MMM d, yyyy")}
                            </p>
                            <p className="text-xs text-slate-500">Start Date</p>
                          </div>
                        </div>
                      )}
                      
                      {trip.end_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {format(new Date(trip.end_date), "MMM d, yyyy")}
                            </p>
                            <p className="text-xs text-slate-500">End Date</p>
                          </div>
                        </div>
                      )}

                      {trip.travelers && (
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-semibold text-slate-900">{trip.travelers}</p>
                            <p className="text-xs text-slate-500">Travelers</p>
                          </div>
                        </div>
                      )}

                      {trip.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-amber-600" />
                          <div>
                            <p className="font-semibold text-slate-900">${trip.budget.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">Budget</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {trip.notes && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Notes</h3>
                        <p className="text-slate-600 leading-relaxed">{trip.notes}</p>
                      </div>
                    )}

                    {/* Itinerary */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Itinerary</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Day
                        </Button>
                      </div>
                      
                      {trip.itinerary && trip.itinerary.length > 0 ? (
                        <div className="space-y-4">
                          {trip.itinerary.map((day, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-slate-900">
                                  Day {day.day}
                                  {day.date && (
                                    <span className="text-sm text-slate-500 ml-2">
                                      ({format(new Date(day.date), "MMM d")})
                                    </span>
                                  )}
                                </h4>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              {day.activities && day.activities.length > 0 ? (
                                <div className="space-y-2">
                                  {day.activities.map((activity, actIndex) => (
                                    <div key={actIndex} className="flex gap-3">
                                      <div className="text-sm font-medium text-slate-500 w-16">
                                        {activity.time}
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium text-slate-900">{activity.activity}</p>
                                        {activity.location && (
                                          <p className="text-sm text-slate-600">{activity.location}</p>
                                        )}
                                        {activity.notes && (
                                          <p className="text-sm text-slate-500 mt-1">{activity.notes}</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-500 text-sm">No activities planned for this day</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-slate-50 rounded-xl">
                          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-500">No itinerary planned yet</p>
                          <Button variant="outline" className="mt-3">
                            <Plus className="w-4 h-4 mr-2" />
                            Start Planning
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Trip
                      </Button>
                      <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 font-semibold py-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Calendar
                      </Button>
                      <Button variant="outline" className="w-full border-red-200 hover:bg-red-50 text-red-600 font-semibold py-3">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Trip
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="packing" className="mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Packing Checklist</h3>
                <div className="space-y-2">
                  {packingList.length === 0 && (
                    <div className="text-center py-8 bg-slate-50 rounded-xl">
                      <ClipboardList className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-500">No items in your packing list yet.</p>
                    </div>
                  )}
                  {packingList.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50">
                      <Checkbox id={`item-${index}`} checked={item.packed} onCheckedChange={() => handleTogglePacked(index)} />
                      <label htmlFor={`item-${index}`} className={`flex-1 text-sm font-medium leading-none ${item.packed ? 'line-through text-slate-500' : ''}`}>
                        {item.item}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new item..." onKeyPress={(e) => e.key === 'Enter' && handleAddItem()} />
                  <Button onClick={handleAddItem}><Plus className="w-4 h-4 mr-2" /> Add</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
