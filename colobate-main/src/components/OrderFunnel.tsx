import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2, ChevronRight, Upload, Calendar, Phone, MapPin,
  Video, MessageSquare, Store, FileText, Trash2
} from "lucide-react";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Garment {
  name: string;
  price: number;
  icon: string;
}

interface Fabric {
  name: string;
  price: number;
  image: string;
}

interface FormData {
  // Step 1: Category
  category: "Men" | "Women" | "Kids" | "";

  // Step 2: Garment
  garment: string;
  garmentPrice: number;

  // Step 3: Fabric
  fabricType: "own" | "store" | "video" | "";
  selectedFabric: Fabric | null;
  videoCallDate: string;
  videoCallTime: string;

  // Step 4: Design
  designType: "upload" | "appointment" | "";
  designFile: File | null;
  appointmentType: "video" | "whatsapp" | "store" | "";
  appointmentDate: string;
  appointmentTime: string;

  // Step 5: Measurement
  measurementType: "executive" | "video" | "chart" | "";
  measurementAddress: string;
  measurementDate: string;
  measurementTime: string;
  measurementChart: File | null;

  // Step 6: Contact Info
  fullName: string;
  whatsappNumber: string;
  alternateNumber: string;

  // Step 7: Address & Delivery
  fullAddress: string;
  city: string;
  pincode: string;
  landmark: string;
  pickupDate: string;
  deliveryDate: string;
  specialInstructions: string;
}

interface GarmentsByCategory {
  Men: Garment[];
  Women: Garment[];
  Kids: Garment[];
}

const GARMENTS_BY_CATEGORY: GarmentsByCategory = {
  Men: [
    { name: "Shirt", price: 799, icon: "👕" },
    { name: "Pant", price: 999, icon: "👖" },
    { name: "Kurta", price: 899, icon: "🧵" },
    { name: "Blazer", price: 2499, icon: "🧥" },
  ],
  Women: [
    { name: "Kurti", price: 699, icon: "👗" },
    { name: "Blouse", price: 499, icon: "✨" },
    { name: "Lehenga", price: 1999, icon: "💃" },
    { name: "Suit", price: 1299, icon: "👔" },
  ],
  Kids: [
    { name: "Frock", price: 499, icon: "👧" },
    { name: "Pant", price: 399, icon: "👖" },
    { name: "Shirt", price: 399, icon: "👕" },
  ],
};

const STORE_FABRICS: Fabric[] = [
  { name: "Cotton", price: 0, image: "🧵" },
  { name: "Silk", price: 500, image: "✨" },
  { name: "Linen", price: 300, image: "🌾" },
  { name: "Wool", price: 800, image: "🧶" },
];

