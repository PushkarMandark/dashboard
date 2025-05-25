"use client";

import { Save, X } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductEditForm = ({ product, isOpen, onClose, onSave, mode = "edit" }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    status: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Categories and statuses for dropdowns
  const categories = ["Electronics", "Clothing", "Accessories", "Furniture"];
  const statuses = ["In Stock", "Low Stock", "Out of Stock"];
  const ratings = [1, 2, 3, 4, 5];

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        status: product.status || "",
        rating: product.rating?.toString() || "",
      });
    }
  }, [product]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedProduct = {
        ...product,
        ...formData,
        price: parseFloat(formData.price),
        rating: parseInt(formData.rating),
      };

      onSave(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      // You could add error handling here
    } finally {
      setIsLoading(false);
    }
  };

  const isViewMode = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isViewMode ? "View Product" : "Edit Product"}</DialogTitle>
          <DialogDescription>
            {isViewMode
              ? "View product details below."
              : "Make changes to the product details below. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              disabled={isViewMode}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="0.00"
              disabled={isViewMode}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
              disabled={isViewMode}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
              disabled={isViewMode}
            >
              <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && <span className="text-sm text-red-500">{errors.status}</span>}
          </div>

          {/* Rating */}
          <div className="grid gap-2">
            <Label htmlFor="rating">Rating</Label>
            <Select
              value={formData.rating}
              onValueChange={(value) => handleInputChange("rating", value)}
              disabled={isViewMode}
            >
              <SelectTrigger className={errors.rating ? "border-red-500" : ""}>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Star{rating !== 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.rating && <span className="text-sm text-red-500">{errors.rating}</span>}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            {isViewMode ? "Close" : "Cancel"}
          </Button>
          {!isViewMode && (
            <Button type="button" onClick={handleSave} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditForm;
