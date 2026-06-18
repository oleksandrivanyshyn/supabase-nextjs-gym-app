'use server';

import supabase from '@/config/supabase-config';
import { currentUser } from '@clerk/nextjs/server';
import { IUser } from '@/interfaces';

export const getCurrentUserFromSupabase = async () => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return {
        success: false,
        error: 'User is not authenticated in Clerk',
      };
    }

    const { data: existingUser, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (existingUser) {
      return {
        success: true,
        data: existingUser as IUser,
      };
    }

    const firstName = clerkUser.firstName || '';
    const lastName = clerkUser.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim() || 'Anonymous';

    const newUserObj = {
      clerk_user_id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      name: fullName,
      is_active: true,
      is_admin: false,
    };

    const { data: newUser, error: newUserError } = await supabase
      .from('user_profiles')
      .insert(newUserObj)
      .select('*')
      .single();

    if (newUserError) {
      throw newUserError;
    }

    return {
      success: true,
      data: newUser as IUser,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Failed to fetch user from Supabase',
    };
  }
};
