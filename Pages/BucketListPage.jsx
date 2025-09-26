import React, { useState, useEffect } from "react";
import { BucketList as BucketListEntity } from "@/entities/BucketList";
import { Plus, Heart, Edit, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function BucketListPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    const data = await BucketListEntity.list();
    // Simple sort for now, would be better to have an order field
    setItems(data.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1)));
    setIsLoading(false);
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    // Here you would typically update the order in the backend
  };
  
  const handleToggleComplete = async (item) => {
    const updatedItem = await BucketListEntity.update(item.id, { completed: !item.completed });
    setItems(prev => prev.map(i => i.id === item.id ? updatedItem : i));
  };
  
  const priorityColors = {
    "Must-do": "bg-red-100 text-red-700",
    "High": "bg-orange-100 text-orange-700",
    "Medium": "bg-yellow-100 text-yellow-700",
    "Low": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Bucket List</h1>
              <p className="text-slate-600 mt-2">Dream, plan, and achieve your travel goals</p>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
              <Plus className="w-5 h-5 mr-2" />
              Add Dream
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="bucketlist">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white/80 backdrop-blur-sm border-slate-200/60 transition-opacity ${item.completed ? 'opacity-60' : ''}`}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div {...provided.dragHandleProps} className="cursor-grab">
                            <GripVertical className="w-5 h-5 text-slate-400" />
                          </div>
                          <Checkbox checked={item.completed} onCheckedChange={() => handleToggleComplete(item)} />
                          <div className="flex-grow">
                            <p className={`font-semibold text-slate-800 ${item.completed ? 'line-through' : ''}`}>{item.title}</p>
                            <p className="text-sm text-slate-500">{item.destination}</p>
                          </div>
                          <Badge className={priorityColors[item.priority]}>{item.priority}</Badge>
                          <Button variant="ghost" size="icon"><Edit className="w-4 h-4 text-slate-500" /></Button>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}