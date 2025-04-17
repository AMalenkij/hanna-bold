"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClientCldImage } from "@/components/clientCldImage";
import { useRef } from "react";

export function FormGallery({
  form,
  onSubmit,
  isSubmitting,
  submitButtonText,
  submittingButtonText,
  // posts,
}) {
  // Create a reference to the file input
  const fileInputRef = useRef(null);

  // Function to trigger the file input dialog
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Укажите название фотографии" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image upload field with improved UI */}
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Изображение</FormLabel>
              {field.value && typeof field.value === "string" && (
                <div className="mb-2">
                  <ClientCldImage
                    width={128}
                    height={128}
                    src={field.value}
                    alt="Current post image"
                    sizes="20vw"
                    className="rounded-lg shadow"
                  />
                </div>
              )}

              {/* Display filename if file is selected */}
              {field.value && field.value instanceof File && (
                <div className="mb-2 text-sm">Выбрано: {field.value.name}</div>
              )}

              <FormControl>
                <div className="flex items-center gap-2">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />

                  {/* Custom browse button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBrowseClick}
                  >
                    Выбрать фото
                  </Button>

                  {/* Clear button - only show if a file is selected */}
                  {field.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.onChange("")}
                    >
                      Очистить
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingButtonText : submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
