import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Bell, Lock, Palette } from "lucide-react";

export const AdminSettings = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage business settings and preferences</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Business Information</CardTitle>
          <Button variant="gold" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <Input defaultValue="Collibet Tailoring" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" defaultValue="info@collibet.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input defaultValue="+91 98765 43210" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input defaultValue="Ranchi" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <Input defaultValue="Jharkhand" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Address</label>
            <Textarea defaultValue="123 Main Road, Ranchi, Jharkhand 834001" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business Description</label>
            <Textarea
              defaultValue="Premium custom tailoring for men & women. Your perfect fit, delivered in 24 hours."
              className="min-h-24"
            />
          </div>
        </CardContent>
      </Card>

      {/* Service Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Service Settings</CardTitle>
          <Button variant="gold" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Delivery Time (hours)</label>
            <Input type="number" defaultValue="24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Base Price (₹)</label>
              <Input type="number" defaultValue="2500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Delivery Charge (₹)</label>
              <Input type="number" defaultValue="0" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Working Days</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={day !== "Sunday"} className="rounded" />
                  <span className="text-sm">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Opening Time</label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Closing Time</label>
              <Input type="time" defaultValue="20:00" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            <CardTitle>Communication</CardTitle>
          </div>
          <Button variant="gold" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive order updates via email</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">WhatsApp Notifications</p>
                <p className="text-xs text-muted-foreground">Send order updates via WhatsApp</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">Send critical alerts via SMS</p>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium mb-2">WhatsApp Business Number</label>
            <Input defaultValue="919876543210" />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            <CardTitle>Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-4">Change Password</label>
            <div className="space-y-3">
              <div>
                <label htmlFor="current-pass" className="block text-xs font-medium mb-1">Current Password</label>
                <Input id="current-pass" type="password" placeholder="Enter current password" />
              </div>
              <div>
                <label htmlFor="new-pass" className="block text-xs font-medium mb-1">New Password</label>
                <Input id="new-pass" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label htmlFor="confirm-pass" className="block text-xs font-medium mb-1">Confirm Password</label>
                <Input id="confirm-pass" type="password" placeholder="Confirm new password" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-accent" />
            <CardTitle>Theme & Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">Theme Mode</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 p-3 border-2 border-primary rounded-lg cursor-pointer">
                <input type="radio" name="theme" defaultChecked className="w-4 h-4" />
                <span className="text-sm font-medium">Light</span>
              </label>
              <label className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg cursor-pointer">
                <input type="radio" name="theme" className="w-4 h-4" />
                <span className="text-sm font-medium">Dark</span>
              </label>
              <label className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg cursor-pointer">
                <input type="radio" name="theme" className="w-4 h-4" />
                <span className="text-sm font-medium">Auto</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-blue-500 rounded-lg cursor-pointer border-2 border-blue-500" />
              <div className="w-12 h-12 bg-green-500 rounded-lg cursor-pointer border-2 border-gray-300" />
              <div className="w-12 h-12 bg-purple-500 rounded-lg cursor-pointer border-2 border-gray-300" />
              <div className="w-12 h-12 bg-red-500 rounded-lg cursor-pointer border-2 border-gray-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
