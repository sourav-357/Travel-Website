import React, { useState, useEffect } from "react";
import { TravelGuide } from "@/entities/TravelGuide";
import { Info, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Guide() {
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    setIsLoading(true);
    const data = await TravelGuide.list();
    setGuides(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900">Expert Travel Guides</h1>
          <p className="text-slate-600 mt-2">Tips, tricks, and insights from our AI travel experts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? Array(6).fill(0).map((_, i) => <div key={i} className="h-96 bg-slate-200 rounded-xl animate-pulse"></div>)
            : guides.map(guide => (
              <Card key={guide.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-shadow">
                <img src={guide.image_url} alt={guide.title} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <Badge className="mb-2">{guide.category}</Badge>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{guide.title}</h3>
                  <p className="text-slate-600 line-clamp-3 mb-4">{guide.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.tags?.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  );
}