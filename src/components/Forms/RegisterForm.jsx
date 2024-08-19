import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input.jsx";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z
    .string()
    .regex(
      /^[A-Za-z0-9_]{2,24}$/,
      "Le nom d'utilisateur doit :\nContenir que des lettres ainsi que des '_'.\nFaire entre 2 et 13 characters.",
    ),
  email: z
    .string()
    .email("L'adresse email n'est pas valide. (exemple@domain.com)"),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[~!@#$%\^&*()_\-+=|\\{}[\]:;<>?\/.,""])(?=.*[A-Z])(?=.*[a-z])\S{9,}$/,
      "Le mot de passe doit au moins contenir :\nUn chiffre.\nUn caractère spécial.\nUn lettre majuscule.\nUne lettre minuscule.\nAu moins 9 caractères.\nUniquement des caractères visibles(pas d'espaces).",
    ),
});

const validateForm = async (data) => {
  try {
    try {
      formSchema.parse(data);
    } catch (err) {
      console.log(err);
    }
    const response = await fetch(
      "https://nova-api-s2m2r.ondigitalocean.app//api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      },
    );

    if (response.ok === false) {
      const result = await response.json();
      const customErrors = {};

      if (result.errors.username) {
        customErrors.username = result.errors.username;
      }
      if (result.errors.email) {
        customErrors.email = result.errors.email;
      }
      if (result.errors.password) {
        customErrors.password = result.errors.password;
      }

      throw new z.ZodError(
        Object.keys(customErrors).map((field) => {
          return {
            path: [field],
            message: customErrors[field],
          };
        }),
      );
    } else {
      return { success: true };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    } else {
      return { success: false, errors: error };
    }
  }
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { success, errors } = await validateForm(values);
    if (success === false) {
      if (Array.isArray(errors)) {
        const fieldErrors = errors.reduce((acc, error) => {
          if (error.path && error.path[0]) {
            acc[error.path[0]] = { message: error.message };
          }
          return acc;
        }, {});

        Object.keys(fieldErrors).forEach((field) => {
          form.setError(field, {
            type: "manual",
            message: fieldErrors[field]?.message,
          });
        });
      } else {
        console.error("Erreur inattendue:", errors);
      }
    } else {
      toast({
        title: "Account Created",
        description: `Bienvenue dans la team ${values.username} 🎉 !`,
      });
      navigate("/login");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col content-center"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
