
import React, { useState } from "react";
import { Calendar, MapPin, Users, DollarSign, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InvokeLLM } from "@/integrations/Core";

const tripTypes = ["Adventure", "Culture", "Beach", "City", "Nature", "Romance", "Family", "Solo", "Business", "Luxury"];

export default function CreateTripModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    budget: "",
    travelers: 1,
    trip_type: "",
    notes: "",
    itinerary: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateItinerary = async () => {
    if (!formData.destination || !formData.start_date || !formData.end_date) {
        alert("Please provide a destination, start date, and end date to generate an itinerary.");
        return;
    }
    setIsGenerating(true);
    const prompt = `Create a travel itinerary for a trip to ${formData.destination} from ${formData.start_date} to ${formData.end_date}. The travel style is ${formData.trip_type || 'general'}. Provide a day-by-day plan with activities including suggested times, locations, and brief notes.`;
    const schema = {
        "type": "object",
        "properties": {
            "itinerary": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "day": {"type": "number"},
                        "date": {"type": "string", "format": "date"},
                        "activities": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "time": {"type": "string"},
                                    "activity": {"type": "string"},
                                    "location": {"type": "string"},
                                    "notes": {"type": "string"}
                                }
                            }
                        }
                    },
                    "required": ["day", "date", "activities"]
                }
            }
        },
        "required": ["itinerary"]
    };
    
    try {
        const result = await InvokeLLM({ prompt, response_json_schema: schema });
        if (result && result.itinerary) {
            setFormData(prev => ({ ...prev, itinerary: result.itinerary }));
        } else {
            console.warn("InvokeLLM returned no itinerary or an unexpected structure:", result);
            alert("The AI generated an itinerary, but it couldn't be parsed correctly. Please try again or adjust your prompt.");
        }
    } catch (error) {
        console.error("Failed to generate itinerary:", error);
        alert("Sorry, I couldn't generate an itinerary right now. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const tripData = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      travelers: parseInt(formData.travelers),
      status: "planning"
    };

    await onSubmit(tripData);
    setIsSubmitting(false);
    setFormData({
      title: "",
      destination: "",
      start_date: "",
      end_date: "",
      budget: "",
      travelers: 1,
      trip_type: "",
      notes: "",
      itinerary: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Plan New Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Trip Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Summer Adventure in Japan"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="destination"
                  placeholder="e.g., Tokyo, Japan"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  required
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange('end_date', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => handleInputChange('travelers', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trip_type">Trip Type</Label>
            <Select value={formData.trip_type} onValueChange={(value) => handleInputChange('trip_type', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select trip type" />
              </SelectTrigger>
              <SelectContent>
                {tripTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
              <div className="flex justify-between items-center">
                  <Label>Itinerary</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={generateItinerary} 
                    disabled={isGenerating || !formData.destination || !formData.start_date || !formData.end_date}
                  >
                      <Sparkles className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                      {isGenerating ? 'Generating...' : 'Suggest with AI'}
                  </Button>
              </div>
              <div className="max-h-40 overflow-y-auto space-y-2 rounded-md border p-4 bg-slate-50">
                  {formData.itinerary && formData.itinerary.length > 0 ? (
                      formData.itinerary.map(day => (
                          <div key={day.day}>
                              <p className="font-semibold text-sm">Day {day.day}: {day.date ? new Date(day.date).toLocaleDateString() : 'N/A'}</p>
                              <ul className="list-disc pl-5 text-sm text-slate-600">
                                  {day.activities.map((act, i) => (
                                    <li key={i}>
                                      {act.time && <span>{act.time} - </span>}
                                      {act.activity}
                                      {act.location && <span className="text-slate-400"> ({act.location})</span>}
                                    </li>
                                  ))}
                              </ul>
                          </div>
                      ))
                  ) : <p className="text-sm text-center text-slate-500">No itinerary yet. Generate one with AI!</p>}
              </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional details about your trip..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="h-24"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.title || !formData.destination}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? "Creating..." : "Create Trip"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
