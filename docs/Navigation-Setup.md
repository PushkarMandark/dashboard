# Adding New Pages to Navigation

To add the new Users and Orders pages to your navigation, you can update your navigation configuration.

## Update SubHeader Navigation

Add these menu items to your `components/layout/SubHeader.jsx` or navigation configuration:

```javascript
// Add to your menuItems array
{
  id: "data-management",
  label: "Data Management",
  icon: <BiTable />,
  items: [
    {
      label: "Dashboard",
      url: "/dashboard",
    },
    {
      label: "Users",
      url: "/users",
    },
    {
      label: "Orders",
      url: "/orders",
    },
  ],
},
```

## Quick Navigation Links

You can also add quick navigation links to test the pages:

```jsx
// Add to any page for testing
<div className="flex gap-4 mb-6">
  <Link href="/dashboard" className="text-blue-600 hover:underline">
    Dashboard (Products)
  </Link>
  <Link href="/users" className="text-blue-600 hover:underline">
    Users Management
  </Link>
  <Link href="/orders" className="text-blue-600 hover:underline">
    Orders Management
  </Link>
</div>
```

## Test URLs

- Dashboard: `http://localhost:3001/dashboard`
- Users: `http://localhost:3001/users`
- Orders: `http://localhost:3001/orders`

Each page demonstrates different features of the reusable DataTable component.
