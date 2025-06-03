"use client";

import { Save, X } from "lucide-react"; // Import Plus and Minus icons
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

const DataTableEditForm = ({ product, isOpen, onClose, onSave, mode = "edit" }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    status: "",
    rating: "",
    extraFields: [
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
    ],
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
      setFormData((prevState) => ({
        ...prevState,
        name: product.name || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        status: product.status || "",
        rating: product.rating?.toString() || "",
        // Initialize extraFields from product or with a default if not present
        extraFields:
          product.extraFields && product.extraFields.length > 0
            ? product.extraFields
            : [
                {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  zip: "",
                  country: "",
                },
              ],
      }));
    }
  }, [product]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setIsLoading(false);
      // Reset extra fields to at least one default empty object
      setFormData((prev) => ({
        ...prev,
        extraFields: [
          {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
          },
        ],
      }));
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

  const handleExtraFieldChange = (index, field, value) => {
    const updatedExtraFields = formData.extraFields.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    setFormData((prev) => ({
      ...prev,
      extraFields: updatedExtraFields,
    }));
  };

  // const handleAddExtraField = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     extraFields: [
  //       ...prev.extraFields,
  //       {
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         phone: "",
  //         address: "",
  //         city: "",
  //         state: "",
  //         zip: "",
  //         country: "",
  //       },
  //     ],
  //   }));
  // };

  // const handleRemoveExtraField = (index) => {
  //   // Ensure there's always at least one extra field
  //   if (formData.extraFields.length > 1) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       extraFields: prev.extraFields.filter((_, i) => i !== index),
  //     }));
  //   }
  // };

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

    // You can add validation for extra fields here if needed
    // For example, if firstName is required for each extra field:
    // formData.extraFields.forEach((field, index) => {
    //   if (!field.firstName.trim()) {
    //     newErrors[`extraField-${index}-firstName`] = "First name is required";
    //   }
    // });

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

  console.log("product--->", product);
  console.log("formData--->", formData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1200px] overflow-y-auto max-h-[90vh]">
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

        {/* --- */}

        {/* Extra Fields Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          {formData.extraFields.map((field, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded-md">
              <div className="grid gap-2">
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  id={`firstName-${index}`}
                  value={field.firstName}
                  onChange={(e) => handleExtraFieldChange(index, "firstName", e.target.value)}
                  placeholder="First Name"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  id={`lastName-${index}`}
                  value={field.lastName}
                  onChange={(e) => handleExtraFieldChange(index, "lastName", e.target.value)}
                  placeholder="Last Name"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={field.email}
                  onChange={(e) => handleExtraFieldChange(index, "email", e.target.value)}
                  placeholder="Email"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`phone-${index}`}>Phone</Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={field.phone}
                  onChange={(e) => handleExtraFieldChange(index, "phone", e.target.value)}
                  placeholder="Phone"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor={`address-${index}`}>Address</Label>
                <Input
                  id={`address-${index}`}
                  value={field.address}
                  onChange={(e) => handleExtraFieldChange(index, "address", e.target.value)}
                  placeholder="Address"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`city-${index}`}>City</Label>
                <Input
                  id={`city-${index}`}
                  value={field.city}
                  onChange={(e) => handleExtraFieldChange(index, "city", e.target.value)}
                  placeholder="City"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`state-${index}`}>State</Label>
                <Input
                  id={`state-${index}`}
                  value={field.state}
                  onChange={(e) => handleExtraFieldChange(index, "state", e.target.value)}
                  placeholder="State"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`zip-${index}`}>Zip Code</Label>
                <Input
                  id={`zip-${index}`}
                  value={field.zip}
                  onChange={(e) => handleExtraFieldChange(index, "zip", e.target.value)}
                  placeholder="Zip Code"
                  disabled={isViewMode}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`country-${index}`}>Country</Label>
                <Input
                  id={`country-${index}`}
                  value={field.country}
                  onChange={(e) => handleExtraFieldChange(index, "country", e.target.value)}
                  placeholder="Country"
                  disabled={isViewMode}
                />
              </div>

              {/* {!isViewMode && formData.extraFields.length > 1 && (
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveExtraField(index)}
                    className="mt-2"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Remove Field Set
                  </Button>
                </div>
              )} */}
            </div>
          ))}
          {/* {!isViewMode && (
            <Button type="button" onClick={handleAddExtraField} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add More Fields
            </Button>
          )} */}
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

export default DataTableEditForm;
