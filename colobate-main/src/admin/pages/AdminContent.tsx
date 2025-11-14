import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Trash2, Plus } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  section: string;
  type: string;
  lastUpdated: string;
  status: "published" | "draft";
}

export const AdminContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const contentItems: ContentItem[] = [
    {
      id: "CNT001",
      title: "Hero Section Heading",
      section: "Hero",
      type: "Text",
      lastUpdated: "2024-11-14",
      status: "published",
    },
    {
      id: "CNT002",
      title: "Featured Testimonials",
      section: "Social Proof",
      type: "Video",
      lastUpdated: "2024-11-10",
      status: "published",
    },
    {
      id: "CNT003",
      title: "Service Descriptions",
      section: "Services",
      type: "Text",
      lastUpdated: "2024-11-12",
      status: "draft",
    },
    {
      id: "CNT004",
      title: "Pricing Information",
      section: "Pricing",
      type: "Text",
      lastUpdated: "2024-11-08",
      status: "published",
    },
    {
      id: "CNT005",
      title: "FAQ Content",
      section: "FAQ",
      type: "Text",
      lastUpdated: "2024-11-14",
      status: "draft",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Content Management</h1>
          <p className="text-muted-foreground mt-1">Edit website content, texts, and media</p>
        </div>
        <Button
          variant="gold"
          size="lg"
          onClick={() => setShowForm(!showForm)}
          className="flex gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Content
        </Button>
      </div>

      {/* Edit Form */}
      {showForm && (
        <Card className="border-accent border-2">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Content" : "Create New Content"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input placeholder="Enter content title" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="section" className="block text-sm font-medium mb-2">Section</label>
                <select id="section" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600">
                  <option>Hero</option>
                  <option>Services</option>
                  <option>Pricing</option>
                  <option>FAQ</option>
                  <option>Social Proof</option>
                </select>
              </div>
              <div>
                <label htmlFor="content-type" className="block text-sm font-medium mb-2">Content Type</label>
                <select id="content-type" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600">
                  <option>Text</option>
                  <option>Image</option>
                  <option>Video</option>
                  <option>Link</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <Textarea
                placeholder="Enter your content here..."
                className="min-h-32"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="gold">
                {editingId ? "Update Content" : "Publish"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentItems.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-lg transition-shadow flex flex-col"
          >
            <CardContent className="p-6 flex-1">
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === "published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>

              <h3 className="font-semibold text-primary mb-2">{item.title}</h3>

              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>Section: {item.section}</p>
                <p>Type: {item.type}</p>
                <p>Updated: {item.lastUpdated}</p>
              </div>
            </CardContent>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setEditingId(item.id);
                  setShowForm(true);
                }}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Website Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Website Sections Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Hero Banner", "Services Section", "Pricing", "Testimonials", "FAQ", "Footer"].map((section) => (
              <div
                key={section}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <span className="font-medium">{section}</span>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
