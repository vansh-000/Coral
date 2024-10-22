import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import db from '@/lib/supabase/db';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  // Fetch user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login'); 
  }
  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  const { data: subscription, error: subscriptionError } = await getUserSubscriptionStatus(user.id);

  if (subscriptionError) {
    throw new Error('Error fetching subscription');
  }

  if (!workspace) {
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup user={user} subscription={subscription} />
      </div>
    );
  }
  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;
