"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp, Loader, Plus,
  PlusCircle,
} from "lucide-react";
import { useAddProduct } from "./hooks/useAddProduct";
import AddProductCategoryModal from "./components/AddProductCategoryModal";
import AddBrandModal from "./components/AddBrandModal";
import AddUnitModal from "./components/AddUnitModal";
import AddSupplierModal from "./components/AddSupplierModal";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Checkbox} from "@/components/ui/checkbox";


export default function NewProductForm() {
  const [expandedSections, setExpandedSections] = useState({
    productInfo: true,
    pricingStocks: true,
    images: true,
    customFields: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const addProductBehaviour = useAddProduct();

  const {
    addProductBrandBehaviour,
    addProductCategoryBehaviour,
    addProductUnitBehaviour,
    addSupplierBehaviour,
    onSubmit,
      isPending,
      form,
      imagePreviewUrl
  } = addProductBehaviour;

  const {handleSubmit,formState,register} = form

  const {errors} = formState



  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Product</h1>
          <p className="text-sm text-gray-600">Create new product</p>
        </div>
        <Link href={"./product"} >
          <Button
            variant="outline"
            className="bg-gray800 text-white bg-blue-500 hover:bg-blue-400"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Product
          </Button>
        </Link>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-3">
              <span className="bg-blue-100 text-blue-500 size-5 flex items-center justify-center p-1 rounded-full">
                ℹ
              </span>
              Product Information
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={() => toggleSection("productInfo")}
            >
              {expandedSections.productInfo ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.productInfo && (
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    name="productName"
                    className="mt-4"
                    placeholder="Enter product name"
                    registerValidate={register}
                    onChange={(e)=>{
                      form.setValue("productName",e.target.value)
                      form.clearErrors("productName")
                    }}
                    error={errors.productName?.message}
                    required
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="category">Category *</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      type="button"
                      onClick={
                        addProductCategoryBehaviour.addCategoryModal.open
                      }
                    >
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Add New
                    </Button>
                  </div>
                  <Select
                    name="productCategory"
                    onValueChange={(e)=>{
                      form.setValue("productCategory",e)
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"sélectionnez une catégorie"} />
                    </SelectTrigger>
                    <SelectContent>
                      {addProductCategoryBehaviour.productCategories.map(
                        (category) => (
                          <SelectItem key={category.id} value={category.text}>
                            {category.text}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                    <p className="text-xs text-red-500">{errors.productCategory?.message}</p>
                  </Select>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="brand">Brand *</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="h-8 px-2 text-xs"
                      onClick={addProductBrandBehaviour.addBrandModal.open}
                    >
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Add New
                    </Button>
                  </div>
                  <Select
                    name="productBrand"
                    onValueChange={(e)=>{
                      form.setValue("productBrand",e)
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="sélectionner la marque" />
                    </SelectTrigger>
                    <SelectContent>
                      {addProductBrandBehaviour.allProductsBrands.map(
                        (brand) => (
                          <SelectItem key={brand.id} value={brand.text}>
                            {brand.text}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="unit">Unit *</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="h-8 px-2 text-xs"
                      onClick={addProductUnitBehaviour.addUnitModal.open}
                    >
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Add New
                    </Button>
                  </div>
                  <Select
                    name="unit"
                    onValueChange={(e)=>{
                      form.setValue("unit",e)
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="sélectionner l'unité" />
                    </SelectTrigger>
                    <SelectContent>
                      {addProductUnitBehaviour.allProductsUnits.map((unit) => (
                        <SelectItem key={unit.id} value={unit.text}>
                          {unit.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex justify-between items-center">

                    <Label htmlFor="unit">Supplier *</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="h-8 px-2 text-xs"
                      onClick={addSupplierBehaviour.addSupplierModal.open}
                    >
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Add New
                    </Button>
                  </div>
                  <Select
                    name="supplier"
                    onValueChange={(e)=>{
                      form.setValue("supplier",e)
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="sélectionner le fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {addSupplierBehaviour.allSuppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.text}>
                          {supplier.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
              </div> 
              <div className="mt-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="h-32"
                  onChange={(e)=>{
                    form.setValue("description",e.target.value)
                  }}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum 60 Characters
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md flex items-center gap-3 font-medium">
              <span className="bg-blue-100 size-5 flex items-center justify-center text-blue-500 p-1 rounded-full">
                $
              </span>
              Pricing & Stocks
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={() => toggleSection("pricingStocks")}
            >
              {expandedSections.pricingStocks ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.pricingStocks && (
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Product Type</Label>
                  <RadioGroup
                    defaultValue="single"
                    className="flex flex-wrap gap-4 mt-2"
                    onValueChange={(e)=>{
                      form.setValue("productType",e)
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single">Single Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="variable" id="variable" />
                      <Label htmlFor="variable">Variable Product</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      registerValidate={register}
                      onChange={(e)=>{
                        form.setValue("quantity",e.target.value)
                        form.clearErrors("quantity")
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Enter price"
                      registerValidate={register}
                      onChange={(e)=>{
                        form.setValue("price",e.target.value)
                        form.clearErrors("price")
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxType">Tax Type</Label>
                    <Select
                      name="taxType"
                      onValueChange={(e)=>{
                        form.setValue("taxType",e)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inclusive">Inclusive</SelectItem>
                        <SelectItem value="exclusive">Exclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select
                      name="discountType"
                      onValueChange={(e)=>{
                        form.setValue("discountType",e)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="discountValue">Discount Value</Label>
                    <Input
                      id="discountValue"
                      name="discountValue"
                      placeholder="Enter discount value"
                      registerValidate={register}
                      onChange={(e)=> {
                        form.setValue("discountValue", e.target.value)
                        form.clearErrors("discountValue")
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alertQuantity">Quantity Alert</Label>
                    <Input
                      id="alertQuantity"
                      name="alertQuantity"
                      type="number"
                      placeholder="Enter quantity alert"
                      registerValidate={register}
                      onChange={(e)=> {
                        form.setValue("alertQuantity", e.target.value)
                        form.clearErrors("alertQuantity")
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              <span className="bg-blue-100 text-blue-500 p-1 rounded-full mr-2">
                🖼
              </span>
              Images
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0"
              onClick={() => toggleSection("images")}
            >
              {expandedSections.images ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.images && (
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4">
                <div
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 relative"
                >
                  <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      {...form.register("image", {
                        onChange: (e) => form.setValue("image", e.target.files?.[0] || null),
                      })}
                  />
                  {imagePreviewUrl ? (
                      <img
                          src={imagePreviewUrl}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover rounded-lg"
                      />
                  ) : (
                      <>
                        <Plus className="h-6 w-6 text-gray-400"/>
                        <span className="sr-only">Add Images</span>
                      </>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-3">
              <span className="bg-blue-100 text-blue-500 size-7 flex items-center justify-center rounded-full">
                📋
              </span>
              Custom Fields
            </CardTitle>
            <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
                onClick={() => toggleSection("customFields")}
            >
              {expandedSections.customFields ? (
                  <ChevronUp className="h-4 w-4"/>
              ) : (
                  <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedSections.customFields && (
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="warranties" />
                  <Label htmlFor="warranties">Warranties</Label>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="manufacturedDate">Manufactured Date</Label>
                  <Input
                      id="manufacturedDate"
                      name="manufacturedDate"
                      type="date"
                      onChange={(e)=>{
                        form.setValue("manufacturedDate", e.target.value)
                        form.clearErrors('manufacturedDate')
                      }}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry On</Label>
                  <Input
                      id="expiryDate"
                      type="date"
                      onChange={(e)=>{
                        form.setValue("expireDate", e.target.value)
                      }}
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button disabled={isPending} className="bg-blue-500 hover:bg-blue-400" type="submit">
            {
              isPending ? (
                  <Loader/>
              ) : <span>Save Product</span>
            }
          </Button>
        </div>
      </form>
      <AddProductCategoryModal
        addProductCategoryBehaviour={addProductCategoryBehaviour}
      />
      <AddBrandModal addProductBrandBehaviour={addProductBrandBehaviour} />
      <AddUnitModal addProductUnitBehaviour={addProductUnitBehaviour} />,
      <AddSupplierModal addSupplierBehaviour={addSupplierBehaviour} />
    </div>
  );
}
