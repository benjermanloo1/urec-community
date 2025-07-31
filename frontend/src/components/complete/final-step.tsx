"use client";

import { useState } from "react";

import { useSignUp } from "@/app/context/SignUpContext";
import { CompleteCard } from "./complete-card";
import { Camera, Link, MessageSquare, Upload, User, X } from "lucide-react";

export const FinalStep = () => {
  const { data, updateData } = useSignUp();

  const [formData, setFormData] = useState({
    bio: "",
    instagram: "",
    snapchat: "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
          if (readerEvent.target?.result) {
            setProfileImage(readerEvent.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
          if (readerEvent.target?.result) {
            setProfileImage(readerEvent.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const handleComplete = () => {
    const updateFields = {
      bio: formData.bio,
      instagram: formData.instagram,
      snapchat: formData.snapchat,
    };

    updateData({ personalInfo: updateFields });
  };

  const handleSkip = () => {
    const skipped = {
      bio: "",
      instagram: "",
      snapchat: "",
    };

    updateData({
      personalInfo: skipped,
    });
  };

  return (
    <CompleteCard>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#450084] to-[#B599CE] rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Almost Done!</h1>
        <p className="text-gray-600">Add some optional details to personalize your profile</p>
      </div>

      <div className="space-y-6 text-black">
        {/* Profile Picture Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profileImage ? (
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div
                className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  dragActive ? "border-[#450084] bg-[#450084]/5" : "border-gray-300 hover:border-[#450084]"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drop an image here or click to browse</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell us a bit about yourself..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#450084] focus:border-transparent transition-all resize-none"
            maxLength={150}
          />
          <p className="text-xs text-gray-500 text-right">{formData.bio.length}/150 characters</p>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            <Link className="w-4 h-4 inline mr-2" />
            Social Media & Links
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="v" className="block text-xs font-medium text-gray-600 mb-1">
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#450084] focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="snapchat" className="block text-xs font-medium text-gray-600 mb-1">
                Snapchat
              </label>
              <input
                type="text"
                id="snapchat"
                name="snapchat"
                value={formData.snapchat}
                onChange={handleInputChange}
                placeholder="@username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#450084] focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={handleSkip}
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Skip for now
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-[#450084] to-[#B599CE] text-white rounded-lg hover:from-[#5a0a9f] hover:to-[#c5a5d8] transition-all font-medium shadow-lg"
        >
          Complete Profile
        </button>
      </div>
    </CompleteCard>
  );
};
