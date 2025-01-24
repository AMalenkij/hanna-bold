import type { UseFormReturn } from "react-hook-form";
import type * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { postFormSchema } from "./postSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostFormProps {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
  onSubmit: (values: z.infer<typeof postFormSchema>) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText: string;
  submittingButtonText: string;
}

export function PostForm({
  form,
  onSubmit,
  isSubmitting,
  submitButtonText,
  submittingButtonText,
}: PostFormProps) {
  // Автогенерация slug при изменении заголовка
  // const generateSlug = (title: string) => {
  //   return title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, "-")
  //     .replace(/^-+|-+$/g, "")
  //     .trim();
  // };

  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   form.setValue("title_en", e.target.value);
  //   form.setValue("slug", generateSlug(e.target.value));
  // };

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
                    <Input
                      placeholder="Post title"
                      {...field}
                      // onChange={handleTitleChange}
                    />
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
                    <Textarea
                      placeholder="Post content"
                      className="h-48"
                      {...field}
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
                    <Textarea
                      placeholder="Zawartość posta"
                      className="h-48"
                      {...field}
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
              name="title_uk"
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
              name="intro_uk"
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
              name="content_uk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Контент</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Контент публікації"
                      className="h-48"
                      {...field}
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
                <Input
                  placeholder="post-slug"
                  {...field}
                  // readOnly
                  // className="bg-muted"
                />
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
              <FormLabel>Photo URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
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
