'use server';
import supabase from '@/config/supabase-config';
import { currentUser } from '@clerk/nextjs/server';

export const getCurrentUserFromSupabase = async () => {
  try {
    const clerkUser = await currentUser();
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('clerk_user_id', clerkUser?.id);
    if (error) {
      throw error;
    }
    if (data && data.length > 0) {
      return {
        success: true,
        data: data[0],
      };
    }
    const newUserObj = {
      clerk_user_id: clerkUser?.id,
      email: clerkUser?.emailAddresses[0].emailAddress,
      first_name: clerkUser?.firstName + ' ' + clerkUser?.lastName,
      is_active: true,
      is_admin: false,
    };
    const { data: newUser, error: newUserError } = await supabase
      .from('user_profiles')
      .insert([newUserObj])
      .select('*');
    if (newUserError) {
      throw newUserError;
    }
    return {
      success: true,
      data: newUser[0],
    };
  } catch (error) {
    console.error('Error fetching user from Supabase:', error);
    return {
      success: false,
      error: 'Failed to fetch user from Supabase',
    };
  }
};
