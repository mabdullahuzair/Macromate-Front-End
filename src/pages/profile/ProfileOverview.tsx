import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Edit3,
  Save,
  X,
  User,
  Ruler,
  Scale,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function ProfileOverview() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    bio: "Fitness enthusiast on a journey to better health. Love cooking healthy meals and trying new workout routines! 🏃‍♂️💪",
    height: "5'9\"",
    weight: "165 lbs",
    goalCalories: "2100",
    age: "28",
    location: "San Francisco, CA",
  });
  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const stats = [
    {
      label: "Days Active",
      value: "127",
      icon: Target,
      color: "text-success",
    },
    {
      label: "Weight Lost",
      value: "12 lbs",
      icon: Scale,
      color: "text-brand-primary",
    },
    {
      label: "Workouts",
      value: "89",
      icon: Target,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-neutral-100"
      >
        <div className="px-4 py-4 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <ArrowLeft size={20} className="text-neutral-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Profile</h1>
                <p className="text-sm text-neutral-600">Your personal info</p>
              </div>
            </div>

            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              size="sm"
              className={isEditing ? "" : "gradient-bg text-white"}
            >
              {isEditing ? (
                <>
                  <X size={16} className="mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 size={16} className="mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Profile Picture & Basic Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder-avatar.jpg"
                  alt={profileData.name}
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors"
                >
                  <Camera size={14} />
                </motion.button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-text-primary"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="mt-1 text-center font-semibold"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="bio"
                      className="text-sm font-medium text-text-primary"
                    >
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                      className="mt-1 min-h-[80px] resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="location"
                      className="text-sm font-medium text-text-primary"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                      className="mt-1 text-center"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex-1 gradient-bg text-white"
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="viewing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <h2 className="text-2xl font-bold text-text-primary">
                    {profileData.name}
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
                    {profileData.bio}
                  </p>
                  <p className="text-sm text-neutral-500">
                    📍 {profileData.location}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Your Progress
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neutral-50 flex items-center justify-center">
                      <Icon size={20} className={stat.color} />
                    </div>
                    <div className="text-xl font-bold text-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-neutral-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Physical Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Physical Stats
              </h3>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="ghost"
                  size="sm"
                  className="text-brand-primary hover:text-brand-secondary"
                >
                  <Edit3 size={16} />
                </Button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="stats-editing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <Label
                      htmlFor="height"
                      className="text-sm font-medium text-text-primary"
                    >
                      Height
                    </Label>
                    <Input
                      id="height"
                      value={editData.height}
                      onChange={(e) =>
                        setEditData({ ...editData, height: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="weight"
                      className="text-sm font-medium text-text-primary"
                    >
                      Weight
                    </Label>
                    <Input
                      id="weight"
                      value={editData.weight}
                      onChange={(e) =>
                        setEditData({ ...editData, weight: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="age"
                      className="text-sm font-medium text-text-primary"
                    >
                      Age
                    </Label>
                    <Input
                      id="age"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({ ...editData, age: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="goalCalories"
                      className="text-sm font-medium text-text-primary"
                    >
                      Daily Goal
                    </Label>
                    <Input
                      id="goalCalories"
                      value={editData.goalCalories}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          goalCalories: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="stats-viewing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <Ruler
                      size={20}
                      className="mx-auto mb-2 text-neutral-600"
                    />
                    <div className="font-semibold text-text-primary">
                      {profileData.height}
                    </div>
                    <div className="text-sm text-neutral-600">Height</div>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <Scale
                      size={20}
                      className="mx-auto mb-2 text-neutral-600"
                    />
                    <div className="font-semibold text-text-primary">
                      {profileData.weight}
                    </div>
                    <div className="text-sm text-neutral-600">Weight</div>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <User size={20} className="mx-auto mb-2 text-neutral-600" />
                    <div className="font-semibold text-text-primary">
                      {profileData.age}
                    </div>
                    <div className="text-sm text-neutral-600">Age</div>
                  </div>
                  <div className="text-center p-3 bg-neutral-50 rounded-lg">
                    <Target
                      size={20}
                      className="mx-auto mb-2 text-neutral-600"
                    />
                    <div className="font-semibold text-text-primary">
                      {profileData.goalCalories}
                    </div>
                    <div className="text-sm text-neutral-600">Daily Goal</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Public Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <Button
              variant="outline"
              className="w-full h-12 border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5"
            >
              View Public Profile
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
