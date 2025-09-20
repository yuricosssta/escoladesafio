// "use client";

import { UserProfile } from '@/components/UserProfile';

export default async function DashboardPage() {

  return (

    <div className="container mx-auto px-5 mb-10">
      <UserProfile /> 
    </div>
  );
}