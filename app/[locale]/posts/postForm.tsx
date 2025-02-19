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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import type { UseFormReturn } from "react-hook-form";
import type * as z from "zod";
import type { postFormSchema } from "./postSchema";
import { CldImage } from "next-cloudinary";

interface PostFormProps {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
  onSubmit: (values: z.infer<typeof postFormSchema>) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText: string;
  submittingButtonText: string;
}

// Динамический импорт TiptapEditor для клиентской стороны
const TiptapEditor = dynamic(() => import("@/components/tiptapEditor"), {
  ssr: false,
  loading: () => <div className="h-[200px] animate-pulse rounded-lg border" />,
});

export function PostForm({
  form,
  onSubmit,
  isSubmitting,
  submitButtonText,
  submittingButtonText,
}: PostFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="eng" className="w-full">
          <TabsList>
            <TabsTrigger value="eng">Eng</TabsTrigger>
            <TabsTrigger value="pl">Pl</TabsTrigger>
            <TabsTrigger value="ua">Ua</TabsTrigger>
          </TabsList>
          {/* English form */}
          <TabsContent value="eng">
            <FormField
              control={form.control}
              name="title_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intro_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Post introduction"
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          {/* Polish form */}
          <TabsContent value="pl">
            <FormField
              control={form.control}
              name="title_pl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tytuł</FormLabel>
                  <FormControl>
                    <Input placeholder="Tytuł posta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intro_pl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wprowadzenie</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Wprowadzenie posta"
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content_pl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zawartość</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          {/* Ukrainian form */}
          <TabsContent value="ua">
            <FormField
              control={form.control}
              name="title_ua"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Заголовок</FormLabel>
                  <FormControl>
                    <Input placeholder="Заголовок публікації" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intro_ua"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Вступ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Вступ до публікації"
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content_ua"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Контент</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="post-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              {field.value && typeof field.value === "string" && (
                <div className="mb-2">
                  <CldImage
                    className="rounded-lg shadow"
                    width="128"
                    height="970"
                    src={field.value}
                    sizes="20vw"
                    alt="Current post image"
                  />
                </div>
              )}
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Published</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">
          {isSubmitting ? submittingButtonText : submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
