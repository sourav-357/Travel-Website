import React, { useState, useEffect } from "react";
import { TravelJournal } from "@/entities/TravelJournal";
import { Plus, BookOpen, Calendar, MapPin, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import JournalEditor from "../components/journal/JournalEditor";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setIsLoading(true);
    const data = await TravelJournal.list("-date");
    setEntries(data);
    setIsLoading(false);
  };

  const handleSaveEntry = async (entryData) => {
    if (selectedEntry) {
      await TravelJournal.update(selectedEntry.id, entryData);
    } else {
      await TravelJournal.create(entryData);
    }
    setIsEditorOpen(false);
    setSelectedEntry(null);
    loadEntries();
  };

  const openNewEditor = () => {
    setSelectedEntry(null);
    setIsEditorOpen(true);
  };

  const openEditEditor = (entry) => {
    setSelectedEntry(entry);
    setIsEditorOpen(true);
  };

  const handleDeleteEntry = async (entryId) => {
    await TravelJournal.delete(entryId);
    loadEntries();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Travel Journal</h1>
              <p className="text-slate-600 mt-2">Your personal space to document adventures</p>
            </div>
            <Button onClick={openNewEditor} className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
              <Plus className="w-5 h-5 mr-2" />
              New Entry
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded mb-2 w-1/2"></div>
                <div className="h-20 bg-slate-200 rounded mt-4"></div>
              </Card>
            ))}
          </div>
        ) : entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {entries.map(entry => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl text-slate-800 mb-2">{entry.title}</h3>
                      <div className="flex items-center text-sm text-slate-500 mb-1">
                        <Calendar className="w-4 h-4 mr-2" /> {format(new Date(entry.date), "MMMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        <MapPin className="w-4 h-4 mr-2" /> {entry.destination}
                      </div>
                      <div className="prose prose-sm max-w-none text-slate-600 line-clamp-4" dangerouslySetInnerHTML={{ __html: entry.content }} />
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200/60">
                      <Button variant="ghost" size="sm" onClick={() => openEditEditor(entry)}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteEntry(entry.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24">
            <BookOpen className="mx-auto h-16 w-16 text-slate-400" />
            <h3 className="mt-4 text-xl font-semibold text-slate-700">No journal entries yet</h3>
            <p className="mt-2 text-slate-500">Start documenting your travels by creating a new entry.</p>
            <Button onClick={openNewEditor} className="mt-6">
              <Plus className="w-4 h-4 mr-2" />
              Create First Entry
            </Button>
          </div>
        )}
      </div>
      
      <JournalEditor
        isOpen={isEditorOpen}
        onClose={() => { setIsEditorOpen(false); setSelectedEntry(null); }}
        entry={selectedEntry}
        onSave={handleSaveEntry}
      />
    </div>
  );
}