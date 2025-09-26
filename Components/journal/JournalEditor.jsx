import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadFile } from "@/integrations/Core";
import { Upload, Image as ImageIcon, X } from "lucide-react";

export default function JournalEditor({ isOpen, onClose, entry, onSave }) {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title || "");
      setDestination(entry.destination || "");
      setDate(entry.date ? entry.date.split('T')[0] : "");
      setContent(entry.content || "");
      setPhotos(entry.photos || []);
    } else {
      setTitle("");
      setDestination("");
      setDate(new Date().toISOString().split('T')[0]);
      setContent("");
      setPhotos([]);
    }
  }, [entry, isOpen]);

  const handleSave = async () => {
    setIsSubmitting(true);
    await onSave({ title, destination, date, content, photos });
    setIsSubmitting(false);
  };
  
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const { file_url } = await UploadFile({ file });
    setPhotos(prev => [...prev, file_url]);
  };
  
  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{entry ? "Edit Journal Entry" : "New Journal Entry"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="destination" className="text-right">Destination</Label>
            <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="col-span-3" />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <ReactQuill theme="snow" value={content} onChange={setContent} style={{backgroundColor: 'white'}}/>
          </div>
          <div className="space-y-2">
            <Label>Photos</Label>
            <div className="flex flex-wrap gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={photo} alt={`upload ${index}`} className="w-24 h-24 object-cover rounded-md" />
                  <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6" onClick={() => removePhoto(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Label htmlFor="photo-upload" className="w-24 h-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-50">
                <Upload className="w-6 h-6 text-slate-400" />
                <Input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Entry'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}