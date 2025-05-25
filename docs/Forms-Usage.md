# React Hook Form Implementation

A comprehensive form system built with React Hook Form, Zod validation, and reusable UI components.

## Features

- ✅ **React Hook Form** - Performant forms with easy validation
- ✅ **Zod Validation** - Type-safe schema validation
- ✅ **Reusable Components** - Consistent UI components
- ✅ **All Input Types** - Text, number, date, select, checkbox, radio, switch, slider, file
- ✅ **Real-time Validation** - Instant feedback on form errors
- ✅ **Accessibility** - ARIA labels and proper form structure

## Components Created

### Form Components

- `Form` - Main form wrapper with context
- `FormField` - Individual field wrapper with validation
- `FormItem` - Field container with spacing
- `FormLabel` - Accessible form labels
- `FormControl` - Input control wrapper
- `FormDescription` - Help text for fields
- `FormMessage` - Error message display

### Input Components

- `Input` - Text, email, number, date, tel, url inputs
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Boolean checkbox input
- `RadioGroup` - Single selection from multiple options
- `Switch` - Toggle switch for boolean values
- `Slider` - Range slider for numeric values

## Usage Example

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18"),
});

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 18,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
```

## Input Types Demonstrated

### Text Inputs

- **Text**: Basic text input
- **Email**: Email validation
- **Phone**: Telephone number
- **URL**: Website URL validation
- **Password**: Hidden text input

### Number Inputs

- **Number**: Numeric input with min/max validation
- **Range**: Slider for numeric ranges

### Date/Time Inputs

- **Date**: Date picker
- **Time**: Time picker
- **DateTime**: Combined date and time

### Selection Inputs

- **Select**: Dropdown with options
- **Radio Group**: Single selection from multiple options
- **Checkbox**: Boolean or multiple selections

### Advanced Inputs

- **Textarea**: Multi-line text
- **Switch**: Toggle for boolean values
- **Slider**: Range slider with visual feedback
- **File Upload**: File selection with type restrictions

## Validation Features

### Built-in Validations

- Required fields
- String length (min/max)
- Email format
- URL format
- Number ranges
- Custom regex patterns

### Error Handling

- Real-time validation
- Field-level error messages
- Form-level error summary
- Accessible error announcements

## Form Sections

The comprehensive form includes:

1. **Personal Information**

   - Name, email, phone, website
   - Birth date, gender selection
   - Bio textarea

2. **Professional Information**

   - Position, department, country selection
   - Employment type, start date
   - Age, experience, salary

3. **Preferences & Settings**

   - Skill level and satisfaction sliders
   - Notification switches
   - Newsletter and marketing checkboxes

4. **File Uploads**
   - Profile picture upload
   - Resume/document upload

## Testing the Form

1. Navigate to `/forms`
2. Fill out the form fields
3. Try submitting with invalid data to see validation
4. Submit with valid data to see console output
5. Use the reset button to clear the form

## Customization

### Adding New Input Types

1. Create the UI component in `components/ui/`
2. Add validation schema in Zod
3. Create FormField with proper render function
4. Add to the form page

### Custom Validation

```jsx
const customSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
});
```

### Conditional Fields

```jsx
const watchedValue = form.watch("fieldName");

{watchedValue === "specific-value" && (
  <FormField name="conditionalField" ... />
)}
```

## Dependencies

- `react-hook-form` - Form state management
- `@hookform/resolvers` - Validation resolvers
- `zod` - Schema validation
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons

## Best Practices

1. **Use TypeScript** for better type safety
2. **Define schemas** before building forms
3. **Group related fields** in sections
4. **Provide clear labels** and descriptions
5. **Test accessibility** with screen readers
6. **Handle loading states** during submission
7. **Provide feedback** on successful submission
