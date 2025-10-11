export function getBoilerplateContent(
  framework: string,
  dir: string,
  name: string
): string {
  if (framework === "react") {
    if (dir.includes("pages")) {
      return `import React from 'react';
  import { Button } from '../../shared/components/atoms/Button/Button';
  import { Card } from '../../shared/components/molecules/Card/Card';
  import { Header } from '../../shared/components/organisms/Header/Header';
  import { MainLayout } from '../../shared/components/templates/MainLayout/MainLayout';
  
  export default function HomePage() {
    return (
      <MainLayout>
        <Header />
        <section style={{ padding: 24 }}>
          <h1>Home Page</h1>
          <Card title="Welcome" content="This is a sample page." />
          <Button label="Click Me" />
        </section>
      </MainLayout>
    );
  }`;
    }
    if (dir.includes("templates")) {
      return `import React from 'react';
  import { Header } from '../../organisms/Header/Header';
  
  export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Header />
        <main style={{ padding: 24 }}>{children}</main>
      </>
    );
  }`;
    }
    if (dir.includes("organisms")) {
      return `import React from 'react';
  
  export function Header() {
    return (
      <header style={{ width: '100%', padding: 16, backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>My App</h1>
      </header>
    );
  }`;
    }
    if (dir.includes("molecules")) {
      return `import React from 'react';
  import { Button } from '../../atoms/Button/Button';
  
  type CardProps = {
    title: string;
    content: string;
  };
  
  export function Card({ title, content }: CardProps) {
    return (
      <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
        <p style={{ color: '#666' }}>{content}</p>
        <Button label='Read More' />
      </div>
    );
  }`;
    }
    if (dir.includes("atoms")) {
      return `import React from 'react';
  
  type ButtonProps = {
    label: string;
    onClick?: () => void;
  };
  
  export function Button({ label, onClick }: ButtonProps) {
    return (
      <button onClick={onClick} style={{ padding: '8px 16px', borderRadius: 6, backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
        {label}
      </button>
    );
  }`;
    }
    if (dir.includes("api")) {
      return `// Sample API module
  export async function fetchUser(id: string): Promise<{ id: string; name: string; email: string }> {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }`;
    }
    if (dir.includes("hooks")) {
      return `import { useState, useEffect } from 'react';
  
  export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(setData)
        .finally(() => setLoading(false));
    }, [url]);
  
    return { data, loading };
  }`;
    }
    if (dir.includes("entities")) {
      return `// Domain entity
  export interface User {
    id: string;
    name: string;
    email: string;
  }`;
    }
    if (dir.includes("usecases")) {
      return `import { User } from '../entities/user';

export function getUserDisplayName(user: User): string {
  return \`\${user.name} <\${user.email}>\`;
}`;
    }
    if (dir.includes("models")) {
      return `// Business model
  export type Product = {
    id: string;
    name: string;
    price: number;
  };`;
    }
    return `import React from 'react';
  
  export function ${name}() {
    return <div>${name}</div>;
  }`;
  } else {
    return `console.log('${name} module loaded');`;
  }
}