export const OrderFunnel = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    garment: "",
    garmentPrice: 0,
    fabricType: "",
    selectedFabric: null,
    videoCallDate: "",
    videoCallTime: "",
    designType: "",
    designFile: null,
    appointmentType: "",
    appointmentDate: "",
    appointmentTime: "",
    measurementType: "",
    measurementAddress: "",
    measurementDate: "",
    measurementTime: "",
    measurementChart: null,
    fullName: "",
    whatsappNumber: "",
    alternateNumber: "",
    fullAddress: "",
    city: "",
    pincode: "",
    landmark: "",
    pickupDate: "",
    deliveryDate: "",
    specialInstructions: "",
  });

  const goToNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.category !== "";
      case 2:
        return formData.garment !== "";
      case 3:
        if (formData.fabricType === "video") {
          return formData.videoCallDate !== "" && formData.videoCallTime !== "";
        }
        return formData.fabricType !== "";
      case 4:
        if (formData.designType === "upload") {
          return formData.designFile !== null;
        } else if (formData.designType === "appointment") {
          return (
            formData.appointmentType !== "" &&
            formData.appointmentDate !== "" &&
            formData.appointmentTime !== ""
          );
        }
        return false;
      case 5:
        if (formData.measurementType === "executive") {
          return (
            formData.measurementAddress !== "" &&
            formData.measurementDate !== "" &&
            formData.measurementTime !== ""
          );
        } else if (formData.measurementType === "video") {
          return (
            formData.measurementDate !== "" &&
            formData.measurementTime !== ""
          );
        } else if (formData.measurementType === "chart") {
          return formData.measurementChart !== null;
        }
        return false;
      case 6:
        return formData.fullName !== "" && formData.whatsappNumber !== "";
      case 7:
        return (
          formData.fullAddress !== "" &&
          formData.city !== "" &&
          formData.pincode !== "" &&
          formData.pickupDate !== "" &&
          formData.deliveryDate !== ""
        );
      default:
        return false;
    }
  };

  const calculateTotalPrice = (): number => {
    let total = formData.garmentPrice;
    if (formData.selectedFabric) {
      total += formData.selectedFabric.price;
    }
    return total;
  };

  const handleConfirmOrder = () => {
    const totalPrice = calculateTotalPrice();
    const message = `Hi Collibet Team, I want to place a new tailoring order:

*Garment Details:*
Category: ${formData.category}
Item: ${formData.garment} - ₹${formData.garmentPrice}

*Fabric:*
${formData.fabricType === "own" ? "Own Fabric (Will provide)" : formData.fabricType === "store" ? `Store Fabric: ${formData.selectedFabric?.name} - ₹${formData.selectedFabric?.price || 0}` : "Book Video Call"}

*Design:*
${formData.designType === "upload" ? "Design uploaded" : `Appointment: ${formData.appointmentType}`}

*Measurement:*
${formData.measurementType === "executive" ? "Executive Visit" : formData.measurementType === "video" ? "Video Call" : "Chart Uploaded"}

*Contact:*
Name: ${formData.fullName}
WhatsApp: ${formData.whatsappNumber}
${formData.alternateNumber ? `Alternate: ${formData.alternateNumber}` : ""}

*Delivery Address:*
${formData.fullAddress}
${formData.landmark ? `Landmark: ${formData.landmark}` : ""}
${formData.city}, ${formData.pincode}

*Total Price: ₹${totalPrice}*

Please confirm my order!`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setCurrentStep(8);
    toast.success("Order submitted! Redirecting to WhatsApp...");
  };

  const renderStep = () => {
    switch (currentStep) {
      // Step 1: Category Selection
      case 1:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              Select Category
            </h2>
            <p className="text-muted-foreground mb-6">
              What type of clothing would you like?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["Men", "Women", "Kids"] as const).map((cat) => (
                <Card
                  key={cat}
                  className={`cursor-pointer transition-all hover:shadow-lg ${formData.category === cat
                      ? "border-accent border-2 shadow-lg"
                      : "hover:border-accent"
                    }`}
                  onClick={() =>
                    setFormData({ ...formData, category: cat })
                  }
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-4">
                      {cat === "Men"
                        ? "👔"
                        : cat === "Women"
                          ? "👗"
                          : "👧"}
                    </div>
                    <p className="font-semibold text-lg">{cat}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      // Step 2: Garment Selection
      case 2:
        const garments =
          GARMENTS_BY_CATEGORY[formData.category as keyof typeof GARMENTS_BY_CATEGORY] || [];
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              Select Garment
            </h2>
            <p className="text-muted-foreground mb-6">
              Choose what you want to stitch from our options:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {garments.map((garment) => (
                <Card
                  key={garment.name}
                  className={`cursor-pointer transition-all hover:shadow-lg ${formData.garment === garment.name
                      ? "border-accent border-2 shadow-lg"
                      : "hover:border-accent"
                    }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      garment: garment.name,
                      garmentPrice: garment.price,
                    })
                  }
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{garment.icon}</div>
                    <p className="font-semibold">{garment.name}</p>
                    <p className="text-accent font-bold text-lg mt-2">
                      ₹{garment.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      // Step 3: Fabric Selection
      case 3:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              Select Fabric
            </h2>
            <p className="text-muted-foreground mb-6">
              How would you like to provide the fabric?
            </p>
            <div className="space-y-3">
              {/* Own Fabric */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.fabricType === "own"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({ ...formData, fabricType: "own" })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">📦 Own Fabric</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Executive will collect from your address
                  </p>
                </CardContent>
              </Card>

              {/* Store Fabric */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.fabricType === "store"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({ ...formData, fabricType: "store" })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">🛍️ Store Fabric</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose from our available fabric options
                  </p>
                </CardContent>
              </Card>

              {/* Video Call for Fabric */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.fabricType === "video"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({ ...formData, fabricType: "video" })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">📹 Video Call</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    View fabric samples via video call
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Store Fabric Selection */}
            {formData.fabricType === "store" && (
              <div className="mt-6 pt-6 border-t space-y-3">
                <p className="font-semibold text-primary">
                  Choose Fabric:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {STORE_FABRICS.map((fabric) => (
                    <Card
                      key={fabric.name}
                      className={`cursor-pointer transition-all hover:shadow-lg ${formData.selectedFabric?.name === fabric.name
                          ? "border-accent border-2 shadow-lg"
                          : "hover:border-accent"
                        }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          selectedFabric: fabric,
                        })
                      }
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{fabric.image}</div>
                        <p className="font-semibold">{fabric.name}</p>
                        {fabric.price > 0 && (
                          <p className="text-accent font-bold mt-1">
                            +₹{fabric.price}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Video Call Booking */}
            {formData.fabricType === "video" && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <p className="font-semibold text-primary">
                  Schedule Video Call:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.videoCallDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          videoCallDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.videoCallTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          videoCallTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      // Step 4: Design Selection
      case 4:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              Upload Design or Book Appointment
            </h2>
            <p className="text-muted-foreground mb-6">
              How would you like to provide the design?
            </p>

            <div className="space-y-3">
              {/* Upload Design */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.designType === "upload"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({ ...formData, designType: "upload" })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">📤 Upload Design</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload design image or PDF
                  </p>
                </CardContent>
              </Card>

              {/* Book Appointment */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.designType === "appointment"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    designType: "appointment",
                  })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">📅 Book Appointment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discuss design with our expert
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Upload Design Section */}
            {formData.designType === "upload" && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        designFile: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="design-upload"
                  />
                  <label
                    htmlFor="design-upload"
                    className="cursor-pointer block"
                  >
                    <p className="font-medium text-primary">
                      Click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, PDF (max. 10MB)
                    </p>
                  </label>
                </div>
                {formData.designFile && (
                  <div className="bg-accent/10 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {formData.designFile.name}
                    </span>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          designFile: null,
                        })
                      }
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Appointment Section */}
            {formData.designType === "appointment" && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <p className="font-semibold text-primary mb-3">
                  Choose Appointment Type:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      type: "video",
                      icon: "📹",
                      label: "Video Call",
                    },
                    {
                      type: "whatsapp",
                      icon: "💬",
                      label: "WhatsApp Call",
                    },
                    {
                      type: "store",
                      icon: "🏪",
                      label: "Visit Store",
                    },
                  ].map((apt) => (
                    <Card
                      key={apt.type}
                      className={`cursor-pointer transition-all hover:shadow-lg ${formData.appointmentType === apt.type
                          ? "border-accent border-2 shadow-lg"
                          : "hover:border-accent"
                        }`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          appointmentType: apt.type as
                            | "video"
                            | "whatsapp"
                            | "store",
                        })
                      }
                    >
                      <CardContent className="p-4">
                        <p className="font-semibold">
                          {apt.icon} {apt.label}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {formData.appointmentType && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    <p className="font-semibold text-primary">
                      Schedule Appointment:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Date
                        </label>
                        <Input
                          type="date"
                          value={formData.appointmentDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              appointmentDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Time
                        </label>
                        <Input
                          type="time"
                          value={formData.appointmentTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              appointmentTime: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      // Step 5: Measurement Selection
      case 5:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              How Should We Take Measurements?
            </h2>
            <p className="text-muted-foreground mb-6">
              Choose your preferred measurement method:
            </p>

            <div className="space-y-3">
              {/* Executive Visit */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.measurementType === "executive"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    measurementType: "executive",
                  })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">👤 Executive Visit</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our expert will visit to take measurements
                  </p>
                </CardContent>
              </Card>

              {/* Video Call */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.measurementType === "video"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    measurementType: "video",
                  })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">📹 Video Call</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll guide you through measuring
                  </p>
                </CardContent>
              </Card>

              {/* Upload Chart */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${formData.measurementType === "chart"
                    ? "border-accent border-2 shadow-lg"
                    : "hover:border-accent"
                  }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    measurementType: "chart",
                  })
                }
              >
                <CardContent className="p-4">
                  <p className="font-semibold">📊 Upload Chart</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload your existing measurement chart
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Executive Visit */}
            {formData.measurementType === "executive" && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <p className="font-semibold text-primary mb-3">
                  Schedule Executive Visit:
                </p>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>
                  <Textarea
                    placeholder="Enter your full address"
                    value={formData.measurementAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurementAddress: e.target.value,
                      })
                    }
                    className="min-h-24"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.measurementDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          measurementDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.measurementTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          measurementTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Video Call */}
            {formData.measurementType === "video" && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <p className="font-semibold text-primary mb-3">
                  Schedule Video Call:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={formData.measurementDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          measurementDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Time
                    </label>
                    <Input
                      type="time"
                      value={formData.measurementTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          measurementTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Upload Chart */}
            {formData.measurementType === "chart" && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        measurementChart: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                    id="chart-upload"
                  />
                  <label
                    htmlFor="chart-upload"
                    className="cursor-pointer block"
                  >
                    <p className="font-medium text-primary">
                      Click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF, DOC, DOCX, Images (max. 10MB)
                    </p>
                  </label>
                </div>
                {formData.measurementChart && (
                  <div className="bg-accent/10 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {formData.measurementChart.name}
                    </span>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          measurementChart: null,
                        })
                      }
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      // Step 6: Contact Information
      case 6:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              Your Contact Details
            </h2>
            <p className="text-muted-foreground mb-6">
              How can we reach you?
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  WhatsApp Number *
                </label>
                <Input
                  type="tel"
                  placeholder="Enter WhatsApp number"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsappNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Alternate Number (Optional)
                </label>
                <Input
                  type="tel"
                  placeholder="Enter alternate number"
                  value={formData.alternateNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alternateNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        );

      // Step 7: Address & Delivery
      case 7:
        return (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-2xl font-heading text-primary mb-6">
              Delivery Information
            </h2>
            <p className="text-muted-foreground mb-6">
              Where should we deliver your order?
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Address *
                </label>
                <Textarea
                  placeholder="Enter your complete address"
                  value={formData.fullAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullAddress: e.target.value,
                    })
                  }
                  className="min-h-20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City *
                  </label>
                  <Input
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pincode *
                  </label>
                  <Input
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pincode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Landmark (Optional)
                </label>
                <Input
                  placeholder="Enter landmark"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      landmark: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pickup Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickupDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expected Delivery Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deliveryDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Special Instructions (Optional)
                </label>
                <Textarea
                  placeholder="Any special instructions for delivery?"
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialInstructions: e.target.value,
                    })
                  }
                  className="min-h-20"
                />
              </div>
            </div>
          </div>
        );

      // Step 8: Order Summary & Confirmation
      case 8:
        const total = calculateTotalPrice();
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-4 mb-8">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading text-primary">
                  🎉 Thank You!
                </h2>
                <p className="text-lg text-muted-foreground mt-2">
                  Order placed successfully!
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <Card className="bg-accent/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-primary mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Garment:</span>
                    <span className="font-medium">
                      {formData.garment} ({formData.category})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Garment Price:</span>
                    <span className="font-medium">₹{formData.garmentPrice}</span>
                  </div>

                  {formData.selectedFabric && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fabric:</span>
                        <span className="font-medium">
                          {formData.selectedFabric.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Fabric Price:
                        </span>
                        <span className="font-medium">
                          +₹{formData.selectedFabric.price}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-primary">
                      Total Price:
                    </span>
                    <span className="font-bold text-accent text-lg">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Delivery Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-primary mb-4">
                  Delivery Details
                </h3>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {formData.fullName}
                  </p>
                  <p>
                    <span className="font-medium">WhatsApp:</span>{" "}
                    {formData.whatsappNumber}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {formData.fullAddress}, {formData.landmark && `${formData.landmark}, `}
                    {formData.city} - {formData.pincode}
                  </p>
                  <p>
                    <span className="font-medium">Pickup:</span>{" "}
                    {formData.pickupDate}
                  </p>
                  <p>
                    <span className="font-medium">Delivery:</span>{" "}
                    {formData.deliveryDate}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-accent/30">
              <p className="text-sm text-center">
                <span className="font-semibold">📱 Our team will contact you on WhatsApp</span>
              </p>
              <p className="text-xs text-center text-muted-foreground mt-2">
                within 10 minutes to confirm pickup and measurements.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="order" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          {currentStep < 8 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h1 className="text-lg font-semibold text-primary">
                    Step {currentStep} of 7
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((currentStep / 7) * 100)}% Complete
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">
                    ₹{calculateTotalPrice()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Estimated Total
                  </p>
                </div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 7) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Step Indicator Dots */}
          {currentStep < 8 && (
            <div className="flex justify-between mb-8 px-2">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${step === currentStep
                      ? "bg-accent text-accent-foreground shadow-lg scale-110"
                      : step < currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 dark:bg-gray-700 text-muted-foreground"
                    }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
              ))}
            </div>
          )}

          {/* Step Content */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
            <CardContent className="p-6 md:p-10">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {currentStep < 8 && (
            <div className="mt-8 flex gap-4 justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}
              >
                ← Back
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={
                  currentStep === 7
                    ? handleConfirmOrder
                    : goToNextStep
                }
                disabled={!isStepValid()}
                className={`flex-1 ${!isStepValid()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
              >
                {currentStep === 7 ? (
                  <>
                    Confirm Order <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Restart Button on Success */}
          {currentStep === 8 && (
            <div className="mt-8 text-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    category: "",
                    garment: "",
                    garmentPrice: 0,
                    fabricType: "",
                    selectedFabric: null,
                    videoCallDate: "",
                    videoCallTime: "",
                    designType: "",
                    designFile: null,
                    appointmentType: "",
                    appointmentDate: "",
                    appointmentTime: "",
                    measurementType: "",
                    measurementAddress: "",
                    measurementDate: "",
                    measurementTime: "",
                    measurementChart: null,
                    fullName: "",
                    whatsappNumber: "",
                    alternateNumber: "",
                    fullAddress: "",
                    city: "",
                    pincode: "",
                    landmark: "",
                    pickupDate: "",
                    deliveryDate: "",
                    specialInstructions: "",
                  });
                }}
              >
                Start Another Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
