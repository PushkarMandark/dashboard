"use client";

import { Save, X } from "lucide-react"; // Import Plus and Minus icons
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { apiService } from "@/lib/services/apiUtils"; // Import our new API service

const DataTableEditForm = ({ product, isOpen, onClose, onSave, mode = "edit" }) => {
  // Add state for saved data history
  const [savedDataHistory, setSavedDataHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Categories and statuses for dropdowns
  const categories = ["Electronics", "Clothing", "Accessories", "Furniture"];
  const statuses = ["In Stock", "Low Stock", "Out of Stock"];
  const ratings = [1, 2, 3, 4, 5];

  // Initialize React Hook Form
  const form = useForm({
    defaultValues: {
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
    },
    // Add form validation
    resolver: (data) => {
      const errors = {};

      // Validate required fields
      if (!data.name) {
        if (!errors.name) errors.name = {};
        errors.name.message = "Product name is required";
      }

      if (!data.price) {
        if (!errors.price) errors.price = {};
        errors.price.message = "Price is required";
      } else if (parseFloat(data.price) <= 0) {
        if (!errors.price) errors.price = {};
        errors.price.message = "Price must be greater than 0";
      }

      // Validate extraFields
      if (data.extraFields && data.extraFields.length > 0) {
        data.extraFields.forEach((field, index) => {
          // Validate firstName (required)
          if (!field.firstName) {
            if (!errors.extraFields) errors.extraFields = {};
            if (!errors.extraFields[index]) errors.extraFields[index] = {};
            if (!errors.extraFields[index].firstName) errors.extraFields[index].firstName = {};
            errors.extraFields[index].firstName.message = "First name is required";
          }

          // Validate email (required)
          if (!field.email) {
            if (!errors.extraFields) errors.extraFields = {};
            if (!errors.extraFields[index]) errors.extraFields[index] = {};
            if (!errors.extraFields[index].email) errors.extraFields[index].email = {};
            errors.extraFields[index].email.message = "Email is required";
          } else if (!/^\S+@\S+\.\S+$/.test(field.email)) {
            if (!errors.extraFields) errors.extraFields = {};
            if (!errors.extraFields[index]) errors.extraFields[index] = {};
            if (!errors.extraFields[index].email) errors.extraFields[index].email = {};
            errors.extraFields[index].email.message = "Invalid email format";
          }

          // Validate address (required)
          if (!field.address) {
            if (!errors.extraFields) errors.extraFields = {};
            if (!errors.extraFields[index]) errors.extraFields[index] = {};
            if (!errors.extraFields[index].address) errors.extraFields[index].address = {};
            errors.extraFields[index].address.message = "Address is required";
          }
        });
      }

      return {
        values: data,
        errors: Object.keys(errors).length > 0 ? errors : {},
      };
    },
  });

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      // Reset form with product data
      form.reset({
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
      });

      // Fetch saved data history when product changes
      if (product.id) {
        fetchSavedDataHistory(product.id);
      }
    }
  }, [product, form]);

  // Fetch saved data history
  const fetchSavedDataHistory = async (productId) => {
    setIsLoadingHistory(true);
    try {
      // In a real application, you would make an API call here
      console.log(`Fetching history for product ID: ${productId}`);

      // For a real API call, you would use:
      // const response = await apiService.get(`/api/products/${productId}/history`);
      // if (response.success) {
      //   setSavedDataHistory(response.data);
      // } else {
      //   console.error("Error fetching history:", response.error);
      // }

      // For demo, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data for demonstration
      const mockHistory = [
        {
          id: 1,
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          user: "admin@example.com",
          changes: { price: "199.99", status: "In Stock" },
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          user: "manager@example.com",
          changes: { price: "189.99", status: "Low Stock" },
        },
      ];

      setSavedDataHistory(mockHistory);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setIsLoading(false);
    }
  }, [isOpen, form]);

  const handleSave = async (data) => {
    setIsLoading(true);

    try {
      // Create the updated product object
      const updatedProduct = {
        ...product,
        ...data,
        price: parseFloat(data.price),
        rating: parseInt(data.rating),
      };

      // In a real application, you would use the apiService here
      // Example: await apiService.put(`/api/products/${product.id}`, updatedProduct);
      console.log("Saving product:", updatedProduct);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Determine what fields have changed
      const changes = {};
      if (product) {
        if (product.price?.toString() !== data.price) {
          changes.price = data.price;
        }
        if (product.status !== data.status) {
          changes.status = data.status;
        }
        if (product.category !== data.category) {
          changes.category = data.category;
        }
        if (product.name !== data.name) {
          changes.name = data.name;
        }
        if (product.rating?.toString() !== data.rating) {
          changes.rating = data.rating;
        }

        // Check for changes in extraFields
        if (data.extraFields && data.extraFields.length > 0) {
          const originalExtraFields =
            product.extraFields && product.extraFields.length > 0
              ? product.extraFields[0]
              : { firstName: "", email: "", address: "" };

          const newExtraFields = data.extraFields[0];

          // Check firstName changes
          if (originalExtraFields.firstName !== newExtraFields.firstName) {
            changes.firstName = newExtraFields.firstName;
          }

          // Check email changes
          if (originalExtraFields.email !== newExtraFields.email) {
            changes.email = newExtraFields.email;
          }

          // Check address changes
          if (originalExtraFields.address !== newExtraFields.address) {
            changes.address = newExtraFields.address;
          }
        }
      }

      // Only add history entry if there are actual changes
      if (Object.keys(changes).length > 0) {
        // Add to saved data history
        const newHistoryEntry = {
          id: savedDataHistory.length + 1,
          timestamp: new Date().toISOString(),
          user: "current_user@example.com", // In a real app, get this from auth context
          changes,
        };

        setSavedDataHistory([newHistoryEntry, ...savedDataHistory]);
      }

      // Call the onSave callback from parent component
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

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const changesBodyTemplate = (rowData) => (
    <ul className="list-disc pl-5">
      {Object.entries(rowData.changes).map(([field, value]) => (
        <li key={field}>
          <span className="font-medium">{field}:</span> {value}
        </li>
      ))}
    </ul>
  );

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <div className="grid gap-4 py-4">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" disabled={isViewMode} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isViewMode}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={isViewMode}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      disabled={isViewMode}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratings.map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating} Star{rating !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Extra Fields Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              {form.watch("extraFields").map((field, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded-md">
                  {/* First Name - Make it required */}
                  <FormField
                    control={form.control}
                    name={`extraFields.${index}.firstName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          First Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" disabled={isViewMode} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name={`extraFields.${index}.lastName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" disabled={isViewMode} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email - Make it required */}
                  <FormField
                    control={form.control}
                    name={`extraFields.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Email" disabled={isViewMode} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name={`extraFields.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone" disabled={isViewMode} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address - Make it required */}
                  <FormField
                    control={form.control}
                    name={`extraFields.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Address" disabled={isViewMode} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

            {/* Saved Data History Table */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4 ">Change History</h3>
              <DataTable
                value={savedDataHistory}
                loading={isLoadingHistory}
                emptyMessage="No change history available"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                className="  p-datatable-sm"
                stripedRows
                responsiveLayout="scroll"
              >
                <Column
                  field="timestamp"
                  header="Date & Time"
                  body={(rowData) => formatDate(rowData.timestamp)}
                  sortable
                  style={{ width: "25%" }}
                />
                <Column field="user" header="User" sortable style={{ width: "25%" }} />
                <Column
                  field="changes"
                  header="Changes"
                  body={changesBodyTemplate}
                  style={{ width: "50%" }}
                />
              </DataTable>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                {isViewMode ? "Close" : "Cancel"}
              </Button>
              {!isViewMode && (
                <Button type="submit" disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DataTableEditForm;
